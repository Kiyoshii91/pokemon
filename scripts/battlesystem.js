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
        };
    }

    getEffectiveness(moveType, targetTypes){
        let effectiveness = 1;
        targetTypes.foreach(targetType =>{
            effectiveness *= typeChart[moveType][targetType];
        });
        return effectiveness; 
    }

    calculateDamage(move, target){
        if(move.power === 0) return 0;
        
        const effectiveness = this.getEffectiveness(move.type, target.types);
        const stab = this.types.includes(move.type)? 1.5 : 1;
        const attackStat = move.category === 'physical' ? this.attack : this.attack;
        const defenseStat = move.category === 'physical' ? this.defense : this.defense;
        const damage = Math.floor(((2 * 50 / 5 + 2) * move.power * attackStat / defenseStat / 50 + 2) * stab * effectiveness);
        return Math.floor (damage)
    }
    useMove(moveIndex, target){
        const movee = this.moves[moveIndex];
        let damage = 0;
        let effectiveness = 1;
        let message = `${this.name} used ${move.name}!`;

        if (move.power > 0){
            damage = this.calculateDamage(move, target);
            effectiveness = this.getEffectiveness(move.type, target.types);
            
            if (effectiveness > 1){
                message += "Effective";
            }else if(effectiveness < 1){
                message += "Not Effective"
            }
        }else{
            message += `${move.description}`;
        }

        target.takeDamage(damage)
        return{
            damage,
            effectiveness,
            message,
            move
        };
    }

    takeDamage(damage){
        this.currentHp = Math.max(0,this.currentHp - damage);
    }

    isFainted(){
        return this.currentHp <= 0
    }
    
    getHpPercentage(){
        return (this.currentHp / this.maxHp) * 100
    }
}
class BattleSystem{
    constructor(playerPokemon, enemyPokemon){
        this,playerPokemon = new Pokemon(playerPokemon);
        this.enemyPokemon = new Pokemon(enemyPokemon);
        this.turn = 'player';
        this.battleLog = [];
    }

    playerMove(moveIndex){
        if(this.turn !== 'player') return;
        
        const result = this.playerPokemon.useMove(moveIndex, this.enemyPokemon);
        this.battleLog.push(result.message);

        if(this.enemyPokemon.isFainted()){
            this.battleLog.push(`${this.enemyPokemon.name} was slain`);
            return {result: 'defeat', message: result.message};
        }
        this.turn = 'player';
        return {result: 'victory', message: result.message};
    }

    getBattleState(){
        return{
            player:{
                name: this.playerPokemon.name,
                hp: this.playerPokemon.currentHp,
                maxHp: this.playerPokemon.maxHp,
                hpPercentage: this.playerPokemon.getHpPercentage(),
                types: this.playerPokemon.types,
                sprite: this.playerPokemon.sprite,
                moves: this.playerPokemon.moves,
                isFainted: this.playerPokemon.isFainted()
            },
            enemy:{
                name: this.enemyPokemon.name,
                hp: this.enemyPokemon.currentHp,
                maxHp: this.enemyPokemon.maxHp,
                hpPercentage: this.enemyPokemon.getHpPercentage(),
                types: this.enemyPokemon.types,
                sprite: this.enemyPokemon.sprite,
                moves: this.enemyPokemon.moves,
                isFainted: this.enemyPokemon.isFainted()
            },
            turn: this.turn,
            log: this.battleLog
        };
    }
}