import db from "@/app/api/db"
import { NextResponse } from "next/server";

export async function GET(request){
    const res = await db`SELECT * FROM recibos ORDER BY fecha DESC`;
    if(res.length > 0) {
        return new Response(JSON.stringify(res), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
    else {
    return new Response(JSON.stringify([]), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
    }
}


export async function POST(req){
    try {
        const body = await req.json();

        console.log("body ", body)

        const prod = await db`INSERT INTO productos (nombre, precio, inventario, imagenes, descripcion) VALUES (${body.nombre}, ${body.precio}, ${body.inventario}, ${[]}, ${body.descripcion}) RETURNING *`; 

        return NextResponse.json(
        { message: "Producto creado con éxito", producto: prod[0] },
        { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error al procesar la solicitud" },
            { status: 500 }
        );
    }
}