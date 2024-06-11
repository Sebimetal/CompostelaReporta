# Codificación e Probas

# Prototipos realizados

## Review 1

**Data de entrega:** " 01/05/2024 "

**Descrición:**

Back-End:

    Funcións CRUD máis xenericas creadas. Schemas para a nosa BBDD implantadas.

Front-End:

    Mainpage na que se mostran as incidencias creadas tanto no mapa como en listado.
    Páxina con formulario para crear incidencia.

### Retos e Innovación

#### Reto 1:

MongoDB: Dado o meu escaso coñecemento en bases de datos non relacionais, o principal desafío foi a comprensión da documentación sobre a modelaxe de datos nestes contextos. Inicialmente, abordei a estruturaión da base de datos seguindo un enfoque relacional para obter unha visión xeral dos requisitos de datos para este proxecto. Posteriormente, adaptei a estrutura para cumprir cos estándares dunha base de datos non relacional.

#### Reto 2:

NodeJS / Express JS: O principal desafío residía na comprensión da estruturacíon de proxectos nesta linguaxe, incluíndo a distribución de funcionalidades entre os distintos compoñentes (controladores, modelos, etc.) para facer unha arquitectura sólida, garantindo unha boa mantibilidade e escalabilidade do código.

## Review 2

**Data de entrega:** " 19/05/2024 "

**Descrición:**

Back-End:

    Implantada a solicitude á API para recoller a dirección polas coordenadas a back ao crear unha nova incidencia en vez de cargalas no front.

Front-End:

    Podemos ver cada incidencia específicamente. Podemos crear incidencias. Podemos elimina-las incidencias. ONGOING: Boton editar incidencia.

Despregue:

    Temos creados Dockerfile para front como para backend e docker-compose.yaml para crear os contenedores de front con NGINX, back e mongodb. É posible despregar en local o código descargandoo, cambiando o nome de /CompostelaReporta/.env_DATAExample a .env e usando docker compose con "docker compose up --build" na carpeta inicial podemos entrar en localhost:8080 directamente para acceder a nosa aplicación.

    Tamén está despregado actualmente en https://compostelareporta.me/. Tanto front como back están despregados en render, mentres que MongoDB utilizamos o propio Atlas que é o cloud propio de MongoDB. Hai que ter en conta que ao ser un servizo gratuito, é posible que tarde en cargar xa que se non recibe peticións suele poñerse en modo standby e tarda uns 50 segundos en reactivarse cando recibe unha petición.

### Retos e Innovación

#### Reto 1:

Neste review, o maior reto foi o despregue do mesmo, consumin a maior parte do tempo que dediquei ao proxecto a esto xa que sabía que me iba a levar tempo ter todo despregado sen problema e prefería telo adiantado.

A miña idea era despregar tanto front como back no mesmo servizo, vercel para front é facil o despregue, ao parecer permite tamén facer o despregue de back de node pero non fun capáz de que fora funcional. Intentei despregar con docker na máquina virtual de oracle que xa habíamos utilizado na materia de Despregamento pero tiña o mesmo problema que tiña ao intentar desplegar Prestashop, a máquina non cumple os requisitos mínimos e ao intentar despregalo queda bloqueada.

Finalmente investigando online algunha plataforma que nos permitise o despregamento gratuito e sen necesidade de incluir ningún método de pago. Optei por render.com despois de visitar varios como Heroku (Solicita método de pago) ou cyclic que están dende o día 10/05/2024 sen permitir crear ningunha conta nova e a partir do 31/05/2024 eliminan o seu plan free.

## Review 3

**Data de entrega:** " 12/06/2024 "

**Descrición:**

Back-End:

    Implantados novos métodos de filtrado para solicitudes dende o front con varios filtros puidendo filtrar por un, varios ou ningún dos filtros.

Front-End:

    Tódolos compoñentes implantados. Formateo de cada un dos compoñentes con Bootstrap 5 e inserción de iconas propias e iconas da librería font awesome. Solicitude as coordenadas da localización do usuario para introducir as coordenadas automáticamente ao crear unha nova incidencia.

Despregue:

Arranxado problema de Nginx coa funcionalidade de RouterView de Vue 3 JS.

### Retos e Innovación

#### Reto 1:

Ao utilizar RouterView para o cambio entre compoñentes na aplicación front, as rutas establecidas no front non eran compatibles con Nginx e devolvía erro 404 not found en vez de redireccionar ao compoñente. O maior problema era saber como poder configurar este servidor na propia plataforma de despregue. Solventado finalmente configurando o arquivo Dockerfile introducindo o arquivo de configuración como un volume.

#### Reto 2:
    
Revisión do código, a refactorización e a comprobación da usabilidade da páxina web ao modificar o deseño. 
Ao querer mover botóns a compoñentes diferentes dos inicialmente previstos para a súa funcionalidade, tiven que modificar os compoñentes e comunicar os cambios mediante props/emits, de xeito que enviasen o novo estado ao compoñente funcional.

#### Reto 3:
    
Autenticación e Autorización.
Durante o desenvolvemento da funcionalidade de filtrado, foi necesario implementar mecanismos de autenticación e autorización para garantir que só os usuarios autorizados puideran acceder e utilizar certas funcións de filtrado. Isto implicou a integración de JWT (JSON Web Tokens) no back-end e a configuración do front-end para manexar tokens de forma segura.