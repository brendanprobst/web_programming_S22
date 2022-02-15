const pinkFloyd = await bands.create(
		"Pink Floyd",
		["Progressive Rock", "Psychedelic Rock", "Classic Rock"],
		"https://www.pinkfloyd.com",
		"EMI",
		[
			"Roger Waters",
			"David Gilmore",
			"Nick Mason",
			"Richard Wright",
			"Sid Barrett",
		],
		1965
	);
	console.log(pinkFloyd);