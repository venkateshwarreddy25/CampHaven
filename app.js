const express=require('express');
const mongoose=require('mongoose');
const app=express();
const Port=process.env.PORT ||8080;
const path=require('path');
const Ejsmate=require('ejs-mate');
const Campground=require('./models/campground');
const campground = require('./models/campground');
const methodoveride=require('method-override');
const { log } = require('console');
const { create } = require('domain');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI);
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});


app.engine('ejs',Ejsmate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}))
app.use(methodoveride('_method'));


app.get('/',async (req,res)=>{
    try{
        res.redirect('campgrounds')
    }
    catch(e){
        console.log(e); 
    }
})


app.get('/campgrounds',async (req,res)=>{
    const campgrounds=await Campground.find({}).sort({createdAt:-1});
    res.render('campgrounds/index',{campgrounds})
});



app.get('/campgrounds/new', (req, res) => {
    const randomImageNumber = Math.floor(Math.random() * 1000);
    const randomImageUrl = `https://picsum.photos/800/600?random=${randomImageNumber}`;
    res.render('campgrounds/new', { randomImageUrl });  
});





app.post('/campgrounds', async (req, res) => {
    const { title, location, description } = req.body.campground;

 
    const randomImageNumber = Math.floor(Math.random() * 1000);
    const image = `https://picsum.photos/800/600?random=${randomImageNumber}`;

    const newCampground = new Campground({
        title,
        location,
        description,
        image 
    });

    await newCampground.save();
    res.redirect(`/campgrounds/${newCampground._id}`);
});



app.get('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid Campground ID");
    }

    const campground = await Campground.findById(id);
    if (!campground) {
        return res.status(404).send("Campground not found");
    }

    res.render('campgrounds/show', { campground });
});


app.get('/campgrounds/:id/edit',async (req,res)=>{
    const campground=await Campground.findById(req.params.id)
    res.render('campgrounds/edit',{campground})

})


app.put('/campgrounds/:id',async (req,res)=>{
    const {id}=req.params;
    const campground=await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`)
})

app.delete('/campgrounds/:id',async (req,res)=>{
    const {id}=req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})

app.listen(Port,()=>{
    console.log('serving on port 8080');
    
})
