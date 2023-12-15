// URL de la API de REST Countries para obtener todos los países
const restCountriesAllAPI = 'https://restcountries.com/v3.1/all';

// Obtener la referencia al contenedor donde se mostrarán las tarjetas de países
const countriesList = document.getElementById('countries-list');
const searchInput = document.querySelector('input[type="search"]');

// Variables para el manejo de la paginación y la búsqueda
const itemsPerPage = 12;
let currentPage = 1;
let filteredCountries = []; // Almacenar los países filtrados


// FUNCIÓN para llamar a la API para obtener todos los países y mostrar la primera página de tarjetas
function fetchCountriesData() {
  fetch(restCountriesAllAPI)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(data => {
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      showCountriesByPage(data, currentPage);
      filteredCountries = data;
    })
    .catch(error => {
      console.error('Hubo un problema al obtener la lista de países:', error);
    });
}

// FUNCIÓN para mostrar los países en la página actual
function showCountriesByPage(data, page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  
  countriesList.innerHTML = '';
  
  paginatedData.forEach(country => {
    const countryCard = document.createElement('div');
    countryCard.classList.add('col-md-4', 'mb-4');
    
    countryCard.innerHTML = `
      <div class="card">
        <img src="${country.flags.png}" class="card-img-top" alt="Country Flag">
        <div class="card-body">
          <h5 class="card-title">${country.name.common}</h5>
          <p class="card-text">Capital: ${country.capital}</p>
        </div>
      </div>
    `;
    
    countriesList.appendChild(countryCard);
    
    countryCard.addEventListener('click', function() {
      const fullCard = document.getElementById('full-card');
      const expandedCard = document.getElementById('expanded-card');
      const currencies = Object.values(country.currencies).map(currency => currency.name).join(', ');
      
      const detailedInfo = `
        <img src="${country.flags.png}" class="card-img-top" alt="Country Flag">
        <div class="card-body">
          <h5 class="card-title">${country.name.common}</h5>
          <p class="card-text">Capital: ${country.capital}</p>
          <p class="card-text">Región: ${country.region}</p>
          <p class="card-text">Idioma: ${Object.values(country.languages).join(', ')}</p>
          <p class="card-text">Moneda: ${currencies}</p>
        </div>
      `;
      
      expandedCard.innerHTML = detailedInfo;
      fullCard.style.display = 'flex';
    });
  });
}

// FUNCIÓN para manejar los cambios de página al hacer clic en los enlaces de paginación
function handlePageClick(event) {
  event.preventDefault();
  
  if (event.target.tagName === 'A') {
    const targetPage = parseInt(event.target.textContent);
    
    if (!isNaN(targetPage)) {
      currentPage = targetPage;
      showCountriesByPage(filteredCountries.length > 0 ? filteredCountries : [], currentPage);
    } else if (event.target.textContent === 'Anterior' && currentPage > 1) {
      currentPage--;
      showCountriesByPage(filteredCountries.length > 0 ? filteredCountries : [], currentPage);
    } else if (event.target.textContent === 'Siguiente') {
      currentPage++;
      showCountriesByPage(filteredCountries.length > 0 ? filteredCountries : [], currentPage);
    }
  }
}

// FUNCIÓN para filtrar países según el texto de búsqueda
function filterCountries(searchText, data) {
  return data.filter(country => {
    const countryName = country.name.common.toLowerCase();
    return countryName.includes(searchText.toLowerCase());
  });
}

// Evento de escucha para la entrada de búsqueda
searchInput.addEventListener('input', function(event) {
  const searchText = event.target.value.trim();
  if (searchText !== '') {
    filteredCountries = filterCountries(searchText, filteredCountries.length > 0 ? filteredCountries : []);
    showCountriesByPage(filteredCountries, 1);
  } else {
    filteredCountries = [];
    fetchCountriesData();
  }
});



// Asignar el evento de clic a la lista de paginación
const pagination = document.querySelector('.pagination');
pagination.addEventListener('click', handlePageClick);

// Evento para cerrar la tarjeta expandida al hacer clic fuera de ella
const fullCard = document.getElementById('full-card');
fullCard.addEventListener('click', function(event) {
  if (event.target === fullCard) {
    fullCard.style.display = 'none';
  }
});

// Llamar a la función para obtener los datos iniciales de los países
fetchCountriesData();







