const MilkInventory = require("./models/Inventory");
const mongoose = require("mongoose");


const inventory = {
    fullCreamMilk: 100,
    skimMilk: 100,
    soyMilk: 100,
    almondMilk: 100,
    oatMilk: 100
}

const checkInventory = (order) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let orderKey = Object.values(order)
            console.log(orderKey)
            let inStock = orderKey.forEach(item => { 
                MilkInventory.find({ Type: order[2]})
             })
             console.log(inStock)
            if(inStock){
                console.log("Hello")
            }
        }, 1000 )
    })
}

checkInventory( {
    name: "Charles",
    coffeeName: "Latte",
    coffeeMilk: "Soy milk",
    coffeeSize: "Large",
    extras: "1 sugar"
})