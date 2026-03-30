const parseDbResult = (res) => res;
module.exports = { parseDbResult };
const getPagination = (page, size) => ({ limit: size, offset: page * size });
module.exports.getPagination = getPagination;
