# Implantación
Despregado mediante a plataforma online render.com. O proxecto está accesible dende o link. https://compostelareporta.me/

# Diagrama de despregue e Diagrama de Compoñentes de software

![Diagrama de despregamento](../img/DiagramaDespregamento.png)

## Servizo Web:
Despregado en render.com:
- Frontend: Vue 3 JS - Javascript
- Backend: Express JS - Node JS

## Servidor BBDD:
Despregado en MongoDB Atlas:
- BBDD: MongoDB

## Servidor Servizo Mapa:
- Leaflet: Obtemos mapa de OpenStreetMap [https://www.openstreetmap.org/](https://www.openstreetmap.org/) a través da API Leaflet.



# Manual técnico

## Manual de posta en produción.

### Opción a: Despregue en render.com e MongoDB Atlas:

#### Prerrequisitos Hardware:
- Ningún hardware específico é necesario, xa que render.com e MongoDB Atlas xestionarán a infraestrutura por ti.

#### Software que Debe ser Instalado:
- Non é necesario instalar ningún software adicional, xa que render.com e MongoDB Atlas teñen as súas propias plataformas e ferramentas en liña.

#### Carga Inicial da BD e/ou Migracións:
- Configura a túa aplicación para conectar con MongoDB Atlas utilizando a URL de conexión fornecida por MongoDB Atlas.
- Se é necesario, realiza a carga inicial dos datos na base de datos MongoDB Atlas desde o teu entorno de desenvolvemento.

#### Altas en Servidores na Nube, Suscricións:
- Crea unha conta en render.com e MongoDB Atlas.
- Configura os teus servizos en render.com para despregar o frontend e o backend da túa aplicación.
- Configura a túa base de datos MongoDB Atlas e asegúrate de establecer as políticas de seguridade adecuadas.

#### Outra Información Necesaria:
- Configura os dominios e os certificados SSL en render.com para garantir a seguridade e a accesibilidade da túa aplicación.
- Realiza probas exhaustivas para asegurarte de que a túa aplicación funcione correctamente no entorno de produción.


### Opción b: Despregue utilizando Docker-compose:

#### Prerrequisitos Hardware:
- Un servidor con recursos suficientes para executar os contedores Docker.

#### Software que Debe ser Instalado:
- Docker e Docker-compose deben estar instalados no servidor.

#### Carga Inicial da BD e/ou Migracións:
- Configura o teu docker-compose para incluír un servizo para a base de datos e realiza a carga inicial dos datos ou migracións necesarias durante o despregue.

#### Altas en Servidores na Nube, Suscricións:
- Podes usar un servidor na nube ou un servidor físico para executar os contedores Docker.
- Configura os recursos de rede e seguridade necesarios no servidor.

#### Outra Información Necesaria:
- Configura os volumes de almacenamento para os contedores Docker para garantir a persistencia dos datos.
- Realiza probas exhaustivas para asegurarte de que a túa aplicación funcione correctamente en contedores Docker no entorno de produción.


## Manual entorno de desenvolvemento.
Manual coa información que necesitará a persoa que teña que realizar modificacións do proxecto no futuro: melloras e/ou corrección de erros.
Indica:
- Prerrequisitos hardware.
- Software que debe ser instalado.
- Estrutura final da BD.
- Descrición do esquema de directorios do proxecto.
- Claves de acceso.
- Outra información que consideres que debe coñecer a persoa que se encargará das tarefas de mantemento desde o punto de vista da programación.


