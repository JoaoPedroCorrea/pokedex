const pokemonName = document.querySelector('.pokemon-name');
const pokemonId = document.querySelector('.pokemon-id');
const pokemonImage = document.querySelector('.pokemon-image');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const prevButton = document.querySelector('.btn-prev');
const nextButton = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200) {
        const data = await APIResponse.json();
        return(data);
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonName.innerHTML = data['name'];
        pokemonId.innerHTML = data['id'];
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not Found';
        pokemonId.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

prevButton.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

nextButton.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});


renderPokemon(searchPokemon);