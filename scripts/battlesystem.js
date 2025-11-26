class Pokemon{
    constructor(pokemonData){
        this.name = pokemonData.name;
        this.types = pokemonData.types;
        this.maxHp = pokemonData.hp;
        this.currentHp = pokemonData.hp;
        this.attack = pokemonData.attack;
        this.defense = pokemonData.defense;
        this.sprite = pokemonData.sprite;
        this.moves = pokemonData.moves;
        this.statchanges = {
            attack: 0,
            defense: 0,
            speed: 0
        }
    };
}