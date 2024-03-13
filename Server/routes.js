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

router.get('/read/:id', async (req,res) => {
    const _id = req.params.id
    Model.findById({_id})
    .then(users => res.json(users))
    .catch(err => console.log(err))
  })

router.put("/update/:id", async (req, res) => {
    const entityId = req.params.id;
    const updateData = req.body;
  
    try {
      const updatedEntity = await Model.findByIdAndUpdate(
        entityId,
        updateData,
        { new: true }
      );
  
      if (!updatedEntity) {
        return res.status(404).json({ error: "Entity not found" });
      }
  
      res.json(updatedEntity);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  
  
    router.delete("/delete/:id", async (req, res) => {
      const entityId = req.params.id;
    
      try {
        const deletedEntity = await Model.findByIdAndDelete(entityId);
    
        if (!deletedEntity) {
          return res.status(404).json({ error: "Entity not found" });
        }
    
        res.json({ message: "Entity deleted successfully", deletedEntity });
      } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    });

module.exports = router