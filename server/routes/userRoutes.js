const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req,res)=>{
    try {
        
        // Check if User already exists
        const findUserWithEmail = await User.findOne({ email: req.body.email });
        if(findUserWithEmail) return res.status(405).send({ msg: "User With GIVEN Email Id Already Exists" });

        const findUserWithUserName = await User.findOne({ username: req.body.username });
        if(findUserWithUserName) return res.status(406).send({ msg: "User With GIVEN UserName Already Exists" });

        //generate Pass
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        
        //create new user
        const newUsr = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });

        //save user and send response
        const user = await newUsr.save();

        // Generate Token
        const token = jwt.sign({
            email: user.email, 
            username: user.username,
            userId: user._id,
        }, process.env.SECRET_KEY);

        res.status(200).json({ username: user.username, token: token });

    } catch (error) {
        res.status(500).json(error);
    }
})

//login
router.post("/login", async (req,res)=>{
    try {

        //find user
        const user = await User.findOne({username: req.body.username});
        if (!user) return res.status(400).json("Wrong username or password");
        
        // validate password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(400).json("Wrong username or password");

        // generate token
        const token = jwt.sign({
            email: user.email, 
            username: user.username,
            userId: user._id,
        }, process.env.SECRET_KEY);
        
        res.status(200).json({ username: user.username, token: token });
    } catch (error) {
        return res.status(500).json(error);
    }
})

module.exports = router;