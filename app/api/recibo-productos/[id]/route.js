import db from "@/app/api/db"
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
    const { id } = params;
    const res = await db`
    SELECT recibo_productos.id, recibo_productos.producto_id, recibo_productos.cantidad,
    recibo_productos.precio_unitario,
    productos.nombre, productos.imagenes 
    FROM recibo_productos JOIN productos
    ON recibo_productos.producto_id = productos.id
    WHERE recibo_productos.recibo_id = ${id}
    `;

    if(res.length > 0) {
        return new Response(JSON.stringify(res), {
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
