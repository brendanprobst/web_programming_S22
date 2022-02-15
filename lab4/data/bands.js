const mongoCollections = require("../config/mongoCollection");
const bands = mongoCollections.bands;
const { ObjectId } = require("mongodb");

module.exports = {
	async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
		//check all exist
		let genreInvalid = false;
		let bandMemberInvalid = false;
		if (
			!name &&
			!genre &&
			!website &&
			!recordLabel &&
			!bandMembers &&
			!yearFormed
		)
			throw "must include values for all inputs";
		if (
			(typeof name !== "string" || name.trim().length === 0) &&
			(typeof website !== "string" || website.trim().length() === 0) &&
			(typeof recordLabel !== "string" || recordLabel.trim().length === 0)
		)
			throw "name, website, and record label must be strings";

		if (
			website.indexOf("https://www.") === -1 &&
			website.indexOf(".com") === -1 &&
			website.length < 21
		)
			throw "website must contain 'https://www. and .com and must have 5 characters between www. and .com ";

		if (!genre || !Array.isArray(genre))
			throw "You must provide an array of genres";
		if (genre.length === 0) throw "You must supply at least one genre";
		for (i in genre) {
			if (typeof genre[i] !== "string" || genre[i].trim().length === 0) {
				genreInvalid = true;
				break;
			}
			genre[i] = genre[i].trim();
		}
		if (genreInvalid)
			throw "One or more genres is not a string or is an empty string";
		if (!bandMembers || !Array.isArray(bandMembers))
			throw "You must provide an array of genres";
		if (bandMembers.length === 0)
			throw "You must supply at least one bandMembers";
		for (i in bandMembers) {
			if (
				typeof bandMembers[i] !== "string" ||
				bandMembers[i].trim().length === 0
			) {
				bandMemberInvalid = true;
				break;
			}
			bandMembers[i] = bandMembers[i].trim();
		}
		if (bandMemberInvalid)
			throw "One or more bandmembers is not a string or is an empty string";
		// check that year formed is a number and between 1900 and 2022
		if (
			typeof yearFormed !== "number" &&
			yearFormed < 1900 &&
			yearFormed > 2022
		)
			throw "year formed must be a number between 1900 and 2022";
		name = name.trim();
		website = website.trim();
		recordLabel = recordLabel.trim();
		const bandCollection = await bands();
		let newBand = {
			name,
			genre,
			website,
			recordLabel,
			bandMembers,
			yearFormed,
		};
		const insertInfo = await bandCollection.insertOne(newBand);
		if (!insertInfo.acknowledged || !insertInfo.insertedId)
			throw "could not add band";
		const newId = insertInfo.insertedId.toString();
		const band = await this.get(newId);
		band._id = band._id.toString();
		return band;
	},
	async getAll() {
		const bandCollection = await bands();
		const bandList = await bandCollection.find({}).toArray();
		if (!bandList) throw "could not get all bands";
		for (band of bandList) {
			band._id = band._id.toString();
		}
		return bandList;
	},
	async get(id) {
		if (!id) throw "must provide an id";
		if (typeof id !== "string" || id.trim().length === 0)
			throw "id must be a string of non-empty spaces";
		id = id.trim();
		if (!ObjectId.isValid(id)) throw "invalid object id";
		const bandCollection = await bands();
		const band = await bandCollection.findOne({ _id: ObjectId(id) });
		if (band === null) throw "no band with that id";
		band._id = band._id.toString();
		return band;
	},
	async remove(id) {
		if (!id) throw "must provide an id";
		if (typeof id !== "string" || id.trim().length === 0)
			throw "id must be a string of non-empty spaces";
		id = id.trim();
		if (!ObjectId.isValid(id)) throw "invalid object id";
		const bandCollection = await bands();
		const deletedBand = bandCollection.deleteOne({ _id: ObjectId(id) });
		if (deletedBand.deletedCount === 0)
			throw `could not delete band with id of ${id}`;
		return { deleted: true };
	},
	async rename(id, newName) {
		if (!id) throw "must provide an id";
		if (typeof id !== "string" || id.trim().length === 0)
			throw "id must be a string of non-empty spaces";
		id = id.trim();
		if (!ObjectId.isValid(id)) throw "invalid object id";
		if (!newName) throw "you must provide a new name";
		if (typeof newName !== "string" || newName.trim().length === 0)
			throw "newName must be a string of non-empty spaces";
		newName = newName.trim();
		const bandCollection = await bands();
		const updatedBand = {
			name: newName,
			genre,
			website,
			recordLabel,
			bandMembers,
			yearFormed,
		};
		const updateInfo = await bandCollection.updateOne(
			{ _id: ObjectId(id) },
			{ $set: updatedBand }
		);
		if (updateInfo.modifiedCount === 0) throw "could  not update band";
		return await this.get(id);
	},
};
