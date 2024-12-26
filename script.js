// Espera a que todo el contenido HTML haya sido cargado y analizado
document.addEventListener('DOMContentLoaded', function () {
    // Selecciona el formulario con la clase 'search-box'
    const form = document.querySelector('.search-box');
    // Selecciona el campo de entrada de tipo 'search' dentro del formulario
    const input = form.querySelector('input[type="search"]');
    // Selecciona el contenedor de resultados con la clase 'results'
    const resultsContainer = document.querySelector('.results');
    // Selecciona el elemento <p> dentro del <header>
    const resultsCounter = document.querySelector('header p');

    // Agrega un evento que se ejecuta al enviar el formulario
    form.addEventListener('submit', function (event) {
        // Previene el comportamiento por defecto del formulario (recargar la página)
        event.preventDefault();
        // Toma el valor del campo de entrada
        const searchTerm = input.value;
        // Si el término de búsqueda no está vacío
        if (searchTerm) {
            // Llama a la función searchWikipedia con el término de búsqueda
            searchWikipedia(searchTerm);
        }
    });

    // Función para buscar en Wikipedia
    function searchWikipedia(searchTerm) {
        // Construye la URL para la solicitud a la API de Wikipedia
        const url = `https://es.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchTerm)}`;

        // Realiza la solicitud HTTP y maneja la respuesta
        fetch(url).then(response => response.json()).then(data => {
            // Llama a la función displayResults con los resultados de búsqueda
            displayResults(data.query.search);
        }).catch(error => alert('Error : ' + error));
    }

    // Función para mostrar los resultados
    function displayResults(results) {
        // Limpia el contenido del contenedor de resultados
        resultsContainer.innerHTML = '';
        // Actualiza el contador de resultados
        resultsCounter.textContent = `Resultados : ${results.length}`;
        // Itera sobre cada resultado
        results.forEach(result => {
            // Crea un nuevo div para cada resultado
            const resultElement = document.createElement('div');
            // Asigna la clase 'result' al nuevo div
            resultElement.className = 'result';
            // Añade el título, extracto y enlace al nuevo div
            resultElement.innerHTML = `
                <h3>${result.title}</h3>
                <p>${result.snippet}</p>
                <a href="https://es.wikipedia.org/?curid=${result.pageid}" target="_blank">Leer más</a>
            `;
            // Añade el nuevo div al contenedor de resultados
            resultsContainer.appendChild(resultElement);
        });
    }
});