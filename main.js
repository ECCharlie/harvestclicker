var cropClicks = 0
var neededClicks = 40

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
	neededClicks = cropClicks - number;
	if (neededClicks <= 30 && neededClicks > 20) {
		document.getElementById("btn").style.color = "red";
	}
	else if (neededClicks <= 20 && neededClicks > 10) {
		document.getElementById("btn").style.color = "green";
	}
	else if (neededClicks >= 30 && neededClicks < 40) {
		document.getElementById("btn").style.color = "orange";
	}
	else if (neededClicks >= 40) {
		document.getElementById("btn").innerHTML = "Hello Charlie!";
	}
}