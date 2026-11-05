# API — Pliplines Backend

## Base URL
```
http://localhost:3000
```

## GET /menu
Obtiene bebidas y comidas del menú.

**Response (200):**
```json
{
  "resultDR": [{ id, name, price, description, image }],
  "resultFD": [{ id, name, price, description, image }]
}
```

> ⚠️ Usa caché memoria TTL 10 min. Primera llamada carga de DB, siguientes caché.

## POST /new/:type
Crea ítem del menú. `type` = `"bebida"` o `"comida"`.

**Body (form-data):** `name`, `price`, `description`, `image`

**Response 200:** `{ "changes": 1, "lastInsertRowid": 1 }`

**Errors:**
- 400 → campos faltantes o tipo inválido
- 500 → error DB

## Plan (No Implementados)
| Endpoint | Method | Desc |
|----------|--------|------|
| `/menu/:id` | GET | Obtener ítem por ID |
| `/menu/:id` | PUT | Actualizar ítem |
| `/menu/:id` | DELETE | Eliminar ítem |
| `/auth/login` | POST | Login admin |
| `/auth/verify` | GET | Verificar token |
