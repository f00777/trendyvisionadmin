# Detener cualquier proceso de Node.js que pueda estar usando .next
Write-Host "Cerrando procesos de Node.js..."
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Esperar medio segundo para liberar archivos
Start-Sleep -Milliseconds 500

# Eliminar la carpeta .next si existe
if (Test-Path ".next") {
    Write-Host "Eliminando carpeta .next..."
    Remove-Item -Recurse -Force ".next"
} else {
    Write-Host "No existe la carpeta .next, nada que borrar."
}

# Iniciar servidor de desarrollo
Write-Host "Iniciando servidor de desarrollo..."
npm run dev
