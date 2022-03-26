const mongoCollection = require("../config/mongoCollection");
const { ObjectId } = require("mongodb");
const {
	validString,
	validId,
	validArrayOfString,
	exists,
	validDate,
	validRating,
} = require("./validation.js");
const bands = mongoCollection.bands;

module.exports = {
	async getAll(bandId) {
		bandId = validId(bandId);
		const bandCollection = await bands();
		const band = await bandCollection.findOne({ _id: ObjectId(bandId) });
		if (band === null) throw "no band with that id";
		let returnArray = band.albums;
		return returnArray;
	},
	async get(albumId) {
		albumId = validId(albumId);
		const bandCollection = await bands();
		const album = await bandCollection.findOne(
			{
				"albums._id": ObjectId(albumId),
			},
			{
				projection: { _id: 0, "albums.$": 1 },
			}
		);
		return album.albums[0];
	},
	async create(bandId, title, releaseDate, tracks, rating) {
		exists(bandId, "Band Id");
		exists(title, "title");
		exists(releaseDate, "Release Data");
		exists(tracks, "tracks");
		exists(rating, "rating");
		validString(title);
		validDate(releaseDate);
		validArrayOfString(tracks);
		validDate(releaseDate);
		validRating(rating);
		bandId = validId(bandId);
		const newAlbum = {
			_id: ObjectId(),
			title,
			releaseDate,
			tracks,
			rating,
		};
		const bandCollection = await bands();
		const updateInfo = await bandCollection.updateOne(
			{ _id: ObjectId(bandId) },
			{ $push: { albums: newAlbum } }
		);

		if (updateInfo.modifiedCount === 0) {
			throw "could not add new band";
		}
		newAlbum._id = newAlbum._id.toString();
		return await newAlbum;
	},
	async remove(albumId) {
		albumId = validId(albumId);
		const bandCollection = await bands();
		const band = bandCollection.updateOne(
			{ "albums._id": ObjectId(albumId) },
			{ $pull: { albums: { _id: ObjectId(albumId) } } }
		);
		if (band.modifiedCount === 0)
			throw `could not delete album with id of ${albumId}`;
		const returnBand = bandCollection.findOne({
			"albums._id": ObjectId(albumId),
		});
		console.log(returnBand);
		return returnBand;
	},
};
