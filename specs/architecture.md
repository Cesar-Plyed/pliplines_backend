# Architecture — Pliplines Backend

## Flujo
```
Client (FR)
    │  POST /new/:type  (form-data)
    │  GET  /menu
    ▼
┌───────────────────┐
│  Express.js       │
│  cors, multer,    │
│  router           │
└────────┬──────────┘
         ▼
┌───────────────────┐
│  Node-Cache (TTL  │
│  10 min)          │
└────────┬──────────┘
         ▼
┌───────────────────┐
│  SQLite (BE)      │
│  db.js            │
└───────────────────┘
```

## Componentes
| Módulo | Responsabilidad |
|--------|-----------------|
| `db.js` | Conexión SQLite, schema creation, async query |
| `routes.js` | Rutas `/menu` y `/new/:type`, cache logic |
| `index.js` | Entry point, Express, listen :3000 |

## Decisiones
1. **Form-data vs JSON** → `multer` porque se envía imagen.
2. **BLOB vs URL** → BLOB en SQLite para simplificar.
3. **In-memory cache** → `NodeCache` TTL 10 min, invalida tras `POST`.
4. **No ORM** → SQL puro con `better-sqlite3` (no bloqueante por defecto).
5. **CORS habilitado** → permite peticiones desde dev server.

## Dependencias
`express`, `better-sqlite3`, `multer`, `node-cache`, `cors`, `dotenv`.

## Escalabilidad
- SQLite no escala a alta concurrencia.
- Plan futuro: PostgreSQL/MySQL + S3 para imágenes.
- Caché no es distribuido.
