const getPokemon = async function (id) {
    // get pokemon data from pokeapi
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    return data;
    //createPokemonCard( data );
  };

const app = Vue.createApp({
  data() {
    return {
      allPokemon: [
      ],
      partyPokemon: [],
      filteredPokemon: [],
      maxPartySize: 6,
      partycount: 0,
    };
  },
  methods: {
    async loadPokemon() {
      // load all pokemon from API and save into all pokemon
      const pokemon_count = 20;
      let pokemon = [];
      for (let i = 1; i <= pokemon_count; i++) {
        let p = await getPokemon(i);
        if (p.name === "mr-mime") {
          p.name = "Mr. Mime";
        }
        p.isFavorite = false;

        pokemon.push(p);
      }

      pokemon.forEach( p => {
          this.allPokemon.push(p);
      });
    },
    filterPokemon() {
      // set filteredPokemon to matching pokemon based on search query
    },
    addPokemonToParty(pokemon) 
    {
      if (this.partycount < 6){
      const pokemonCopy = {...pokemon};
      pokemonCopy.guid = this.getGUID();
      console.log(pokemonCopy.guid);
      this.partyPokemon.push(  pokemonCopy );
      this.partycount = this.partycount + 1;
      }
    },
    removePokemonFromParty(pokemon) {
      
      this.partyPokemon = this.partyPokemon
                            .filter( p => p.guid != pokemon.guid);
      
     this.partycount = this.partycount - 1;

     
    },
    pokemonTypeString(pokemon) {
      if (pokemon.types.length > 1) {
        return `${pokemon.types[0].type.name} / ${pokemon.types[1].type.name}`;
      } else {
        return `${pokemon.types[0].type.name}`;
      }
    },
    getGUID() {
      return Math.floor(Math.random()* 1000000);
    }
  },
  mounted() {
    this.loadPokemon();
  },
}).mount("#app");

