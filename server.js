const express = require('express')
const dotenv = require('dotenv')
const morgan =require('morgan')
const globalError = require('./middlewares/errorMiddleware')
const db = require('./models')
const app = express()


// middleware
dotenv.config({path:'config.env'})
app.use(express.json())
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
    console.log('mode : dev')

}

app.use(express.urlencoded({ extended: true }))


// routers
const userRoutes = require('./routes/userRoutes')
const stockRoutes = require('./routes/stockRoutes')
const etablissementRoutes = require('./routes/etablissementRoutes')
const blocEtablissmentRoutes = require('./routes/blocEtablissmentRoutes')
const ApiError = require('./apiError')
app.use('/api/user', userRoutes)
app.use('/api/stock', stockRoutes)
app.use('/api/etablissement', etablissementRoutes)
app.use('/api/blocEtablissment',blocEtablissmentRoutes )

//static Images Folder

app.use('/Images', express.static('./Images'))
app.all('*',(req,res,next)=>{

    next(new ApiError(`can't find this route : ${req.originalUrl}`,400))  
  });
  app.use(globalError)

  const port = process.env.PORT || 8000

  const server =app.listen(port, () => console.log(`Example app listening on port ${port}!`));
  db.sequelize.sync() .then(()=>{
    app.listen (3000, () =>   process.on('unhandledRejection',(err)=>{
        console.error(`unhandledRejection Error : ${err.name} | ${err.message} `)
        server.close(()=>{
          console.error(`shutting down ...`);
          process.exit(1);}
        );
    }));})
