const mongoCollection = require("../config/mongoCollection");
const bands = mongoCollection.bands;
const { ObjectId } = require("mongodb");
const {
	validString,
	validId,
	validWebsite,
	validYear,
	validArrayOfString,
	exists,
} = require("./validation.js");
module.exports = {
	async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
		exists(name, "name");
		exists(genre, "genre");
		exists(website, "website");
		exists(bandMembers, "band members");
		exists(yearFormed, "year formed");

		validString(name, "name");
		validString(website, "website");
		validString(recordLabel, "recordLabel");
		validWebsite(website);
		validArrayOfString(genre, "genre");
		validArrayOfString(bandMembers, "Band Member");
		validYear(yearFormed, 1900, 2022);
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
			albums: [],
			overAllRating: 0,
		};
		const insertInfo = await bandCollection.insertOne(newBand);
		if (!insertInfo.acknowledged || !insertInfo.insertedId)
			throw "could not add band";
		const newId = insertInfo.insertedId.toString();
		const band = await this.get(newId);
		band._id = band._id.toString();
		console.log(band);
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
		id = validId(id);
		const bandCollection = await bands();
		const band = await bandCollection.findOne({ _id: ObjectId(id) });
		if (band === null) throw "no band with that id";
		band._id = band._id.toString();
		return band;
	},
	async remove(id) {
		id = validId(id);
		const bandCollection = await bands();
		const deletedBand = bandCollection.deleteOne({ _id: ObjectId(id) });
		if (deletedBand.deletedCount === 0)
			throw `could not delete band with id of ${id}`;
		return true;
	},
	async update(id, name, genre, website, recordLabel, bandMembers, yearFormed) {
		validString(name, "name");
		validString(website, "website");
		validString(recordLabel, "recordLabel");
		validWebsite(website);
		validArrayOfString(genre, "genre");
		validArrayOfString(bandMembers, "Band Member");
		validWebsite(website);
		validYear(yearFormed, 1900, 2022);
		name = name.trim();
		website = website.trim();
		recordLabel = recordLabel.trim();
		id = validId(id);

		const bandCollection = await bands();
		const updatedBand = {
			name,
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
