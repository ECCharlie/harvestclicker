document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded() {
	initialize();
	drawGui();
	requestAnimationFrame(mainLoop);
}

//declare global vars
var money = 0;
var actionLog = "Welcome to Harvest Keeper!";
var plotCount = 0;
var plotArray = ["Plots:"];
var inventorySize = 6;
var inventoryList = [];

function inventoryItem(id, count) {
	this.id = id;
	this.count = count;
}

//function to populate the inventoryList array.
function getSeed() {
	var roll = Math.floor((Math.random() * 10) + 1);
	if (roll <= 5) {
		actionLog = "You forage and find nothing!";
	} else if (roll > 5) {
		actionLog = "You found money!";
		money++;
	} else {
		return;
	}

	/*if (inventoryList.length < 6) {
		inventoryList.push(new inventoryItem(0, 1));
		console.log("pushed!");
	}*/
};

console.log("Inventory Items: " + inventoryList.length);
//getSeed();
console.log("Inventory Items: " + inventoryList.length);
console.log(inventoryList[0].id);

function Plot (count) {
	//initialize the Plot
	var div = document.createElement('div');
	document.body.appendChild(div);
	var that = this;
	this.count = count;
	this.state = 0; // 0 = super grassy, 1-3 = less grassy respectively, 4 = dirt.
	this.clicks = 0;
	this.menuUp = 0;
	this.currentPlant = "";
	var plantList = ["Plants:", "plant1", "plant2", "plant3"];

	//continue initialization with creating the canvas element and drawing it
	var c = document.createElement("CANVAS");
	c.width = 100;
	c.height = 100;
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#006400";
	ctx.fillRect(0,0,100,100);
	div.appendChild(c);
	console.log("plot initialized");


	//plot functions
	this.checkState = function() {
		this.clicks += 1;
		console.log("clicked! " + this.clicks);
		if (this.state == 5) {
			console.log("You have a " + this.currentPlant + " crop/plant planted!");
			return;
		}
		if (this.state == 4) {
			if (this.menuUp == 1) {
				console.log(this.menuUp + " - the menu is up for this plot");
			}
			else {
				this.updateMenu();
			}
		}
		else {
			if (this.clicks == 2) {
				switch (this.state) {
					case 0:
						ctx.fillStyle = "#009900";
						this.state = 1;
						break;
					case 1:
						ctx.fillStyle = "#00cc00";
						this.state = 2;
						break;
					case 2:
						ctx.fillStyle = "#00ff00";
						this.state = 3;
						break;
					case 3:
						ctx.fillStyle = "#573B0C";
						this.state = 4;
						break;
					default:
						break;
				}
				this.clicks = 0;
				ctx.fillRect(0,0,100,100);
			}
		}
	}

	this.updateMenu = function() {
		var plantSelectMenu = document.createElement("SELECT");
		div.appendChild(plantSelectMenu);
		this.menuUp = 1;

		for (var i = 0; i < plantList.length; i++) {
			var option = document.createElement("OPTION");
			if (i === 0) {
				option.selected = "selected";
				option.disabled = "disabled";
				option.style.display = "none";
			}
			option.value = plantList[i];
			option.text = plantList[i];
			plantSelectMenu.appendChild(option);

		}

		this.selectedPlant = function() {
			this.state = 5;
			this.currentPlant = plantSelectMenu.options[plantSelectMenu.selectedIndex].text;

			switch (this.currentPlant) {
				case "plant1":
					ctx.fillStyle = "#ffff00";
					break;
				case "plant2":
					ctx.fillStyle = "#ff0000";
					break;
				case "plant3":
					ctx.fillStyle = "#0000ff";
					break;
				case "default":
					break;
			}
			ctx.fillRect(25,25,50,50);
		}

		//after a plant is selected
		plantSelectMenu.onchange = function() {
			that.selectedPlant();
			that.menuUp = 0;
			plantSelectMenu.remove();
			console.log(that.menuUp + " - menu removed, this should be 0");
		}
	}

	c.onclick = function() {
		that.checkState();
	}
}

function drawGui() {
	var b = document.createElement("BUTTON");
	b.id = "plotPriceButton";
	
	//var t = document.createTextNode("Buy Plot! ($20)");
	//b.appendChild(t);
	document.body.appendChild(b);

	//draw the forage square button
	var forageDiv = document.createElement('div');
	document.body.appendChild(forageDiv);
	var f = document.createElement("CANVAS");
	f.width = 100;
	f.height = 100;
	var foragectx = f.getContext("2d");
	foragectx.fillStyle = "#B8860B";
	foragectx.fillRect(0,0,100,100);
	foragectx.fillStyle = "#000000";
	foragectx.font = "bold 16px Arial";
	foragectx.fillText("Forage",25,50);
	forageDiv.appendChild(f);

	f.onclick = function() {
		getSeed();
	}


	//create initial free plot
	plotCount++;
    var plot = new Plot(plotCount);
    plotArray.push(plot);

    //set plot price
    b.textContent = "Buy Plot! ($" + String(plotCount * 20) + " )";


	b.onclick = function() {
		buyPlot();
	}
}

function buyPlot() {
	if (money >= plotCount * 20) {
		money -= plotCount * 20;

		plotCount++;
    	var plot = new Plot(plotCount);
    	plotArray.push(plot);
    	var b = document.getElementById("plotPriceButton");
    	/* b.removeChild(b.childNodes[0]);
    	var t = document.createTextNode("Buy Plot! ($40)");
    	b.appendChild(t); */
    	b.textContent = "Buy Plot! ($" + String(plotCount * 20) + " )";
		
	}
}

function update() {
	//update current money count
	moneyDiv = document.getElementById("mDiv");
	moneyDiv.textContent = "Money: " + String(money);

	//update current actionLog (notice)
	actionLogDiv = document.getElementById("alDiv");
	actionLogDiv.textContent = "Notice: " + actionLog;
}

var lastFrameTimeMs = 0;
var maxFPS = 1;

function initialize() {
	// create the money div
	var moneyDiv = document.createElement("div");
	moneyDiv.id = "mDiv";
	document.body.appendChild(moneyDiv);
    moneyDiv.textContent = "Money: " + String(money);

    //create the actionLog div (used for notices)
    var actionLogDiv = document.createElement("div");
    actionLogDiv.id = "alDiv";
    document.body.appendChild(actionLogDiv);
    actionLogDiv.textContent = "Notice: Welcome to Harvest Keeper!";
}

function calculateRev() {
	var tempRev = 0;

	//add up current plant counts to find revenue
	if (plotCount > 0) {
		for (i = 1; i < plotCount + 1; i++) {
			switch (plotArray[i].currentPlant) {
				case "plant1":
					tempRev +=1;
					break;
				case "plant2":
					tempRev +=2;
					break;
				case "plant3":
					tempRev +=3;
					break;
				default:
					tempRev +=0;
					break;
			}
		}
	}
	
	return tempRev;
}

function mainLoop(timestamp) {
	//throttle
	if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
		requestAnimationFrame(mainLoop);
		console.log("looping1");
		return;
	}
	lastFrameTimeMs = timestamp;

    money += calculateRev();
    console.log("looping");
    update();
	requestAnimationFrame(mainLoop);
}
