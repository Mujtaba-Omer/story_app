module.exports = {
    ensureAuth: (reg, res, next)=>{
        if (reg.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    },
    ensureGuest: (reg, res, next)=>{
        if (reg.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }
}