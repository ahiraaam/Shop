const getDb = require('../util/database').getDb
const mongodb = require('mongodb')

class Product{
  constructor(title,price,description,imageURL,id,userId){
    this.title = title,
    this.price = price,
    this.description = description,
    this.imageURL = imageURL,
    this._id = id ? new mongodb.ObjectId(id) : null
    this.userId = userId
  }

  save(){
    const db = getDb();
    let dbOp;
    if(this._id){
      dbOp = db.collection('products')
      .updateOne({_id : this._id}, {$set :this});
    }else{
      dbOp = db
      .collection('products')
      .insertOne(this)
    } 
    return dbOp
      .then(result =>{
        console.log(result); 
      })
      .catch(err =>{
        console.log(err)
      })
  }

  static fetchAll(){
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products=>{
         return products;
      })
      .catch(err =>{
        console.log(err)
      })
  }

  static findById(prodId){
    const db = getDb()
    return db
    .collection('products')
    .find({_id: new mongodb.ObjectId(prodId)}) //el ID es un objeto
    .next()
    .then(product =>{
      console.log(product)
      return product
    })
    .catch(err => console.log(err))
  }

  static deleteById(prodId){
    const db = getDb()
    return db
    .collection('products')
    .deleteOne({_id: new mongodb.ObjectId(prodId)})
    .then(result =>{
      console.log('Deleted!!');
      
    })
    .catch(err => console.log(err))
  }
}


module.exports = Product;




///////////SEQUELIZE///////////////////
//const Sequelize = require('sequelize')

//const sequelize = require('../util/database')

// const Product = sequelize.define('product' , {
//   id:{
//     type: Sequelize.INTEGER,
//     autoIncrement:true,
//     allowNull:false,
//     primaryKey:true
//   },
//   title:Sequelize.STRING,
//   price:{
//     type:Sequelize.DOUBLE,
//     allowNull:false
//   },
//   imageURL:{
//     type:Sequelize.STRING,
//     allowNull:false
//   },
//   description:{
//     type:Sequelize.STRING,
//     allowNull:false
//   }
// });

// module.exports= Product;


/*
////CODE FOR MYSQL WITHOUT SEQUELIZE////////////
const db = require('../util/database')
const Cart =  require('./cart')

module.exports = class Product {
  constructor(id , title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO products (title,price,description,imageURL) VALUES (?,?,?,?)',
    [this.title,this.price,this.description,this.imageUrl]
    )
  
  }

  static deleteById(id){
    
  }

  static fetchAll() {
    return db.execute('SELECT * from products')
  }

  static findById(id) {
   return db.execute('SELECT * FROM products WHERE products.id= ?' ,[id])
  };

}


//////CODIGO PARA FILES, YA NO SE USA//////////

const fs = require('fs');
const path = require('path');
const Cart =  require('./cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      try{
        cb(JSON.parse(fileContent));
      }catch{
        cb([])
      }
      
      
    }
  });
};

module.exports = class Product {
  constructor(id , title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIndex = products.findIndex(prod => prod.id === this.id)
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }else{
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
      
    });
  }

  static deleteById(id){
    getProductsFromFile(products => {
      const product =  products.find(prod => prod.id ===id)
      const updatedProducts = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts),err =>{
        if(!err){
          Cart.deleteProduct(id,product.price)
        }
      })
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
*/