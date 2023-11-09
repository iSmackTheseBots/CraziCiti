// Function to add an item and amount to the inventory
function addToInventory(item, amount) {
  const existingItem = player.inventory.find((invItem) => invItem.name === item.name);
  if (existingItem) {
    existingItem.amountOwned += amount;
  } else {
    item.amountOwned = amount;
    player.inventory.push(item);
  }
    updateStats();
}

function buy(item){
    let cost = item.buyPrice;
    if(cost > player.money){
        const dif = cost-player.money;
        showToast(`You are missing $${dif}`,999);
        return;
    }
    player.money -= cost;
    addToInventory(item, 1);
    updateStats();
    showToast(`You bought a ${item.name} for $${cost}!`, 999);
}
// Function to remove an item and amount from the inventory
function removeFromInventory(item, amount) {
    //checks if player have item to remove it or 1
  const existingItem = player.inventory.find((invItem) => invItem.name === item.name);
  if (existingItem) {
    if (existingItem.amountOwned <= amount) {
      player.inventory.splice(player.inventory.indexOf(existingItem), 1);
    } else {
      existingItem.amountOwned -= amount;
    }
      updateStats();
      renderInventory();
  }
}
// Function to render the inventory grid
function renderInventory() {
  const inventoryContainer = document.getElementById("inventory-container");
  inventoryContainer.innerHTML = "";

  // Loop through each item in the inventory and create a grid container with buy/sell buttons
  player.inventory.forEach((item) => {
    const gridContainer = document.createElement("div");
    gridContainer.classList.add("grid-container");

    // Add item image
    const imageElement = document.createElement("img");
    imageElement.classList.add("itemimg");
    imageElement.src = item.img; // Set the image source from your item object
    imageElement.alt = "Item Image";
    gridContainer.appendChild(imageElement);

    const fixerElement = document.createElement("div");
    gridContainer.appendChild(fixerElement);

    // Add item name and amount owned to the container
    const nameElement = document.createElement("div");
    nameElement.classList.add("invname");
    nameElement.textContent = `${item.name} x${item.amountOwned}`;
    fixerElement.appendChild(nameElement);

    const sellButton = document.createElement("button");
    sellButton.classList.add("sellbtn");
    sellButton.textContent = `Sell: $${item.sellPrice.toLocaleString()}`;
    sellButton.addEventListener("click", () => {
      if (item.amountOwned > 1) {
        player.money += item.sellPrice;
        removeFromInventory(item, 1);
      }else if(item.amountOwned == 1){
				player.money += item.sellPrice;
        removeFromInventory(item, 1);
					if(item.name == player.equipped.weapon.name){
					player.equipped.weapon = fist;
				}else if(item.name == player.equipped.armour.name){
					player.equipped.armour = nothing;
				};
    }
			updateStats();
		});
    fixerElement.appendChild(sellButton);
    const equipButton = document.createElement("button");
		
    if(item.type == 'weapon'){
			if (item.name == player.equipped.weapon.name) {
      equipButton.classList.add("noequip");
			equipButton.textContent = `Unequip`;
    } else if (item.name != player.equipped.weapon.name) {
      equipButton.classList.add('equipbtn');
      equipButton.textContent = `Equip`;
    }}else if(item.type == 'armour'){
		if (item.name == player.equipped.armour.name) {
      equipButton.classList.add("noequip");
			equipButton.textContent = `Unequip`;
    } else if (item.name != player.equipped.armour.name) {
      equipButton.classList.add('equipbtn');
      equipButton.textContent = `Equip`;
    }} else if(!item.isEquip){
			equipButton.style.display = 'none';
    }
		/*if (item.name == player.equipped.weapon.name) {
      equipButton.classList.add('noequip');
      equipButton.textContent = `Unequip`;
    }else if (item.name == player.equipped.armour.name) {
      equipButton.classList.add('noequip');
      equipButton.textContent = `Unequip`;
    }*/
    equipButton.addEventListener("click", () => equip(item, player));
    fixerElement.appendChild(equipButton);

    // Create and append a tooltip for the current item
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
		if(item.damage){
			tooltip.innerText = `Damage: ${item.damage}`;
		} else if (item.defense){
			tooltip.innerText = `Defense: ${item.defense}`
		} else if (item.healAmount){
			tooltip.innerText = `Heal Amount:${item.healAmount}`
		}

    gridContainer.appendChild(tooltip);
    gridContainer.addEventListener('mouseenter', () => {
			if (item.damage || item.defense || item.healAmount){
				tooltip.style.display = 'block';
		}else{
      return;
    }});

    gridContainer.addEventListener('mousemove', (e) => {
      tooltip.style.left = e.pageX +5+ 'px';
      tooltip.style.top = e.pageY + 15 + 'px';
    });

    gridContainer.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
    inventoryContainer.appendChild(gridContainer);
  });
}

