const express = require('express')
const dotenv = require('dotenv')
const morgan =require('morgan')
const globalError = require('./middlewares/errorMiddleware')
const db = require('./models')
const app = express()
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const ApiError = require('./apiError')
// middleware
dotenv.config({path:'config.env'})
app.use(express.json())
app.use(cors());
app.options('*', cors());
app.use(compression());
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'uploads')));
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
    console.log('mode : dev')

}

app.use(express.urlencoded({ extended: true }))


// routers

const etablissementRoutes = require('./routes/etablissementRoutes')
const zonetravailRoutes = require('./routes/zone-travailRoutes')
const stock_blocPoubelleRoutes = require('./routes/stock_blocPoubelleRoutes')
const stock_poubelleRoutes = require('./routes/stock_poubelleRoutes')
const ZoneDepotRoutes = require('./routes/ZoneDepotRoutes')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRoute')
app.use('/api/userImages', express.static('./uploads/users'))

app.use('/api/etablissement', etablissementRoutes)
app.use('/api/zonetravail', zonetravailRoutes)
app.use('/api/stockblocpoubelle', stock_blocPoubelleRoutes)
app.use('/api/stockpoubelle', stock_poubelleRoutes)
app.use('/api/zonedepot', ZoneDepotRoutes)
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)



//static Images Folder

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
