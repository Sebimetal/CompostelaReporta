# Implantación

Despregado mediante a plataforma online render.com. O proxecto está accesible dende o link. https://compostelareporta.me/

# Diagrama de despregue e Diagrama de Compoñentes de software

![Diagrama de despregamento](../img/DiagramaDespregamento.png)

## Servizo Web:

Despregado en render.com:

| Servicio Web | Linguaxes / Frameworks |
| ------------ | ---------------------- |
| Frontend     | Vue 3 JS - JavaScript  |
| Backend      | Express JS - Node JS   |

## Servidor BBDD:

Despregado en MongoDB Atlas:

- Base de datos: MongoDB

## Servidor Servizo Mapa:

- Leaflet: Obtemos mapa de OpenStreetMap [https://www.openstreetmap.org/](https://www.openstreetmap.org/) a través da API Leaflet.

# Manual técnico

## Manual de posta en produción.

## Pasos comúns

- Primeiro paso é acceder a **CompostelaReporta/.env_DATAExample** e modificar o nome para .env. Despois modifica-los datos para que utilice este .env para a nosa aplicación back-end. Por defecto está configurada a URI da nosa BBDD despregada en Docker.

_Contido do .env_DATAEXAMPLE_

```
DBUSERNAME=NomeDeUsuarioBaseDeDatos
DBPASSWORD=ContrasinalDaBaseDeDatos
MONGODB_URI=mongodb://mongo:27017/CompostelaReporta
PORT=3001
JWT_SECRET=tokenSecreto
```

- Segundo paso é acceder a **FrontCompostelaReporta/main.js** aquí temos unha variable coa URL do backend con un provide para que sexa accesible a tódolos compoñentes da nosa aplicación (Localizado nas _liñas 81 e 84_). Están configurado na liña 81 a URL para o uso do contedor docker en local e a liña 84 coa URL despregada en render.com.

_Contido do main.js liña 81_

```
app.provide('backendServerAddress', 'http://localhost:3001');
```

### Opción a: Despregue en render.com e MongoDB Atlas:

#### Prerrequisitos Hardware:

- Ningún hardware específico é necesario, xa que render.com e MongoDB Atlas xestionarán a infraestrutura por ti.

#### Software que Debe ser Instalado:

- Non é necesario instalar ningún software adicional, xa que render.com e MongoDB Atlas teñen as súas propias plataformas e ferramentas en liña.

#### Carga Inicial da BD e/ou Migracións:

- Configura a túa aplicación para conectar con MongoDB Atlas utilizando a URL de conexión fornecida por MongoDB Atlas.
- Se é necesario, realiza a carga inicial dos datos na base de datos MongoDB Atlas desde o teu entorno de desenvolvemento. Polo que vin non hai forma de facelo na propia aplicación polo que deberías ter instalado o MongoDB Database Tools no teu contorno e utiliza-lo seguinte código para exportar:

```
  mongodump --uri "mongodb+srv://<username>:<password>@<cluster-address>/<database-name>" --out /path/to/backup
```

- E o seguinte para importar:

```
  mongorestore --uri="mongodb+srv://<username>:<password>@<cluster>/<database>" <path_to_dump_directory>
```

#### Altas en Servidores na Nube, Suscricións:

- Crea unha conta en render.com e MongoDB Atlas.
- Configura os teus servizos en render.com para despregar o frontend e o backend da túa aplicación. Simplemente terás que acceder coa tua conta de Git (por exemplo GitHub) e importar os repositorios en render.com. Render detectará automáticamente os Dockerfile de cada un dos repositorios e utilizaraos para configurar e desprega-los servizos.
- En Render tamén podrás configura-lo dominio que desexes utilizar para redirixilo á túa aplicación.

- Configura a túa base de datos MongoDB Atlas e asegúrate de establecer as políticas de seguridade adecuadas.

#### Outra Información Necesaria:

- Configura os dominios en render.com para garantir a seguridade e a accesibilidade da túa aplicación. En canto aos certificados SSL render.com xestionase automáticamente.

### Opción b: Despregue utilizando Docker-compose:

#### Prerrequisitos Hardware:

- Un servidor con recursos suficientes para executar os contedores Docker.

#### Software que Debe ser Instalado:

- Docker e Docker-compose deben estar instalados no servidor.

#### Carga Inicial da BD e/ou Migracións:

- Utiliza o arquivo docker-compose.yaml que está na carpeta base do código do proxecto para cargar os contenedores. **Recorda de modifica-las rutas dos volumes se cambias a estructura das carpetas do proxecto subido.**

- En canto estén os contenedores activos, accede ao docker de mongo e executa o comando `sh import.sh`. Recollerá o backup da carpeta _scripts/backup_ e importaraos á base de datos do noso MongoDB desplegado en Docker.

#### Altas en Servidores na Nube, Suscricións:

- Podes usar un servidor na nube ou un servidor físico para executar os contedores Docker.
  Para executar os contedores Docker simplemente terás que usa-lo comando:

```bash
  docker-compose up --build
```

- Configura os recursos de rede e seguridade necesarios no servidor.

#### Outra Información Necesaria:

- _Configura os volumes de almacenamento_ para os contedores Docker para garantir a persistencia dos datos no servidor.
- Recorda utilizar o script `sh export.sh` para exportar unha copia das coleccións da base de datos do contedor.

## Manual entorno de desenvolvemento.

Manual coa información que necesitará a persoa que teña que realizar modificacións do proxecto no futuro: melloras e/ou corrección de erros.
Indica:

- Prerrequisitos hardware.
- Software que debe ser instalado.
- Estrutura final da BD.
- Descrición do esquema de directorios do proxecto.
- Claves de acceso.
- Outra información que consideres que debe coñecer a persoa que se encargará das tarefas de mantemento desde o punto de vista da programación.
