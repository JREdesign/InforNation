
// Obtener el elemento del icono
const logoMini = document.getElementById('logo-mini');

// Agregar un evento de clic al icono
logoMini.addEventListener('click', () => {
  // Realizar una solicitud fetch al archivo JSON
  fetch('js/curiosidades.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo obtener la información');
      }
      return response.json();
    })
    .then(data => {
      // Obtener un país aleatorio del JSON
      const paises = data.paises;
      const nombresPaises = Object.keys(paises);
      const paisSeleccionado = paises[nombresPaises[Math.floor(Math.random() * nombresPaises.length)]];

      // Obtener una curiosidad aleatoria del país seleccionado
      const curiosidades = [
        paisSeleccionado.curiosidad_1,
        paisSeleccionado.curiosidad_2,
        paisSeleccionado.curiosidad_3
      ];
      const curiosidadSeleccionada = curiosidades[Math.floor(Math.random() * curiosidades.length)];

      // Mostrar la información en el modal
      mostrarModal(paisSeleccionado, curiosidadSeleccionada);
    })
    .catch(error => {
      console.error('Error al obtener la información:', error);
    });
});

// Función para mostrar la información en el modal
function mostrarModal(pais, curiosidad) {
  // Obtener el elemento del modal y del cuerpo del modal
  const modalBody = document.getElementById('infoContent');

  // Generar un número aleatorio para la etiqueta "Curiosidad"
  const numeroAleatorio = Math.floor(Math.random() * 999) + 1;

  // Construir el contenido del modal con la información del país y la curiosidad
  let modalHTML = `<h5></h5>`;
  modalHTML += `<p><strong>Curiosidad ${numeroAleatorio}:</strong> ${curiosidad}</p>`;

  // Insertar el contenido en el cuerpo del modal
  modalBody.innerHTML = modalHTML;

  // Mostrar el modal utilizando Bootstrap
  const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
  infoModal.show();
}