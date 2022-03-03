const fs = require('fs')


const PATHFOOD = __dirname+'/../files/foods'


    

class foodManager{

    addFood=async(food)=>{
        try{
                if(fs.existsSync(PATHFOOD)){
                let data = await fs.promises.readFile(PATHFOOD, 'utf-8', null, 3)
                let foods = JSON.parse(data)
                let id = foods[foods.length-1].id+1
                food.id = id
                foods.push(food)
              
                
                await fs.promises.writeFile(PATHFOOD, JSON.stringify(foods, null, 3))
                return {status:'success', message:'New food created'}
             

                     
            }else{
                food.id=1
                await fs.promises.writeFile(PATHFOOD, JSON.stringify([food], null, 3))
                return{status:'Succes', message:'First food created!'}
            }
            
        }catch(error){
            return{status:'Error', message:error}
        }
    }

    showAllFoods=async()=>{
        if(fs.existsSync(PATHFOOD)){
            try{
                let data = await fs.promises.readFile(PATHFOOD, 'utf-8', null, 3)
                let foods = JSON.parse(data)

                return{status:'Success', payload: foods}
            }catch(error){
                return{status:'Error', message:error}
            }
        }else{
            return{status:'No foods', payload:[]}
        }
    }

    searchFood=async(id)=>{
        try{
            if(fs.existsSync(PATHFOOD)){
                let data = await fs.promises.readFile(PATHFOOD, 'utf-8', null, 3)
                let foods = JSON.parse(data)

                let findFood = foods.find(food=>food.id === parseInt(id))
                console.log(findFood)
     
                return{status:'Success', message:findFood}
            }

        }catch(error){
            return{status:'Error', message:error}
        }
    }

    updateFoodMethod=async(id, updatefood)=>{
        try{
            if(fs.existsSync(PATHFOOD)){
                let data = await fs.promises.readFile(PATHFOOD, 'utf-8', null, 3)
                let foods = JSON.parse(data)

                let newArrayUpdate = foods.map(food=>{
                    if(food.id == id){
                        return  updatefood
                    }else{
                        return food;
                    }
                })
                
                await fs.promises.writeFile(PATHFOOD, JSON.stringify(newArrayUpdate, null, 3))
                return {status:'Succes', message:'update food' }
            }    

        }catch(error){

        }
    }

    deleteFood = async (id)=>{
        if(fs.existsSync(PATHFOOD)){
            let data= await fs.promises.readFile(PATHFOOD, 'utf-8', null, 3)
            let foods= JSON.parse(data)

            let deleteFoodFilter= foods.filter((food => food.id !== parseInt(id)))

            await fs.promises.writeFile(PATHFOOD, JSON.stringify(deleteFoodFilter,null,3))
            return {
                status:'succes',
                message:'Food delete'
            }            
        }
    }
}




module.exports = foodManager;
























// [
//    {
//       "name": "SALMON STICK",
//       "description": "Bastones de salmón rosado rebozados en panko con salsa maracuyá.",
//       "price": "690",
//       "thumbnail": "http://localhost:8080/img/-pexels-photo-628776.jpeg",
//       "id": 1
//    },
//    {
//       "name": "GYOZA (6 UNIDADES)",
//       "description": "Empanaditas de cerdo y cebolla de verdeo cocidas al vapor y doradas a la plancha.",
//       "price": "1050",
//       "thumbnail": "http://localhost:8080/img/-pexels-photo-3297363.jpeg",
//       "id": 2
//    },
//    {
//       "name": "TORI NO KARA AGUE",
//       "description": "Bocaditos de pollo frito",
//       "price": "890",
//       "thumbnail": "http://localhost:8080/img/-pexels-photo-3297801.jpeg",
//       "id": 3
//    },
//    {
//       "name": "YAKITORI (5 UNIDADES)",
//       "description": "Brochette de pollo, cebolla y cebolla de verdeo con salsa teriyaki.",
//       "price": "1700",
//       "thumbnail": "http://localhost:8080/img/-pexels-photo-3298180.jpeg",
//       "id": 4
//    },
//    {
//       "name": "HARUMAKI (3 UNIDADES)",
//       "description": "Crocante arrolladito primavera de carne o verdura.",
//       "price": "1250",
//       "thumbnail": "http://localhost:8080/img/-pexels-photo-3304057.jpeg",
//       "id": 5
//    }
// ]