import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "@/app/api/db";

const JWT_SECRET = process.env.JWT_SECRET || "hola";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // 1️⃣ Buscar usuario solo por email
    const user = await db`
      SELECT * FROM usuarios
      WHERE email = ${email}
      AND admin = true
      LIMIT 1
    `;

    if (!user || user.length === 0) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 });
    }

    // 2️⃣ Comparar contraseña en texto plano con el hash guardado
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return NextResponse.json({ message: "Credenciales inválidas" }, { status: 401 });
    }

    // 3️⃣ Crear token JWT
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, admin: user[0].admin },
      JWT_SECRET,
      { expiresIn: "3h" }
    );

    // 4️⃣ Setear cookie segura
    const res = NextResponse.json({ message: "OK" }, {status: 200});
    res.cookies.set("auth_token", token, {
      httpOnly: true,
      maxAge: 3 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: false,
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en autenticación" }, { status: 500 });
  }
}



export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ loggedIn: false });
    }

    // Verificar token
    const payload = jwt.verify(token, JWT_SECRET);

    return NextResponse.json({ loggedIn: true, user: payload });
  } catch (error) {
    // Token inválido o expirado
    return NextResponse.json({ loggedIn: false });
  }
}