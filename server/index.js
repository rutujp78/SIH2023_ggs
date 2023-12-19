const express = require('express');
const http = require('http');
const schedule = require('node-schedule');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const NUDGES = require('./models/Nudges');
const cors = require('cors');
const { Server } = require('socket.io');
const nudgeRoutes = require('./routes/nudgeRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

dotenv.config();

const app = express();
const PORT = 5000;

// express handles http reqs

app.use(express.json());
app.use(cors());

// Socket.IO
const server =  http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"]
    },
    path: '/socket/'
});


// Update to respective user middleware
// io.use((socket, next) => {
//     const token = socket.handshake.auth.token;

//     if(!token) {
//         return next(new Error("Unauthorized"));
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if(err) {
//             return next(new Error("Unauthorized"));
//         }

//         socket.userId = decoded.userId;
//         next();
//     })
// })

// app.use('/users', userRoutes);
app.use('/nudges', nudgeRoutes);

const updateNudges = async () => {
    try {
        const nudges = await NUDGES.find({});
        nudges.forEach(async (nudge) => {
            if (nudge.category === 'aqi') {
                let aqi = await fetch(`https://api.weatherbit.io/v2.0/current/airquality?city=${nudge.city}&state=${nudge.state}&country=india&key=eb585492b19b430aac151fc3d235f885`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                });
                
                aqi = await aqi.json();
                aqi = aqi.data[0].aqi;

                if(!nudge.data) nudge.data = [];
                nudge.data.push({ labels: new Date(Date.now())  , aqi: aqi });
                const updatedNudge = await nudge.save();

                console.log(updatedNudge);

                io.emit('nudgeUpdated', updatedNudge);
                // io.to(nudge.userID).emit('nudgeUpdated', updatedNudge); // to push updates to respective user only
            }
        })

    } catch (error) {
        console.log(error);
    }

}

// Following function run every four hours HEHE BOI ;)
const updateNudgesJob = schedule.scheduleJob('0 */4 * * *', async () => {
    await updateNudges();
})

server.listen(PORT, () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URL).then(() => console.log("MongoDB Connected")).catch((err) => console.log(err));
    console.log("App listening on http://localhost:5000/");
})

// Socket.io stuff // socket or client
io.on('connection', (socket) => {
    console.log("User Connected", socket.id);
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })
})