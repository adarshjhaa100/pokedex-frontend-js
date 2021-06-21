console.log("Hello to the world of pokemon");

var base_url = "https://pokeapi.co/api/v2/";

// function to carry out experiments
async function experiment() {
    let url = base_url + "pokemon?limit=350";
    // without awail, fetch() will return a promise 
    // with await, We will get response 
    let response = await fetch(url);
    let resDetails = await response.json();   // get the json response
    let pokeList = await resDetails.results;  // Array of pokemons
    let samplePokemon = await pokeList[0];
    let pokeUrl = await samplePokemon["url"]; // get url of pokemon

    let pokeResponse = await fetch(pokeUrl);  // fetch pokemon details
    let pokeDetails = await pokeResponse.json();

    console.log(pokeDetails);
};

//function to get pokemon list
async function getPokemonList(n) {
    const url = base_url + `pokemon?limit=${n}`;

    let res = await fetch(url);
    let resDetails = await res.json();
    let pokeList = resDetails.results;
    return pokeList;
}

// adding event listener
async function clickItem(name, url) {
    console.log(`Hello ${name}`);
    let res = await fetch(url);
    let pokeDetails = await res.json();
    console.log(pokeDetails);
}


// Add pokemons to the list
async function createPokemonList(n) {
    const pokeList = await getPokemonList(n);
    // console.log(pokeList);
    let listElement = document.getElementById("pokemon-list");
    pokeList.forEach((pokemon, id) => {
        // eleement for pokemon details
        let ele = document.createElement("div");
        ele.id = `pokemon#${id + 1}`;
        ele.className = "pokedex-list-item";

        // elements inside the listitem
        let pokeNo = document.createElement("div");
        let pokeName = document.createElement("div");
        pokeNo.classname = "pokedex-no";
        pokeName.className = "pokedex-name";
        pokeNo.innerHTML = `#${id + 1}`;
        pokeName.innerHTML = `${pokemon.name}`;

        // Add the details to the listitem
        ele.appendChild(pokeNo);
        ele.appendChild(pokeName);

         // Add click action to the list item
        ele.addEventListener("click", () => { clickItem(pokemon.name, pokemon.url) });

        listElement.appendChild(ele);
        // console.log(element.name);
    });
}


// experiment();
createPokemonList(1000);