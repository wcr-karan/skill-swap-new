export const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
export const truncate = (str, len) => str && str.length > len ? str.substring(0, len) + '...' : str;
export const slugify = (text) => text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
