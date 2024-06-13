### Building and running your application in local

Para arranca-la aplicación con docker compose executa o seguinte comando na localización de este arquivo :
`docker compose up --build`.

A aplicación frontend estará dispoñible en http://localhost:8080.

- Recorda configurar a ruta correcta do backend no arquivo main.js, localizado na carpeta FrontCompostelaReporta.

A aplicación backend estará dispoñible en http://localhost:3001.

- Recorda usar a plantilla .env_DATAExample localizado na carpeta CompostelaReporta para o teu arquivo .env

A BBDD de Mongo estará dispoñible ca dirección mongodb://mongo:27017/CompostelaReporta

Para exportar datos na BBDD entra no contedor mongo e executa `sh export.sh`
Para importar datos na BBDD entra no contedor mongo e executa `sh import.sh`. Recorda ter o backup na carpeta /scripts/backup/CompostelaReporta e ter o volume correctamente configurado no teu docker-compose.yml
