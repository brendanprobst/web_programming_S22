function isPrime(number) {
	for (let i = 2; i < number; i++) {
		if (number % i === 0) {
			return true;
		}
	}
	return false;
}
function renderNumber() {
	console.log("inside Render Number");
	var inputNumber = document.getElementById("input").value;
	var number = document.createElement("li");
	number.innerHTML = `<p>${inputNumber}</p>`;
	document.getElementById("input").value = "";
	var list = document.getElementById("history");
	if (isPrime(number)) {
		number.className = "prime";
	} else {
		number.className = "not-prime";
	}
	list.appendChild(number);
}
console.log("inside prime.js");
