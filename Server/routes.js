const express = require('express');
const router = express.Router();
const schema = require('./schema');
const { Model } = require('./schema');
const Joi = require('joi');

router.use(express.json());

const addValidationSchema = Joi.object({
    seriesname: Joi.string().required(),
    seasons: Joi.number().integer().min(1).required(),
    ratingbefore: Joi.number().min(0).max(10).required(),
    ratingafter: Joi.number().min(0).max(10).required(),
    image: Joi.string().uri().required()
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

router.get('/read/:id', async (req, res) => {
    const _id = req.params.id
    Model.findById({ _id })
        .then(users => res.json(users))
        .catch(err => console.log(err))
});

module.exports = router;
