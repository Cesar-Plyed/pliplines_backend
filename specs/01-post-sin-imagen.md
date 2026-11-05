# 01 · POST sin imagen → 400

Repo: BE · Depends on: 00 · Status: next

## Context
`routes.js:47` hace `req.file.buffer` sin verificar si `req.file` existe. Cuando se hace un `POST /new/:type` sin archivo adjunto, `req.file` es `undefined` y se produce un `TypeError: Cannot read properties of undefined (reading 'buffer')` que mata el proceso.

Evidencia: `node --test test/index.js` pasa pero no reproduce el crash real; `curl -X POST http://localhost:3000/new/comida -F "name=t" -F "price=10" -F "desc=t"` sin `-F "image=@..."` → 500 + proceso muere.

## Expected behavior
- `POST /new/comida` sin `image` → HTTP 400 `{ "error": "image is required" }`
- `POST /new/bebida` sin `image` → HTTP 400 `{ "error": "image is required" }`
- El servidor permanece vivo tras la respuesta 400.

## Acceptance criteria
- `curl -X POST http://localhost:3000/new/comida -F "name=t" -F "price=10" -F "desc=t"` sin `image` → HTTP 400, `{"error":"image is required"}`, servidor sigue corriendo.
- `curl -X POST http://localhost:3000/new/bebida -F "name=t" -F "price=10" -F "desc=t"` sin `image` → HTTP 400.
- `npm test` sigue pasando con 2 tests.

## Out of scope
- Validar tipo y tamaño de imagen (eso es spec 02).
- Cambiar `index.js` o `db.js`.

## Verification
```bash
npm test
```
