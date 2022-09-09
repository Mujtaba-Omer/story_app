
const express = require('express')
const router = express.Router()
const {ensureAuth} = require('../middleware/auth')
const Story = require('../models/Story')


// @disc LOGGIN /  Story Adding page
// @route GET /stories/add
router.get('/add', ensureAuth, (reg, res) => {
    res.render('stories/add')
})

// @disc LOGGIN /  Process add form
// @route GET /stories
router.post('/', ensureAuth, async (reg, res) => {
    try {
        reg.body.user = reg.user.id
        await Story.create(reg.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err);
        res.render('errors/404')
    }
})

// @desc    Show all stories
// @route   GET /stories
router.get('/', ensureAuth, async (req, res) => {
    try {
      const stories = await Story.find({ status: 'public' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean()
  
      res.render('stories/index', {
        stories,
      })
    } catch (err) {
      console.error(err)
      res.render('errors/500')
    }
})

// @disc LOGGIN /  Show one story
// @route GET /stories/:id
router.get('/:id', ensureAuth, async (reg, res) => {
    try {
        const story = await Story.findById(reg.params.id)
        .populate('user').lean()

        if(!story){
            return res.redirect('errors/404')
        }
        res.render('stories/show', { story })
    } catch (err) {
        console.error(err);
        res.render('errors/500')
    }
})

// @disc LOGGIN /  Story editing page
// @route GET /stories/edit/:id
router.get('/edit/:id', ensureAuth, async (reg, res) => {
    const story = await Story.findOne({_id: reg.params.id}).lean()
    if(!story){
        return res.render('errors/404')
    }
    if (story.user != reg.user.id) {
        res.redirect('/stories')
    } else {
        res.render('stories/edit', { story })
    }
})

// Process story Edit form
router.put('/:id', ensureAuth, async (reg, res) => {
    try {
        let story = await Story.findById(reg.params.id).lean()
        if (story.user != reg.user.id) {
            res.redirect('/stories')
        } else {
            story = await Story.findOneAndUpdate({_id: reg.params.id}, reg.body, {
                new: true,
                runValidators: true
            })
            res.redirect('/dashboard')
        }
    } catch (err) {
        console.error(err)
        res.render('errors/500')
    }
    
    
})

// Delete story
router.delete('/:id', ensureAuth, async (reg, res) => {
    try {
        await Story.remove({_id: reg.params.id})
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err);
        res.render('errors/500')
    }
})

// @disc LOGGIN /  show user stories
// @route GET /stories/user/:userId
router.get('/user/:userId', ensureAuth, async (reg, res) => {
    try{
        const stories = await Story.find({user: reg.params.userId, status: 'public'})
        .populate('user')
        .lean()
        res.render('stories/index', {stories})

    }catch(err){
        console.error(err)
        res.render('errors/500')
    }
})

module.exports = router

