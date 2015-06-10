document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
	drawGui();
}

function Plot (count) {
	//initialize the Plot
	var that = this;
	this.count = count;
	this.state = 0; // 0 = super grassy, 1-3 = less grassy respectively, 4 = dirt.
	this.clicks = 0;

	//continue initialization with creating the canvas element and drawing it
	var c = document.createElement("CANVAS");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#006400";
	ctx.fillRect(0,0,100,100);
	document.body.appendChild(c);
	console.log("plot initialized");


	//plot functions
	this.checkState = function() {
		this.clicks += 1;
		console.log("clicked! " + this.clicks);
		if (this.clicks == 5) {
			switch (this.state) {
				case 4:
					console.log("You are clicking Dirt!");
					break;
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