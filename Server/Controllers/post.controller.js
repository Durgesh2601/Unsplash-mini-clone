const express = require("express");
const router = express.Router();
const Post = require("../Models/post.model");

router.post("/", async(req, res) => {
    const {label, pic} = req.body;
    if(!pic) {
       return res.status(422).send({error : "Please add a picture"});
    }
    try {
        const post = await Post.create({
            label : req.body.label,
            pic : req.body.pic
        })
        return res.status(201).send(post);
    } catch (error) {
        return res.status(500).send(error.message)
    }
});

router.get("/", async(req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 6;
        const skip = (page - 1) * size;
        const posts = await Post.find().skip(skip).limit(size).sort("-createdAt").lean().exec();
        return res.status(200).send(posts);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error.message);

    }
})
module.exports = router;