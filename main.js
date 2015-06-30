document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded() {
	initialize();
	drawGui();
	requestAnimationFrame(mainLoop);
}

//declare global vars
var money = 0;
var plots = 0;

function Plot (count) {
	//initialize the Plot
	var div = document.createElement('div');
	plots += 1;
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
			if (i == 0) {
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
	var t = document.createTextNode("Create Plot!");
	b.appendChild(t);
	document.body.appendChild(b);

	b.onclick = function() {
		var plot = new Plot(1);
	}
}

function update() {
	moneyDiv = document.getElementById("mDiv");
	moneyDiv.textContent = "Money: " + String(money);
}

var lastFrameTimeMs = 0;
var maxFPS = 1;

function initialize() {
	var moneyDiv = document.createElement("div");
    moneyDiv.id = "mDiv";
    document.body.appendChild(moneyDiv);
	moneyDiv.textContent = "Money: " + String(money);
}

function mainLoop(timestamp) {
	//throttle
	if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
		requestAnimationFrame(mainLoop);
		console.log("looping1");
		return;
	}
	lastFrameTimeMs = timestamp;

    money += 1;
    console.log("looping");
    update();
	requestAnimationFrame(mainLoop);
}

