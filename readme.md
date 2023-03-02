# Iris
## Sistema de gestión de clientes y agenda de proveedores
Proyecto de sistema gestor de clientes de óptica modelo y agenda de proveedores de lentes y armazones

## Uso

`npm install` para instalar los modulos necesarios
`npm run dev` para ejecutar en modo desarrollo

## Estructura

```bash
├── database                    # código backend
│   ├── database.js             # manejador de la base de datos
│   ├── dbBootstrap.js          # configuración de la base de datos
├── electron                    # código necesario para el funcionamiento de electron
│   ├── main.js                 # punto de entrada de electron
│   ├── preload.js              # punto de entrada de electron
├── public                      # archivos de imagenes e iconos
├── src                         # codigo frontend
│   ├── components              # componentes y plantillas
│   ├── views                   # pantallas de la aplicación
│   ├── index.css               # archivo de estilos css
├── index.html                  # 
├── postcss.config.ts           # configuración de postcss para tailwind
├── tailwind.config.ts          # configuración de tailwind
├── vite.config.ts              # configuración de vite
```