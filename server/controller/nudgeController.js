const NUDGES = require('../models/Nudges');
const USERS = require('../models/Users');

const updateNudges = async (io) => {
    try {
        const nudges = await NUDGES.find({});
        nudges.forEach(async (nudge) => {
            if (nudge.category === 'aqi') {
                try {
                    let aqi = await fetch(`https://api.weatherbit.io/v2.0/current/airquality?city=${nudge.city}&state=${nudge.state}&country=india&key=${process.env.API_KEY}`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });

                    aqi = await aqi.json();
                    aqi = aqi.data[0].aqi;

                    if (!nudge.data) nudge.data = [];
                    nudge.data.push({ label: new Date(Date.now()), value: aqi ^ process.env.SECRET_KEY });
                    const updatedNudge = await nudge.save();

                    // console.log(updatedNudge);

                    io.emit('nudgeUpdated', updatedNudge);
                    // io.to(nudge.userID).emit('nudgeUpdated', updatedNudge); // to push updates to respective user only
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        });
    } catch (error) {
        console.log(error);
    }

};

const createNudge = async (req, res) => {
    try {
        const { name, description, city, state, category } = req.body.nudge;
        // console.log(req.body.nudge);
        const user = await USERS.findOne({ userId: req.body.userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!name || !description || !city || !state || !category) {
            return res.status(400).json({ msg: "Not please fill all required fields" });
        }

        const nudge = await NUDGES.create({
            userId: req.body.userId,
            ...req.body.nudge
        });

        res.status(200).json(nudge);

    } catch (error) {
        res.status(500).send(error);
    }
};

const getNudge = async (req, res) => {
    try {
        const userId = req.params.userId;
        const category = req.query.category;

        let allNudges = await NUDGES.find({ userId, category });

        // after decyp
        allNudges.forEach((element, index, array) => {
            // console.log(array[index].data);
            array[index].data = array[index].data.map(entry => {
                // since secured the data by encrypting so need to decrypt
                return { label: entry.label, value: entry.value ^ process.env.SECRET_KEY }
            }
            );
            // console.log(array[index].data);
        });

        console.log(allNudges);
        res.status(200).json(allNudges);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { updateNudges, createNudge, getNudge };