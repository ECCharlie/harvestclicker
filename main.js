document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#006400";
	ctx.fillRect(0,0,100,100);
	var plot = new Plot(1);
}

function Plot (count) {
	var that = this;
	console.log("plot initialized");
	this.count = count;
	this.state = "0"; // 0 = super grassy, 1-3 = less grassy respectively, 4 = dirt.
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	this.clicks = 0;
	this.checkState = function() {
		if (this.state == 4) {
			console.log("You are clicking Dirt!");
		}
		if (this.state == 0) {
			this.clicks += 1;
			console.log("clicked");
			if (this.clicks == 5) {
				ctx.fillStyle = "#009900";
				this.state = 1;
				this.clicks = 0;
			}
		}
		if (this.state == 1) {
			this.clicks += 1;
			console.log("clicked^2");
			if (this.clicks == 5){
				ctx.fillStyle = "#00cc00";
				this.state = 2;
				this.clicks = 0;
			}
		}
		ctx.fillRect(0,0,100,100);
	}
	c.onclick = function() {
		that.checkState();
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