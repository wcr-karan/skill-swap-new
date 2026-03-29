const logInfo = (msg) => console.log(`[INFO]: ${msg}`);
module.exports = { logInfo };
const logError = (msg) => console.error(`[ERROR]: ${msg}`);
module.exports.logError = logError;
const logWarn = (msg) => console.warn(`[WARN]: ${msg}`);
module.exports.logWarn = logWarn;
