# Iris
## Sistema de gestión de clientes y agenda de proveedores
Proyecto de sistema gestor de clientes de óptica modelo y agenda de proveedores de lentes y armazones

## Uso

`npm install` para instalar los modulos necesarios
`npm run dev` para ejecutar en modo desarrollo

## Estructura

```bash
├── public                      # archivos de imagenes e iconos
├── database                    # código backend
│   ├── database.js             # configuración de la base de datos
├── electron                    # código necesario para el funcionamiento de electron
│   ├── main.js                 # punto de entrada de electron
│   ├── preload.js              # punto de entrada de electron
├── src                         # codigo frontend
│   ├── components              # componentes y plantillas
│   ├── index.css               # archivo de estilos css
├── index.html                  # 
├── postcss.config.ts           # configuración de postcss para tailwind
├── vite.config.ts              # configuración de tailwind
├── vite.config.ts              # configuración de vite
```