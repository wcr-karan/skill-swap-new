export const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const isStrongPassword = (pwd) => pwd.length >= 8;
export const isValidUrl = (url) => { try { new URL(url); return true; } catch { return false; } };
// Email regex could be more comprehensive
