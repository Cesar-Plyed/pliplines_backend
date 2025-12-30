# pliplines_backend

Backend API para gestión de menú de comida y bebidas, desarrollado con Express.js y SQLite.

## 🚀 Características

- API RESTful para gestión de menú
- Base de datos SQLite (sin necesidad de servidor de base de datos)
- Sistema de caché para optimizar consultas
- Soporte para subida de imágenes
- CORS habilitado

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o pnpm

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Cesar-Plyed/pliplines_backend.git
cd pliplines_backend
```

2. Instala las dependencias:
```bash
npm install
```

## ⚙️ Configuración

### Base de Datos SQLite

El proyecto utiliza **SQLite** como base de datos. La base de datos se crea automáticamente al iniciar el servidor.

- **Ubicación por defecto**: `database.sqlite` en la raíz del proyecto
- **Configuración personalizada**: Puedes especificar una ruta personalizada creando un archivo `.env`:

```env
DB_PATH=./ruta/personalizada/database.sqlite
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (opcional):

```env
DB_PATH=./database.sqlite
```

> **Nota**: Si no especificas `DB_PATH`, la base de datos se creará automáticamente en `database.sqlite` en la raíz del proyecto.

## 🗄️ Estructura de la Base de Datos

Las tablas se crean automáticamente al iniciar el servidor:

### Tabla `drinks`
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `name` (TEXT NOT NULL)
- `price` (REAL NOT NULL)
- `description` (TEXT)
- `image` (BLOB)

### Tabla `food`
- `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
- `name` (TEXT NOT NULL)
- `price` (REAL NOT NULL)
- `description` (TEXT)
- `image` (BLOB)

## 🚀 Uso

### Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000`

## 📡 Endpoints de la API

### GET `/menu`

Obtiene todos los elementos del menú (comidas y bebidas).

**Respuesta exitosa (200):**
```json
{
  "resultDR": [
    {
      "id": 1,
      "name": "Coca Cola",
      "price": 2.50,
      "description": "Refresco de cola",
      "image": "..."
    }
  ],
  "resultFD": [
    {
      "id": 1,
      "name": "Hamburguesa",
      "price": 8.99,
      "description": "Hamburguesa con queso",
      "image": "..."
    }
  ]
}
```

**Características:**
- Utiliza caché con TTL de 10 minutos
- Retorna datos desde caché si están disponibles

### POST `/new/:type`

Crea un nuevo elemento en el menú.

**Parámetros de ruta:**
- `type`: Tipo de elemento (`bebida` o `comida`)

**Body (form-data):**
- `name` (string, requerido): Nombre del elemento
- `price` (number, requerido): Precio del elemento
- `description` (string, requerido): Descripción del elemento
- `image` (file, requerido): Imagen del elemento

**Ejemplo de uso con cURL:**
```bash
curl -X POST http://localhost:3000/new/bebida \
  -F "name=Coca Cola" \
  -F "price=2.50" \
  -F "description=Refresco de cola" \
  -F "image=@ruta/a/imagen.jpg"
```

**Respuesta exitosa (200):**
```json
{
  "changes": 1,
  "lastInsertRowid": 1
}
```

**Errores:**
- `400`: Campos requeridos faltantes o tipo inválido
- `500`: Error del servidor

## 📁 Estructura del Proyecto

```
pliplines_backend/
├── src/
│   ├── db.js          # Configuración de SQLite y conexión
│   ├── index.js       # Punto de entrada de la aplicación
│   └── routes.js      # Definición de rutas y lógica de negocio
├── database.sqlite    # Base de datos SQLite (se crea automáticamente)
├── package.json
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- **Express.js**: Framework web para Node.js
- **SQLite (better-sqlite3)**: Base de datos embebida
- **Multer**: Middleware para manejo de archivos
- **Node-Cache**: Sistema de caché en memoria
- **CORS**: Habilitación de Cross-Origin Resource Sharing
- **dotenv**: Manejo de variables de entorno

## 📝 Notas

- La base de datos SQLite se crea automáticamente al iniciar el servidor
- Las imágenes se almacenan como BLOB en la base de datos
- El caché se invalida automáticamente al crear nuevos elementos
- El servidor utiliza el puerto 3000 por defecto

## 📄 Licencia

ISC

## 👤 Autor

cesar.plyed