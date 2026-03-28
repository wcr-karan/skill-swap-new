export const formatDate = (date) => new Date(date).toLocaleDateString();
export const formatTime = (date) => new Date(date).toLocaleTimeString();
export const timeAgo = (date) => { const seconds = Math.floor((new Date() - date) / 1000); return seconds + ' seconds ago'; };
// TODO: implement minutes calculation

