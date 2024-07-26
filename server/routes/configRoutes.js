const nudgeRoutes = require('../routes/nudgeRoutes.js');
const userRoutes = require('../routes/userRoutes.js');

const configRoutes = (app) => {
    app.use('/users', userRoutes);
    app.use('/nudges', nudgeRoutes);
}

module.exports = configRoutes;