const  express = require('express')

const { addStock,deleteStock,getAllStocks,getOneStock,updateStock } = require('../services/stockService');
const { createStockValidator } = require('../utils/validators/stockValidator');

const router = express.Router()

router.route('/').get(getAllStocks).post(createStockValidator,addStock)
router.route('/:id').get(getOneStock).put(updateStock).delete(deleteStock)
module.exports=router;