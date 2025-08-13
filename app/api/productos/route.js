import db from "@/app/api/db"


export async function GET(request){
    const res = await db`SELECT * FROM productos WHERE activo = true`;
    if(res.length > 0) {
        return new Response(JSON.stringify(res), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    }
    else {
    return new Response(JSON.stringify({ error: "No hay productos" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
    });
    }
}