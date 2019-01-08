const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const expressHbs = require('express-handlebars');
const errorController = require('./controllers/error.js')

const mongoConnect = require('./util/database').mongoConnect //exporta una funcion
const User = require('./models/user')

const app = express();

app.engine('handlebars',expressHbs({layoutsDir:'views/layouts/', defaultLayout:'main-layout'}));//returns initialize engine {en que folder encuentro mi layout}
app.set('view engine','ejs');
//app.set('view engine', 'handlebars')
//app.set('view engine', 'pug'); //decir que queremos compilar dynamic templates con pug
app.set('views', 'views'); //donde vamos a encontrar las temlates

const adminRoutes = require ('./routes/admin');
const shopRoutes = require('./routes/shop');



app.get('/favicon.ico', (req, res) => res.status(204));


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))

app.use((req,res,next)=>{ //ussar el usuario en la aplicacion
    User.findById("5c33f91c99c5db4ec41f8101")
    .then(user =>{
        req.user = new User(user.name,user.email,user.cart,user._id)
        next()
    })
    .catch(err => console.log(err))
    
})

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.error);

mongoose.connect('mongodb+srv://Ahiram:gala2312@cluster0-f8wud.mongodb.net/test?retryWrites=true').then(result =>{
    app.listen(3000)
})
.catch(err => console.log(err)
)

// mongoConnect(() =>{

//     app.listen(3000)
    
// })







/* 
SEQUELIZE!!!!!!!!!!!!!!!!!!!!!!!!!1
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const sequelize = require('./util/database')
const Product = require('./models/product')
const Cart = require('./models/cart')
const User = require('./models/user')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

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
//ESTABLECER RELACIONES
Product.belongsTo(User,{ constraints:true,onDelete:'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem})
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, {through:OrderItem})

sequelize.sync()
.then(result=>{
    return User.findByPk(1)
    //console.log(result)
    
})
.then(user =>{
    if(!user){
        return User.create({name:'Max',email:'aaaa@gmail.com'})
    }
    return user;
})
.then(user =>{
    return user.createCart();
})
.then(cart =>{
    app.listen(3000)

})
.catch(err=>{console.log(err)});
//CREATES TABLES FROM THE MODELS




/*app.use((req,res,next) =>{
    console.log('In the middleware');
    
    next() //Allows the request to continue to the next middleware in line
    
});*/ 