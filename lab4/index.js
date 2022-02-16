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
		console.log(y);
	} catch (e) {
		console.log(e);
	}
	try {
		console.log("removing the 2nd band");
		x = await bands.getAll();
		console.log(x[0]);
		y = await bands.remove(x[1]._id.toString());
		console.log(y);
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
		console.log("creating new band with invalid parameters");
		x = await bands.create(
			"   ",
			["Progressive Rock", "Psychedelic Rock", "Classic Rock"],
			"https://www/pinkfloyd.com",
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
		console.log("this failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("creating new band with invalid parameters");
		x = await bands.create(
			89,
			["Progressive Rock", "Psychedelic Rock", "Classic Rock"],
			"https://www/pinkfloyd.com",
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
		console.log("this failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("creating new band with invalid parameters");
		x = await bands.create(
			"Pink Floyd",
			[],
			"https://www/pinkfloyd.com",
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
		console.log("this failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("creating new band with invalid parameters");
		x = await bands.create(
			"Pink Floyd",
			[2],
			"https://www/pinkfloyd.com",
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
		console.log("this failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("creating new band with invalid parameters");
		x = await bands.create(
			"Pink Floyd",
			["Progressive Rock", "Psychedelic Rock", "Classic Rock"],
			"https://www.pd.com",
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
		console.log("this failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("creating new band with invalid parameters");
		x = await bands.create(
			"Pink Floyd",
			["Progressive Rock", "Psychedelic Rock", "Classic Rock"],
			"https://www.pinkFloyd.com",
			"   ",
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
		console.log("this failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("creating new band with invalid parameters");
		x = await bands.create(
			"Pink Floyd",
			["Progressive Rock", "Psychedelic Rock", "Classic Rock"],
			"https://www.pinkFloyd.com",
			9,
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
		console.log("this failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("creating new band with invalid parameters");
		x = await bands.create(
			"Pink Floyd",
			["Progressive Rock", "Psychedelic Rock", "Classic Rock"],
			"https://www.pinkFloyd.com",
			"EMI",
			[],
			1965
		);
		console.log(x);
	} catch (e) {
		console.log("this failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("creating new band with invalid parameters");
		x = await bands.create(
			"Pink Floyd",
			["Progressive Rock", "Psychedelic Rock", "Classic Rock"],
			"https://www.pinkFloyd.com",
			"EMI",
			[23],
			1965
		);
		console.log(x);
	} catch (e) {
		console.log("this failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("creating new band with invalid parameters");
		x = await bands.create(
			"Pink Floyd",
			["Progressive Rock", "Psychedelic Rock", "Classic Rock"],
			"https://www.pinkFloyd.com",
			"EMI",
			["paul"],
			1800
		);
		console.log(x);
	} catch (e) {
		console.log("this failed correctly");
		console.log(e);
		console.log("=================");
	}

	try {
		console.log("removing band that doesnt exist");
		x = await bands.remove("hellothisisntanid");
	} catch (e) {
		console.log("failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("renaming band that doesnt exist");
		x = await bands.rename("hellothisisntanid", "new name");
	} catch (e) {
		console.log("failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("renaming band with invalid new name");
		x = await bands.getAll();
		y = await bands.rename(x[0]._id.toString(), "    ");
		console.log(y);
	} catch (e) {
		console.log("failed correctly");
		console.log(e);
		console.log("=================");
	}
	try {
		console.log("getting band that doesn't exist");
		y = await bands.get("idthatdoesntexist");
		console.log(y);
	} catch (e) {
		console.log("failed correctly");
		console.log(e);
		console.log("=================");
	}
};
main();
