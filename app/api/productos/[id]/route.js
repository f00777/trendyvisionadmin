import db  from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    const res = await db`SELECT * FROM productos WHERE id = ${id}`;
    if(res.length > 0) {
        return new Response(JSON.stringify(res[0]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
    else {
    return new Response(JSON.stringify({ error: "Producto no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
    }
}


export async function DELETE(request, { params }) {
    const { id } = params;
    const res = await db`UPDATE productos SET activo = false WHERE id = ${id}`;
    if(res.count > 0) {
        return new Response(JSON.stringify({ message: "Producto eliminado exitosamente" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } else {
        return new Response(JSON.stringify({ error: "Producto no encontrado" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }
}


export async function PUT(req, {params}){
    try {
        const id = params.id; // ID de la URL
        const body = await req.json();

        await db`UPDATE productos SET nombre=${body.nombre}, precio=${body.precio}, inventario = ${body.inventario}, descripcion = ${body.descipcion} WHERE id=${id}`;

        return NextResponse.json(
        { message: "Producto actualizado con éxito", producto: body },
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




