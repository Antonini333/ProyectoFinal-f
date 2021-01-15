# WisdomShare! :bulb:

La app nace como proyecto final para el bootcamp FSD de GeeksHubs que estoy terminando.
La temática era libre, lo que terminó dando lugar a este proyecto, que intenta humildemente sintetizar lo que más destaco de las (pocas) RR.SS que uso habitualmente, Twitter y Reddit. 


## Comenzando 🚀

_Para poder poner en funcionamiento el proyecto en tu maquina local con propositos de desarrollo y pruebas necesitarás instalar las siguiente dependencias:_

```
npm init -y
npm i sass react-router-dom axios antd react-redux rc-scrollbars

```
_Para ejecutar el programa en tu maquina local:_

```
npm start

```

### Components 📌
- /Navbar:
    - Este componente enlaza a las dos vistas principales (Home y People) y también ofrece la posibilidad de desloguearse.
    
### Containers 📌
- /Register:
    - Desde esta vista el nuevo usuario puede registrar sus datos en nuestra base de datos.

- /Login:
    - En esta vista sólo tenemos que introducir un email y un password previamente registrados. Con esto, se nos concederá un token de acceso y seremos remitidos a Homepage

- /Homepage:
    - Se trata de la vista principal de la app. Por un lado, tenemos nuestro perfil. Muestra toda la información del usuario y permite actualizar ésta misma a través del botón Update Profile.
    Por otro lado, el Timeline. Por defecto muestra todos los posts que existen en nuestra base de datos, pero con el desplegable All Posts, podemos filtrarlos por categoría. El Timeline pasa de ser un recetario de cocina a una página de noticias, ¡en un segundo!.
    También podemos añadir comentarios a los posts que prefiramos, y votar la calidad de su contenido con un WisdomPoint  mediante el botón "+ 1 WP".
    Por último, podemos añadir un nuevo post en la parte inferior, y añadirle una categoría para darle visibilidad y concordancia a nuestros posts.
    
- /People:
    - En esta vista accedemos a una lista de todos los usuarios registrados en la app. Podemos ver sus fotos de perfil, biografías y, además, añadirnos como seguidores de su perfil.

- /UpdateProfile:
    - El botón de "Update Profile" nos lanza a esta vista que consiste en un formulario pre-relleno con nuestra información personal, completamente modificable. Una vez satisfechos, modificamos los datos y nos devuelve a la pantalla principal, Homepage.


## Echa un vistazo a la app en producción 🚀
### Puedes usar esta cuenta de administrador para ver las extra features 

 #### User: admin@admin.com
 #### Password: GeeksHubs!333

* [NETLIFY](https://wisdomshare.netlify.app/)

### Quick peep :eyes:
- #### Register
![](src/img/Register.gif)

- #### Posting
![](src/img/Posting.gif)

- #### Post-Comments
![](src/img/Post-Comments.gif)

- #### Categories
![](src/img/Categories.gif)

- #### Updating Profile
![](src/img/Updating-profile.gif)

- #### People
![](src/img/People.gif)


## Construido con 🛠️

_Tecnologías utilizadas en el proyecto_

- Javascript
- NodeJS
- React
- Redux
- Netlify
- Git
- GitHub
- GitFlow
* [Backend](https://github.com/Antonini333/WisdomShare-b)


## Agradecimientos 🎁

* A GeeksHubs®, por ofrecerme la posibilidad de cambiar mi vida laboral.
* A Sam, mi pareja, por aguantarme y confiar en mí durante todo este proceso. :hearts:
* A mis amigos y familia, por las ausencias y lo monotemático.



---
[Pablo Antonini](https://github.com/Antonini333) 	:fountain_pen:
