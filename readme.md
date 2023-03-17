# Iris
## Sistema de gestión de clientes y agenda de proveedores
Proyecto de sistema gestor de clientes de óptica modelo y agenda de proveedores de lentes y armazones

## Uso

`npm install` para instalar los modulos necesarios  
`npm run dev` para ejecutar en modo desarrollo  
`npm run build` para construir los modulos de la aplicación  
`npm run electron:build` para empaquetar la aplicación  

## Estructura

```bash
├── database                    # código backend
│   ├── models                  # modelos de entidades de la base de datos
│   ├── database.js             # manejador de la base de datos
├── electron                    # código necesario para el funcionamiento de electron
│   ├── main.js                 # punto de entrada de electron
│   ├── preload.js              # punto de entrada de electron
├── public                      # archivos de imagenes e iconos
├── src                         # codigo frontend
│   ├── components              # componentes y plantillas
│   ├── views                   # pantallas de la aplicación
│   ├── index.css               # archivo de estilos css
│   ├── main.tsx                # archivo principal de react
├── index.html                  # 
├── postcss.config.ts           # configuración de postcss para tailwind
├── tailwind.config.ts          # configuración de tailwind
├── vite.config.ts              # configuración de vite
```