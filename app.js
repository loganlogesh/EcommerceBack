let express = require("express");           // import
let app = express ();                      // object 
let port = 9120 ;
let Mongo = require('mongodb')
const bodyParser = require('body-parser');
const cors = require('cors');
let {dbConnect , getData , postData , UpdateOrder , DeleteOrder} = require('./Controller/dbController');   // import Database


// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req , res)=>{                 // route part
    res.send("hi from logan")
})

//  Page 1 
//  > list of catagories. -- 1st API

app.get('/ProductCategory',async(req, res)=>{
    let query = {} ;
    if (req.query.productTypeId){                                       // 4th API
        query = {"product_type.productType_id" : Number(req.query.productTypeId)};
    }
    else if (req.query.categoryId){
        query = {Category_id : Number(req.query.categoryId)};            
    }
    else{
        query = {}
    }
    let collectionName = "ProductCategory" ;  
    let outPut = await  getData(collectionName , query);
    res.send(outPut)
})

// > list of brand wrt to Product. -- 2nd API

// app.get('/productItems',async(req, res)=>{
//     let query = { productType_id :  6 };
//     let collectionName = "productItemss" ;  
//     let outPut = await  getData(collectionName , query)
//     res.send(outPut)
// })

// app.get('/productItems',async(req, res)=>{     // filter based on the Product_id (paramQuery)
//     let query = {};
//     if(req.query.productid){
//         query = {Product_id: Number(req.query.productid)}
//         console.log(req.query.productid)
//     }
//     else{
//         query = {}    
//     }
//     let collectionName = "productItemss" ;  
//     let outPut = await  getData(collectionName , query);
//     res.send(outPut)

// })

app.get('/productItems',async(req, res)=>{     // filter based on the ProductType_id (paramQuery)
    let query = {};
    if(req.query.brandId){
        query = {Brand_id: Number(req.query.brandId)}
    }
    else if(req.query.Product_id){
        query = {Product_id: Number(req.query.Product_id)}       // 6th API
    }
    else{
        query = {}    
    }
    let collectionName = "productItems" ;  
    let outPut = await  getData(collectionName , query);
    res.send(outPut)

})

// > list of productType -- 3rd API

app.get('/productType',async(req,res)=>{
    let query = {};
    let collectionName = "productType" ;
    let outPut = await getData(collectionName , query);
    res.send(outPut)
})

//  Page 2 >    

// Items wrt to Product (filter) -- 5th API

app.get('/filter/:productid', async(req,res)=>{
    let productid = Number(req.params.productid);
    let Lcost = Number(req.query.Lcost);
    let  Hcost = Number(req.query.Hcost);
    if (Lcost && Hcost ){
        query = {
            "productType_id":productid,
            $and:[{Price:{$gte:Lcost,$lte:Hcost}}]
        }
    }
    else{
        query = {}    
    }
    let collectionName = "productItems" ;  
    let outPut = await getData(collectionName , query);
    res.send(outPut)
})


// app.get('/filter/:productTypeId',async(req,res) =>{
//     let producTypeId = Number(req.params.productTypeId);
//     let BrandId = Number(req.query.BrandId);
//     if (BrandId){
//         query = {
//             "productType_id " : producTypeId,
//             "Brand_id" : BrandId
//         } 
//     }
//     else{
//         query = {}
//     }
//     let collectionName = "productItems";
//         let outPut = await getData(collectionName,query);
//         res.send(outPut)
// })

// app.get('/filter/:mealId',async(req,res) =>{
//     let mealId = req.params.mealId;
//     res.send(mealId)
// })

// Invoice of the order ( orders ) -- 7th API

app.get("/Orders", async(req,res)=> {
    let query = {};
    if(req.query.email){
        query = {email:req.query.email}
    }
    else {
        query = {}
    }
    let collectionName = "Orders" ;  
    let outPut = await getData(collectionName , query);
    res.send(outPut)
})

// place Order

app.post('/placeOrder', async(req,res)=> {
    let data = req.body;
    let collection = "Orders";
    let response  = await postData(collection,data)
    res.send(response)

})

// Menu details {"id":[10 ,8 , 7]}
app.post('/orderProductDetails',async(req,res)=> {
    if(Array.isArray(req.body.id)){
        let query = {Product_id:{$in:req.body.id}};
        let collection = 'productItems';
        let outPut = await getData(collection , query);
        res.send(outPut)
    }
    else{
        res.send('Please pass data in form of array');
    }
})

// // UpdateOrder
// app.put('/UpdateOrder',async(req,res)=> {
//         let collection = 'Orders';
//         let condition = {"_id":new Mongo.ObjectId(req.body._id)}
//         let data = {
//             $set:{
//                 "status":req.body.status
//             }
//         }
//         let outPut = await UpdateOrder(collection,condition,data)
//         res.send(outPut)
//     })

// // 
app.put('/UpdateOrder',async(req,res)=> {
        let collection = 'Orders';
        let condition = {"_id":new Mongo.ObjectId(req.body._id)}
        let data = {
            $set:{
                "status":req.body.status
            }
        }
        let outPut = await UpdateOrder(collection,condition,data)
        res.send(outPut)
    })

    
app.delete('/DeleteOrder',async(req,res)=> {
    let collection = 'Orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}

    let outPut = await DeleteOrder(collection,condition)
    res.send(outPut)
})
    

app.listen(port ,(err)=>{  
    dbConnect();                             // listen the server
    if(err) throw err;
    console.log(`server is running on port ${port}`);
})