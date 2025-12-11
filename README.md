Instalar Homebrew (el instalador de programas para Mac)

Abra la app Terminal. Copie y pegue este comando:

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

Cuando termine, actualícelo:

brew update

Si Homebrew ya estaba instalado, no pasa nada. Continúe.

Instalar Git (para poder clonar el proyecto). En la terminal:

brew install git

Compruebe:

git --version

Instalar Node.js (necesario para ejecutar el servidor)

brew install node

Verifique:

node -v
npm -v

Instalar SQLite (la base de datos)

brew install sqlite

Verificar:

sqlite3 --version

Descargar el proyecto desde GitHub

Abra Terminal

Vaya a su carpeta de Documentos:

cd ~/Documents

Clone el repositorio:

git clone https://github.com/rossbrekker/Proyecto.git

Entre a la carpeta del proyecto:

cd Proyecto

Configurar la base de datos

Dentro del proyecto deberían venir dos opciones:

A) Un archivo llamado db.sqlite (ya creado)

B) Un archivo dump.sql para reconstruir la base

Si el proyecto YA incluye db.sqlite

Para confirmarlo:

ls -l db.sqlite

Si aparece, ya está listo.
No hay nada que reconstruir.

Si NO hay db.sqlite, crearlo desde el dump

En la terminal (dentro de la carpeta del proyecto):

sqlite3 db.sqlite < dump.sql

Esto crea automáticamente la base con tablas y datos.

Verificar que la BD se creó correctamente
sqlite3 db.sqlite "SELECT name FROM sqlite_master WHERE type='table';"

Debe mostrar algo como:

Books
Users

Verificar que los archivos de imágenes están donde deben

La estructura correcta es:

public/
    index.html
    cliente.html
    login.html
    assets/
        1.jpeg
        2.jpeg
        etc...


Si alguna imagen no está en assets, no saldrá en la app.
Si la BD dice que la imagen es .jpeg, debe ser .jpeg.

Instalar dependencias del proyecto

El servidor usa Express y SQLite. Instálalos así:

npm install

Este comando crea automáticamente una carpeta node_modules.

Ejecutar el servidor

En la Terminal, dentro del proyecto:

node server.js

Si todo está bien, verá:

Servidor Express corriendo en http://localhost:3000
Base de datos conectada: db.sqlite

Esto significa que la app ya está funcionando.

Abrir la aplicación en el navegador

Abra Safari, Chrome o Firefox y vaya a:

http://localhost:3000

Abrirá index.html.

Errores comunes en macOS y cómo solucionarlos
 “SQLITE_BUSY: database is locked”

Cierre cualquier programa que tenga abierta db.sqlite, como:

DB Browser for SQLite

TablePlus

DataGrip

Después reinicie el servidor:

Ctrl + C
node server.js

 “command not found: node”

Reinstale node:

brew reinstall node

Las imágenes no aparecen

Revisar:

Están dentro de public/assets/

En la BD el campo image coincide exactamente (ej: 1.jpeg)

“Error: Cannot find module express”

Instalar dependencias:

npm install

Cómo detener el servidor

Presione:

Ctrl + C
