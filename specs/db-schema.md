# Base de Datos — Pliplines Backend

## Motor: SQLite (better-sqlite3)
- Archivo: `database.sqlite` en raíz del proyecto.
- Creación automática al iniciar `index.js`.

## Tablas

### `drinks`
| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| id | INTEGER | PK AUTOINCREMENT | ID único |
| name | TEXT | NOT NULL | Nombre producto |
| price | REAL | NOT NULL | Precio USD |
| description | TEXT | NULLABLE | Descripción |
| image | BLOB | NULLABLE | Imagen binaria |

### `food` — misma estructura que `drinks`.

## Índices Actuales: solo PK implícita.

## Plan de Mejoras
- [ ] Índice en `name` para búsquedas.
- [ ] Columna `created_at` (DATETIME, CURRENT_TIMESTAMP).
- [ ] Columna `updated_at`.
- [ ] Evaluar migrar BLOB → URL (S3/local) para reducir tamaño DB.
- [ ] Tabla `users` para auth futura.
- [ ] Tabla `orders` para pedidos.

## Query Helper (db.js)
```js
const [rows] = await query("SELECT * FROM drinks WHERE name = ?", [name]);
const [result] = await query("INSERT INTO food (...) VALUES (?, ?, ?, ?)", [a,b,c,d]);
```
- `[result]` → array de filas (SELECT) u objeto `{changes,lastInsertRowid}`.
- Usa `setImmediate` para no bloquear event loop.

## Consideraciones
- Foreign keys ON (`PRAGMA foreign_keys = ON`).
- Sin migraciones — `CREATE TABLE IF NOT EXISTS`.
- Sin validación de schema (raw SQL).
