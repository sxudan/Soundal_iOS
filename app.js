const express = require('express');

const bodyParser = require('body-parser');

const yt = require('youtube-search-without-api-key');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const youtubedl = require('youtube-dl');

app.get('/search',(req,res) =>  {
    var keyword = req.query.search_query;
    search(res, keyword);
})

async function search(res, keyword) {
    const videos = await yt.search(keyword);;
    res.json(videos);
}

app.get('/fetchUrl', (req, res) => {
    var id = req.query.id
    const url = `https://www.youtube.com/watch?v=${id}`
    // video.on('info', (info) => {
    //     res.json(info)
    // })

    console.log(url);

    youtubedl.getInfo(url,['--format=140'], function(err, info) {
        if (err) throw err
       
        res.json(info)
      })
})

app.listen(4000, () => {
    console.log("listening on 4000")
})