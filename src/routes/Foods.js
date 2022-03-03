const express = require('express')
const router = express.Router()
const foodManager= require('../Manager/foods')
const uploader = require('../services/upload') 
const food = new foodManager()


//Created product
router.post('/', uploader.single('file')  ,(req,res)=>{
    let bodyFood = req.body
    let file = req.file
    console.log(bodyFood)
    bodyFood.thumbnail = req.protocol+"://"+req.hostname+":8080/img/"+file.filename
    if(!file) return res.status(500).send({status:'Error', message:'Couldnt upload file.'})

    food.addFood(bodyFood).then(result=>res.send(result))
})

//Show all products
router.get('/', (req,res)=>{
    food.showAllFoods().then(result=>res.send(result))
})

//Get products by id 
router.get('/:id', (req,res)=>{
    const idFoods = req.params.id
    food.searchFood(idFoods).then(result=>res.send(result))
})


//Update product
router.put('/:id', (req,res)=>{
    const idFood = req.params.id
    food.updateFoodMethod(idFood).then(result=>console.log(result))
})





// router.post('/:name', (req,res)=>{
//     let reqName = req.params.name
//     food.searchFood(reqName).then(result=>res.send(result))
// })



module.exports = router;