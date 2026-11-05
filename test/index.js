import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('createApp', () => {
  it('debe devolver un objeto Express con las rutas /menu y /new/:type registradas', async () => {
    process.env.DB_PATH = ':memory:';

    // Importamos después de setear DB_PATH
    const { createApp } = await import('../src/routes.js');

    const app = createApp();

    // Debe ser un objeto de Express
    assert.ok(app, 'createApp() retorna un objeto');
    assert.ok(
      typeof app.use === 'function',
      'el objeto tiene método .use (es Express)'
    );

    // Verificar que tiene _router (Express interno)
    assert.ok(
      app._router !== undefined,
      'la app tiene _router (Express)'
    );

    // Verificar que las rutas están registradas dentro del router
    const routerLayer = app._router?.stack.find(
      (l) => l.name === 'router'
    );
    const routes = [];
    routerLayer?.handle?.stack?.forEach((layer) => {
      if (layer.route) {
        routes.push({
          method: layer.route.methods,
          path: layer.route.path,
        });
      }
    });

    const hasMenuGet = routes.some(
      (r) => r.method.get && r.path === '/menu'
    );
    const hasNewPost = routes.some(
      (r) => r.method.post && /^\/new\/:type/.test(r.path)
    );

    assert.ok(
      hasMenuGet,
      'debe tener una ruta GET /menu'
    );
    assert.ok(
      hasNewPost,
      'debe tener una ruta POST /new/:type'
    );
  });
});

describe('DB_PATH=:memory: no escribe archivo', async () => {
  it('al importar routes.js con DB_PATH=:memory: no existe database.sqlite en disco', async () => {
    const { existsSync } = await import('node:fs');

    // Verifica que no se creó database.sqlite en la raíz del backend
    assert.ok(
      !existsSync('database.sqlite'),
      'database.sqlite no existe en disco'
    );
  });
});
