import { DataTable } from "@/components/data-table-productos";
import data from "./data-productos.json";

export default function Productos(){


    return (
        <DataTable data={data} tabname={"Producto"} columnas={undefined} />
    )
}