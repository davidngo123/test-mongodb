import express from 'express';
var router = express.Router();
router.get('/', async function(req, res, next) {
    try{  
      let directory = req.query.directory
      console.log(username)
      let allDirectories
      if(username == undefined){
        allDirectories = await req.models.Directory.find()
      } else {
        allDirectories = await req.models.Directory.find({'name' : directory})
      }
      
      let directories = [];
      for (let i = 0; i < allDirectories.length; i++) {
        directories.push({
                    "id" : allDirectories[i]._id,
                    "name" : allDirectories[i].name,
                    "description" : allDirectories[i].description})
      }
      res.send(directories)
    }catch(error){
      res.status(500).json({"status": "error", "error": error})
    }
  });


router.post('/', async (req, res) => {
    try {
      const newPost = new req.models.Directory({
          name: req.body.name,
          description: req.body.description,
      })
      
      await newPost.save()
      console.log('sucess')
      res.json({"status": "success"})

    } catch(error) {
        console.log("Error saving post: ", error)
        res.status(500).json({"status": "error", "error": error})
    }


    // res.status(401).json({"status": "error", "error": "not logged in"})

})

export default router;