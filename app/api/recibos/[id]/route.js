import db from "@/app/api/db"
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    const res = await db`
    SELECT recibos.*, CONCAT('Region: ', usuarios.region, ' Comuna: ', 
    usuarios.comuna, ' Direccion: ', usuarios.direccion, ' Codigo postal: ', usuarios.codigo_postal) AS direccion
    FROM recibos
    JOIN usuarios on recibos.usuario_email = usuarios.email
    WHERE recibos.id = ${id}
    `;

    if(res.length > 0) {
        return new Response(JSON.stringify(res[0]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
    else {
    return new Response(JSON.stringify({ error: "Recibo no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
    }
}


export async function PUT(req, {params}){
    try {
        const id = params.id; // ID de la URL
        const body = await req.json();

        await db`UPDATE recibos SET estado = ${body.estado} WHERE id=${id}`;

        return NextResponse.json(
        { message: "Recibo actualizado con éxito", producto: body },
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

