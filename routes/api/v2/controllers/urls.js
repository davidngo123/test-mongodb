import express from 'express';

var router = express.Router();

import getURLPreview from '../utils/urlPreviews.js';

router.get('/preview', async function(req, res, next){
    let inputUrl = req.query.url;
    let outputHtml = await getURLPreview(inputUrl)
    res.send(outputHtml)
})

export default router;