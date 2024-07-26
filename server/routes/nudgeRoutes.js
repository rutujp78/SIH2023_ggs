const express = require('express');
const verifyToken = require('../middleware/auth');
const { updateNudges, createNudge, getNudge } = require('../controller/nudgeController');

const router = express.Router();

router.route('/:userId').get(getNudge)
router.route('/').post(verifyToken, createNudge)
// router.get('/updateNudge', updateNudges);

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