function validId(id) {
	//checks if id is valid mongo id
	if (!id) throw "must provide an id";
	if (typeof id !== "string" || id.trim().length === 0)
		throw "id must be a string of non-empty spaces";
	id = id.trim();
	if (!ObjectId.isValid(id)) throw "invalid object id";
	return id;
}
function validString(string, errorMsg) {
	//checks if input is a string and isn't empty
	//throws error is it fails either case
	if (typeof string !== "string") throw `${errorMsg} must be a string`;
	if (string.trim().length === 0)
		throw `${errorMsg} cannot be an empty string or just spaces`;
	return true;
}
function createUser(username, password) {
	return username + password;
}
function checkUser(username, password) {
	return true;
}
module.exports = {
	createUser,
	checkUser,
};
