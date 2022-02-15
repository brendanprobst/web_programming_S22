const bands = require("./data/bands");
const connection = require("./config/mongoConnection");

const main = async () => {
	const db = await connection.connectToDb();
	await db.dropDatabase();
	let x = undefined;
	let y = undefined;

	try {
		console.log("creating new band pink floyd");
		x = await bands.create(
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
		console.log(x);
	} catch (e) {
		console.log(e);
	}
	try {
		console.log("creating new band Lennon's boys");
		x = await bands.create(
			"Lennon's Boys",
			["Rock", "Psychedelia", "Pop"],
			"https://www.thebeatles.com",
			"Parlophone",
			["John Lennon", "Paul McCarney", "George Harrison", "Ringo Star"],
			1960
		);
		console.log(x);
	} catch (e) {
		console.log(e);
	}
	try {
		console.log("getting all bands");
		x = await bands.getAll();
		console.log(x);
	} catch (e) {
		console.log(e);
	}
	try {
		console.log("Creating new band Fall Out Boy");
		x = await bands.create(
			"Fall Out Boy",
			["Rock", "Punk Rock", "Alt Rock"],
			"https://www.falloutboy.com",
			"Fueled By ramen",
			["Patrick Stump", "Pete Wentz", "Joe Trophman", "Andy Hurley"],
			2001
		);
		console.log(x);
	} catch (e) {
		console.log(e);
	}
	try {
		console.log("getting the last band created");
		x = await bands.getAll();
		console.log(x[2]);
		y = await bands.get(x[2]._id.toString());
		console.log(y);
	} catch (e) {
		console.log(e);
	}
	try {
		console.log("renaming first band");
		x = await bands.getAll();
		console.log(x[0]);
		y = await bands.rename(x[0]._id.toString(), "Red Floyd");
	} catch (e) {
		console.log(e);
	}
};
main();
