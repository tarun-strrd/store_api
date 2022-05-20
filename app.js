require('dotenv').config()
const express=require('express')
const app= express();
const notFoundMiddleware=require('./middleware/not-found.js');
const errorHandlerMiddleware=require('./middleware/error-handler.js');  
const connectDB=require('./db/connect')
//MiddleWare
app.use(express.json());
//routes

app.get('/',(req,res)=>{
    res.send('<h1>Store-API</h1><a href="api/v1/products">Products-Route</a>');

})

//product-routes
const productRouter = require('./routes/products.js');
const port=process.env.PORT || 3000;
app.use('/api/v1/product',productRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port,console.log(`server liste on ${port}.....`));
    } catch (error) {
        console.log(error)
    }
}

start()