const express = require('express');
const NUDGES = require('../models/Nudges');
const verifyToken = require('../middleware/auth')

const router = express.Router();

router.route('/:userId').get(async (req, res) => {
    try {
        const userId = req.params.userId;
        let allNudges = await NUDGES.find({ userId });

        // after decyp
        allNudges.forEach((element, index, array) => {
            // console.log(array[index].data);
            array[index].data = array[index].data.map(entry => {
                return { labels: entry.labels, aqi: entry.aqi ^ process.env.SECRET_KEY }
            }
            )
            // console.log(array[index].data);
        })

        console.log(allNudges);

        res.status(200).json(allNudges);
    } catch (error) {
        console.log(error);
    }
})

router.route('/').post(verifyToken, async (req, res) => {
    try {
        
        // const userId = req.params;

        const { name, description, city, state, category, data } = req.body;

        // const user = await USERS.findOne({userId});
        // if (!user) {
        //   return res.status(404).json({ error: 'User not found' });
        // }

        const nudge = await NUDGES.create({
            userId,
            ...req.body
        })
    
        res.status(200).json(nudge);

    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;































// app.post('/users/:userId/nudges', (req, res) => {
// app.post('/nudges', async (req, res) => {
//         try {
//             // const { userId } = req.params;
//             const { name, description, city, state, category, data } = req.body;
    
//             // const user = users.find((user) => user.id === userId);
//             // if (!user) {
//             //   return res.status(404).json({ error: 'User not found' });
//             // }
    
//             const nudge = await NUDGES.create({
//                 ...req.body
//             })
    
//             res.status(200).json(nudge);
    
//         } catch (error) {
//             res.status(500).json(error);
//         }
//     });