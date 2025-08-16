"use client";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Spinner from "@/components/ads/Spinner";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table-recibo-productos";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea";

export default function editProduct() {
    const [inputCount, setInputCount] = useState(1);
    const [productos, setProductos] = useState<any>(null);
    const [recibo, setRecibo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        async function fetchData(){
            setIsLoading(true)

            let response = await fetch(`/api/recibo-productos/${id}`);
            if(!response.ok) {
                console.error("Error fetching products data");
                window.location.href = "/dashboard/pedidos";
            }
            setProductos(await response.json());


            response = await fetch(`/api/recibos/${id}`);
            if(!response.ok) {
                console.error("Error fetching recibo data");
                window.location.href = "/dashboard/pedidos";
            }
            setRecibo(await response.json()); 


            setIsLoading(false)
        }

        if (!id) {
            window.location.href = "/dashboard/productos";
        }

        fetchData();
    }, []) 


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()


        try {
            const res = await fetch(`/api/recibos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recibo),
            });

            if (!res.ok) throw new Error("Error al actualizar recibo");
            const data = await res.json();
            console.log("recibo actualizado:", data);
        } catch (error) {
            console.error(error);
        }

        window.location.href = "/dashboard/pedidos" 
    };

    if(isLoading){
        return (
            <>
                <div className="mx-auto flex items-center justify-center min-h-screen">
                    <Spinner />
                </div>
            </>
        )
    }


    return (
        <div className="mx-auto w-full lg:max-w-[90%] max-w-[80%] flex flex-col gap-4">
            
            <DataTable  data={productos}/>

            <Label>Total</Label>
            <Input disabled value={recibo?.total?.toLocaleString("es-ES")}></Input>

            <Label>Cliente</Label>
            <Input disabled value={recibo?.usuario_email}></Input>

            <Label className="w-auto ">Dirección</Label>
            <Textarea disabled value={recibo?.direccion}></Textarea>

            <Label>Estado</Label>
            <Select
            value={recibo.estado}
            onValueChange={(value) => {
                setRecibo((prev: any) => ({
                ...prev,
                estado: value,
                }));
            }}
            >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Cancelado">Cancelado</SelectItem>
                <SelectItem value="Preparando">Preparando</SelectItem>
                <SelectItem value="En camino">En camino</SelectItem>
                <SelectItem value="Entregado">Entregado</SelectItem>
            </SelectContent>
            </Select>

            <Button variant="default" onClick={handleSubmit}>Confirmar cambios</Button>
            <Button variant="outline" onClick={(e)=>{
                e.preventDefault()
                window.location.href = "/dashboard/pedidos"}}>Cancelar</Button>
        </div>
    )
}
