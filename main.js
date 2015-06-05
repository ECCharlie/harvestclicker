var cropClicks = 0
var neededClicks = 40

document.addEventListener('DOMContentLoaded',domloaded,false);
function domloaded(){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#006400";
	ctx.fillRect(0,0,100,100);
}

/* function cropClick(number){
	cropClicks = cropClicks + number;
	if (cropClicks >= 10 && cropClicks < 20) {
		document.getElementById("btn").style.color = "red";
	}
	else if (cropClicks >= 20 && cropClicks < 30) {
		document.getElementById("btn").style.color = "green";
	}
	else if (cropClicks >= 30 && cropClicks < 40) {
		document.getElementById("btn").style.color = "orange";
	}
	else if (cropClicks >= 40) {
		document.getElementById("btn").innerHTML = "Hello Charlie!";
	}
} */

function cropClick(number){
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
}