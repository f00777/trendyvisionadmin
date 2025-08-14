"use client";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Spinner from "@/components/ads/Spinner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"

export default function editProduct() {
    const [inputCount, setInputCount] = useState(1);
    const [product, setProduct] = useState<any>({
        nombre: "",
        inventario: "",
        precio: 0,
        descripcion: ""
    });
    const [files, setFiles] = useState<(File | null)[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = (index: number, file: File | null) => {

        const updated = [...files];
        updated[index] = file;
        setFiles(updated);

        // Si el archivo existe y es el último input, agregamos uno nuevo
        if (file && index === inputCount - 1) {
            setInputCount((prev) => prev + 1);
        }
    }; 


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()

        try {
            let res = await fetch(`/api/productos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
            });

            if (!res.ok) throw new Error("Error al crear producto");
            let data = await res.json();
            
            
            const formData = new FormData();
            files.forEach((file) => {
                if (file) formData.append("images", file);
            });

            if(!data.producto.id){
                return;
            }
            formData.append("id", String(data.producto.id));
            
            res = await fetch("/api/upload-images", {
            method: "PUT",
            body: formData,
            });

            data = await res.json();
            console.log("Respuesta del servidor:", data);

        } catch (error) {
            console.error(error);
        }

        window.location.href = "/dashboard/productos"
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
        <form className="mx-auto w-full lg:max-w-[60%] max-w-[80%] flex flex-col gap-4">
            <Label>Nombre</Label>
            <Input value={product?.nombre} onChange={(e)=>{
                setProduct((prev:any)=>({
                    ...prev,
                    nombre: e.target.value
                }))
            }}></Input>

            <Label>Precio</Label>
            <Input type="number" value={product?.precio} onChange={(e)=>{
                setProduct((prev:any)=>({
                    ...prev,
                    precio: e.target.value
                }))
            }}></Input>

            <Label>Inventario</Label>
            <Input type="number" value={product?.inventario} onChange={(e)=>{
                setProduct((prev:any)=>({
                    ...prev,
                    inventario: e.target.value
                }))
            }}></Input>

            <Label>Descripción</Label>
            <Textarea  value={product?.descripcion} onChange={(e)=>{
                setProduct((prev:any)=>({
                    ...prev,
                    descripcion: e.target.value
                }))
            }}>

            </Textarea>

            {Array.from({ length: inputCount }).map((_, index) => (
                <div key={index}>
                    <Label>
                        Seleccione una imagen
                    </Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                        handleFileChange(index, e.target.files?.[0] || null)
                        }
                    />
                </div>
            ))}


            <Button variant="default" onClick={handleSubmit}>Confirmar cambios</Button>
            <Button variant="outline" onClick={(e)=>{
                e.preventDefault()
                window.location.href = "/dashboard/productos"}}>Cancelar</Button>
        </form>
    )
}
