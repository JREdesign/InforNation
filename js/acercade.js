// Obtener todas las imágenes dentro de la clase 'caja'
const imagenes = document.querySelectorAll('.caja img');

// Elemento para la capa de fondo negro transparente
const overlay = document.createElement('div');
overlay.classList.add('overlay');

// Agregar eventos y funcionalidades a cada imagen
imagenes.forEach((imagen) => {
  // Agregar evento 'click' a cada imagen
  imagen.addEventListener('click', function() {
    overlay.innerHTML = ''; // Limpiar el contenido previo del overlay

    // Crear y configurar la imagen ampliada
    const imgAmpliada = new Image();
    imgAmpliada.src = imagen.src;
    imgAmpliada.classList.add('ampliada');
    
    // Mostrar la imagen ampliada dentro del overlay
    overlay.appendChild(imgAmpliada);
    document.body.appendChild(overlay);

    // Mostrar y ocultar el overlay al hacer clic fuera de la imagen
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.style.display = 'none';
      }
    });

    // Mostrar el overlay al hacer clic en la imagen
    overlay.style.display = 'flex';
  });

  // Cambiar el cursor al pasar por encima de las imágenes
  imagen.style.cursor = 'pointer';
});

