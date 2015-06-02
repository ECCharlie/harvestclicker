var cropClicks = 0

function cropClick(number){
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
}