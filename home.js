const dbtn = document.getElementById('donate-menu'), hbtn = document.getElementById('heal-menu'), dmenu = document.getElementById('dmenu'), hmenu = document.getElementById('hmenu'), cbtn = document.getElementById('crime-menu'), cmenu = document.getElementById('cmenu');

function toggleMenu(button, menu) {
  button.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  });
}
toggleMenu(dbtn, dmenu),toggleMenu(hbtn, hmenu),toggleMenu(cbtn, cmenu);

backButton.classList.add('hidden');

backButton.addEventListener('click', () => {
    // Hide the current menu (weaponsMenu, armoursMenu, etc.)
    const currentMenu = document.querySelector('.menu:not(.hidden)');
    if (currentMenu) {
        currentMenu.classList.add('hidden');
    }
    // Show the appropriate category menu
    categoryMenu.classList.remove('hidden');
	  weaponsMenu.classList.add('hidden');
	  itemList.classList.add('hidden');

    // Hide the "Back" button again
    backButton.classList.add('hidden');
});

shopButton.addEventListener('click', () => {
    shopMenu.classList.toggle('hidden');
    backButton.classList.add('hidden'); // Hide the "Back" button
});

weaponsButton.addEventListener('click', () => {
    categoryMenu.classList.add('hidden');
    weaponsMenu.classList.remove('hidden');
    backButton.classList.remove('hidden'); // Show the "Back" button
});

armoursButton.addEventListener('click', () => {
    categoryMenu.classList.add('hidden');
    itemList.innerHTML = ''; // Clear the item list
    displayItems(armours);
    backButton.classList.remove('hidden'); // Show the "Back" button
});

toolsButton.addEventListener('click', () => {
    categoryMenu.classList.add('hidden');
    itemList.innerHTML = ''; // Clear the item list
    displayItems(tools);
    backButton.classList.remove('hidden'); // Show the "Back" button
});

consumablesButton.addEventListener('click', () => {
    categoryMenu.classList.add('hidden');
    itemList.innerHTML = ''; // Clear the item list
    displayItems(consumables);
    backButton.classList.remove('hidden'); // Show the "Back" button
});

hgButton.addEventListener('click', () => {
    weaponsMenu.classList.add('hidden');
    itemList.innerHTML = ''; // Clear the item list
    displayItems(handguns);
    backButton.classList.remove('hidden'); // Show the "Back" button
});

meleeButton.addEventListener('click', () => {
    weaponsMenu.classList.add('hidden');
    itemList.innerHTML = ''; // Clear the item list
    displayItems(melees);
    backButton.classList.remove('hidden'); // Show the "Back" button
});

shotgunButton.addEventListener('click', () => {
    weaponsMenu.classList.add('hidden');
    itemList.innerHTML = ''; // Clear the item list
    displayItems(shotguns);
    backButton.classList.remove('hidden'); // Show the "Back" button
});
arButton.addEventListener('click', () => {
    weaponsMenu.classList.add('hidden');
    itemList.innerHTML = ''; // Clear the item list
    displayItems(ars);
    backButton.classList.remove('hidden'); // Show the "Back" button
});


// Define your item data


function displayItems(categoryItems) {
    categoryItems.forEach(item => {
        const itemElement = document.createElement('button');
        itemElement.classList.add('shitem');
			if(item.damage){
				itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>$${item.buyPrice.toLocaleString()}</p>
								<p>Damage:${item.damage.toLocaleString()}</p>
            </div>
        `;}else if(item.defense){
					itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>$${item.buyPrice.toLocaleString()}</p>
								<p>Defense:${item.defense.toLocaleString()}</p>
            </div>
        `;}else if(item.healAmount){
					itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>$${item.buyPrice.toLocaleString()}</p>
								<p>Heal Amount:${item.healAmount.toLocaleString()}</p>
            </div>
        `}else {
					itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>$${item.buyPrice.toLocaleString()}</p>
            </div>
        `
				};
        
			
			itemElement.addEventListener('click', () => {
				buy(item)
			});
        itemList.appendChild(itemElement);
    });
    itemList.classList.remove('hidden');
}


// Button Functions
function beg() {
  if (player.energy < 1) {
    showToast("You don't have any energy to beg.", 1250);
    return;
  }
  player.energy -= 1;
    
  let moneyEarned = Math.floor(Math.random() * 5) + 1;
  player.money += moneyEarned;
  gainXP(1)
  showToast(`You earned $${moneyEarned} and 1XP`, 1500);
  updateStats();
}

function rest() {
  if (player.energy >= player.eCap) {
    showToast("You don't have to rest.", 999);
    return;
  }
  const MIN_MORALITY_TO_REST = 5;
  if (player.morality < MIN_MORALITY_TO_REST) {
    showToast("You need at least 5 morality to rest.", 999);
    return;
  }
  player.morality -= MIN_MORALITY_TO_REST;
  player.energy += 10;
  if (player.energy > player.eCap) player.energy = player.eCap;
  updateStats();
  showToast(`Energy: ${player.energy}/${player.eCap} Morality: ${player.morality}/${player.mCap}`, 1500);
}


function crime(id){
    const CRIME_LEVELS = {
    1: { xp: Math.floor(Math.random() * 5) + 1, reward: Math.floor(Math.random() * 75) + 25, item: crowbar},
    2: { xp: Math.floor(Math.random() * 10) + 5, reward: Math.floor(Math.random() * 300) + 100, item: switchblade},
    3: { xp: Math.floor(Math.random() * 25) + 10, reward: Math.floor(Math.random() * 700) + 300, item: glock}
  };
      const crimeLevel = CRIME_LEVELS[id], hasItem = player.inventory.find((invItem) => invItem.name === crimeLevel.item.name);
    
if(!hasItem || hasItem.amountOwned < 1){
showToast(`You need a ${crimeLevel.item.name}`, 999);
    return;
} else if(player.courage >= player.cCap){
    showToast(`You don't need any courage.`, 999);
        return;
    } else if(player.energy < 15){
    showToast(`You need 15 energy`, 999);
        return;
    } else {
    hasItem.amountOwned--;
    if(hasItem.amountOwned <= 0) player.inventory.splice(player.inventory.indexOf(hasItem), 1);
    player.courage++;
    gainXP(crimeLevel.xp);
    player.money += crimeLevel.reward;
    player.energy -= 15;
    updateStats();
    showToast(`-${crimeLevel.item.name} -15 Energy +${crimeLevel.xp} XP +1 Courage +$${crimeLevel.reward}.`, 3000);
    }
}


	let healCost = player.healthCap - player.health;
	const healtx = document.getElementById('healcosttxt');
	healtx.textContent = healCost.toLocaleString();
function heal() {
  if (player.money < healCost) {
    showToast(`You need $${healCost-player.money} more to heal.`,999);
    return;
  }
  if (player.health == player.healthCap) {
      showToast("You are at max health.",999);
      return;
  }

  player.money -= healCost;
  player.health = player.healthCap;
	showToast(`Healed for ${healCost.toLocaleString()}`,1500);
	healtx.textContent = `0`;
  updateStats();
}
  

function train(addHealth) {
  const TRAINING_LEVELS = {
    1: { cost: 1000, increase: 1 },
    2: { cost: 1900, increase: 2 },
    3: { cost: 2800, increase: 3 }
  };

  const trainingLevel = TRAINING_LEVELS[addHealth];
  if (!trainingLevel) {
    alert("Invalid training level.");
    return;
  }

  if (player.money < trainingLevel.cost) {
    showToast(`You need at least $${trainingLevel.cost - player.money} more to train.`,999);
    return;
  }

  player.healthCap += trainingLevel.increase;
  showToast(`Your max health is now ${player.healthCap}.`,999);
  player.money -= trainingLevel.cost;
  updateStats();
}
function donate(amount){
if (amount > player.money){
showToast(`You don't have enough money.`, 999);
        return;
}
if(player.morality >= player.mCap){
    showToast(`You do not need morality`, 999);
        return;
}
switch(amount){
    case 10:
player.morality+= 2;
player.money -= amount;
        break;
    case 20:
player.morality+= 5;
player.money -= amount;
        break;
    case 30:
player.morality+= 9;
player.money -= amount;
        break;
    }
    if(player.morality > player.mCap){
    player.morality = player.mCap;
    }
    updateStats();
}