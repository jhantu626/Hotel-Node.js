const mongoose=require('mongoose')


const MenuSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet','spicy','sour'],
        required: true
    },
    is_drink:{
        type: Boolean,
        default: false
    },
    ingridients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
})

const Menu=mongoose.model('menu',MenuSchema)

module.exports=Menu