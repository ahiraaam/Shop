const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const sequelize = require('./util/database')
const Product = require('./models/product')
const Cart = require('./models/cart')
const User = require('./models/user')
const app = express();



app.engine('handlebars',expressHbs({layoutsDir:'views/layouts/', defaultLayout:'main-layout'}));//returns initialize engine {en que folder encuentro mi layout}
app.set('view engine','ejs');
//app.set('view engine', 'handlebars')
//app.set('view engine', 'pug'); //decir que queremos compilar dynamic templates con pug
app.set('views', 'views'); //donde vamos a encontrar las temlates

const adminRoutes = require ('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error.js')

app.get('/favicon.ico', (req, res) => res.status(204));


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

app.use((req,res,next)=>{ //ussar el usuario en la aplicacion
    User.findById(1)
    .then(user =>{
        req.user = user
        next()
    })
    .catch(err => console.log(err))
})

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.error);

Product.belongsTo(User,{ constraints:true,onDelete:'CASCADE' });
User.hasMany(Product);

sequelize.sync()
.then(result=>{
    User.findById(1)
    //console.log(result)
    
})
.then(user =>{
    if(!user){
        User.create({name:'Max',email:'aaaa@gmail.com'})
    }
    return user;
})
.then(user =>{
    console.log(user)
    app.listen(3000)
})
.catch(err=>{console.log(err)});
//CREATES TABLES FROM THE MODELS




/*app.use((req,res,next) =>{
    console.log('In the middleware');
    
    next() //Allows the request to continue to the next middleware in line
    
});*/