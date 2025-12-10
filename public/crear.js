const API = '/books';

async function crearLibro() {
    const datos = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        price: Number(document.getElementById("price").value),
        stock: Number(document.getElementById("stock").value),
        image: document.getElementById("image").value + ".jpeg"
    };

    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    const data = await res.json();
    const resultado = document.getElementById("resultado");

    if (res.ok) {
        resultado.innerHTML = "Libro creado correctamente ";
    } else {
        resultado.innerHTML = "Error: " + data.error;
    }
}
