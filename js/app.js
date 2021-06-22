console.log("Hello to the world of pokemon");

var base_url = "https://pokeapi.co/api/v2/";
var pokemonList=[];

// function to add search funcionality
let searchEle=document.getElementById("pokesearch");
searchEle.addEventListener("input",()=>{
    let text=searchEle.value;
    if(pokemonList.length>0)
        {    // filter those pokemon which matches
            let pokeList=pokemonList.filter(
                (val)=>val.name.includes(text));
                console.log(pokeList);
                createPokemonList(pokeList);
        }
        });



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
//   console.log(`Hello ${name}`);
  let res = await fetch(url);
  let pokeDetails = await res.json();

  displayPokemonDetails(pokeDetails);
}

// Add pokemons to the list
async function createPokemonList(pokeList,append=false) {
  let listElement = document.getElementById("pokemon-list");
  listElement.innerHTML="";
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

    if(append)
        pokemonList.push({"name":pokemon.name,
                        "url":pokemon.url});

    listElement.appendChild(ele);
    // console.log(element.name);
  });
}

async function loadAllPokemon(n){
    const pokeList = await getPokemonList(n);
    createPokemonList(pokeList,true);
}

loadAllPokemon(1118);
