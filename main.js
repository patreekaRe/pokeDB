
// Reorganized full main.js based on user's latest full code
// Everything wrapped properly inside DOMContentLoaded

document.addEventListener("DOMContentLoaded", function () {
  const sceneMap = {
    charmander: "url('https://wallpapercave.com/wp/wp4088416.jpg')", // volcano
    bulbasaur: "url('https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?fit=crop&w=1200&h=800')", // forest
    squirtle:   "url('https://wallpaperaccess.com/full/1702497.jpg')", // water cave
  
    cyndaquil:  "url('https://images.unsplash.com/photo-1619443137922-28c5410e86a2?fit=crop&w=1200&h=800')", // lava chasm
    chikorita:  "url('https://images.unsplash.com/photo-1613621048949-51e0a3918fd0?fit=crop&w=1200&h=800')", // peaceful grove
    totodile:   "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=1200&h=800')", // waterfall
  
    torchic:    "url('https://images.unsplash.com/photo-1506784242123-d1b27fb3c0d2?fit=crop&w=1200&h=800')", // ember cliffs
    treecko:    "url('https://images.unsplash.com/photo-1549887534-9e3cde4a91b3?fit=crop&w=1200&h=800')",   // jungle temple
    mudkip:     "url('https://images.unsplash.com/photo-1606741961634-0de9d30d4e8e?fit=crop&w=1200&h=800')"  // marsh
  };

  // const startBtn = document.getElementById('startGameButton');

  document.getElementById('red').onclick = partyRed;
  document.getElementById('green').onclick = partyGreen;
  document.getElementById('blue').onclick = partyBlue;

  document.getElementById('red2').onclick = partyRed2;
  document.getElementById('green2').onclick = partyGreen2;
  document.getElementById('blue2').onclick = partyBlue2;

  document.getElementById('red3').onclick = partyRed3;
  document.getElementById('green3').onclick = partyGreen3;
  document.getElementById('blue3').onclick = partyBlue3;

  // document.getElementById('Logo').onclick = partyLogo;

  let currentPokemon = null;
  let evolutionStage = 0;

  const enemies = {
    ashroot: {
      name: "Ashroot 🌿",
      type: "Grass",
      hp: 60,
      sprite: "https://i.imgur.com/ZsKTW3A.png",
      description: "A sneaky vine beast that drains XP."
    },
    blazeclaw: {
      name: "Blazeclaw 🔥",
      type: "Fire",
      hp: 80,
      sprite: "https://example.com/blazeclaw.png",
      description: "An aggressive predator with blazing strikes."
    },
    aquaeye: {
      name: "Aquaeye 💧",
      type: "Water",
      hp: 70,
      sprite: "https://example.com/aquaeye.png",
      description: "This enemy floods the battlefield and hides behind waves."
    }


  };
  // function getRandomEnemyId() {
  //   const keys = Object.keys(enemies);
  //   const randomIndex = Math.floor(Math.random() * keys.length);
  //   return keys[randomIndex];
  // }
  function randomEncounter() {
    const keys = Object.keys(enemies);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  }
  window.randomEncounter = randomEncounter;
  function getTypeFromPokemon(pokemon) {
    const typeMap = {
      charmander: "fire",
      cyndaquil: "fire",
      torchic: "fire",
      bulbasaur: "grass",
      chikorita: "grass",
      treecko: "grass",
      squirtle: "water",
      totodile: "water",
      mudkip: "water"
    };
    return typeMap[pokemon] || "normal";
  }

  const startBtn = document.getElementById("main-action-button");
  const remoteControl = document.querySelector(".remoteControl");
  let hasChosen = false;
  // startBtn.addEventListener('click', () => {
  //   if (!currentPokemon) return;

  //   document.getElementById('starter-screen').style.display = 'none';
  //   document.getElementById('deck-builder').style.display = 'block';

  // });
  startBtn.addEventListener("click", () => {
    if (!hasChosen && !currentPokemon) {
      // Show/hide the drop bar of starters
      remoteControl.classList.toggle("show");
      startBtn.textContent = remoteControl.classList.contains("show")
        ? "Hide Starters"
        : "Choose Your Starter";
      return;
    }

    if (!hasChosen && currentPokemon) {
      startBtn.textContent = "Start Game";
      hasChosen = true;
    } else if (hasChosen) {
      document.getElementById("starter-screen").style.display = "none";
      document.getElementById("deck-builder").style.display = "block";
    }
    
  
    if (!hasChosen && currentPokemon) {
      startBtn.textContent = "Start Game";
      hasChosen = true;
    } else if (hasChosen) {
      document.getElementById("starter-screen").style.display = "none";
      document.getElementById("deck-builder").style.display = "block";
    }
  });

  // window.startBattle = function () {
  //   document.getElementById('deck-builder').style.display = 'none';
  //   document.getElementById('battle-screen').style.display = 'block';

  //   document.getElementById('battle-screen').innerHTML = `
  //     <h2>Battle Start!</h2>
  //     <p>You are battling with ${currentPokemon.toUpperCase()}!</p>
  //     <div class="enemy-card">
  //       <h3>Enemy: Ashroot 🌿</h3>
  //       <img src="https://i.imgur.com/ZsKTW3A.png" style="width: 120px;">
  //       <p>HP: 60</p>
  //     </div>
  //   `;
  // }
  const typeEffectiveness = {
    fire: { strongAgainst: "grass", weakAgainst: "water" },
    water: { strongAgainst: "fire", weakAgainst: "grass" },
    grass: { strongAgainst: "water", weakAgainst: "fire" }
  };
  window.startBattleWith = function(enemyId) {
    if (!currentPokemon) {
      alert("Please select your starter first!");
      return;
    }
    
    const enemy = enemies[enemyId];
    
    const playerType = getTypeFromPokemon(currentPokemon); // you’ll add this next
    const enemyType = enemy.type.toLowerCase();
    let effectivenessNote = "";

if (typeEffectiveness[playerType]) {
  if (typeEffectiveness[playerType].strongAgainst === enemyType) {
    effectivenessNote = "<p style='color: green;'>Your type is super effective!</p>";
  } else if (typeEffectiveness[playerType].weakAgainst === enemyType) {
    effectivenessNote = "<p style='color: red;'>Your type is weak against this enemy!</p>";
  }
}
  
    if (!enemy) {
      alert("Enemy not found!");
      return;
    }

    document.getElementById('deck-builder').style.display = 'none';
    document.getElementById('battle-screen').style.display = 'block';

    // 1️⃣ Calculate the dynamic HP *before* writing HTML
    const deckSize = document.querySelectorAll('.deck-slot-area .card-container').length;
    const scaledHP = enemy.hp + deckSize * 10;

// 2️⃣ Then render HTML and insert the value
    document.getElementById('battle-screen').innerHTML = `
      <h2>Battle Start!</h2>
      <p>You are battling with ${currentPokemon.toUpperCase()}!</p>
      <div class="enemy-card">
        <h3>Enemy: ${enemy.name}</h3>
        <img src="${enemy.sprite}" style="width: 120px;">
        <p id="enemy-hp">HP: ${scaledHP}</p> <!-- ✅ You can now use the variable -->
        <p style="font-style: italic;">${enemy.description}</p>
      </div>
      ${effectivenessNote}
`;
  
    // document.getElementById('battle-screen').innerHTML = `
    //   <h2>Battle Start!</h2>
    //   <p>You are battling with ${currentPokemon.toUpperCase()}!</p>
    //   <div class="enemy-card">
    //     <h3>Enemy: ${enemy.name}</h3>
    //     <img src="${enemy.sprite}" style="width: 120px;">

    //     const deckSize = document.querySelectorAll('.deck-slot-area .card-container').length;
    //     const scaledHP = enemy.hp + deckSize * 10; // each card adds 10 HP

    //     <p>HP: ${scaledHP}</p>

    //     <p style="font-style: italic;">${enemy.description}</p>
    //   </div>
    //   ${effectivenessNote}
    // `;
  }

  // All your original functions go below (unchanged from what you just shared)

  // PLACEHOLDER: Paste everything from your message here (all partyRed, evolvePokemon, etc.)

// 4. Define the evolvePokemon() function

  function evolvePokemon() {
    if (!currentPokemon) return;
  
    const img = document.getElementById('pokemonImg');
  
    // ✅ RESET size before evolving (always start clean)
    img.style.width = '200px';
    img.style.marginLeft = '-100px';
  
    if (currentPokemon === 'charmander') {
      if (evolutionStage === 0) {
        img.classList.remove('animate');
        // 🧡 Evolve to Charmeleon
        img.src = 'https://media.tenor.com/fk9-MPwwo60AAAAj/pok%C3%A9mon-charmeleongif.gif';
        startBtn.innerText = 'Charmeleon!';
        evolutionStage = 1;
  
        // ✅ Resize Charmeleon
        img.style.width = '125px';
        img.style.marginLeft = '-65px';
        img.style.top = '373px';           // optional: tweak vertical alignment
        img.style.left = '50%';
  
        // ✅ Animate
        img.classList.add('animate');
        setTimeout(() => img.classList.remove('animate'), 800);
  
      } else if (evolutionStage === 1) {
        // 🔴 Evolve to Charizard
        const newSrc = 'https://media0.giphy.com/media/SnctJfY81x2XC/giphy.gif';
        const preloaded = new Image();
        preloaded.src = newSrc;
      
        preloaded.onload = () => {
          img.src = newSrc;
          startBtn.innerText = 'Charizard';
          evolutionStage = 2;
      
          // ✅ Resize Charizard
          img.style.width = '400px';
          img.style.marginLeft = '-200px';
          img.style.top = '200px';
          img.style.left = '50%';
      
          // ✅ Animate
          img.classList.add('animate');
          setTimeout(() => img.classList.remove('animate'), 800);
        };
      } else {
        // 🔁 Loop back to Charmander
      
        const img = document.getElementById('pokemonImg');
      
        // ✅ FULL reset (clears leftover animation)
        img.style.animation = 'none';
        img.offsetHeight; // 🧼 force reflow
        img.style.animation = null;
      
        img.classList.remove('animate'); // just in case
      
        img.src = 'https://media.tenor.com/hLfJG3B_ZLIAAAAj/charmander-gif-pokemon.gif';
        startBtn.innerText = 'Charmander!';
        evolutionStage = 0;
      
        img.style.width = '125px';
        img.style.marginLeft = '-65px';
        img.style.top = '373px';
        img.style.left = '50%';
      
        // ❌ NO animate class added
      }
    }
  }

function partyLogo() {
  currentPokemon = null;
  evolutionStage = 0;
  startBtn.innerText = 'Choose your Pokémon!';
  startBtn.classList.add('disabled');
  startBtn.classList.remove('active');

  const img = document.getElementById('pokemonImg');
  img.src = '';
  img.style.display = 'none';

  document.body.style.backgroundColor = 'rgb(255, 247, 222)';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundSize = '500px 300px';
  document.body.style.backgroundPosition = 'center';
  document.body.style.backgroundPositionY = '290px';
  const trainerBg = document.getElementById('trainerBackground');
trainerBg.style.backgroundImage = '';
setTimeout(() => {
  trainerBg.style.backgroundImage = "url('https://i.pinimg.com/originals/a7/bc/5e/a7bc5e24c5695d8ad44d6271b44e288d.gif?" + new Date().getTime() + "')";
}, 20);
}

function partyChoose() {
  document.body.style.backgroundColor = 'rgb(255, 247, 222)';
  // document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/a7/bc/5e/a7bc5e24c5695d8ad44d6271b44e288d.gif?" + new Date().getTime() + "')";
  document.querySelector('h1').style.color = 'white'
  document.querySelector('h2').style.color = 'black'
  document.querySelector('body').style.backgroundRepeat = 'no-repeat'
  document.querySelector('body').style.backgroundSize = '500px 300px'
  document.body.style.backgroundPosition = "center"
  document.body.style.backgroundPositionY = '290px'
}

function partyRed() {
  document.querySelectorAll('.poke-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('red').classList.add('selected');
  currentPokemon = 'charmander';
  evolutionStage = 0;
  hasChosen = true;
  startBtn.innerText = 'Start Game';
  startBtn.classList.remove('disabled');
  startBtn.classList.add('active');

  const scene = document.getElementById('scene-overlay');
  scene.style.backgroundImage = sceneMap[currentPokemon];
  scene.classList.remove('scene-transition'); // reset animation
  void scene.offsetWidth; // trigger reflow
  scene.classList.add('scene-transition'); // re-apply animation

  document.body.style.backgroundColor = 'rgb(161, 14, 14)';
  const img = document.getElementById('pokemonImg');
  img.src = 'https://media.tenor.com/hLfJG3B_ZLIAAAAj/charmander-gif-pokemon.gif';
  img.style.display = 'block';
  img.style.top = '373px';
  img.style.left = '50%';            // Keep centered anchor
  img.style.marginLeft = '-65px';   // Move slightly to the LEFT (default: -100px)
  img.style.width = '125px'; // default size
}

function partyGreen() {
  document.querySelectorAll('.poke-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('green').classList.add('selected');
  currentPokemon = 'bulbasaur';
  evolutionStage = 0;
  hasChosen = true;
  startBtn.innerText = 'Start Game';
  startBtn.classList.remove('disabled');
  startBtn.classList.add('active');

  const scene = document.getElementById('scene-overlay');
  scene.style.backgroundImage = sceneMap[currentPokemon];
  scene.classList.remove('scene-transition'); // reset animation
  void scene.offsetWidth; // trigger reflow
  scene.classList.add('scene-transition'); // re-apply animation

  document.body.style.backgroundColor = 'rgb(53, 163, 2)';
  const img = document.getElementById('pokemonImg');
  img.src = 'https://user-images.githubusercontent.com/37589213/52086676-d41dce00-25a7-11e9-89fe-51a2aef284a9.gif';
  img.style.display = 'block';
  img.style.top = '410px';
  img.style.left = '50%';            // Keep centered anchor
  img.style.marginLeft = '-60px';   // Move slightly to the LEFT (default: -100px)
  img.style.width = '125px'; // default size
}

function partyBlue() {
  document.querySelectorAll('.poke-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('blue').classList.add('selected');
  currentPokemon = 'squirtle';
  evolutionStage = 0;
  hasChosen = true;
  startBtn.innerText = 'Start Game';
  startBtn.classList.remove('disabled');
  startBtn.classList.add('active');

  const scene = document.getElementById('scene-overlay');
  scene.style.backgroundImage = sceneMap[currentPokemon];
  scene.classList.remove('scene-transition'); // reset animation
  void scene.offsetWidth; // trigger reflow
  scene.classList.add('scene-transition'); // re-apply animation

  document.body.style.backgroundColor = 'rgb(28, 145, 255)';
  const img = document.getElementById('pokemonImg');
  img.src = 'https://static.wikia.nocookie.net/pokeone/images/2/27/007Squirtle.gif';
  img.style.display = 'block';
  img.style.top = '410px';
  img.style.left = '50%';            // Keep centered anchor
  img.style.marginLeft = '-70px';   // Move slightly to the LEFT (default: -100px)
  img.style.width = '125px'; // default size
}

function partyRed2() {
  document.querySelectorAll('.poke-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('red2').classList.add('selected');
  currentPokemon = 'cyndaquil';
  evolutionStage = 0;
  hasChosen = true;
  startBtn.innerText = 'Start Game';
  startBtn.classList.remove('disabled');
  startBtn.classList.add('active');

  const scene = document.getElementById('scene-overlay');
  scene.style.backgroundImage = sceneMap[currentPokemon];
  scene.classList.remove('scene-transition'); // reset animation
  void scene.offsetWidth; // trigger reflow
  scene.classList.add('scene-transition'); // re-apply animation

  document.body.style.backgroundColor = 'rgba(231, 74, 26, 0.822)';
  const img = document.getElementById('pokemonImg');
  img.src = 'https://media.tenor.com/Q1GffEXQrgAAAAAj/cyndaquil-pokemon.gif';
  img.style.display = 'block';
  img.style.top = '380px';
  img.style.left = '50%';            // Keep centered anchor
  img.style.marginLeft = '-80px';   // Move slightly to the LEFT (default: -100px)
  img.style.width = '200px'; // default size
}

function partyGreen2() {
  document.querySelectorAll('.poke-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('green2').classList.add('selected');
  currentPokemon = 'chikorita';
  evolutionStage = 0;
  hasChosen = true;
  startBtn.innerText = 'Start Game';
  startBtn.classList.remove('disabled');
  startBtn.classList.add('active');

  const scene = document.getElementById('scene-overlay');
  scene.style.backgroundImage = sceneMap[currentPokemon];
  scene.classList.remove('scene-transition'); // reset animation
  void scene.offsetWidth; // trigger reflow
  scene.classList.add('scene-transition'); // re-apply animation

  document.body.style.backgroundColor = 'rgba(76, 197, 147, 0.822)';
  const img = document.getElementById('pokemonImg');
  img.src = 'https://64.media.tumblr.com/44f3f022e4b3a68709556f9f0d6fa92e/tumblr_noxx7oyhRP1scncwdo1_540.gif';
  img.style.display = 'block';
  img.style.top = '320px';
  img.style.left = '50%';
  img.style.marginLeft = '-174px';
  img.style.width = '400px';
}

function partyBlue2() {
  document.querySelectorAll('.poke-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('blue2').classList.add('selected');
  currentPokemon = 'totodile';
  evolutionStage = 0;
  hasChosen = true;
  startBtn.innerText = 'Start Game';
  startBtn.classList.remove('disabled');
  startBtn.classList.add('active');

  const scene = document.getElementById('scene-overlay');
  scene.style.backgroundImage = sceneMap[currentPokemon];
  scene.classList.remove('scene-transition'); // reset animation
  void scene.offsetWidth; // trigger reflow
  scene.classList.add('scene-transition'); // re-apply animation

  document.body.style.backgroundColor = 'rgba(6, 144, 207, 0.64)';
  const img = document.getElementById('pokemonImg');
  img.src = 'https://media.tenor.com/lr6evdW49pcAAAAj/totodile-pokemon.gif';
  img.style.display = 'block';
  img.style.top = '300px';
  img.style.left = '50%';
  img.style.marginLeft = '-100px';
  img.style.width = '175px'; // default size
}

function partyRed3() {
  document.querySelectorAll('.poke-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('red3').classList.add('selected');
  currentPokemon = 'torchic';
  evolutionStage = 0;
  hasChosen = true;
  startBtn.innerText = 'Start Game';
  startBtn.classList.remove('disabled');
  startBtn.classList.add('active');

  const scene = document.getElementById('scene-overlay');
  scene.style.backgroundImage = sceneMap[currentPokemon];
  scene.classList.remove('scene-transition'); // reset animation
  void scene.offsetWidth; // trigger reflow
  scene.classList.add('scene-transition'); // re-apply animation

  document.body.style.backgroundColor = 'rgba(255, 174, 0, 0.822)';
  const img = document.getElementById('pokemonImg');
  img.src = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e57c0ca5-c162-43e7-b0dc-40f215c30321/dg6026h-89565943-8f42-484b-a2f3-17cd0f5da2e7.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2U1N2MwY2E1LWMxNjItNDNlNy1iMGRjLTQwZjIxNWMzMDMyMVwvZGc2MDI2aC04OTU2NTk0My04ZjQyLTQ4NGItYTJmMy0xN2NkMGY1ZGEyZTcuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.R5TZqBoDzAQYzHqf4_9MqQ_0db6hjyEM_3K2XzCi2VE';
  img.style.display = 'block';
  img.style.top = '305px';
  img.style.left = '50%';
  img.style.marginLeft = '-160px';
  img.style.width = '325px'; // default size
}

function partyGreen3() {
  document.querySelectorAll('.poke-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('green3').classList.add('selected');
  currentPokemon = 'treecko';
  evolutionStage = 0;
  hasChosen = true;
  startBtn.innerText = 'Start Game';
  startBtn.classList.remove('disabled');
  startBtn.classList.add('active');

  const scene = document.getElementById('scene-overlay');
  scene.style.backgroundImage = sceneMap[currentPokemon];
  scene.classList.remove('scene-transition'); // reset animation
  void scene.offsetWidth; // trigger reflow
  scene.classList.add('scene-transition'); // re-apply animation

  document.body.style.backgroundColor = 'rgba(113, 223, 99, 0.822)';
  const img = document.getElementById('pokemonImg');
  img.src = 'https://img.pokemondb.net/sprites/black-white/anim/normal/treecko.gif';
  img.style.display = 'block';
  img.style.top = '335px';
  img.style.left = '50%';
  img.style.marginLeft = '-76px';
  img.style.width = '160px'; // default size
}

function partyBlue3() {
  document.querySelectorAll('.poke-btn').forEach(btn => btn.classList.remove('selected'));
  document.getElementById('blue3').classList.add('selected');
  currentPokemon = 'mudkip';
  evolutionStage = 0;
  hasChosen = true;
  startBtn.innerText = 'Start Game';
  startBtn.classList.remove('disabled');
  startBtn.classList.add('active');

  const scene = document.getElementById('scene-overlay');
  scene.style.backgroundImage = sceneMap[currentPokemon];
  scene.classList.remove('scene-transition'); // reset animation
  void scene.offsetWidth; // trigger reflow
  scene.classList.add('scene-transition'); // re-apply animation

  // document.getElementById('scene-overlay').style.backgroundImage = sceneMap[currentPokemon];

  document.body.style.backgroundColor = 'rgba(126, 228, 241, 0.822)';
  const img = document.getElementById('pokemonImg');
  img.src = 'https://media.tenor.com/cQtoIIrpSxQAAAAj/pokemon-mudkip.gif';
  img.style.display = 'block';
  img.style.top = '350px';
  img.style.left = '50%';
  img.style.marginLeft = '-90px';
  img.style.width = '170px'; // default size
}

// === Drag and Drop Logic ===
let deckArea = document.getElementById('deck-slot-area');


document.querySelectorAll('.card-container').forEach(card => {
  card.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', card.innerHTML);
  });
});

deckArea.addEventListener('dragover', (e) => {
  e.preventDefault();
});

deckArea.addEventListener('drop', (e) => {
  e.preventDefault();

  // Limit to 5 cards max
  if (deckArea.querySelectorAll('.card-container').length >= 5) {
    alert("Deck is full! Max 5 cards.");
    return;
  }

  const cardHTML = e.dataTransfer.getData('text/plain');

  const newCard = document.createElement('div');
  newCard.classList.add('card-container');
  newCard.innerHTML = cardHTML;
  newCard.removeAttribute('draggable');

  // ⬇️ This line adds the animation
  newCard.classList.add('card-drop');

  deckArea.appendChild(newCard);

});


});

// const remoteControl = document.querySelector('.remoteControl');