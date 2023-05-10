import express from 'express';

var router = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

//TODO: Add handlers here
router.get('/', async function(req, res, next) {
    try{  
      let allPosts = await req.models.Post.find()
      let posts = [];
      for (let i = 0; i < allPosts.length; i++) {
        let url = await getURLPreview(allPosts[i].url)
        posts.push({"description" : allPosts[i].description,
                    "search" : allPosts[i].search,
                    "htmlPreview" : url})
      }
      console.log(posts)
      res.send(posts)
    }catch(error){
      console.log("Error saving user: ", error)
      res.status(500).json({"status": "error", "error": error})
    }
  });


router.post('/', async (req, res) => {
    console.log(req.body)
    try{
        const newPost = new req.models.Post({
            url: req.body.url,
            description: req.body.description,
            search: req.body.search,
            created_date: req.body.created_date,
        })
        
        await newPost.save()
        console.log('sucess')
        res.json({"status": "success"})

    }catch(error){
        console.log("Error saving post: ", error)
        res.status(500).json({"status": "error", "error": error})
    }
})
export default router;