const pokemonDatabase = {
    charmander: {
        name: "Charmander",
        types: ["fire"],
        hp: 39,
        attack: 52,
        defense: 43,
        // Real sprite from PokeAPI
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        moves: ["scratch", "ember", "growl", "smokescreen"]
    },
    squirtle: {
        name: "Squirtle",
        types: ["water"],
        hp: 44,
        attack: 48,
        defense: 65,
        sprite: "https://raw.githubusercontent.com/PokeAPI/spritesmaster/sprites/pokemon/7.png",
        moves: ["tackle", "watergun", "tailwhip", "withdraw"]
    },
    bulbasaur: {
        name: "Bulbasaur",
        types: ["grass", "poison"],
        hp: 45,
        attack: 49,
        defense: 49,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        moves: ["tackle", "vinewhip", "growl", "leechseed"]
    },
    pidgey: {
        name: "Pidgey",
        types: ["normal", "flying"],
        hp: 40,
        attack: 45,
        defense: 40,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png",
        moves: ["tackle", "gust", "sandattack", "quickattack"]
    },
    rattata: {
        name: "Rattata",
        types: ["normal"],
        hp: 30,
        attack: 56,
        defense: 35,
        sprite: "https://raw.githubusercontent.com/PokeAPI/spritesmaster/sprites/pokemon/19.png",
        moves: ["tackle", "tailwhip", "quickattack", "hyperfang"]
    },
    ekans: {
        name: "Ekans",
        types: ["poison"],
        hp: 35,
        attack: 60,
        defense: 44,
        sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png",
        moves: ["wrap", "poisonsting", "bite", "glare"]
    }
};

const movesDatabase = {
     scratch: {
        name: "Scratch",
        type: "normal",
        power: 40,
        accuracy: 100,
        category: "physical",
        description: "Scratches the foe with sharp claws."

    },
     ember: {
        name: "Ember",
        type: "fire",
        power: 40,
        accuracy: 100,
        category: "Special",
        description: "A weak attack but accurate"
    },

    watergun: {
        name: "Water gun",
        type: "water",
        power: 40,
        accuracy: 100,
        category: "Special",
        description: "Squirts water to attack an enemy"
    },

    vinewhip: {
        name: "Vine Whip",
        type: "grass",
        power: 48,
        accuracy: 100,
        category: "Physical",
        description: "Strikes the foe with vines"
    },

    gust: {
        name: "Gust",
        type: "flying",
        power: 40,
        accuracy: 100,
        category: "special",
        description: "Strikes foe with a gust of wind"
    },

    tackle: {
        name: "Tackle",
        type: "normal",
        power: 40,
        accuracy: 100,
        category: "physical",
        description: "Tackles the enemy"
    },

    poisonsting: {
        name: "Poison Sting",
        type: "poison",
        power: 15,
        accuracy: 100,
        category: "physical",
        description: "Poisons the enemy with stinger"
    },

    growl: {
        name: "Growl",
        type: "normal",
        power: 0,
        accuracy: 100,
        category: "status",
        description: "Inflicts fear to the enemy"
    },

    tailwhip: {
        name: "Tail Whip",
        type: "normal",
        power: 0,
        accuracy: 100,
        category: "status",
        description: "Reduces the armor of an enemy"
    },

    sandattack: {
        name: "Sand Attack",
        type: "ground",
        power: 0,
        accuracy: 100,
        category: "status",
        description: "Blinds enemy and reduces accuracy"
    },

    quickattack: {
        name: "Quick Attack",
        type: "normal",
        power: 53,
        accuracy: 100,
        category: "physical",
        description: "A quick attack to the enemy"
    },

    bite: {
        name: "Bite",
        type: "dark",
        power: 60,
        accuracy: 100,
        category: "physical",
        description: "Bites the enemy"
    },
}

const typeChart = {
      normal: {
        normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
        fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1,
        bug: 1, rock: 0.5, ghost: 0, dragon: 1, dark: 1, fairy: 1,
        steel: 0.5
    },
    fire: {
        normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 2,
        fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1,
        bug: 2, rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, fairy: 1,
        steel: 2
    },
    water: {
        normal: 1, fire: 2, water: 0.5, electric: 1, grass: 0.5, ice: 1,
        fighting: 1, poison: 1, ground: 2, flying: 1, psychic: 1,
        bug: 1, rock: 2, ghost: 1, dragon: 0.5, dark: 1, fairy: 1,
        steel: 1
    },
    electric: {
        normal: 1, fire: 1, water: 2, electric: 0.5, grass: 0.5, ice: 1,
        fighting: 1, poison: 1, ground: 0, flying: 2, psychic: 1,
        bug: 1, rock: 1, ghost: 1, dragon: 0.5, dark: 1, fairy: 1,
        steel: 1
    },
    grass: {
        normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5, ice: 1,
        fighting: 1, poison: 0.5, ground: 2, flying: 0.5, psychic: 1,
        bug: 0.5, rock: 2, ghost: 1, dragon: 0.5, dark: 1, fairy: 1,
        steel: 0.5
    },
    ice: {
        normal: 1, fire: 0.5, water: 0.5, electric: 1, grass: 2, ice: 0.5,
        fighting: 1, poison: 1, ground: 2, flying: 2, psychic: 1,
        bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, fairy: 1,
        steel: 0.5
    },
    fighting: {
        normal: 2, fire: 1, water: 1, electric: 1, grass: 1, ice: 2,
        fighting: 1, poison: 0.5, ground: 1, flying: 0.5, psychic: 0.5,
        bug: 0.5, rock: 2, ghost: 0, dragon: 1, dark: 2, fairy: 0.5,
        steel: 2
    },
    poison: {
        normal: 1, fire: 1, water: 1, electric: 1, grass: 2, ice: 1,
        fighting: 1, poison: 0.5, ground: 0.5, flying: 1, psychic: 1,
        bug: 1, rock: 0.5, ghost: 0.5, dragon: 1, dark: 1, fairy: 2,
        steel: 0
    },
    ground: {
        normal: 1, fire: 2, water: 1, electric: 2, grass: 0.5, ice: 1,
        fighting: 1, poison: 2, ground: 1, flying: 0, psychic: 1,
        bug: 0.5, rock: 2, ghost: 1, dragon: 1, dark: 1, fairy: 1,
        steel: 2
    },
    flying: {
        normal: 1, fire: 1, water: 1, electric: 0.5, grass: 2, ice: 1,
        fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1,
        bug: 2, rock: 0.5, ghost: 1, dragon: 1, dark: 1, fairy: 1,
        steel: 0.5
    },
    psychic: {
        normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
        fighting: 2, poison: 2, ground: 1, flying: 1, psychic: 0.5,
        bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 0, fairy: 1,
        steel: 0.5
    },
    bug: {
        normal: 1, fire: 0.5, water: 1, electric: 1, grass: 2, ice: 1,
        fighting: 0.5, poison: 0.5, ground: 1, flying: 0.5, psychic: 2,
        bug: 1, rock: 1, ghost: 0.5, dragon: 1, dark: 2, fairy: 0.5,
        steel: 0.5
    },
    rock: {
        normal: 1, fire: 2, water: 1, electric: 1, grass: 1, ice: 2,
        fighting: 0.5, poison: 1, ground: 0.5, flying: 2, psychic: 1,
        bug: 2, rock: 1, ghost: 1, dragon: 1, dark: 1, fairy: 1,
        steel: 0.5
    },
    ghost: {
        normal: 0, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
        fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 2,
        bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, fairy: 1,
        steel: 1
    },
    dragon: {
        normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
        fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1,
        bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, fairy: 0,
        steel: 0.5
    },
    dark: {
        normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1,
        fighting: 0.5, poison: 1, ground: 1, flying: 1, psychic: 2,
        bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 0.5, fairy: 0.5,
        steel: 1
    },
    fairy: {
        normal: 1, fire: 0.5, water: 1, electric: 1, grass: 1, ice: 1,
        fighting: 2, poison: 0.5, ground: 1, flying: 1, psychic: 1,
        bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 2, fairy: 1,
        steel: 0.5
    },
    steel: {
        normal: 1, fire: 0.5, water: 1, electric: 1, grass: 1, ice: 2,
        fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1,
        bug: 1, rock: 2, ghost: 1, dragon: 1, dark: 1, fairy: 2,
        steel: 0.5
    }
};
