# Análise: Requirimentos do sistema
Elaboración do Documento de Requirimentos. 

    a) Descrición xeral do proxecto.
O proxecto está enfocado en desenvolver unha aplicación web para xestionar e reportar incidencias na cidade de Santiago de Compostela. O obxectivo é establecer unha canle eficiente de comunicación entre os cidadáns e o Concello para informar sobre as incidencias detectadas na cidade e facilitar a súa resolución.

    b) Enumerar e indicar unha descrición breve de cada unha das funcionalidades. 
**Reporte de Incidencias**: Permitir aos usuarios reportar incidencias especificando o título, descrición, ubicación e tipo de incidencia.

**Actualización de Incidencias**: Vainos permitir cambiar o estado das incidencias activas, e levar un rexistro das distintas modificacións do seu estado.

**Seguimento de Incidencias**: 
Permitirá aos usuarios consultar as incidencias activas, as cales vanse poder filtrar tanto por fecha de reporte das incidencias (*As últimas incidencias engadidas*) ou por tipo de incidencia (*Alcantarillado, Alumeado público, Medio Viario...*). 
O seguimento vai poder verse por mapa (*Vai incluir un mapa con iconas sobre as incidencias nas coordenadas da incidencia*) ou en lista (*Mostrando un listado dos datos máis importantes sobre as incidencias*).

    c) Requerimentos non funcionais: requerimentos sobre rendemento, seguridade, etc. (Apartado opcional)

    d) Tipos de usuarios.
**Anónimos**: Vai permitir aos usuarios anónimos consultar as incidencias activas na plataforma e comunicar incidencias.
**Administradores**: Van ser capaces de facer as funcions dos anteriores usuarios e a maiores eliminar incidencias e modificar o estado das incidencias. 

    e) Entorno operacional: estimación de plataformas hardware e software necesarias para a implantación.
**Servidores na nube**: Para despregar vamos a necesitar plataformas na nube para poder desprega-la nosa aplicación.
**Bases de Datos**: *Ainda pendiente de que base de datos imos utilizar*. Encargarase de almacenar toda a información coa que vamos a traballar.
**Backend**: *Ainda pendiente de que linguaxe e framework imos utilizar*. Encargarase de facer as consultas á BBDD e devolver os datos en JSON para xestionalos no frontend.
**Frontend**:  *Ainda pendiente de que framework imos utilizar*. Xeneraremos a interface web na que o usuario poderá facer as consultas CRUD á nosa backend. 


    f) Interfaces externos: de usuario, software, hardware. Esta sección describe como interaciona o sistema coa súa contorna, 
    especialmente cos seus usuarios humanos.

**API Xeolocalización**: Vamos utilizar unha api de xeolocalización para poder mostrar as incidencias no mesmo e poder utilizalo para recoller os datos das coordenadas para almacenar a ubicación de estas. 

    g) Melloras futuras: as versións futuras do sistema poderían incorporar melloras.
**Seguimento de Incidencias reportadas**: Permitir aos usuarios consultar o estado de resolución das incidencias reportadas por eles mesmos.
**Xestión de usuarios**: Crear unha plataforma dentro da aplicación para poder xestionar os usuarios creados
**Comunicación por e-mail do estado das incidencias**: Permitir comunicar automáticamente aos usuarios que fagan unha incidencia en canto haxa algunha modificación no estado da incidencia.

