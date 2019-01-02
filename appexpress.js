const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

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

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorController.error);
app.listen(3000)



/*app.use((req,res,next) =>{
    console.log('In the middleware');
    
    next() //Allows the request to continue to the next middleware in line
    
});*/