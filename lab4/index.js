const bands = require("./data/bands");
const connection = require("./config/mongoConnection");

const main = async () => {
	const db = await connection.connectToDb();
	await db.dropDatabase();
	console.log("hello");
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
	const lennonsBoys = await bands.create(
		"Lennon's Boys",
		["Rock", "Psychedelia", "Pop"],
		"https://www.thebeatles.com",
		"Parlophone",
		["John Lennon", "Paul McCarney", "George Harrison", "Ringo Star"],
		1960
	);
	console.log(lennonsBoys);

	const getAllBands = await bands.getAll();
	console.log(getAllBands);
	const FallOutBoy = await bands.create(
		"Fall Out Boy",
		["Rock", "Punk Rock", "Alt Rock"],
		"https://www.falloutboy.com",
		"Fueled By ramen",
		["Patrick Stump", "Pete Wentz", "Joe Trophman", "Andy Hurley"],
		2001
	);
	console.log(FallOutBoy);

	const loggedNewBand = await bands.get("620c2fff6049786e79b0f74c");
	// console.log(loggedNewBand);
};
main();
