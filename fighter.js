const fightButton = document.getElementById("fight-button"), playerHealthSpan = document.getElementById("player-health"), playerNameSpan = document.getElementById("player-name"), enemyNameSpan = document.getElementById("enemy-name"), playerDamageSpan = document.getElementById("player-damage"), enemyHealthSpan = document.getElementById("enemy-health"), enemyDamageSpan = document.getElementById("enemy-damage"), playerHealthBar = document.getElementById("player-hp-bar"), enemyHealthBar = document.getElementById("enemy-hp-bar"), enemyHealthBarContainer = document.getElementById("enemy-hp-container");;
const MIN_ENERGY_TO_FIGHT = 20 , MIN_COURAGE_TO_FIGHT = 1 , MIN_HEALTH_TO_FIGHT = 10;
let currentEnemy;
const playerSts = document.getElementById('fight-stats')
if (playerSts){
updateVStats();
}
	const imageElement = document.createElement('img');
function updateVStats() {
	playerNameSpan.textContent = player.name;
  playerHealthSpan.textContent = `${player.health.toLocaleString()}/${player.healthCap.toLocaleString()}`;
	playerDamageSpan.textContent = player.equipped.weapon.damage.toLocaleString();
	if(player.equipped.armour.name != 'nothing'){
	playerDefenseSpan.textContent = `Defense: ${player.equipped.armour.defense}`;
	} else {
	playerDefenseSpan.textContent = `Defense: 0`;
	}
	playerHealthBar.style.width = (player.health / player.healthCap) * 100 + "%";
	if(currentEnemy){
		if(currentEnemy.health <= 0){
			currentEnemy.health = 0;
		}
		imageElement.classList.add("itemimg");
    imageElement.src = currentEnemy.img; // Set the image source from your item object
    imageElement.alt = "Enemy Image";
    enemybattle.appendChild(imageElement);
		enemyNameSpan.textContent = currentEnemy.name;
    enemyHealthSpan.textContent = `${currentEnemy.health.toLocaleString()}/${currentEnemy.healthCap.toLocaleString()}`;
    enemyDamageSpan.textContent = currentEnemy.damage.toLocaleString();
		enemyHealthBar.style.width = (currentEnemy.health / currentEnemy.healthCap) * 100 + "%";
	} 
	if(!currentEnemy){
		enemyHealthBarContainer.style.display = 'none';
	} else {
		enemyHealthBarContainer.style.display = 'block';

	}

}
function updateEnemyBeatenStatus(enemyName) {
  for (let enemy of enemies) {
    if (enemy.name === enemyName) {
      enemy.beat = true;
			enemy.health = enemy.healthCap;
			localStorage.setItem('enemies', JSON.stringify(enemies));
      break; // Stop after the first match (assuming enemy names are unique)
    }
  }
}
function fight(){
	    const enemyNameInput = document.getElementById("enemyNameInput").value;
      const selectedEnemy = enemies.find((enemy) => enemy.name.toLowerCase() == enemyNameInput.toLowerCase());
	
      if (selectedEnemy) {
	if (player.energy < MIN_ENERGY_TO_FIGHT) {
        showToast(`You need at least ${MIN_ENERGY_TO_FIGHT} energy`,1250);
        return;
    } else if (player.courage < MIN_COURAGE_TO_FIGHT) {
        showToast(`You need at least ${MIN_COURAGE_TO_FIGHT} courage`,1250);
        return;
    } else if (player.health < MIN_HEALTH_TO_FIGHT) {
        showToast(`You need at least ${MIN_HEALTH_TO_FIGHT} health to fight!`,1250);
        return;
    }

	player.energy -= MIN_ENERGY_TO_FIGHT;
	player.courage -= MIN_COURAGE_TO_FIGHT;
	playerTurn = true;
	enemyTurn = false;
  currentEnemy = selectedEnemy;
  updateVStats();
	updateStats();
  fightButton.disabled = true;
	const battleInterval = setInterval(() => {
		if (player.health <= 0 ){
			clearInterval(battleInterval);
			fightButton.disabled = false;
			showToast(`${currentEnemy.name} won!`,1250);
			return;
		} else if(currentEnemy.health <= 0){
			clearInterval(battleInterval);
			fightButton.disabled = false;
			gainXP(currentEnemy.rewardxp);
			player.money += currentEnemy.rewardmoney;
			updateStats();
			updateVStats();
			updateEnemyBeatenStatus(currentEnemy.name)
			showToast(`${player.name} won!`,1250);
			return;
		}
        const playerDamage = Math.floor(Math.random() *  player.equipped.weapon.damage);
        const enemyDamage = Math.floor(Math.random() * currentEnemy.damage);
        const enemyDmg = Math.max(0, enemyDamage - player.equipped.armour.defense);
        if(playerTurn){
					currentEnemy.health -= playerDamage;
					playerTurn = false;
					enemyTurn = true;
					updateStats();
			    updateVStats();
					showToast(`${player.name} attacked for ${playerDamage.toLocaleString()}`,1000);
				} else if (enemyTurn){
					player.health -= enemyDmg;
					playerTurn = true;
					enemyTurn = false;
					updateStats();
			    updateVStats();
					showToast(`${currentEnemy.name} attacked for ${enemyDmg.toLocaleString()}`,1000);
				}
    }, 750);
			} else {
				showToast('Invalid Enemy Name', 999);
			}	
}

let enemies = [
    { name: "Bitter Hobo", health: 25, damage: 4, rewardmoney: 25, rewardxp: 10, healthCap: 25 , beat: false, img:'../img/enemy/hobo.jpg' },
    { name: "Delivery Driver", health: 35, damage: 10, rewardmoney: 45, rewardxp: 20, healthCap: 35, beat: false , img:'../img/enemy/deliverydriver.jpg' },
    { name: "Pawnshop Owner", health: 45, damage: 16, rewardmoney: 70, rewardxp: 30, healthCap: 45, beat: false , img:'../img/enemy/pawnshop.jpg' },
    { name: "Loan Shark", health: 55, damage: 22, rewardmoney: 100, rewardxp: 40, healthCap: 55, beat: false , img:'../img/enemy/loanshark.jpg' },
    { name: "Club Bouncer", health: 65, damage: 28, rewardmoney: 150, rewardxp: 50, healthCap: 65, beat: false , img:'../img/enemy/bouncer.jpg' },
    { name: "Blackmailer", health: 75, damage: 34, rewardmoney: 200, rewardxp: 60, healthCap: 75, beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Bookie", health: 85, damage: 40, rewardmoney: 300, rewardxp: 80, healthCap: 85, beat: false, img:'../img/enemy/bookie.jpg' },
    { name: "Pimp", health: 95, damage: 46, rewardmoney: 350, rewardxp: 90, healthCap: 95, beat: false , img:'../img/enemy/pimp.jpg' },
    { name: "Cartel Enforcer", health: 110, damage: 52, rewardmoney: 400, rewardxp: 100, healthCap: 110, beat: false , img:'../img/enemy/blackmailer.jpg' },
    { name: "Corrupt Cop", health: 120, damage: 58, rewardmoney: 450, rewardxp: 110, healthCap: 120 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Loan Shark Boss", health: 130, damage: 64, rewardmoney: 500, rewardxp: 120, healthCap: 130 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Crime Syndicate Lieutenant", health: 325, damage: 240, rewardmoney: 550, rewardxp: 130, healthCap: 325 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Counterfeit Kingpin", health: 350, damage: 270, rewardmoney: 600, rewardxp: 140, healthCap: 350 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Drug Lord", health: 375, damage: 300, rewardmoney: 650, rewardxp: 150, healthCap: 375, beat: false , img:'../img/enemy/blackmailer.jpg' },
    { name: "Casino Owner", health: 400, damage: 330, rewardmoney: 700, rewardxp: 160, healthCap: 400 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Mafia Consigliere", health: 425, damage: 360, rewardmoney: 750, rewardxp: 170, healthCap: 425 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Rival Gang Leader", health: 450, damage: 390, rewardmoney: 800, rewardxp: 180, healthCap: 450 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Arms Dealer", health: 475, damage: 420, rewardmoney: 850, rewardxp: 190, healthCap: 475 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Underworld Assassin", health: 500, damage: 450, rewardmoney: 900, rewardxp: 200, healthCap: 500 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Crime Syndicate Boss", health: 525, damage: 480, rewardmoney: 950, rewardxp: 210, healthCap: 525 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Notorious Mobster", health: 550, damage: 510, rewardmoney: 1000, rewardxp: 220, healthCap: 550 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Mastermind Kingpin", health: 575, damage: 540, rewardmoney: 1050, rewardxp: 230, healthCap: 575 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Crime Lord", health: 600, damage: 570, rewardmoney: 1100, rewardxp: 240, healthCap: 600 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Shadowy Godfather", health: 625, damage: 600, rewardmoney: 1150, rewardxp: 250, healthCap: 625 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Untouchable Kingpin", health: 650, damage: 630, rewardmoney: 1200, rewardxp: 260, healthCap: 650 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Infiltrator", health: 675, damage: 660, rewardmoney: 1250, rewardxp: 270, healthCap: 675 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Secret Operative", health: 700, damage: 690, rewardmoney: 1300, rewardxp: 280, healthCap: 700 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Nightclub Owner", health: 725, damage: 720, rewardmoney: 1350, rewardxp: 290, healthCap: 725 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Vigilante", health: 750, damage: 750, rewardmoney: 1400, rewardxp: 300, healthCap: 750 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Gunrunner", health: 775, damage: 780, rewardmoney: 1450, rewardxp: 310, healthCap: 775 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Money Smuggler", health: 800, damage: 810, rewardmoney: 1500, rewardxp: 320, healthCap: 800 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "High-Stakes Gambler", health: 825, damage: 840, rewardmoney: 1550, rewardxp: 330, healthCap: 825 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Dealmaker", health: 850, damage: 870, rewardmoney: 1600, rewardxp: 340, healthCap: 850 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Art Forger", health: 875, damage: 900, rewardmoney: 1650, rewardxp: 350, healthCap: 875 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Schemer", health: 900, damage: 930, rewardmoney: 1700, rewardxp: 360, healthCap: 900 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Spy Master", health: 925, damage: 960, rewardmoney: 1750, rewardxp: 370, healthCap: 925 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Criminal Genius", health: 950, damage: 990, rewardmoney: 1800, rewardxp: 380, healthCap: 950 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Escapist", health: 975, damage: 1020, rewardmoney: 1850, rewardxp: 390, healthCap: 975 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Greed Kingpin", health: 1000, damage: 1050, rewardmoney: 1900, rewardxp: 400, healthCap: 1000 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Conspirator", health: 1025, damage: 1080, rewardmoney: 1950, rewardxp: 410, healthCap: 1025 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Mobster Boss", health: 1050, damage: 1110, rewardmoney: 2000, rewardxp: 420, healthCap: 1050 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Tactician", health: 1075, damage: 1140, rewardmoney: 2050, rewardxp: 430, healthCap: 1075 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Secret Society Leader", health: 1100, damage: 1170, rewardmoney: 2100, rewardxp: 440, healthCap: 1100 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Master Manipulator", health: 1125, damage: 1200, rewardmoney: 2150, rewardxp: 450, healthCap: 1125 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Evasive Mastermind", health: 1150, damage: 1230, rewardmoney: 2200, rewardxp: 460, healthCap: 1150 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Undetectable Kingpin", health: 1175, damage: 1260, rewardmoney: 2250, rewardxp: 470, healthCap: 1175 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Phantom Crime Lord", health: 1200, damage: 1290, rewardmoney: 2300, rewardxp: 480, healthCap: 1200 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Shadowy Puppeteer", health: 1225, damage: 1320, rewardmoney: 2350, rewardxp: 490, healthCap: 1225 , beat: false, img:'../img/enemy/blackmailer.jpg' },
    { name: "Mysterious Crime Czar", health: 1250, damage: 1350, rewardmoney: 2400, rewardxp: 500, healthCap: 1250 , beat: false, img:'../img/enemy/blackmailer.jpg' },
];

let savedEnemies = localStorage.getItem('enemies');
if (savedEnemies) {
  enemies = JSON.parse(savedEnemies);
  enemies.forEach((enemy) => {
    if (typeof enemy.health === 'undefined' || enemy.health === 0) {
      enemy.health = enemy.healthCap; // Set the initial health here
    }
  });
}