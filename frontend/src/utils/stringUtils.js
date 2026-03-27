export const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
export const truncate = (str, len) => str && str.length > len ? str.substring(0, len) + '...' : str;
