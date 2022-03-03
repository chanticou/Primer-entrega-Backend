const fs= require('fs')

const pathCart = __dirname+'/../files/cart'
const PATHFOOD = __dirname+'/../files/foods'


class cartManager{

    createCart=async(cart)=>{
        
        if(fs.existsSync(pathCart)){
       
            try{
                let data = await fs.promises.readFile(pathCart, 'utf-8', null, 3)
                let productsCart = JSON.parse(data)
       
                let id = productsCart[productsCart.length-1].id+1
                cart.id = id
                // console.log(productsCart)
                productsCart.push(cart)

                
                console.log(cart.products)
                // console.log(body)
                await fs.promises.writeFile(pathCart, JSON.stringify(productsCart, null, 3))
                return {status:'success', message:'New Object Created'}
            }catch(error){
                return{error}
            }
        }else{
            cart.id=1
            await fs.promises.writeFile(pathCart, JSON.stringify([cart], null, 3))
            return{status:'Succes', message:'Cart created!'}
        }
    }


    pushProduct=async(idCart,idProduct)=>{
        if(fs.existsSync(pathCart)){
            try{
                let data = await fs.promises.readFile(pathCart, 'utf-8', null, 3)
                let carts = JSON.parse(data)
                let findCart=carts.find(cart=>cart.id===parseInt(idCart))

                console.log(findCart.products)
                
                let dataFOOD =await fs.promises.readFile(PATHFOOD, 'utf-8', null, 3)
                let foods = JSON.parse(dataFOOD)

                let findProduct=foods.find(product=>product.id===parseInt(idProduct))
                console.log(findProduct.id)

                findCart.products.push(findProduct.id)

                await fs.promises.writeFile(pathCart, JSON.stringify( carts , null, 3))
                return{status:'Succes', message:'Product added'}


            }catch(error){
                return error;
            }
        }
    }


    deleteProduct=async(idCart,idProduct)=>{
        if(fs.existsSync(pathCart)){
            try{
                let data = await fs.promises.readFile(pathCart, 'utf-8', null, 3)
                let carts = JSON.parse(data)
                let findCart=carts.find(cart=>cart.id===parseInt(idCart))

                let arrayList = findCart.products
                
                let deleteProduct = arrayList.filter(prod=>prod !== parseInt(idProduct)) 
                console.log(deleteProduct)
                arrayList = deleteProduct
                

                await fs.promises.writeFile(pathCart, JSON.stringify(carts, null, 3))
                return{status:'Success', message:'Delete product'}
                                 

            }catch(error){
                return error
            }

        }        
    }
}




module.exports=cartManager





































// const fs = require('fs')


// const PATHCART = __dirname+'/../files/cart'

// const PATHFOOD = __dirname+'/../files/foods'




// class cartManager{

//     createdCart=async()=>{
          
//             let cart=[]
//             let product;
//           try{
//             if(fs.existsSync(PATHCART)){
//                 let data = await fs.promises.readFile(PATHCART, 'utf-8', null, 3)
//                 let cartProducts = JSON.parse(data)
              
//                 // let data= await fs.promises.readFile(PATHFOOD, 'utf-8', null, 3)
//                 // let products= JSON.parse(data)
//                 // console.log(cartProducts)
//                 // console.log(products)
//                 // let map = products.map(prod.id=>{
//                 //     if(prod.id == productID){
//                 //         return map;
                        
//                 //     }
//                 // })
              

//                 product.id = cartProducts[cartProducts.length-1].id+1
//                 product.id = id
//                 cart.push(cartProducts)
                
//                 await fs.promises.writeFile(PATHCART, JSON.stringify(cart, null, 3))
//                 return {status:'success', message:cart}
             

//                 // let idProduct = products.forEach(product=>product.id)

//                 // return {status:'success', message:idProduct}

//             }else{
//                 product.id = 1
//                 cart.push(product)
//                 await fs.promises.writeFile(PATHCART,JSON.stringify(cart, null,3))
//                 return{ status:'Succes', message:'cart created'}
//             }
//         }catch(error){
//             return{error}
//         }
//     }  
// }

// module.exports = cartManager











