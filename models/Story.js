const mongoose = require('mongoose')

const StorySchema = mongoose.Schema({
    title:{
        type: String,
        require: true,
        trim: true
    },
    body:{
        type:String,
        require:true
    },
    status:{
        type: String,
        default: 'public',
        enim: ['public', 'private']
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Story', StorySchema)
