(function () {
	function checkIsPrime(number) {
		for (let i = 2; i < number; i++) {
			if (number % i === 0) {
				return false;
			}
		}
		return true;
	}
	let form = document.getElementById("prime-form");

	if (form) {
		let textInput = document.getElementById("input_number");
		let errorDiv = document.getElementById("error");
		let list = document.getElementById("attempts");
		let textInputValue = textInput.value;
		let textInputNumberValue = parseInt(textInputValue);
		console.log("value:", textInputNumberValue);

		console.log("here");
		form.addEventListener("submit", (event) => {
			event.preventDefault();
			let li = document.createElement("li");
			let isPrime = checkIsPrime(textInput.value);
			if (isPrime) {
				console.log("is prime");
				li.className = "is-prime";
				li.innerHTML = `${textInput.value} is a prime number`;
			} else {
				console.log("not prime");
				li.className = "not-prime";
				li.innerHTML = `${textInput.value} is NOT a prime number`;
			}
			list.appendChild(li);
		});
	}
})();
