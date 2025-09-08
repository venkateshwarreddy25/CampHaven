const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const campgroundSchema=new Schema({
    title:String,  //no need no reaquire mongoose.schema bcz new schema accessing it
    image:String,
    price:Number,
    description:String,
    location:String
},{timestamps:true})

module.exports=mongoose.model('Campground',campgroundSchema)