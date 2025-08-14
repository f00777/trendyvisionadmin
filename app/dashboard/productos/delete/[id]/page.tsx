"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useParams } from "next/navigation"
import { use, useEffect, useState } from "react";
import Spinner from "@/components/ads/Spinner";

export default function deleteProduct() {

    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true)

    const params = useParams();
    const id = params.id;

    useEffect(() => {
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
    }, [])


    async function handleDelete() {
        await fetch(`/api/productos/${id}`, {
            method: 'DELETE'
        }) 

        window.location.href = "/dashboard/productos"

    }

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
        <Card className="w-full max-w-sm mt-[20vh] mx-auto">
        <CardHeader>
            <CardTitle>{product && product.nombre}</CardTitle>
            <CardDescription>
            ¿Esta seguro que desea eliminar el producto?
            </CardDescription>
            <CardAction>
            <Button variant="link">ID: {id}</Button>
            </CardAction>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
            <Button onClick={handleDelete} variant="destructive" className="w-full">
            Eliminar
            </Button>
            <Button onClick={()=>{window.location.href= "/dashboard/productos"}} variant="outline" className="w-full">
            Cancelar
            </Button>
        </CardFooter>
        </Card>
    )
}
