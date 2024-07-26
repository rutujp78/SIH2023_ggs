import axios from 'axios';

const nudgeService = {
    getNudges: async (userId, category) => {
        try {
            const response = await axios.get(`http://localhost:5000/nudges/${userId}`, {
                params: { category },
            })
            const userNudges = await response.data;
        
            return userNudges;
        } catch (error) {
            console.log(error);
            throw error;
        }
    },
    addNudge: async (userId, nudge, token) => {
        try {
            const response = await axios.post('http://localhost:5000/nudges/', { userId, nudge}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const newNudge = response.data;
            return newNudge;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
};




export default nudgeService;