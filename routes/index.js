
const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')
const Story = require('../models/Story')

// @disc LOGGIN / Landing page
// @route GET /
router.get('/', ensureGuest, (reg, res) => {
    console.log(reg.user)
    res.render('Loggin', { layout:'loggin' })
})

// @disc DASHBOARD / Landing page
// @route GET /dashboard
router.get('/dashboard', ensureAuth, async (reg, res) => {
    try {
        const stories = await Story.find({ user: reg.user.id }).lean()
        res.render('dashboard', {
            name: reg.user.firstName || reg.user.displayName,
            stories
        })
    } catch (err) {
        console.error(err);
    }
})

module.exports = router