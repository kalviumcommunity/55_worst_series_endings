const express = require('express')
const router = express.Router()
const schema = require('./schema');
const { Model } = require('./schema');


router.use(express.json())

router.get('/read', async (req, res) => {
    try {
        const serieswithworstendings = await Model.find(); 
        res.json(serieswithworstendings); 
    } catch (err) {
        console.error('Error in GET request:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/post',(req,res)=>{
    console.log(req.body)
    res.json(req.body)
})

router.post('/new', async (req, res) => {
    try {
        const newData = await Model.create(req.body);
        console.log(newData)
        res.send(newData);
    } catch (error) {
        console.error(error);
        res.send('Error');
    }
});

router.put('/put',(req,res)=>{
    res.send("put request")
})

router.delete('/delete',(req,res)=>{
    res.send("delete request")
})

module.exports = router