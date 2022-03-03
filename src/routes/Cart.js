const express = require('express')
const router = express.Router()
const cartManager= require('../Manager/cart')
const uploader = require('../services/upload') 
const momentjs = require('moment') 

const moment = momentjs()

const cartPorduct = new cartManager()


//Created product
router.post('/:id', (req,res)=>{
    let body = {products:[], timestamp:moment.format('DD/MM/YYYY hh:mm:ss a')}
    let id= req.params.id  
    cartPorduct.createCart(body,id).then(result=>res.send(result))
})

router.post('/:idCart/productos/:idProduct',(req,res)=>{
    let idCart = req.params['idCart']
    let idProduct = req.params['idProduct']

    cartPorduct.pushProduct(idCart,idProduct).then(result=>res.send(result))
})



router.delete('/:idCart/productos/:idProduct',(req,res)=>{
    let idCart = req.params['idCart']
    let idProduct = req.params['idProduct']

    cartPorduct.deleteProduct(idCart,idProduct).then(result=>res.send(result))
})


router.get('/',(req,res)=>{
    cartPorduct.deleteCart().then(result=>console.log)
})

module.exports = router;