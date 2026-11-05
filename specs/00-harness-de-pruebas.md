# 00 · Harness de pruebas

Repo: BE · Depends on: — · Status: draft

## Context
`index.js` ejecuta `getData()`, `create()` y `app.listen()` al importarse (side-effects a nivel de módulo). El script `"test"` en `package.json` está vacío (`""`). No hay forma de probar el backend sin arrancar el servidor.

## Expected behavior
- `index.js` exporta `createApp(app)` que configura middleware y rutas en la instancia recibida, pero **no** llama a `listen`.
- `npm test` ejecuta `node --test` (o `node test/index.js`) y pasa.
- Las pruebas usan `DB_PATH=:memory:` (base en memoria, no se escribe disco).

## Acceptance criteria
- `node --test` termina con 0 tests, 0 fallos, 0 error.
- `npm test` no deja `database.sqlite` nuevo ni modificado.
- `createApp()` se puede llamar sin que el servidor arranque.

## Out of scope
- Validar payloads de `POST /new/:type` (eso es spec #01).
- Testear el servidor completo con `supertest` o similar (usamos la API de Express directamente).

## Verification
```bash
DB_PATH=:memory: node --test
```
