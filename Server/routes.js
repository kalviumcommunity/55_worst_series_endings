const express = require('express');
const router = express.Router();
const { Model } = require('./schema');
const { userModel } = require('./userschema');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

router.use(express.json());

const addValidationSchema = Joi.object({
    seriesname: Joi.string().required(),
    seasons: Joi.number().integer().min(1).required(),
    ratingbefore: Joi.number().min(0).max(10).required(),
    ratingafter: Joi.number().min(0).max(10).required(),
    image: Joi.string().uri().required(),
    createdBy: Joi.string().required() // Assuming createdBy is the user ID associated with the entity
});

const updateValidationSchema = Joi.object({
    seriesname: Joi.string(),
    seasons: Joi.number().integer().min(1),
    ratingbefore: Joi.number().min(0).max(10),
    ratingafter: Joi.number().min(0).max(10),
    image: Joi.string().uri()
});

router.get('/read', async (req, res) => {
    try {
        const serieswithworstendings = await Model.find();
        res.json(serieswithworstendings);
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/new', async (req, res) => {
    try {
        const { error, value } = addValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const newData = await Model.create(req.body);
        res.send(newData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const entityId = req.params.id;
        const updateData = req.body;

        const { error, value } = updateValidationSchema.validate(updateData);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const updatedEntity = await Model.findByIdAndUpdate(entityId, updateData, { new: true });

        if (!updatedEntity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        res.json(updatedEntity);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const entityId = req.params.id;
        const deletedEntity = await Model.findByIdAndDelete(entityId);

        if (!deletedEntity) {
            return res.status(404).json({ error: 'Entity not found' });
        }

        res.json({ message: 'Entity deleted successfully', deletedEntity });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/signup', async (req, res) => {
    try {
        const user = await userModel.create({
            username: req.body.username,
            password: req.body.password
        });
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid username / password' });
        }

        res.status(200).json({ user });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.clearCookie('password');

    res.status(200).json({ message: 'Logout successful' });
});

router.get('/read/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await userModel.findById(_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/auth', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = {
            "username": username,
            "password": password
        };
        const TOKEN = jwt.sign(user, process.env.TOKEN);
        res.cookie('token', TOKEN, { maxAge: 365 * 24 * 60 * 60 * 1000 });
        res.json({ "token": TOKEN });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
