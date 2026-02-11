import api from './axios';

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (data) => api.post('/auth/register', data),
    getMe: () => api.get('/auth/me'),
    updateProfile: (data) => api.patch('/auth/profile', data),
    getUser: (id) => api.get(`/auth/user/${id}`),
};

export const skillsAPI = {
    add: (data) => api.post('/skills', data),
    getMySkills: () => api.get('/skills/my'),
    explore: () => api.get('/skills/explore'),
    getMatches: () => api.get('/skills/matches'), // Using the two-way match endpoint
};

export const swapAPI = {
    sendRequest: (data) => api.post('/swap', data),
    getIncoming: () => api.get('/swap/incoming'),
    getOutgoing: () => api.get('/swap/outgoing'),
    updateStatus: (id, status) => api.patch(`/swap/${id}`, { status }),
};

export const matchesAPI = {
    getLearningMatches: () => api.get('/matches'), // One-way matches (users teaching what I want to learn)
    getAllUsers: () => api.get('/matches/users'),
};
