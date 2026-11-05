# Case Study: Adding Image Validation to the Backend

> This document explains the process of adding proper image validation to the Pliplines backend. It follows the 4-part documentation structure.

## Before / After

| Metric | Before | After |
|--------|--------|-------|
| `POST /new/:type` sin image | server crash (500) | returns 400 `{error: "image is required"}` |
| `GET /menu` response size | 714 KB | TBD (no change expected) |
| Unit tests (BE) | 0 | 2 (spec-00, spec-01) |
| `npm test` time | — | ~0.15 s |

## Git Diff Summary

- `src/routes.js` — added `req.file` guard before reading buffer
- `specs/01-post-sin-imagen.md` — new acceptance criteria
- `scripts/repro.sh` — curl commands to reproduce the bug

## Short ADRs (Architecture Decision Records)

### ADR-01: Images stored as BLOB instead of disk path
**Decision:** Keep images as binary BLOB in SQLite.
**Rationale:** Simpler deployment — no need to manage file storage or CDN URLs during early development. Trade-off: DB file grows quickly with many images.
**Future:** Evaluate migration to S3 or local filesystem with URL references.

### ADR-02: MUI kept for form components
**Decision:** Keep `@mui/material` for `Select`, `MenuItem`, and `TextField` in the new-item form.
**Rationale:** Saves ~2 days of custom CSS. Trade-off: bundle adds ~120 KB gzipped.
**Alternative considered:** Custom CSS + native HTML select. Rejected due to time cost.

### ADR-03: Multer middleware stays at route level
**Decision:** Keep `multer()` inline with the route handler instead of creating a global middleware.
**Rationale:** Only `POST /new/:type` needs file upload; other routes use `req.body`. Simpler to read.
**Future:** Extract to `middleware/upload.js` if more routes need it.

## AI Usage

Copilot helped write the initial `req.file` validation check. I verified:
- The guard covers both `undefined` and `null` cases (Mongoose-style check)
- The 400 response format matches the existing error style in `routes.js`
- No other code path reads `req.file` without the guard (confirmed with `grep`)

The `scripts/repro.sh` script was also suggested by Copilot — I adjusted the curl commands to match the actual environment variables.

## Links

- [Spec 01](../specs/01-post-sin-imagen.md)
- [API docs](../specs/api.md)
- [DB schema](../specs/db-schema.md)
- [Architecture](../specs/architecture.md)
