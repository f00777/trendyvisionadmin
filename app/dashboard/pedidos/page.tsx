"use client"

import { DataTable } from "@/components/data-table-recibos";
import { useEffect, useState } from "react";
import Spinner from "@/components/ads/Spinner";

export default function Pedidos(){
    const [pedidos, setPedidos] = useState<any>([])
    const [loading, setIsLoading] = useState(true)

    useEffect(()=>{
        async function getProducts(){
            try {
                setIsLoading(true)
                const res = await fetch("/api/recibos")
                const p = await res.json()
                setPedidos(p)
                setIsLoading(false)
                console.log(pedidos)
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
        <DataTable data={pedidos} />
        </>
    )
}