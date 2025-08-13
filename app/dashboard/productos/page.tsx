"use client"

import { DataTable } from "@/components/data-table-productos";
import { useEffect, useState } from "react";
import Spinner from "@/components/ads/Spinner";

export default function Productos(){
    const [products, setProducts] = useState<any>([])
    const [loading, setIsLoading] = useState(false)

    useEffect(()=>{
        async function getProducts(){
            try {
                setIsLoading(true)
                const res = await fetch("/api/productos")
                const p = await res.json()
                setProducts(p)
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                console.log(error)
            }
        }

        getProducts()
    }, [])

    if(loading){
        return(
        <>
            <div className="mx-auto flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        </>
        )
    }

    return (
        <>
        <DataTable data={products} tabname={"Producto"} columnas={undefined} />
        </>
    )
}