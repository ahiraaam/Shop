const Product  = require('../models/product')


exports.getAddProduct = (req,res,next) =>{
    res.render('admin/add-product' ,{
        pageTitle:'Add Product', 
        path:'/admin/add-product',
        productCSS:true,
        formsCSS:true,
        activeAddProduct:true
    })
}

exports.postAddProduct= (req,res,next) =>{
    res.redirect('/');
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    //products.push({title: req.body.title}) //guardo el titulo del objeto
    const product = new Product(title,imageURL,price,description);
    product.save();
}

exports.getProducts =(req,res,next) =>{
    Product.fetchAll((products)=>{
        res.render('admin/products',{
        prods:products, 
        pageTitle: 'Admin Products', 
        path:'/admin/products'
        
    });
});
}