const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 3000;

console.log(path.join(__dirname, "db.sqlite"));

app.get("/", (req, res) => {
    res.redirect("/index.html");
});


app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const db = new sqlite3.Database(
    path.join(__dirname, "db.sqlite"),
    sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) {
            console.error(" Error al conectar a la base de datos:", err.message);
        } else {
            console.log(" Base de datos conectada: db.sqlite");
        }
    }
);

app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const query =
        "SELECT id, title, author, price, image, stock FROM Books WHERE id = ?";

    db.get(query, [bookId], (err, row) => {
        if (err) {
            console.error("Error en DB:", err.message);
            return res.status(500).json({ error: "Error en la base de datos." });
        }
        if (!row) {
            return res.status(404).json({ error: `Libro con ID ${bookId} no encontrado.` });
        }
        return res.json(row);
    });
});

app.post("/books", (req, res) => {
    console.log("RECIBIDO EN POST:", req.body);
    const { title, author, price, image, stock } = req.body;

    if (!title || !author || !price) {
        return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    let finalImage = image || "";
    if (finalImage && !finalImage.endsWith(".jpeg")) {
        finalImage = finalImage + ".jpeg";
    }

    const query = `
        INSERT INTO Books (title, author, price, image, stock) 
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(query, [title, author, price, finalImage, stock || 0], function (err) {
        if (err) {
            console.error("Error al insertar:", err.message);
            return res.status(500).json({ error: "No se pudo insertar el libro." });
        }

        return res.json({
            message: "Libro creado exitosamente.",
            id: this.lastID
        });
    });
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;

    const query = "DELETE FROM Books WHERE id = ?";

    db.run(query, [bookId], function (err) {
        if (err) {
            console.error("Error al eliminar:", err.message);
            return res.status(500).json({ error: "No se pudo eliminar el libro." });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: "No existe un libro con ese ID." });
        }

        return res.json({ message: "Libro eliminado con éxito." });
    });
});

app.listen(PORT, () => {
    console.log(` Servidor Express corriendo en http://localhost:${PORT}`);
});
