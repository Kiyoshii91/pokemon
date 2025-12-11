const shopCatalog = {
  Fire: [
    { id: 4, name: 'Charmander', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', maxMana: 500, mana: 500, armor: 50, moves: [
      { name: 'Scratch', mana: 0, lifesteal: 0.3, power: 120, cd: 0, desc: 'Basic claw attack' },
      { name: 'Ember', mana: 20, power: 250, cd: 3, desc: 'Small fire spit' },
      { name: 'Flame Burst', mana: 35, stunTurns: 1, lifesteal: 0.25, power: 400, cd: 6, desc: 'Small AoE burst' },
      { name: 'Inferno Overdrive', mana: 120, power: 1200, cd: 16, truedmg: true, desc: 'ULT: massive fire explosion' }
    ]},
    { id: 5, name: 'Charmeleon', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png', maxMana: 500, mana: 500, armor: 100, moves: [
      { name: 'Dragon Claw', mana: 0, power: 140, cd: 0, desc: 'Fierce claw strike' },
      { name: 'Flamethrower', mana: 30, power: 350, cd: 4, desc: 'Powerful fire stream' },
      { name: 'Fire Punch', mana: 40, lifesteal: 0.35, power: 450, cd: 6, desc: 'Burning fist' },
      { name: 'Blast Burn', mana: 150, power: 1300, cd: 16, truedmg: true, stunTurns: 1, desc: 'ULT: devastating fire blast' }
    ]},
    { id: 6, name: 'Charizard', types: ['fire','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', maxMana: 500, mana: 500, armor: 150, moves: [
      { name: 'Wing Attack', mana: 0, lifesteal: 0.3, power: 150, cd: 0, desc: 'Strong wing strike' },
      { name: 'Flamethrower', mana: 30, power: 380, cd: 4, desc: 'Intense fire stream' },
      { name: 'Air Slash', mana: 35, stunTurns: 1, power: 420, cd: 6, desc: 'Sharp air blade' },
      { name: 'Blast Burn', mana: 130, power: 1400, cd: 16, truedmg: true, desc: 'ULT: apocalyptic fire' }
    ]},
    { id: 37, name: 'Vulpix', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/37.png', maxMana: 500, mana: 500, armor: 60, moves: [
      { name: 'Quick Attack', mana: 0, lifesteal: 0.4, power: 120, cd: 0, desc: 'Fast strike' },
      { name: 'Fire Spin', mana: 25, stunTurns: 1, power: 280, cd: 4, desc: 'Traps foe in flames' },
      { name: 'Confuse Ray', mana: 30, power: 0, cd: 5, desc: 'Confuses target' },
      { name: 'Extrasensory', mana: 120, power: 900, cd: 12, truedmg: true, desc: 'Psychic burst' }
    ]},
    { id: 38, name: 'Ninetales', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png', maxMana: 500, mana: 500, armor: 120, moves: [
      { name: 'Flamethrower', mana: 30, power: 350, cd: 4, desc: 'Powerful fire stream' },
      { name: 'Will-O-Wisp', mana: 25, stunTurns: 2, power: 0, cd: 5, desc: 'Burns target' },
      { name: 'Dark Pulse', mana: 40, lifesteal: 0.3, power: 400, cd: 6, desc: 'Dark energy wave' },
      { name: 'Overheat', mana: 120, power: 1300, cd: 16, truedmg: true, desc: 'ULT: extreme heat' }
    ]},
    { id: 58, name: 'Growlithe', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/58.png', maxMana: 500, mana: 500, armor: 80, moves: [
      { name: 'Bite', mana: 0, lifesteal: 0.35, power: 130, cd: 0, desc: 'Strong bite' },
      { name: 'Ember', mana: 20, power: 260, cd: 3, desc: 'Fire spit' },
      { name: 'Flame Wheel', mana: 30, stunTurns: 1, power: 380, cd: 5, desc: 'Rolling fire attack' },
      { name: 'Fire Fang', mana: 120, power: 450, cd: 8, desc: 'Burning bite' }
    ]},
    { id: 59, name: 'Arcanine', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png', maxMana: 500, mana: 500, armor: 200, moves: [
      { name: 'Extreme Speed', mana: 0, lifesteal: 0.4, power: 180, cd: 0, desc: 'Blazing fast strike' },
      { name: 'Flare Blitz', mana: 40, power: 500, cd: 6, desc: 'Reckless fire charge' },
      { name: 'Wild Charge', mana: 35, stunTurns: 1, power: 420, cd: 5, desc: 'Electric tackle' },
      { name: 'Eruption', mana: 130, power: 1400, cd: 16, truedmg: true, desc: 'ULT: volcanic explosion' }
    ]},
    { id: 77, name: 'Ponyta', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/77.png', maxMana: 500, mana: 500, armor: 70, moves: [
      { name: 'Stomp', mana: 0, power: 150, cd: 0, desc: 'Heavy stomp' },
      { name: 'Flame Charge', mana: 25, lifesteal: 0.3, power: 320, cd: 4, desc: 'Speed-boosting fire' },
      { name: 'Agility', mana: 20, power: 0, cd: 6, desc: 'Raises speed' },
      { name: 'Inferno', mana: 130, power: 1100, cd: 12, stunTurns: 1, desc: 'High-power burn' }
    ]},
    { id: 78, name: 'Rapidash', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/78.png', maxMana: 500, mana: 500, armor: 120, moves: [
      { name: 'Megahorn', mana: 0, lifesteal: 0.35, power: 200, cd: 0, desc: 'Powerful horn charge' },
      { name: 'Flare Blitz', mana: 40, power: 480, cd: 6, desc: 'Reckless fire rush' },
      { name: 'High Horsepower', mana: 45, stunTurns: 1, power: 450, cd: 7, desc: 'Ground stomp' },
      { name: 'Solar Beam', mana: 130, power: 1300, cd: 14, truedmg: true, desc: 'Charging solar attack' }
    ]},
    { id: 126, name: 'Magmar', types: ['fire'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/126.png', maxMana: 500, mana: 500, armor: 150, moves: [
      { name: 'Fire Punch', mana: 0, lifesteal: 0.35, power: 180, cd: 0, desc: 'Burning fist' },
      { name: 'Confuse Ray', mana: 25, stunTurns: 2, power: 0, cd: 5, desc: 'Confuses foe' },
      { name: 'Smokescreen', mana: 20, power: 0, cd: 5, desc: 'Lowers accuracy' },
      { name: 'Lava Plume', mana: 110, power: 1100, cd: 12, truedmg: true, desc: 'AoE fire burst' }
    ]}
  ],
  Water: [
    { id: 7, name: 'Squirtle', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', maxMana: 500, mana: 500, armor: 100, moves: [
      { name: 'Tackle', mana: 0, lifesteal: 0.3, power: 120, cd: 0, desc: 'Basic charge' },
      { name: 'Water Gun', mana: 20, power: 260, cd: 3, desc: 'Water jet' },
      { name: 'Bubble', mana: 25, stunTurns: 1, power: 380, cd: 5, desc: 'Slows foe' },
      { name: 'Hydro Pump', mana: 120, power: 1300, cd: 14, truedmg: true, desc: 'ULT: massive water blast' }
    ]},
    { id: 8, name: 'Wartortle', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png', maxMana: 500, mana: 500, armor: 150, moves: [
      { name: 'Rapid Spin', mana: 0, power: 140, cd: 0, desc: 'Spinning attack' },
      { name: 'Water Pulse', mana: 30, stunTurns: 1, power: 350, cd: 4, desc: 'Confusing water wave' },
      { name: 'Aqua Tail', mana: 40, lifesteal: 0.3, power: 420, cd: 6, desc: 'Powerful tail whip' },
      { name: 'Hydro Cannon', mana: 120, power: 1400, cd: 16, truedmg: true, desc: 'ULT: devastating cannon' }
    ]},
    { id: 9, name: 'Blastoise', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png', maxMana: 500, mana: 500, armor: 250, moves: [
      { name: 'Skull Bash', mana: 0, power: 200, cd: 0, desc: 'Charging headbutt' },
      { name: 'Hydro Pump', mana: 90, power: 500, cd: 6, desc: 'High-pressure water' },
      { name: 'Dark Pulse', mana: 80, stunTurns: 1, power: 450, cd: 6, desc: 'Dark energy wave' },
      { name: 'Hydro Cannon', mana: 150, power: 1500, cd: 16, truedmg: true, lifesteal: 0.25, desc: 'ULT: ultimate water blast' }
    ]},
    { id: 54, name: 'Psyduck', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png', maxMana: 500, mana: 500, armor: 80, moves: [
      { name: 'Confusion', mana: 0, power: 130, cd: 0, desc: 'Psychic attack' },
      { name: 'Water Gun', mana: 90, lifesteal: 0.35, power: 300, cd: 6, desc: 'Water jet' },
      { name: 'Zen Headbutt', mana: 100, stunTurns: 1, power: 400, cd: 10, desc: 'Psychic headbutt' },
      { name: 'Hydro Pump', mana: 150, power: 1300, cd: 24, truedmg: true, desc: 'ULT: massive water' }
    ]},
    { id: 55, name: 'Golduck', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/55.png', maxMana: 500, mana: 500, armor: 130, moves: [
      { name: 'Aqua Jet', mana: 0, lifesteal: 0.4, power: 150, cd: 0, desc: 'Fast water dash' },
      { name: 'Psychic', mana: 40, power: 420, cd: 5, desc: 'Strong psychic blast' },
      { name: 'Hydro Pump', mana: 50, stunTurns: 1, power: 480, cd: 6, desc: 'Powerful water stream' },
      { name: 'Future Sight', mana: 180, power: 1350, cd: 15, truedmg: true, desc: 'ULT: delayed psychic' }
    ]},
    { id: 60, name: 'Poliwag', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/60.png', maxMana: 500, mana: 500, armor: 60, moves: [
      { name: 'Bubble', mana: 0, stunTurns: 1, power: 120, cd: 0, desc: 'Bubbles slow foe' },
      { name: 'Water Gun', mana: 60, power: 260, cd: 3, desc: 'Water jet' },
      { name: 'Hypnosis', mana: 90, power: 0, cd: 6, stunTurns:2, desc: 'Puts foe to sleep' },
      { name: 'Hydro Pump', mana: 130, power: 1250, cd: 14, truedmg: true, desc: 'ULT: water cannon' }
    ]},
    { id: 61, name: 'Poliwhirl', types: ['water'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/61.png', maxMana: 500, mana: 500, armor: 100, moves: [
      { name: 'Body Slam', mana: 0, lifesteal: 0.35, power: 180, cd: 0, desc: 'Heavy slam' },
      { name: 'Water Pulse', mana: 50, stunTurns: 1, power: 380, cd: 8, desc: 'Confusing wave' },
      { name: 'Mud Shot', mana: 80, power: 300, cd: 5, desc: 'Lowers speed' },
      { name: 'Hydro Pump', mana: 120, power: 1400, cd: 15, truedmg: true, desc: 'ULT: water blast' }
    ]},
    { id: 62, name: 'Poliwrath', types: ['water','fighting'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png', maxMana: 500, mana: 500, armor: 200, moves: [
      { name: 'Dynamic Punch', mana: 0, stunTurns: 2, power: 250, cd: 0, desc: 'Confusing punch' },
      { name: 'Aqua Tail', mana: 80, lifesteal: 0.3, power: 450, cd: 6, desc: 'Powerful tail' },
      { name: 'Close Combat', mana: 110, power: 600, cd: 12, desc: 'Full-power barrage' },
      { name: 'Hydro Vortex', mana: 150, power: 1500, cd: 16, truedmg: true, desc: 'ULT: crushing vortex' }
    ]},
    { id: 72, name: 'Tentacool', types: ['water','poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/72.png', maxMana: 500, mana: 500, armor: 80, moves: [
      { name: 'Poison Sting', mana: 0, power: 130, cd: 0, desc: 'Poisonous sting' },
      { name: 'Water Pulse', mana: 75, stunTurns: 1, power: 340, cd: 4, desc: 'Confusing water' },
      { name: 'Acid', mana: 89, lifesteal: 0.2, power: 280, cd: 5, desc: 'Lowers defense' },
      { name: 'Sludge Bomb', mana: 130, power: 1100, cd: 12, truedmg: true, desc: 'Toxic explosion' }
    ]},
    { id: 73, name: 'Tentacruel', types: ['water','poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/73.png', maxMana: 500, mana: 500, armor: 150, moves: [
      { name: 'Sludge Wave', mana: 0, power: 100, cd: 0, desc: 'Toxic wave' },
      { name: 'Hydro Pump', mana: 100, power: 500, cd: 6, desc: 'High-pressure water' },
      { name: 'Toxic Spikes', mana: 35, stunTurns: 2, power: 0, cd: 7, desc: 'Poison field' },
      { name: 'Gunk Shot', mana: 120, power: 1400, cd: 16, truedmg: true, lifesteal: 0.3, desc: 'ULT: massive poison' }
    ]}
  ],
  Normal: [
    { id: 19, name: 'Rattata', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/19.png', maxMana: 500, mana: 500, armor: 40, moves: [
      { name: 'Tackle', mana: 0, power: 120, cd: 0, desc: 'Basic charge' },
      { name: 'Quick Attack', mana: 90, power: 280, cd: 3, desc: 'Fast strike' },
      { name: 'Bite', mana: 85, power: 350, cd: 4, desc: 'Sharp bite' },
      { name: 'Hyper Fang', mana: 100, power: 900, cd: 12, desc: 'Powerful bite' }
    ]},
    { id: 20, name: 'Raticate', types: ['normal'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png', maxMana: 500, mana: 500, armor: 90, moves: [
      { name: 'Super Fang', mana: 0, power: 120, cd: 0, desc: 'Halves enemy HP' },
      { name: 'Crunch', mana: 75, power: 400, cd: 5, desc: 'Dark bite' },
      { name: 'Hyper Fang', mana: 80, power: 500, cd: 6, desc: 'Strong bite' },
      { name: 'Double-Edge', mana: 120, power: 1300, cd: 14, desc: 'Reckless charge' }
    ]},
    { id: 16, name: 'Pidgey', types: ['normal','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png', maxMana: 500, mana: 500, armor: 50, moves: [
      { name: 'Gust', mana: 0, power: 130, cd: 0, desc: 'Wind blast' },
      { name: 'Quick Attack', mana: 60, power: 300, cd: 3, desc: 'Fast strike' },
      { name: 'Wing Attack', mana: 80, power: 380, cd: 4, desc: 'Wing strike' },
      { name: 'Aerial Ace', mana: 150, power: 1000, cd: 12, desc: 'Accurate air strike' }
    ]},
    { id: 17, name: 'Pidgeotto', types: ['normal','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png', maxMana: 500, mana: 500, armor: 100, moves: [
      { name: 'Wing Attack', mana: 0, power: 160, cd: 0, desc: 'Wing strike' },
      { name: 'Air Cutter', mana: 80, power: 350, cd: 4, desc: 'Sharp wind blades' },
      { name: 'Aerial Ace', mana: 85, power: 450, cd: 5, desc: 'Accurate air slash' },
      { name: 'Hurricane', mana: 120, power: 1300, cd: 14, desc: 'ULT: storm blast' }
    ]},
    { id: 18, name: 'Pidgeot', types: ['normal','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png', maxMana: 500, mana: 500, armor: 150, moves: [
      { name: 'Gust', mana: 0, power: 110, cd: 0, desc: 'Strong wind' },
      { name: 'Air Slash', mana: 100, power: 420, cd: 5, desc: 'Sharp air blade' },
      { name: 'Brave Bird', mana: 120, power: 800, cd: 8, desc: 'Reckless dive' },
      { name: 'Hyper Beam', mana: 150, power: 1500, cd: 16, desc: 'ULT: massive beam' }
    ]},
    { id: 21, name: 'Spearow', types: ['normal','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/21.png', maxMana: 500, mana: 500, armor: 60, moves: [
      { name: 'Peck', mana: 0, power: 130, cd: 0, desc: 'Sharp peck' },
      { name: 'Aerial Ace', mana: 75, power: 220, cd: 4, desc: 'Accurate air strike' },
      { name: 'Drill Peck', mana: 80, power: 800, cd: 6, desc: 'Spinning peck' },
      { name: 'Fury Attack', mana: 120, power: 1200, cd: 8, desc: 'Multiple hits' }
    ]},
    { id: 22, name: 'Fearow', types: ['normal','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png', maxMana: 500, mana: 500, armor: 120, moves: [
      { name: 'Drill Peck', mana: 0, power: 200, cd: 0, desc: 'Spinning beak' },
      { name: 'Aerial Ace', mana: 90, power: 420, cd: 5, desc: 'Accurate air slash' },
      { name: 'Roost', mana: 95, heal: 200,power: 0, cd: 6, desc: 'Heals HP' },
      { name: 'Brave Bird', mana: 70, power: 1300, cd: 14, desc: 'ULT: reckless dive' }
    ]},
    { id: 83, name: 'Farfetch\'d', types: ['normal','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/83.png', maxMana: 500, mana: 500, armor: 80, moves: [
      { name: 'Leaf Blade', mana: 0, power: 250, cd: 0, desc: 'Sharp leek slash' },
      { name: 'Air Cutter', mana: 90, power: 350, cd: 4, desc: 'Wind blades' },
      { name: 'Swords Dance', mana: 95, power: 400, cd: 6, desc: 'Raises attack' },
      { name: 'Brave Bird', mana: 120, power: 1200, cd: 14, desc: 'ULT: aerial dive' }
    ]},
    { id: 84, name: 'Doduo', types: ['normal','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/84.png', maxMana: 500, mana: 500, armor: 70, moves: [
      { name: 'Peck', mana: 0, power: 130, cd: 0, desc: 'Dual peck' },
      { name: 'Quick Attack', mana: 75, power: 300, cd: 3, desc: 'Fast strike' },
      { name: 'Tri Attack', mana: 80, power: 450, cd: 6, desc: 'Triple element' },
      { name: 'Drill Peck', mana: 100, power: 1000, cd: 12, desc: 'Spinning attack' }
    ]},
    { id: 85, name: 'Dodrio', types: ['normal','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/85.png', maxMana: 500, mana: 500, armor: 130, moves: [
      { name: 'Tri Attack', mana: 0, power: 220, cd: 0, desc: 'Triple element' },
      { name: 'Drill Peck', mana: 70, power: 480, cd: 6, desc: 'Spinning peck' },
      { name: 'Fury Attack', mana: 90, power: 600, cd: 15, desc: 'Multiple hits' },
      { name: 'Hyper Beam', mana: 150, power: 1500, cd: 24, desc: 'ULT: massive beam' }
    ]}
  ],
  Poison: [
    { id: 1, name: 'Bulbasaur', types: ['grass','poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', maxMana: 500, mana: 500, armor: 80, moves: [
      { name: 'Vine Whip', mana: 0, power: 140, cd: 0, desc: 'Grass whip' },
      { name: 'Poison Powder', mana: 70, power: 400, cd: 8, desc: 'Poisons foe' },
      { name: 'Razor Leaf', mana: 80, power: 350, cd: 4, desc: 'Sharp leaves' },
      { name: 'Petal Dance', mana: 120, power: 1200, cd: 18, desc: 'ULT: swirling petals' }
    ]},
    { id: 2, name: 'Ivysaur', types: ['grass','poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png', maxMana: 500, mana: 500, armor: 120, moves: [
      { name: 'Thrust', mana: 0, power: 160, cd: 0, desc: 'Strong whip' },
      { name: 'Poison Bomb', mana: 90, power: 400, cd: 8, desc: 'Poisons foe' },
      { name: 'Seed Bomb', mana: 80, power: 420, cd: 13, desc: 'Explosive seeds' },
      { name: 'Solar Beam', mana: 140, power: 1400, cd: 16, desc: 'ULT: solar blast' }
    ]},
    { id: 3, name: 'Venusaur', types: ['grass','poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png', maxMana: 500, mana: 500, armor: 200, moves: [
      { name: 'Petal Dance', mana: 0, power: 120, cd: 0, desc: 'Swirling petals' },
      { name: 'Sludge Bomb', mana: 80, power: 200, cd: 7, desc: 'Toxic explosion' },
      { name: 'Giga Drain', mana: 104, lifesteal: 0.4, power: 450, cd: 6, desc: 'Drains HP' },
      { name: 'Frenzy Plant', mana: 150, power: 1600, cd: 18, desc: 'ULT: massive plants' }
    ]},
    { id: 23, name: 'Ekans', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/23.png', maxMana: 500, mana: 500, armor: 70, moves: [
      { name: 'Poison Sting', mana: 0, power: 130, cd: 0, desc: 'Poisonous sting' },
      { name: 'Bite', mana: 90, power: 280, cd: 3, desc: 'Sharp bite' },
      { name: 'Acid', mana: 95, power: 320, cd: 4, desc: 'Lowers defense' },
      { name: 'Glare', mana: 150, stunTurns: 2, power: 1200, cd: 22, desc: 'Paralyzes foe' }
    ]},
    { id: 24, name: 'Arbok', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png', maxMana: 500, mana: 500, armor: 130, moves: [
      { name: 'Poison Fang', mana: 0, power: 180, cd: 0, desc: 'Strong poison bite' },
      { name: 'Crunch', mana: 90, power: 420, cd: 5, desc: 'Dark bite' },
      { name: 'Acid Spray', mana: 80, power: 380, cd: 10, stunTurns: 2, desc: 'Lowers defense' },
      { name: 'Gunk Shot', mana: 130, power: 1300, cd: 23, desc: 'ULT: toxic blast' }
    ]},
    { id: 29, name: 'Nidoran♀', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/29.png', maxMana: 500, mana: 500, armor: 60, moves: [
      { name: 'Poison Sting', mana: 0, power: 130, cd: 0, desc: 'Poison sting' },
      { name: 'Double Kick', mana: 120, power: 280, cd: 3, desc: 'Double kick' },
      { name: 'Bite', mana: 80, power: 400, cd: 4, lifesteal: 0.5, desc: 'Sharp bite' },
      { name: 'Poison Jab', mana: 160, power: 1550, cd: 22, lifesteal: 0.4, desc: 'Strong poison strike' }
    ]},
    { id: 30, name: 'Nidorina', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/30.png', maxMana: 500, mana: 500, armor: 100, moves: [
      { name: 'Poison Tail', mana: 0, power: 150, cd: 0, desc: 'Poisonous tail' },
      { name: 'Crunch', mana: 85, power: 400, cd: 5, lifesteal: 0.3, desc: 'Dark bite' },
      { name: 'Poison Fang', mana: 80, power: 380, cd: 8, lifesteal: 0.6, desc: 'Strong bite' },
      { name: 'Sludge Bomb', mana: 120, power: 1200, cd: 14, stunTurns: 2, desc: 'Toxic explosion' }
    ]},
    { id: 31, name: 'Nidoqueen', types: ['poison','ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/31.png', maxMana: 500, mana: 500, armor: 220, moves: [
      { name: 'Earth Power', mana: 0, power: 400, cd: 0, desc: 'Ground blast' },
      { name: 'Sludge Wave', mana: 75, power: 600, cd: 12, desc: 'Toxic wave' },
      { name: 'Poison Jab', mana: 80, power: 480, cd: 6, desc: 'Poison strike' },
      { name: 'Superpower', mana: 135, power: 1400, cd: 18, desc: 'ULT: full power' }
    ]},
    { id: 32, name: 'Nidoran♂', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png', maxMana: 500, mana: 500, armor: 60, moves: [
      { name: 'Peck', mana: 0, power: 130, cd: 0, desc: 'Sharp peck' },
      { name: 'Poison Sting', mana: 60, power: 280, cd: 3, desc: 'Poison sting' },
      { name: 'Horn Attack', mana: 75, power: 350, cd: 4, desc: 'Horn strike' },
      { name: 'Poison Jab', mana: 120, power: 1000, lifesteal: 0.7, cd: 22, desc: 'Strong poison' }
    ]},
    { id: 33, name: 'Nidorino', types: ['poison'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/33.png', maxMana: 500, mana: 500, armor: 100, moves: [
      { name: 'Poison Sting', mana: 0, power: 140, cd: 0, desc: 'Poison sting' },
      { name: 'Reverse Mana', mana: 100, power: 0, cd: 6, heal: 200, desc: 'Turn Mana into Heal' },
      { name: 'Poison Jab', mana: 90, power: 420, cd: 5, desc: 'Strong poison' },
      { name: 'Sludge Bomb', mana: 140, power: 1560, cd: 19, desc: 'Toxic explosion' }
    ]}
  ],
  Dragon: [
    { id: 147, name: 'Dratini', types: ['dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/147.png', maxMana: 500, mana: 500, armor: 80, moves: [
      { name: 'Wrap', mana: 0, power: 130, cd: 0, desc: 'Squeezes foe' },
      { name: 'Dragon Rage', mana: 80, power: 200, cd: 4, desc: 'Fixed 200 damage' },
      { name: 'Thunder Wave', mana: 85, stunTurns: 2, power: 280, cd: 5, desc: 'Paralyzes foe' },
      { name: 'Dragon Tail', mana: 130, power: 1466, cd: 21, desc: 'Forces switch' }
    ]},
    { id: 148, name: 'Dragonair', types: ['dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/148.png', maxMana: 500, mana: 500, armor: 140, moves: [
      { name: 'Dragon Tail', mana: 0, power: 180, cd: 0, desc: 'Forces switch' },
      { name: 'Aqua Tail', mana: 75, power: 420, cd: 5, desc: 'Water tail whip' },
      { name: 'Dragon Pulse', mana: 90, power: 480, cd: 6, desc: 'Dragon energy' },
      { name: 'Dragon Dance', mana: 130, power: 1430, cd: 24, lifesteal: 0.4, stunTurns: 2, desc: 'Boosts attack/speed' }
    ]},
    { id: 149, name: 'Dragonite', types: ['dragon','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png', maxMana: 500, mana: 500, armor: 220, moves: [
      { name: 'Dragon Claw', mana: 0, power: 90, cd: 0, desc: 'Powerful claw' },
      { name: 'Dragon Rush', mana: 80, power: 200, cd: 7, desc: 'Reckless charge' },
      { name: 'Hurricane', mana: 85, power: 235, cd: 10, desc: 'Storm blast' },
      { name: 'Outrage', mana: 120, power: 1500, cd: 16, desc: 'ULT: raging dragon' }
    ]},
    { id: 130, name: 'Gyarados', types: ['water','flying'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png', maxMana: 500, mana: 500, armor: 250, moves: [
      { name: 'Bite', mana: 0, power: 85, cd: 0, desc: 'Strong bite' },
      { name: 'Dragon Dance', mana: 90, power: 0, heal: 280, cd: 6, desc: 'Boosts stats' },
      { name: 'Aqua Tail', mana: 40, power: 450, cd: 6, desc: 'Water tail' },
      { name: 'Hydro Pump', mana: 150, power: 1400, cd: 24, desc: 'ULT: massive water' }
    ]},
    { id: 6, name: 'Mega-Charizard X', types: ['fire','dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', maxMana: 500, mana: 500, armor: 300, moves: [
      { name: 'Dragon Claw', mana: 0, power: 280, cd: 0, desc: 'Dragon claw' },
      { name: 'Flare Blitz', mana: 80, power: 160, cd: 8, desc: 'Reckless fire' },
      { name: 'Dragon Rush', mana: 95, power: 300, cd: 7, desc: 'Dragon charge' },
      { name: 'Blast Burn', mana: 160, power: 1600, cd: 18, desc: 'ULT: apocalyptic fire' }
    ]},
    { id: 329, name: 'Trapinch', types: ['ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/329.png', maxMana: 500, mana: 500, armor: 100, moves: [
      { name: 'Bite', mana: 0, power: 180, cd: 0, desc: 'Strong bite' },
      { name: 'Sand Tomb', mana: 95, power: 300, cd: 11, desc: 'Traps foe' },
      { name: 'Faint Attack', mana: 100, power: 320, cd: 12, desc: 'Sure-hit attack' },
      { name: 'Earthquake', mana: 120, power: 1350, cd: 24, desc: 'ULT: ground shake' }
    ]},
    { id: 330, name: 'Vibrava', types: ['ground','dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/330.png', maxMana: 500, mana: 500, armor: 130, moves: [
      { name: 'Dragon Breath', mana: 0, power: 120, cd: 0, desc: 'Dragon wind' },
      { name: 'Air Slash', mana: 80, power: 220, cd: 5, desc: 'Sharp air blade' },
      { name: 'Earth Power', mana: 120, power: 550, cd: 8, desc: 'Ground blast' },
      { name: 'Dragon Pulse', mana: 150, power: 1400, cd: 23, desc: 'Dragon energy' }
    ]},
    { id: 331, name: 'Flygon', types: ['ground','dragon'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/331.png', maxMana: 500, mana: 500, armor: 180, moves: [
      { name: 'Dragon Claw', mana: 0, power: 110, cd: 0, desc: 'Powerful claw' },
      { name: 'Earthquake', mana: 90, power: 220, cd: 8, desc: 'Ground shake' },
      { name: 'Dragon Rush', mana: 95, power: 240, cd: 12, lifesteal: 0.4, desc: 'Dragon charge' },
      { name: 'Draco Meteor', mana: 145, power: 1600, cd: 18, desc: 'ULT: meteor storm' }
    ]},
    { id: 246, name: 'Larvitar', types: ['rock','ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/246.png', maxMana: 500, mana: 500, armor: 120, moves: [
      { name: 'Bite', mana: 0, power: 80, cd: 0, desc: 'Strong bite' },
      { name: 'Rock Throw', mana: 85, power: 450, cd: 4, desc: 'Rock toss' },
      { name: 'Sandstorm', mana: 100, power: 0, stunTurns: 3, cd: 7, desc: 'Weather damage' },
      { name: 'Earthquake', mana: 120, power: 1300, cd: 17, desc: 'ULT: ground shake' }
    ]},
    { id: 247, name: 'Pupitar', types: ['rock','ground'], sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/247.png', maxMana: 500, mana: 500, armor: 200, moves: [
      { name: 'Rock Slide', mana: 0, power: 90, cd: 0, desc: 'Rock barrage' },
      { name: 'Earthquake', mana: 90, power: 325, cd: 8, desc: 'Ground shake' },
      { name: 'Crunch', mana: 103, power: 555, cd: 12, lifesteal: 0.4, desc: 'Dark bite' },
      { name: 'Stone Edge', mana: 120, power: 1550, cd: 22, desc: 'ULT: sharp rocks' }
    ]}
  ]
};

const allFighters = Object.values(shopCatalog).flat();

window.getMyFighters = function() {
  const raw = localStorage.getItem('owned') || '';
  let ownedIds = [];

  try {
    const obj = JSON.parse(raw);
    if (Array.isArray(obj?.fighters)) ownedIds = obj.fighters;
  } catch (e) {
    const match = raw.match(/^fighters:(.+)$/);
    if (match) ownedIds = match[1].split(',').map(Number);
  }

  return allFighters.filter(f => ownedIds.includes(f.id));
};

// Expose the one thing that choose.js and battlesystem.js definitely expect
window.allFighters = allFighters;

console.log(`catalog.js → ${allFighters.length} fighters loaded & exposed globally as window.allFighters`);