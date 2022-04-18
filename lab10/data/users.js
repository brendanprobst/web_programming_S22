const mongoCollections = require("../config/mongoCollection");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
function validId(id) {
	//checks if id is valid mongo id
	if (!id) throw "must provide an id";
	if (typeof id !== "string" || id.trim().length === 0)
		throw "id must be a string of non-empty spaces";
	id = id.trim();
	if (!ObjectId.isValid(id)) throw "invalid object id";
	return id;
}
function validString(string, length, errorMsg) {
	//checks if input is a string and isn't empty
	//throws error is it fails either case
	if (typeof string !== "string") throw `${errorMsg} must be a string`;
	if (string.trim().length === 0)
		throw `${errorMsg} cannot be an empty string or just spaces`;
	if (string.length < length)
		throw `${errorMsg} must be at least ${length} characters long`;
	return true;
}
async function uniqueUsername(name) {
	let userCollection = await users();
	let userFound = await userCollection.findOne({ username: name });
	if (userFound !== null) throw "Username already taken";
	return true;
}
async function get(id) {
	id = validId(id);
	const userCollection = await users();
	const user = await userCollection.findOne({ _id: ObjectId(id) });
	if (user === null) throw "no user with that id";
	user._id = user._id.toString();
	return user;
}
async function createUser(username, password) {
	username = username.toLowerCase();
	validString(username, 4, "Username");
	validString(password, 6, "Password");
	const isUnique = await uniqueUsername(username);
	var salt = bcrypt.genSaltSync(8);
	var hashedPassword = bcrypt.hashSync(password, salt);
	const usersCollection = await users();
	let newUser = {
		username: username,
		password: hashedPassword,
	};
	let insertInfo = await usersCollection.insertOne(newUser);
	if (!insertInfo.acknowledged || !insertInfo.insertedId)
		throw "could not add users";
	const newId = insertInfo.insertedId.toString();
	const user = await get(newId);
	user._id = user._id.toString();
	return user;
}
async function checkUser(username, password) {
	username = username.toLowerCase();
	validString(username, 4, "Username");
	validString(password, 6, "Password");
	let userCollection = await users();
	let userFound = await userCollection.findOne({ username: username });
	let passwordCheck = await bcrypt.compare(password, userFound.password);
	return { authenticated: passwordCheck };
}
module.exports = {
	createUser,
	checkUser,
};
