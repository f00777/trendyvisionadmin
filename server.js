// server.js
import express from 'express';
import next from 'next';
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __filename y __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Forzamos producción
const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middleware para servir la carpeta de uploads
  server.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

  // Todas las demás rutas las maneja Next.js
  server.all('*', (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running in production on http://localhost:${port}`);
  });
});
