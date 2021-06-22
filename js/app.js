console.log("Hello to the world of pokemon");

var base_url = "https://pokeapi.co/api/v2/";

// function to carry out experiments
async function experiment() {
  let url = base_url + "pokemon?limit=350";
  // without awail, fetch() will return a promise
  // with await, We will get response
  let response = await fetch(url);
  let resDetails = await response.json(); // get the json response
  let pokeList = await resDetails.results; // Array of pokemons
  let samplePokemon = await pokeList[0];
  let pokeUrl = await samplePokemon["url"]; // get url of pokemon

  let pokeResponse = await fetch(pokeUrl); // fetch pokemon details
  let pokeDetails = await pokeResponse.json();

  console.log(pokeDetails);
}

//function to get pokemon list
async function getPokemonList(n) {
  const url = base_url + `pokemon?limit=${n}`;

  let res = await fetch(url);
  let resDetails = await res.json();
  let pokeList = resDetails.results;
  return pokeList;
}

function getTypes(types) {
  if (types.length > 1) return `${types[0]}&nbsp${types[1]}`;
  return `${types[0]}`;
}

function displayBasicDetails(pokeDetails) {
  // get details into variables
  // scroll(0,0); // goto top of the page
  let sprite_url = pokeDetails.sprites.front_default;
  let id = pokeDetails.id;
  let name = pokeDetails.name;
  let types = pokeDetails.types.map((typeArr) => typeArr.type.name);
  let height = pokeDetails.height / 10;
  let weight = pokeDetails.weight / 10;

  // Display basic details
  let pokeElement = document.getElementById("pokemon-details");
  pokeElement.innerHTML = ""; //clear the details of previous pokemon
  pokeElement.innerHTML += `<img src="${sprite_url}" alt="${name}">`;
  pokeElement.innerHTML += `
    <table>
            <tr>
                <td>ID:</td>
                <td>${id}</td>
            </tr>
            <tr>
                <td>Name:</td>
                <td>${name}</td>
            </tr>
            <tr>
                <td>Type:</td>
                <td>${getTypes(types)}</td>
            </tr>
            <tr>
                <td>Height:</td>
                <td>${height} m</td>
            </tr>
            <tr>
                <td>Weight:</td>
                <td>${weight} kg</td>
            </tr>
        </table>
    `;
  pokeElement.hidden = false;
}

// meter to show pokemon stats
function metreElement(num) {
  return `<meter id="stat-element"
    min="0" max="150"
    value="${num}"></meter>`;
}

function displayStats(pokeDetails) {
  // stats and abilities
  let stats = pokeDetails.stats;
  let statElement = document.getElementById("pokemon-stats-table");
  statElement.innerHTML = "";

  const statNames = {
    0: "hp",
    1: "attack",
    2: "defend",
    3: "spl-atk",
    4: "spl-defend",
    5: "speed",
  };

  for (let stat in stats)
    statElement.innerHTML += `<tr><td>${
      statNames[stat]
    }:</td><td> ${metreElement(stats[stat].base_stat)}</td><td> ${
      stats[stat].base_stat
    }</td></tr>`;

  document.getElementById("pokemon-stats").hidden = false;
}


// display pokemon details
async function displayPokemonDetails(pokeDetails) {
  displayBasicDetails(pokeDetails);

  displayStats(pokeDetails);
}

// adding event listener
async function clickItem(name, url) {
  console.log(`Hello ${name}`);
  let res = await fetch(url);
  let pokeDetails = await res.json();

  displayPokemonDetails(pokeDetails);
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
    ele.addEventListener("click", () => {
      clickItem(pokemon.name, pokemon.url);
    });

    listElement.appendChild(ele);
    // console.log(element.name);
  });
}

// experiment();
createPokemonList(1000);
