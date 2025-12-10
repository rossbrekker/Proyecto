const API_BASE_URL = '/books';

async function buscarLibro() {
    const libroId = document.getElementById('libroId').value;
    const contenedor = document.getElementById('ContenedorLibro');

    if (!libroId || isNaN(parseInt(libroId))) {
        contenedor.innerHTML = '<p class="error"> Por favor, introduce un ID válido.</p>';
        return;
    }

    contenedor.innerHTML = `<p class="loading">Cargando datos del libro ID: ${libroId}...</p>`;

    try {
        const response = await fetch(`${API_BASE_URL}/${libroId}`);
        const data = await response.json();

        if (!response.ok) {
            contenedor.innerHTML = `<p class="error"> ${data.error}</p>`;
            return;
        }

        renderizarLibro(data, contenedor);

    } catch (error) {
        console.error('Error de red:', error);
        contenedor.innerHTML = `<p class="error"> No se pudo conectar al servidor.</p>`;
    }
}

function renderizarLibro(libro, contenedor) {

    const imgSrc = libro.image && libro.image.trim() !== ""
        ? libro.image
        : "https://placehold.co/200x300/333/fff?text=Sin+Imagen";

    contenedor.innerHTML = `
        <div class="libro-detalle">
            <img src="${imgSrc}"
                 alt="Portada de ${libro.title}"
                 class="book-image">

            <div class="info">
                <h2>${libro.title}</h2>
                <p><strong>Autor:</strong> ${libro.author}</p>
                <p><strong>Precio:</strong> $${parseFloat(libro.price).toFixed(2)}</p>
                <p><strong>Stock:</strong> ${libro.stock}</p>
                <p><strong>ID:</strong> ${libro.id}</p>
            </div>
        </div>
    `;
}
