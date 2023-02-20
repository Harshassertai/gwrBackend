module.exports.successJson = (message, data) => {
	return { message, data };
};
module.exports.errorJson = () => {
	return { message: "There is an error " };
};
