let missions = [{
	name: `Hobsticles`,
	id:1,
	xpReward:10,
	cashReward:10,
	desc:`In a wild city where the mafia's influence casts a long and sinister shadow, you begin your journey with a chance encounter. Your initial task is to confront the harsh reality of the city's underbelly, starting with the bitter hobo who crossed your path.

Your objective is clear - navigate through the streets and beat up this Bitter Hobo for your respect.

This mission sets the tone for your journey in this city, showcasing the challenges you'll face as you rise through the ranks of the mafia underworld. Be prepared to prove your mettle, make quick decisions, and learn the art of survival in this harsh urban environment. The bitter hobo is just the beginning of a long and perilous journey in a city where power, greed, and danger lurk around every corner. Good luck, and watch your back!`,
	complete: false,
},
									{
  name: `Delived`,
	id:2,
	xpReward:25,
	cashReward:25,
	desc:`While navigating through the labyrinthine alleys of the city, you cross paths with a weathered, middle-aged man. He's a delivery driver for a local business, but circumstances have pushed him into the darker side of the city's operations. Unbeknownst to you, he's more than just a courier – he's an adversary to be reckoned with.

As you continue your journey through this city, your experiences will shape your destiny. Each encounter is a stepping stone towards establishing yourself in this perilous world. The dangers and opportunities are intertwined in the complex web of the mafia's reign. Show your mettle and determination, and let the city know that you're a force to be reckoned with. Watch your back, and good luck in this ever-challenging urban landscape.`,
	complete: false,
									},
								{
	name: `Shadowed Secrets`,
	id:3,
	xpReward:25,
	cashReward:25,
	desc:`You've treaded further into the dark alleys of the city, your encounter with the bitter hobo and the unexpected conflict with the delivery driver fresh in your mind. As you explore the shadows of this unforgiving urban landscape, you come across a quiet pawnshop, its windows filled with items that hint at a world of secrets.

Inside, the Pawnshop Owner, a shrewd and mysterious figure, eyes you cautiously. His shop serves as a front for various underground dealings, and he's deeply entrenched in the mafia's world. He may have information that can advance your position in this treacherous game, but obtaining it won't be easy.

Your journey continues as you confront the Pawnshop Owner and the secrets he guards. You're driven by the need to rise in this perilous city. The dangers and opportunities are intertwined, just like the delicate balance of power in this mafia-controlled domain. You must show your determination and resilience as you delve deeper into this world of shadows.`,
	complete: false,
},
									{
  name: `Dealing With Debt`,
	id:4,
	xpReward:35,
	cashReward:50,
	desc:`After your intense confrontation with the Pawnshop Owner, you realize that the city's underworld is a labyrinth of connections and alliances. Your next step takes you into even deeper waters as you cross paths with the Loan Shark.

This formidable character operates from the shadows, profiting from the desperate and the indebted. With a reputation for ruthlessness, the Loan Shark is an enemy you must reckon with.

In your quest to establish yourself in this perilous city, you find yourself in the crosshairs of the Loan Shark. The debts and secrets he guards could be your ticket to power, but it won't be easy to pry them from his grip.`,
	complete: false,
									},
								{
									name: `Bouncer's Blockade`,
	id:5,
	xpReward:35,
	cashReward:50,
	desc:`Your journey through the city's perilous underbelly continues. After dealing with the Loan Shark, you find yourself on the darkened streets, where the presence of the mafia looms larger with each step.

The next challenge on your path is the imposing Club Bouncer, a sentinel guarding the entrance to a mafia-run establishment. His role is to keep out the unwanted and to ensure that the club's secrets remain hidden.

As you approach the club, the Club Bouncer narrows his eyes, assessing your intentions. A confrontation is inevitable, and this adversary is no ordinary foe. With formidable strength and a relentless demeanor, he won't let you pass easily.`,
	complete: false,
								},
								{
									name: `Red Mail`,
	id:6,
	xpReward:40,
	cashReward:60,
	desc:`As you continue your journey through the city's treacherous underbelly, you begin to realize the complexity of your predicament. Your confrontation with the imposing Club Bouncer hasn't gone unnoticed, and someone is using it against you. It's not the mafia you need to worry about; it's the police.

A shadowy figure, known as the Blackmailer, has gained access to evidence that could incriminate you. With this leverage, the Blackmailer threatens to expose your actions to the authorities, jeopardizing your position and freedom.

Your journey to power takes an unexpected turn as you find yourself entangled in a web of corruption that stretches beyond the mafia's control. To safeguard your secrets and your newfound influence, you must confront this Blackmailer and put an end to the threat.`,
	complete: false,
								},
	{
									name: `Betting On Survival`,
	id:7,
	xpReward:45,
	cashReward:75,
	desc:`Your journey through the city's underworld continues to unravel, with each challenge pushing you further down a perilous path. After dealing with the Blackmailer, you've become aware of the intricate web of corruption that threatens your existence.

As you navigate the treacherous streets, you overhear whispers about a powerful figure who holds critical information about the mafia's operations. This figure is the Bookie, a shrewd and elusive character, deeply entrenched in the mafia's world.

In your pursuit of dominance in this unforgiving city, you recognize that the Bookie's secrets could provide you with the upper hand. His ability to manipulate odds and outcomes has earned him a significant place in the hierarchy.`,
	complete: false,
								},
	{
									name: `The Pimp's Gambit`,
	id:8,
	xpReward:50,
	cashReward:85,
	desc:`Your journey through the city's gritty underbelly unfolds with relentless twists and turns. After dealing with the Bookie, you've gained insights into the power plays that drive the mafia's world. But the path to dominance is fraught with peril, and the next challenge that emerges is the enigmatic Pimp.

The Pimp is not just an exploitative figure but a cunning player in the underworld. His connections and influence reach far and wide, and he's known for manipulating the desperate and vulnerable.

As you continue your quest to climb the ladder in this ruthless city, you realize that the Pimp holds secrets that could change the course of your journey. His web of control extends to various aspects of the mafia's operations.

To access the Pimp's secrets, you must outmaneuver him and gain his trust, all while keeping your own intentions hidden. This mission is a high-stakes gamble, and your choices will determine your fate in the unforgiving urban world. Watch your back, and good luck as you face the challenges that lie ahead.`,
	complete: false,
								},
]
let savedMissions = localStorage.getItem('missions');
if (savedMissions) {
  missions = JSON.parse(savedMissions);
}

  missionButton.addEventListener("click", () => {
  missionPopup.style.display = "block";
	
});
 const closeButton = document.getElementById("closeButton");
 closeButton.addEventListener("click", () => {
   missionPopup.style.display = "none";
 });

	let nextMission = null;
  // Find the index of the next incomplete mission in the enemies array
  let missionIndex = -1;
function nxMs(){
  for (let i = 0; i < missions.length; i++) {
    if (!missions[i].complete) {
      nextMission = missions[i];
      missionIndex = i;
      break;
    }
  }}
function spawnComplete(){
	  nextMission = null; // Clear the value of nextMission
  // Find the index of the next incomplete mission in the enemies array
  nxMs();
	const imageElement = document.createElement("img");
	const completeButton = document.createElement("button");
	if(nextMission){
		imageElement.classList.add("itemimg");
    imageElement.src = enemies[missionIndex].img; // Set the image source from your item object
    imageElement.alt = "Item Image";
    missionreq.appendChild(imageElement);
		if (enemies[missionIndex].beat) {
      completeButton.classList.add("continuebtn");
      completeButton.textContent = "Complete";
      completeButton.addEventListener("click", () => {
			imageElement.classList.add('hidden')
      nextMission.complete = true;
			gainXP(nextMission.xpReward);
		  player.money += nextMission.cashReward;
			updateStats();
			showToast(`You Completed ${nextMission.name} For $${nextMission.cashReward} & ${nextMission.xpReward}XP`,4500)
			completeButton.classList.remove("continuebtn");
      completeButton.classList.add("hidden");
			renderMission();
		});
    bttns.appendChild(completeButton);

    } else {
      completeButton.classList.add("hidden");
    }
	} else {
		completeButton.classList.add("hidden");
    missionname.innerText = "All Hits Completed";
    missiondesc.style.display = "none";
		rwrds.style.display = 'none';
				 }
}
function renderMission(){
nxMs();
	localStorage.setItem('missions', JSON.stringify(missions));
  if (nextMission) {
		missionname.innerText = nextMission.name;
    missiondesc.innerText = nextMission.desc;
		missioncashreward.innerText = `+ $${nextMission.cashReward}`
		missionxpreward.innerText = `+ ${nextMission.xpReward} XP`
		spawnComplete();
  } else {
		spawnComplete();
	}
}
document.getElementById("missionButton").addEventListener("click", renderMission());