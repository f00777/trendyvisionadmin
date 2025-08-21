import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import db from "@/app/api/db" 

export async function PUT(req: NextRequest) {
  try {
    const datos = await req.json()
    /* const formData = await req.formData();

    // Obtener id y archivos
    const id = formData.get("id") as string;
    const files = formData.getAll("images") as File[];

    if (!id || files.length === 0) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Crear carpeta de subida
    const uploadDir = path.join(process.cwd(), "/public/uploads", id);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const urls: string[] = [];

    // Procesar cada imagen
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const outputPath = path.join(uploadDir, `${i + 1}.webp`);

      await sharp(buffer)
        .resize(1000, 1000, { fit: "cover" })
        .webp({ quality: 90 })
        .toFile(outputPath);

      urls.push(`/uploads/${id}/${i + 1}.webp`); 

      */

      await db`UPDATE productos SET imagenes = ${datos.images} WHERE id = ${datos.id}`

    return NextResponse.json({datos_dentro: datos});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al procesar imágenes" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Obtener id y archivos
    const id = formData.get("id") as string;
    const files = formData.getAll("images") as File[];

    if (!id || files.length === 0) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    // Crear carpeta de subida
    const uploadDir = path.join(process.cwd(), "/public/uploads", id);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const urls: string[] = [];

    // Procesar cada imagen
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const outputPath = path.join(uploadDir, `${i + 1}.webp`);

      await sharp(buffer)
        .resize(1000, 1000, { fit: "cover" })
        .webp({ quality: 90 })
        .toFile(outputPath);

      urls.push(`/uploads/${id}/${i + 1}.webp`);
    }

    return NextResponse.json({ images: urls});
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al procesar imágenes" }, { status: 500 });
  }
}