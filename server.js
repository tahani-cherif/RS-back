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
const dechetRoute = require('./routes/DechetRoute')
const camionRoute = require('./routes/camionRoute')
const blocEtablissementRoute = require('./routes/blocEtablissementRoute')
const etageEtablissementRoute = require('./routes/etageEtablissementRoute')
const responsableEtablissementRoute = require('./routes/responsableEtablissementRoute')
const ouvrierRoute = require('./routes/ouvrierRoute')
const viderPoubelleRoute = require('./routes/viderPoubelleRoute')
const planningRoute = require('./routes/planningRoute')
const dashboardRoute = require('./routes/dashboardRoute')
const revenuRoute = require('./routes/revenuRoute')
const codePostalRoute = require('./routes/codePostalRoute')






app.use('/api/userImages', express.static('./uploads/users'))
app.use('/api/etablissementImages', express.static('./uploads/etablissements'))


app.use('/api/etablissement', etablissementRoutes)
app.use('/api/zonetravail', zonetravailRoutes)
app.use('/api/stockblocpoubelle', stock_blocPoubelleRoutes)
app.use('/api/stockpoubelle', stock_poubelleRoutes)
app.use('/api/zonedepot', ZoneDepotRoutes)
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/dechet', dechetRoute)
app.use('/api/camion', camionRoute)
app.use('/api/blocetablissement', blocEtablissementRoute)
app.use('/api/etage', etageEtablissementRoute)
app.use('/api/responsable-etablissement', responsableEtablissementRoute)
app.use('/api/ouvrier', ouvrierRoute)
app.use('/api/viderpoubelle', viderPoubelleRoute)
app.use('/api/planning', planningRoute)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/revenu', revenuRoute)
app.use('/api/codepostal', codePostalRoute)




//static Images Folder

app.all('*',(req,res,next)=>{

    next(new ApiError(`can't find this route : ${req.originalUrl}`,400))  
  });
  app.use(globalError)

  const port = process.env.PORT || 8000

  const server =app.listen(8000, () => console.log(`Example app listening on port ${8000}!`));
  db.sequelize.sync() .then(()=>{
    app.listen (port, () =>   process.on('unhandledRejection',(err)=>{
        console.error(`unhandledRejection Error : ${err.name} | ${err.message} `)
        server.close(()=>{
          console.error(`shutting down ...`);
          process.exit(1);}
        );
    }));})
