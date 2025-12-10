(function fixBadOwned(){
  const raw = localStorage.getItem('owned');
  if (raw && raw[0] !== '{') {
    localStorage.setItem('owned', '{"fighters":' + raw.slice(10) + '}');
  }
})();

const shopCatalog = {
  Fire: [
    { id: 4, name: 'Charmander', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Scratch', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Ember', mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' }, { name: 'Flame Burst', mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' }, { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }] },
    { id: 5, name: 'Charmeleon', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Scratch', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Ember', mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' }, { name: 'Flame Burst', mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' }, { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }] },
    { id: 6, name: 'Charizard', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Scratch', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Ember', mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' }, { name: 'Flame Burst', mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' }, { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }] },
    { id: 37, name: 'Vulpix', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Scratch', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Ember', mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' }, { name: 'Flame Burst', mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' }, { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }] },
    { id: 38, name: 'Ninetales', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Scratch', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Ember', mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' }, { name: 'Flame Burst', mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' }, { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }] },
    { id: 58, name: 'Growlithe', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Scratch', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Ember', mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' }, { name: 'Flame Burst', mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' }, { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }] },
    { id: 59, name: 'Arcanine', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Scratch', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Ember', mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' }, { name: 'Flame Burst', mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' }, { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }] },
    { id: 77, name: 'Ponyta', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Scratch', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Ember', mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' }, { name: 'Flame Burst', mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' }, { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }] },
    { id: 78, name: 'Rapidash', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Scratch', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Ember', mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' }, { name: 'Flame Burst', mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' }, { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }] },
    { id: 126, name: 'Magmar', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Scratch', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Ember', mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' }, { name: 'Flame Burst', mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' }, { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }] }
  ],
  Water: [
    { id: 7, name: 'Squirtle', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', maxMana: 100, mana: 100, armor: 100, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 8, name: 'Wartortle', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png', maxMana: 100, mana: 100, armor: 100, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 9, name: 'Blastoise', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png', maxMana: 100, mana: 100, armor: 100, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 54, name: 'Psyduck', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png', maxMana: 100, mana: 100, armor: 100, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 55, name: 'Golduck', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png', maxMana: 100, mana: 100, armor: 100, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 60, name: 'Poliwag', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png', maxMana: 100, mana: 100, armor: 100, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 61, name: 'Poliwhirl', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png', maxMana: 100, mana: 100, armor: 100, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 62, name: 'Poliwrath', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png', maxMana: 100, mana: 100, armor: 100, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 72, name: 'Tentacool', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png', maxMana: 100, mana: 100, armor: 100, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 73, name: 'Tentacruel', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png', maxMana: 100, mana: 100, armor: 100, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] }
  ],
  Normal: [
    { id: 19, name: 'Rattata', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 20, name: 'Raticate', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 16, name: 'Pidgey', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 17, name: 'Pidgeotto', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 18, name: 'Pidgeot', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 21, name: 'Spearow', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 22, name: 'Fearow', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 83, name: 'Farfetch\'d', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 84, name: 'Doduo', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 85, name: 'Dodrio', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] }
  ],
  Poison: [
    { id: 1, name: 'Bulbasaur', types: ['grass','poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 2, name: 'Ivysaur', types: ['grass','poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 3, name: 'Venusaur', types: ['grass','poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 23, name: 'Ekans', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 24, name: 'Arbok', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 29, name: 'Nidoran♀', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 30, name: 'Nidorina', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 31, name: 'Nidoqueen', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 32, name: 'Nidoran♂', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 33, name: 'Nidorino', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] }
  ],
  Dragon: [
    { id: 147, name: 'Dratini', types: ['dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 148, name: 'Dragonair', types: ['dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 149, name: 'Dragonite', types: ['dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Vine Whip', mana: 0, power: 40, cd: 0, desc: 'Basic grass whip' }, { name: 'Razor Leaf', mana: 20, power: 60, cd: 2, desc: 'Sharp leaf barrage' }, { name: 'Poison Powder', mana: 35, power: 20, cd: 4, desc: 'Applies poison DOT' }, { name: 'Bloom Doom', mana: 60, power: 130, cd: 10, desc: 'ULT: massive plant eruption' }] },
    { id: 130, name: 'Gyarados', types: ['water','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 6, name: 'Mega-Charizard X', types: ['dragon','fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Scratch', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Ember', mana: 20, power: 60, cd: 2, desc: 'Low-cost fire spit' }, { name: 'Flame Burst', mana: 35, power: 80, cd: 4, desc: 'Small AoE burst' }, { name: 'Inferno Overdrive', mana: 60, power: 130, cd: 10, desc: 'ULT: huge fire blast' }] },
    { id: 329, name: 'Trapinch', types: ['ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/329.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 330, name: 'Vibrava', types: ['ground','dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/330.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 331, name: 'Flygon', types: ['ground','dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/331.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 246, name: 'Larvitar', types: ['rock','ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/246.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] },
    { id: 247, name: 'Pupitar', types: ['rock','ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/247.png', maxMana: 100, mana: 100, armor: 0, moves: [{ name: 'Tackle', mana: 0, power: 40, cd: 0, desc: 'Basic attack' }, { name: 'Water Gun', mana: 20, power: 60, cd: 2, desc: 'Ranged water shot' }, { name: 'Aqua Tail', mana: 35, power: 80, cd: 4, desc: 'Strong tail whip' }, { name: 'Hydro Vortex', mana: 60, power: 130, cd: 10, desc: 'ULT: crushing water vortex' }] }
  ]
};

/* ----------  READ OWNED IDs (same key as marketplace.js)  ---------- */
(function fixBadOwned(){
  const raw = localStorage.getItem('owned');
  if (raw && raw[0] !== '{') {
    localStorage.setItem('owned', '{"fighters":' + raw.slice(10) + '}');
  }
})();
const ownedIds = JSON.parse(localStorage.getItem('owned') || '{}').fighters || [];
const fighters = Object.values(shopCatalog).flat().filter(c => ownedIds.includes(c.id));

const arenas = [{ id: 'Arena', name: 'Colosseum', thumb: 'images/arena.png' }];
let selectedFighter = null;
let selectedArena   = null;

/* ----------  RENDER  ---------- */
/* ----------  PAGINATION VARS  ---------- */
const PER_PAGE   = 4;
let currentPage  = 0;
const totalPages = Math.ceil(fighters.length / PER_PAGE);
const paginated  = Array.from({length: totalPages}, (_, i) =>
  fighters.slice(i * PER_PAGE, (i + 1) * PER_PAGE)
);

function renderFighters() {
  const grid = document.getElementById('pokeGrid');
  if (!fighters.length) {
    grid.innerHTML = `
      <div style="text-align:center;color:#fff;margin-top:2rem;">
        <p>You don’t own any champions yet.</p>
        <button class="neon-btn" onclick="location.href='marketplace.html'">Go to Marketplace</button>
      </div>`;
    return;
  }
  /* ---- draw current page ---- */
  grid.innerHTML = paginated[currentPage].map(f => `
    <div class="poke-card" onclick="selectFighter(${f.id})">
      <img src="${f.sprite}" alt="${f.name}">
      <div>${f.name}</div>
      <div>${f.types.map(t => `<span class="type-badge ${t}">${t}</span>`).join('')}</div>
    </div>`).join('');
  renderPaginator();
}

function renderPaginator() {
  const existing = document.getElementById('pokePaginator');
  if (!existing) {
    document.getElementById('pokeGrid').insertAdjacentHTML('afterend', '<div id="pokePaginator" class="paginator"></div>');
  }
  const el = document.getElementById('pokePaginator');
  el.innerHTML = `
    <button ${currentPage === 0 ? 'disabled' : ''} onclick="changePage(-1)">‹ Prev</button>
    <span>Page ${currentPage + 1} / ${totalPages}</span>
    <button ${currentPage === totalPages - 1 ? 'disabled' : ''} onclick="changePage(1)">Next ›</button>
  `;
}

function changePage(dir) {
  currentPage = Math.max(0, Math.min(totalPages - 1, currentPage + dir));
  renderFighters();
}
function renderArenas(){
  const grid = document.getElementById('mapGrid');
  grid.innerHTML = arenas.map(a => `
    <div class="map-card" onclick="selectArena('${a.id}')">
      <img src="${a.thumb}" alt="${a.name}">
      <div>${a.name}</div>
    </div>`).join('');
}

/* ----------  SELECTION  ---------- */
function selectFighter(id){
  document.querySelectorAll('.poke-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.poke-card[onclick="selectFighter(${id})"]`)?.classList.add('selected');
  selectedFighter = id;
  checkReady();
}
function selectArena(id){
  document.querySelectorAll('.map-card').forEach(c => c.classList.remove('selected'));
  document.querySelector(`.map-card[onclick="selectArena('${id}')"]`)?.classList.add('selected');
  selectedArena = id;
  checkReady();
}

/* ----------  LINK GUARD  ---------- */
const startLink = document.getElementById('startBtn');
function checkReady(){
  const ok = selectedFighter;
  startLink.classList.toggle('disabled', !ok);
  startLink.style.pointerEvents = ok ? 'auto' : 'none';
  startLink.style.opacity       = ok ? '1'   : '0.5';
}
function quickToast(msg){
  const t = Object.assign(document.createElement('div'), {
    textContent: msg,
    style: `position:fixed;top:20%;left:50%;transform:translateX(-50%);
            background:#f0f;color:#fff;padding:10px 20px;border-radius:8px;
            font-weight:bold;z-index:9999;animation:fade 1.5s forwards;`
  });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1500);
}
startLink.addEventListener('click', e => {
  if (!selectedFighter) { e.preventDefault(); quickToast('Pick a Pokémon first!'); return; }
  location.href = `gameplay.html?fighter=${selectedFighter}`;
});

/* ----------  30-s AUTO-REDIRECT  ---------- */
const LOCK_TIME = 30000;                 // 30 s  (you had 30 000 000 ms)
let timeLeft = LOCK_TIME, locked = false;
const timerBar = document.createElement('div');
timerBar.style.cssText = `position:fixed;top:0;left:0;height:6px;width:100%;background:#00c3ff;transform-origin:left;transition:transform ${LOCK_TIME/1000}s linear;z-index:9999;`;
document.body.appendChild(timerBar);
requestAnimationFrame(() => timerBar.style.transform = 'scaleX(0)');
const interval = setInterval(() => { if (--timeLeft <= 0 && !locked) autoLock(); }, 1000);

function autoLock() {
  locked = true; clearInterval(interval);
  // selectedFighter is the POKÉDEX ID, not an array index
  location.href = selectedFighter ? `gameplay.html?fighter=${selectedFighter}` : 'index.html';
}

/* ----------  INIT  ---------- */
renderFighters();
renderArenas();
checkReady();