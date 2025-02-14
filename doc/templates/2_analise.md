# Análise: Requirimentos do sistema
Este documento describe os requirimentos para ***Compostela Reporta*** especificando que funcionalidade ofrecerá e de que xeito.

## a) Descrición xeral do proxecto.
O proxecto está enfocado en desenvolver unha aplicación web para xestionar e reportar incidencias na cidade de Santiago de Compostela. O obxectivo é establecer unha canle eficiente de comunicación entre os cidadáns e o Concello para informar sobre as incidencias detectadas na cidade e facilitar a súa resolución.

## b) Enumerar e indicar unha descrición breve de cada unha das funcionalidades. 
| Funcionalidade                       | Descrición                                                            |
|--------------------------------------|-----------------------------------------------------------------------|
| 1) Crear incidencia                  | *Usuarios crean as incidencias na BBDD*                               |
| 2) Consulta de incidencias           | *Usuarios e Administrador: Consultar e filtrar as incidencias na BBDD*|
| 3) Filtrar incidencias               | *Usuarios e Administrador: Filtrar as incidencias na BBDD*            |
| 4) Actualización de incidencias      | *Administrador actualiza estado das incidencias na BBDD*              | 
| 5) Eliminar incidencias              | *Administrador pode eliminar incidencias na BBDD*                     |

- **1. Crear incidencia**: Permitir aos usuarios reportar incidencias especificando o título, descrición, ubicación e tipo de incidencia.

- **2. Consulta de Incidencias**: 
Permitirá aos usuarios consultar as incidencias activas. Podráse consultar as últimas incidencias creadas en xeral ou permitirá aos usuarios consultar as incidencias xeradas por eles (*Non vai ser necesario crear usuario, xerarase un código hash xerado pola IP que se mostrará ao creador da incidencia para poder consultar as súas incidencias no futuro*).

- **3. Filtrar Incidencias**: 
Permitirá aos usuarios filtrar as incidencias a consultar tanto por fecha de reporte das incidencias (*As últimas incidencias engadidas*) ou por tipo de incidencia (*Alcantarillado, Alumeado público, Medio Viario...*). 
O seguimento vai poder verse por mapa (*Vai incluir un mapa con iconas sobre as incidencias nas coordenadas da incidencia*) ou en lista (*Mostrando un listado dos datos máis importantes sobre as incidencias*).

- **4. Actualización de Incidencias**: Vainos permitir cambiar o estado das incidencias activas (Nova, Revisada, Resolvendo, Correxida), e levar un rexistro das distintas modificacións do seu estado.

- **5. Eliminar incidencias**:
Permitirá aos administradores poder eliminar unha incidencia.

## c) Tipos de usuarios.
- **Anónimos**: Vai permitir aos usuarios anónimos consultar as incidencias activas na plataforma e comunicar incidencias.
- **Administradores**: Van ser capaces de facer as funcions dos anteriores usuarios e a maiores eliminar incidencias e modificar o estado das incidencias. 

## d) Entorno operacional: estimación de plataformas hardware e software necesarias para a implantación.
- **Servidores na nube**: Para despregar vamos a necesitar plataformas na nube para poder desprega-la nosa aplicación.
- **Bases de Datos**: *MongoDB*. Encargarase de almacenar toda a información coa que vamos a traballar. Paréceme interesante usar MongoDB porque ten o tipo de datos GeoJSON que nos permitirá facer consultas máis completas e eficientes *xerando índices espaciais*.
- **Backend**: *Express JS*. Implementaremos un API Rest. Encargarase de facer as consultas á BBDD e devolver os datos en JSON para xestionalos no frontend.
- **Frontend**:  *Vue JS*. Xeneraremos a interface web na que o usuario poderá facer as consultas CRUD á nosa backend. 

## e) Interfaces externos: de usuario, software, hardware. Esta sección describe como interaciona o sistema coa súa contorna, especialmente cos seus usuarios humanos.

- **API Xeolocalización**: Vamos utilizar unha api de xeolocalización para poder mostrar as incidencias no mesmo e poder utilizalo para recoller os datos das coordenadas para almacenar a ubicación de estas. 

## f) Melloras futuras: as versións futuras do sistema poderían incorporar melloras.
- **Seguimento de Incidencias reportadas**: Permitir aos usuarios consultar o estado de resolución das incidencias reportadas por eles mesmos.
- **Xestión de usuarios**: Crear unha plataforma dentro da aplicación para poder xestionar os usuarios creados
- **Comunicación por e-mail do estado das incidencias**: Permitir comunicar automáticamente aos usuarios que fagan unha incidencia en canto haxa algunha modificación no estado da incidencia.
- **Validación das incidencias**: Facer que o Administrador sexa o encargado de revisar e confirmar que a incidencia é correcta e aceptala para incluila no noso listado.

