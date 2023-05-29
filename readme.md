# Iris
## Sistema de gestión de clientes y agenda de proveedores
Proyecto de sistema gestor de clientes de óptica modelo y agenda de proveedores de lentes y armazones.

## Uso

`npm install` para instalar los modulos necesarios.  
`npm run dev` para ejecutar en modo desarrollo.  
`npm run prod` para ejecutar en modo producción.  
`npm run build` para construir los modulos de la aplicación.  
`npm run electron:build` para empaquetar la aplicación.  

## Estructura

```bash
├── core                        # código backend
│   ├── database                # conexión a la base de datos
│   │   ├── models              # modelos de entidades de la base de datos
│   │   ├── database.js         # manejador de la base de datos
│   ├──electron                 # código necesario para el funcionamiento de electron
│   │   ├── main.js             # punto de entrada de electron
│   │   ├── preload.js          # punto de entrada de electron
│   ├──model                    # modelos de la base de datos
│   ├──DAO                      # objetos de acceso a datos
│   ├──service                  # proveedor de servicio de datos
│   ├──validation               # validación de datos 
├── public                      # archivos de imagenes e iconos
├── src                         # codigo frontend
│   ├── components              # componentes y plantillas
│   ├── views                   # pantallas de la aplicación
│   ├── index.css               # archivo de estilos css
│   ├── main.tsx                # archivo principal de react
│   ├── util.ts                 # utilidades varias
├── test                        # pruebas varias
├── index.html                  # 
├── jest.config.js              # configuración de pruebas con jest
├── postcss.config.ts           # configuración de postcss para tailwind
├── tailwind.config.ts          # configuración de tailwind
├── vite.config.ts              # configuración de vite
```
