const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const campgroundSchema=new Schema({
    title:String,  
    image:String,
    price:Number,
    description:String,
    location:String,
    createdAt:{
        type:Date,
        default:Date.now
}
},{timestamps:true})

module.exports=mongoose.model('Campground',campgroundSchema)
