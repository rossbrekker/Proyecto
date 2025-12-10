const API = '/books';

async function eliminarLibro() {
    const id = document.getElementById("idEliminar").value;
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });

    const data = await res.json();
    const resultado = document.getElementById("resultado");

    if (res.ok) {
        resultado.innerHTML = "Libro eliminado correctamente";
    } else {
        resultado.innerHTML = "Error: " + data.error;
    }
}
