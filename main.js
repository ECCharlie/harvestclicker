document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
	drawGui();
}

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

/*				var plantSelectMenu = document.createElement("SELECT");
				plantSelectMenu.id = "plantSelectMenu";
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

				plantSelectMenu.onchange = function(){
					console.log(plantSelectMenu.options[plantSelectMenu.Index].text);
					that.menuUp = 0;
					plantSelectMenu.remove();
					console.log(that.menuUp + " - menu removed, this should be 0");
				} */
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



/*function cropClick(number){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	neededClicks = neededClicks - number;
	if (neededClicks <= 30 && neededClicks > 20) {
		ctx.fillStyle = "#009900";
	}
	else if (neededClicks <= 20 && neededClicks > 10) {
		ctx.fillStyle = "#00cc00";
	}
	else if (neededClicks <= 10 && neededClicks > 0) {
		ctx.fillStyle = "#00ff00";
	}
	else if (neededClicks == 0) {
		ctx.fillStyle = "#573B0C";
	}
	ctx.fillRect(0,0,100,100);
}*/
