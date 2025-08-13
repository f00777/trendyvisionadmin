"use client";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import Spinner from "@/components/ads/Spinner";
import { Button } from "@/components/ui/button";

export default function editProduct() {
    const [inputCount, setInputCount] = useState(1);
    const [product, setProduct] = useState<any>(null);
    const [files, setFiles] = useState<(File | null)[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    const params = useParams();
    const id = params.id;

    /* useEffect(() => {
        async function fetchData(){
            setIsLoading(true)
            const response = await fetch(`/api/productos/${id}`);
            if(!response.ok) {
                console.error("Error fetching product data");
                window.location.href = "/dashboard/productos";
            }

            console.log("response", response);

            setProduct(await response.json());
            setIsLoading(false)
        }

        if (!id) {
            window.location.href = "/dashboard/productos";
        }

        fetchData();
    }, []) */

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
        const formData = new FormData();
        files.forEach((file) => {
            if (file) formData.append("images", file);
        });

        if(!id){
            return;
        }
        formData.append("id", String(id));
        
        const res = await fetch("/api/upload-images", {
        method: "POST",
        body: formData,
        });

        const data = await res.json();
        console.log("Respuesta del servidor:", data);

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
            <Input></Input>

            <Label>Inventario</Label>
            <Input></Input>

            <Label>Descripción</Label>
            <Input></Input>

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
