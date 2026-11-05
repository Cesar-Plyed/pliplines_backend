# 01 · POST without image

## Context
Today the server crashes when `POST /new/:type` is called without an image file. The `req.file` property is `undefined` and the code tries to read `req.file.buffer` without checking, causing an unhandled exception.

## Expected behavior
Returns `400 Bad Request` with a JSON body:
```json
{ "error": "image is required" }
```
The server stays alive after this response.

## Acceptance criteria
- `POST /new/comida` without `image` file → HTTP 400, server still running
- `POST /new/comida` with a valid `image` file → HTTP 200, row inserted
- `POST /new/bebida` without `image` file → HTTP 400, server still running

## Out of scope
- Validate image type and size (covered in spec 02)
- Handle missing `name` or `price` fields (already handled elsewhere)

## Implementation hint
Add a guard at the start of the route handler:
```js
if (!req.file) {
  return res.status(400).json({ error: "image is required" });
}
```
