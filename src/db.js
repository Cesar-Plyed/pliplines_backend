import "dotenv/config.js";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear o conectar a la base de datos SQLite
const dbPath = process.env.DB_PATH || join(__dirname, "../database.sqlite");
export const db = new Database(dbPath);

// Habilitar foreign keys
db.pragma("foreign_keys = ON");

// Crear tablas si no existen
db.exec(`
  CREATE TABLE IF NOT EXISTS drinks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image BLOB
  );

  CREATE TABLE IF NOT EXISTS food (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image BLOB
  );
`);

console.log("Conexión exitosa a la base de datos SQLite");

// Función helper para ejecutar consultas de forma asíncrona
// Usa setImmediate para no bloquear el event loop
export const query = async (sql, params = []) => {
  return new Promise((resolve, reject) => {
    setImmediate(() => {
      try {
        const sqlUpper = sql.trim().toUpperCase();
        const stmt = db.prepare(sql);
        
        if (sqlUpper.startsWith("SELECT")) {
          const result = params.length > 0 ? stmt.all(params) : stmt.all();
          resolve([result]);
        } else {
          const result = params.length > 0 ? stmt.run(params) : stmt.run();
          resolve([result]);
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};
