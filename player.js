let player = JSON.parse(localStorage.getItem('player'));
if (!player) {
  player = {
  name: prompt('What will be your Username?'),
  xp: 0,
  xpNeeded: 12,
  level: 1,
  inventory: [],
  energy: 100,
  eCap: 100,
  courage: 20,
  cCap: 20,
  morality: 100, 
  mCap: 100,
  money: 0, 
  health: 100, 
  healthCap: 100,
	equipped: {
	 weapon: {
  name: "Fist",
	amountOwned: 2,
	isEquip: true,
	damage: 1,
	type: 'weapon',
},
	 armour: {
	   name: 'nothing',
		 isEquip: true,
		 defense: 0,
		 type: 'armour',
	 },
	 thirdEquip: null,
	},
  };
    createStatBar();
    updateStats();
} else {
  updateStats();
  createStatBar();
	updateStats();
}
function savePlayer() {
  localStorage.setItem('player', JSON.stringify(player));
}

function createStatBar() {
  const statContainer = document.getElementById("stat-cont");
  const statDiv = document.createElement("div");
  statDiv.classList.add("stat");

  const energyDiv = document.createElement("div");
  energyDiv.classList.add("energy");
	const energySpan = document.createElement("span");
	energySpan.id = "energy";
  energySpan.innerHTML = `Energy: ${player.energy}/${player.eCap}`;
	energyDiv.appendChild(energySpan)
  const energyBar = document.createElement("div");
  energyBar.classList.add('e-bar-container');
	const energyProg = document.createElement("div");
	energyProg.classList.add('e-bar')
	energyProg.style.width = (player.energy / player.eCap) * 100 + '%';

  const courageDiv = document.createElement("div");
  courageDiv.classList.add("courage");
  const courageSpan = document.createElement("span");
	courageSpan.id = "courage";
  courageSpan.innerHTML = `Courage: ${player.courage}/${player.cCap}`;
	courageDiv.appendChild(courageSpan)
	const courageBar = document.createElement("div");
  courageBar.classList.add('c-bar-container');
	const courageProg = document.createElement("div");
	courageProg.classList.add('c-bar')
	courageProg.style.width = (player.courage / player.cCap) * 100 + '%';

  const moralityDiv = document.createElement("div");
  moralityDiv.classList.add("morality");
  const moralitySpan = document.createElement("span");
	moralitySpan.id = "morality";
  moralitySpan.innerHTML = `Morality: ${player.morality}/${player.mCap}`;
	moralityDiv.appendChild(moralitySpan)
	const moralityBar = document.createElement("div");
  moralityBar.classList.add('m-bar-container');
	const moralityProg = document.createElement("div");
	moralityProg.classList.add('m-bar')
	moralityProg.style.width = (player.morality / player.mCap) * 100 + '%';

  const healthDiv = document.createElement("div");
  healthDiv.classList.add("health");
  const healthSpan = document.createElement("span");
	healthSpan.id = "health";
  healthSpan.innerHTML = `Health: ${player.morality}/${player.mCap}`;
	healthDiv.appendChild(healthSpan)
	const healthBar = document.createElement("div");
  healthBar.classList.add('h-bar-container');
	const healthProg = document.createElement("div");
	healthProg.classList.add('hp-bar')
	healthProg.style.width = (player.health / player.healthCap) * 100 + '%';

  const moneyDiv = document.createElement("div");
  moneyDiv.classList.add("money");
  moneyDiv.id = "money";
  moneyDiv.innerHTML = `$${player.money}`;

  statDiv.appendChild(energyDiv);
	energyDiv.appendChild(energyBar);
	energyBar.appendChild(energyProg);
  statDiv.appendChild(courageDiv);
	courageDiv.appendChild(courageBar);
	courageBar.appendChild(courageProg);
  statDiv.appendChild(moralityDiv);
	moralityDiv.appendChild(moralityBar);
	moralityBar.appendChild(moralityProg);
  statDiv.appendChild(healthDiv);
	healthDiv.appendChild(healthBar);
	healthBar.appendChild(healthProg);
  statDiv.appendChild(moneyDiv);

  statContainer.appendChild(statDiv);

  return statContainer;
}
function updateEBar(playerE, eCap) {
  const eProgress = (playerE / eCap) * 100;
  const eBar = document.querySelector(".e-bar");
  if (eBar) {
    eBar.style.width = eProgress + "%";
  } 
}
function updateMBar(playerM, mCap) {
  const mProgress = (playerM / mCap) * 100;
  const mBar = document.querySelector(".m-bar");
  if (mBar) {
    mBar.style.width = mProgress + "%";
  } 
}
function updateCBar(playerC, cCap) {
  const cProgress = (playerC / cCap) * 100;
  const cBar = document.querySelector(".c-bar");
  if (cBar) {
    cBar.style.width = cProgress + "%";
  } 
}
function updateXPBar(playerXP, xpNeeded) {
  const xpProgress = (playerXP / xpNeeded) * 100;
  const xpBar = document.querySelector(".xp-bar");
  xpBar.style.width = xpProgress + "%";
}
function updateHPBar(hp, hpcap) {
  const hpProgress = (hp / hpcap) * 100;
  const hpBar = document.querySelector(".hp-bar");
	if(hpBar){
  hpBar.style.width = hpProgress + "%";
	}
}

function updateStats() {
  savePlayer();
	if(player.health <= 0){
		player.health = 0;
		}
  const stats = {
    health: `Health: ${player.health.toLocaleString()}/${player.healthCap.toLocaleString()}`,
    morality: `Morality: ${player.morality.toLocaleString()}/${player.mCap.toLocaleString()}`,
    energy: `Energy: ${player.energy.toLocaleString()}/${player.eCap.toLocaleString()}`,
    courage: `Courage: ${player.courage.toLocaleString()}/${player.cCap.toLocaleString()}`,
    money: `$${player.money.toLocaleString()}`,
		level: `${player.level.toLocaleString()}`,
  };
  for (const [key, value] of Object.entries(stats)) {
    const element = document.getElementById(key);
    if (element) {
      element.innerHTML = value;
    }
  }
	updateXPBar(player.xp,player.xpNeeded);
	updateCBar(player.courage,player.cCap);
	updateMBar(player.morality,player.mCap);
  updateHPBar(player.health, player.healthCap);
	updateEBar(player.energy, player.eCap);
}


function showToast(message, duration) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  const container = document.getElementById('toast-container');
  if (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.appendChild(toast);
  toast.style.visibility = 'visible';
  const timeoutId = setTimeout(() => {
    container.removeChild(toast);
  }, duration);
  // Reset the timer if another toast is displayed
  if (container.dataset.timeoutId) {
    clearTimeout(container.dataset.timeoutId);
  }
  container.dataset.timeoutId = timeoutId;
}
function lvToast(message, duration) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  const container = document.getElementById('level-container');
  if (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  container.appendChild(toast);
  toast.style.visibility = 'visible';
  const timeoutId = setTimeout(() => {
    container.removeChild(toast);
  }, duration);
  // Reset the timer if another toast is displayed
  if (container.dataset.timeoutId) {
    clearTimeout(container.dataset.timeoutId);
  }
  container.dataset.timeoutId = timeoutId;
}
function gainXP(amount) {
  player.xp += amount;
  
  // Check if player has reached enough XP to level up
  if (player.xp >= player.xpNeeded) {
    player.level++;
    player.xp -= player.xpNeeded;
    player.xpNeeded *= 1.23911;
    player.healthCap += 1;
    player.health = player.healthCap;
		player.eCap += 1;
    player.energy = player.eCap;
		player.cCap += 1;
    player.courage = player.cCap;
		player.mCap += 1;
    player.morality = player.mCap;
    
    lvToast(`Congratulations, you reached level ${player.level}!`,5000);
  }
}
function equip(item, player){
	if (item.isEquip){
		
		if (item.name == player.equipped.weapon.name){
			showToast(`Unequipped ${item.name}`,999);
			player.equipped.weapon = fist;
		}else if (item.type === 'weapon'){
			player.equipped.weapon = item;
			showToast(`You Equipped ${item.name}`,999);
		}
		if (item.name == player.equipped.armour.name){	
			showToast(`Unequipped ${item.name}`,999);
			player.equipped.armour = nothing;
		}  else if(item.type === 'armour'){
			player.equipped.armour = item;
			showToast(`You Equipped ${item.name}`,999);
	  }
		if (item.type === 'thirdEquip'){
			player.equipped.thirdEquip = item;
	  	showToast(`You Equipped ${item.name}`,999);
	  }
	  } else if(!item.isEquip){
	  	showToast(`Not Equipable.`,999);
	  }
  	updateStats();
	  renderInventory();
}
// Define the tool objects
const fist = {
  name: "Fist",
  amountOwned: 2,
  isEquip: true,
  damage: 1,
  type: 'weapon',
},
brassKnuckles = {
  name: "Brass Knuckles",
  img: '../img/weapon/melee/knuckles.jpg',
  sellPrice: 250,
  buyPrice: 600,
  amountOwned: 0,
  isEquip: true,
  damage: 6,
  type: 'weapon',
},
switchblade = {
  name: "Switchblade",
  img: '../img/weapon/melee/knife.jpg',
  sellPrice: 300,
  buyPrice: 750,
  amountOwned: 0,
  isEquip: true,
  damage: 7,
  type: 'weapon',
},
baseballBat = {
  name: "Baseball Bat",
  img: '../img/weapon/melee/baseballbat.jpg',
  sellPrice: 500,
  buyPrice: 1000,
  amountOwned: 0,
  isEquip: true,
  damage: 8,
  type: 'weapon',
},
crowbar = {
  name: "Crowbar",
  img: '../img/tool/crowbar.jpg',
  sellPrice: 50,
  buyPrice: 150,
  amountOwned: 0,
  isEquip: false,
  type: 'tool',
},
nunchaku = {
  name: "Nunchaku",
  img: '../img/weapon/melee/nunchaku.jpg',
  sellPrice: 525,
  buyPrice: 1100,
  amountOwned: 0,
  isEquip: true,
  damage: 9,
  type: 'weapon',
},
glock = {
  name: "Glock",
  img: '../img/weapon/handgun/glock.jpg',
  sellPrice: 600,
  buyPrice: 1300,
  amountOwned: 0,
  isEquip: true,
  damage: 10,
  type: 'weapon',
},
machete = {
  name: "Machete",
  img: '../img/weapon/melee/machete.jpg',
  sellPrice: 750,
  buyPrice: 1600,
  amountOwned: 0,
  isEquip: true,
  damage: 12,
  type: 'weapon',
},
beretta = {
  name: "Beretta",
  img: '../img/weapon/handgun/beretta.jpg',
  sellPrice: 750,
  buyPrice: 1600,
  amountOwned: 0,
  isEquip: true,
  damage: 12,
  type: 'weapon',
},
katana = {
  name: "Katana",
  img: '../img/weapon/melee/katana.jpg',
  sellPrice: 1200,
  buyPrice: 2500,
  amountOwned: 0,
  isEquip: true,
  damage: 18,
  type: 'weapon',
},
shotgun = {
  name: "Shotgun",
  img: '../img/weapon/shotgun/shotgun.jpg',
  sellPrice: 2500,
  buyPrice: 4500,
  amountOwned: 0,
  isEquip: true,
  damage: 25,
  type: 'weapon',
},
tommygun = {
  name: "Tommygun",
  img: '../img/weapon/ars/tommygun.jpg',
  sellPrice: 4000,
  buyPrice: 6000,
  amountOwned: 0,
  isEquip: true,
  damage: 35,
  type: 'weapon',
},
switchy = {
	name: "Glock w/Switch",
  img: '../img/weapon/handgun/gswitch.jpg',
  sellPrice: 9000,
  buyPrice: 0,
  amountOwned: 1,
  isEquip: true,
  damage: 999,
  type: 'weapon',
},
nothing = {
	 name: 'nothing',
	 isEquip: true,
	 defense: 0,
	 type: 'armour',
	 },
leatherJacket = {
  name: "Leather Jacket",
  img: '../img/armour/leatherjacket.jpg',
  sellPrice: 400,
  buyPrice: 1000,
  amountOwned: 0,
  isEquip: true,
  type: 'armour',
  defense: 5,
},
helmet = {
  name: "Helmet",
  img: '../img/armour/helmet.jpg',
  sellPrice: 550,
  buyPrice: 2300,
  amountOwned: 0,
  isEquip: true,
  type: 'armour',
  defense: 9,
},
riotShield = {
  name: "Riot Shield",
  img: '../img/armour/riotshield.jpg',
  sellPrice: 2500,
  buyPrice: 6000,
  amountOwned: 0,
  isEquip: true,
  type: 'armour',
  defense: 17,
},
bulletproofVest = {
  name: "Bulletproof Vest",
  img: '../img/armour/vest.jpg',
  sellPrice: 8000,
  buyPrice: 20000,
  amountOwned: 0,
  isEquip: true,
  type: 'armour',
  defense: 30,
},
bandAid = {
  name: "Band-Aid",
  img: '../img/consumable/bandaid.jpg',
  sellPrice: 5,
  buyPrice: 10,
  amountOwned: 0,
  isEquip: false,
  type: 'consumable',
  healAmount: 5,
},

medKit = {
  name: "Med Kit",
  img: '../img/consumable/medkit.jpg',
  sellPrice: 15,
  buyPrice: 25,
  amountOwned: 0,
  isEquip: false,
  type: 'consumable',
  healAmount: 10,
};
const tools = [crowbar];
const handguns = [beretta,glock,switchy];
const ars = [tommygun];
const melees = [brassKnuckles,baseballBat,nunchaku,switchblade,machete,katana];
const shotguns = [shotgun];
const armours = [leatherJacket,helmet,riotShield,bulletproofVest];
const consumables = [bandAid,medKit];