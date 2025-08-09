import db  from "@/app/api/db";

export async function GET(request, { params }) {
    const { id } = params;
    const res = await db`SELECT * FROM productos WHERE id = ${id}`;
    if(res.length > 0) {
        return new Response(JSON.stringify(res[0]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
}


export async function DELETE(request, { params }) {
    const { id } = params;
    const res = await db`DELETE FROM productos WHERE id = ${id}`;
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