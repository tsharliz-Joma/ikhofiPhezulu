import axios from "axios";
import React, { useState, useEffect } from "react";


const viewOrderUrl = "http://localhost:1969/api/view-orders";
const deleteOrderUrl = "http://localhost:1969/api/sendCoffee";

const Dashboard = () => {

    const [ orders, setOrders ] = useState([]);
    const [ selectedName, setSelName ] = useState("")
    const [ selected, setSelected ] = useState(false);
    const [ selectedCoffeeName, setSelectedCoffeeName ] = useState("");
    const [ selCoffSize, setSelCoffSize ] = useState("");
    const [ selCoffMilk, setSelCoffMilk ] = useState("");
    const [ orderExtras, setOrderExtras ] = useState([]);

    // this function is where i will have to use an api, to send a text message or slack message
    const displayOptions = (e) => {
        e.preventDefault();
        setSelected(true);

        setSelectedCoffeeName(e.target.innerHTML);
        sliceCoffeeName(selectedCoffeeName);
    };

    const sliceCoffeeName = (string) => {
        const milkRegEx = /\w+(?= Milk)/;
        console.log(string.match(milkRegEx))
        // return milkRegEx;
    }


    const send = (e) => {
        e.preventDefault();

        const deleteCoffee = {  
            coffeeName: selectedCoffeeName,
            coffeeSize: selCoffSize,
            coffeeMilk: selCoffMilk
        }

        try {
            axios.post(deleteOrderUrl, deleteCoffee)
        } catch(error) {
            console.log(error)
        }
        setSelected(false);
        // do this last after you have sent the api notification and also removed the coffee 
        // from the database
    }

    const cancel = (e) => {
        e.preventDefault();
        setSelected(false);
    }
    
    useEffect(() => {
        const getOrders = async() => {
            try {
                const response = await axios.get(viewOrderUrl)
                const coffeeOrders = response.data.orders
                setOrders(coffeeOrders)
            }catch(error){
                console.log(error)
            }
        };
        getOrders();
    }, []);

    
    return( 
        <div>
            <h2>Dashboard</h2>
            <div>
                <h3>Orders</h3>
                { orders.length !== 0 && (
                    <div className="coffee-orders-div">
                        <ul className="coffee-order-ul">
                            { selected && 
                            <div className="selectOverlay">
                                <div className="selectInnerOverlay">
                                <div className="">
                                    <p className="d-inline-block border rounded bg-light p-2 fs-2 mt-5">{selectedCoffeeName}</p>
                                </div>
                                    <button onClick={cancel} className="btn btn-dark btn-lg"> Back </button> 
                                    <button onClick={send} className="btn btn-dark btn-lg"> Coffee Up </button>
                                </div> 
                            </div>}
                            {
                                orders.map((order) => 
                                <div className="order-display-div"> 
                                    <div className="order-inner-div">
                                        <p onClick={displayOptions} className="btn fs-5 order-button" key={order.id}>
                                            {order.name} - {order.coffeeSize} {order.coffeeMilk} {order.coffeeName} 
                                        </p> 
                                    
                                    </div>
                                    
                                </div>
                            )};
                            
                        </ul>
                    </div>
                )};
            </div>
        </div>
    )
}

export default Dashboard