import React, { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import jwt from 'jsonwebtoken'


const backEndUrl = "http://localhost:1969/api/coffee";
const SERVERURL = "http://localhost:1969"


const Order = () => {

    const [ employeeName, setEmployeeName ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ coffeeName, setCoffeeName ] = useState("");
    const [ coffeeSize, setCoffeeSize ] = useState("");
    const [ coffeeSugar, setCoffeeSugar ] = useState("")
    const [ coffeeMilk, setCoffeeMilk ] = useState("");
    let [ numberOfCoffee, setNumberOfCoffee ] = useState(0);
    const [ buttonDisabled, setButtonDisabled ] = useState(false);
    let [ clicks , setClicks ] = useState(0);
    const [ user, setUser ] = useState("");

    const [ extras, setExtras ] = useState([]);

    const navigate = useNavigate();

    const handleName = (e) => {
        setEmployeeName(e.target.value);
    };

    const handleSizeSelect = (e) => {
        setCoffeeSize(e.target.value);
    };

    const handleMilkSelect = (e) => {
        setCoffeeMilk(e.target.value);
    };

    const handleCoffeeSelect = (e) => {
        setCoffeeName(e.target.value);
    };

    const handlePhone = (e) => {
        setPhoneNumber(e.target.value);
    }

    // const checkButtonStatus = () => {
    //     if(buttonDisabled === false && clicks < 2){
    //         setButtonDisabled(false)
    //         checkClicks();
    //     } else {
    //         setButtonDisabled(true)
    //         checkClicks();
    //     }
    // };

    const handleSugar = (e) => {
        setCoffeeSugar(e.target.value);
        // console.log(e.target.value);
    }

    // const checkClicks = () => {
    //     if(!buttonDisabled && clicks === 1){
    //         setClicks(clicks+1)
    //         // setButtonDisabled(false)
    //     } else {
    //         // clicks=0;
    //         // setButtonDisabled(true)
    //     }
    // };

    // const handleSelect = (e) => {
    //     setNumberOfCoffee(e.target.value)
    // };

    // ======== HANDLE COFFEE ORDER HERE, MAKE THE POST REQUEST WITH COFFEE DETAILS HERE

    const handleCoffeeSubmit = (e) => {
        e.preventDefault();
        // I need to send an object back to the database , containing the information on the form
        const extrasArray = [ phoneNumber, ""]

        const newCoffee = {
            name: employeeName,
            coffeeName: coffeeName,
            coffeeMilk: coffeeMilk,
            coffeeSize: coffeeSize,
            extras: extrasArray
        };

        try {
            axios.post(backEndUrl, newCoffee)
        } catch(error){
            console.log(error)
        }

    
        setCoffeeName("");
        setCoffeeSize("");
        setCoffeeSugar("");
        setExtras("");
        setPhoneNumber("");
        setEmployeeName("");
        setCoffeeSugar(0);
        setButtonDisabled(false);
        setNumberOfCoffee(0);
        setClicks(0);

        navigate("/order-coffee")
    };

    //=================VERIFY USER LOGGED IN=======================//

    const updateUserName = async() => {
        const req = await axios.get("http://localhost:1969/api/user-data", {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        }) 

        const  data  = req
        console.log(data)
        if(data.status === 200){
            setEmployeeName(data)
            // console.log(data)
        } else {
            alert(data.error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log(token)
        if(token){
            const user = jwt.decode(token)
            console.log(user)
            setEmployeeName(user.name);
            setPhoneNumber(user.number)
            if(!user){
                localStorage.removeItem('token')
                console.log('cant find token')
            }
        }
        
    }, [])

    //=============================================================//

    return(
        <div className="form-body">
            <div className="b-center">
                <div className="h-text-center">
                        <div>
                            <h1 className="kanit">Good Morning <span>{employeeName}!!</span></h1>     
                        </div>
                        <div>
                            <span className="fs-1 kanit ">Enter Your Coffee Order Below</span>
                        </div>
                </div>
                <div className="form-container">

                    <form onSubmit={ handleCoffeeSubmit }>
                        <div className="user-info">
                            <div className="input-box">
                                <label htmlFor="name">Name: 
                                    <input onChange={handleName}
                                    value={employeeName}
                                    id="name" type="text"
                                    placeholder="Enter Your Name"
                                    />
                                </label>
                            </div>
                            <div className="input-box">
                                <label htmlFor="mobile">Mobile:
                                    <input onChange={handlePhone}
                                        value={phoneNumber} 
                                        id="mobileNumber" type="text"
                                        placeholder="Enter Your Mobile Number"
                                    />
                                </label>
                            </div>
                                <div className="input-box">
                                    <label htmlFor="coffeeName" className="details">Coffee: 
                                        <select value={coffeeSize} onChange={handleCoffeeSelect}>
                                            <option value={"Latte"}>Latte</option>
                                            <option>Flat White</option>
                                            <option>Cappuccino</option>
                                            <option>Long Black</option>
                                            <option>Short Macchiato</option>
                                            <option>Long Macchiato</option>
                                            <option>Espresso</option>
                                            <option>Double Espresso</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="input-box">
                                    <label htmlFor="coffeeMilk" className="details">Milk of Choice:
                                        <select value={coffeeMilk} onChange={handleMilkSelect}>
                                            <option value="Full Cream">Full Cream</option>
                                            <option value="Skim Milk">Skim Milk</option>
                                            <option value="Soy Milk">Soy Milk</option>
                                            <option value="Almond Milk">Almond Milk</option>
                                            <option value="Oat Milk">Oat Milk</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="input-box">
                                    <label htmlFor="coffeeSize" className="details"> Size: 
                                        <select value={coffeeSize} onChange={handleSizeSelect}>
                                            <option value="Mug">Mug</option>
                                            <option value="Cup">Cup</option>
                                            <option value="Glass">Glass</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="input-box">
                                    <label htmlFor="coffeeSugar" className="details">Sugar: 
                                        <select value={coffeeSugar} onChange={handleSugar}>
                                            <option>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="numberOf">
                                    <span className="fw-bold">Select One Option</span>
                                    <br/>
                                    <span>Quantity: </span>
                                    <div className="form-check form-check-inline radio">
                                        <label htmlFor="oneSelected" className="details">+ 1
                                            <input onChange={() => setNumberOfCoffee(1)}
                                            type={"radio"} 
                                            className={"form-check-input"}
                                            value={1}
                                            checked={numberOfCoffee === 1 }
                                            id={"oneSelected"} 
                                            disabled={buttonDisabled}/> 
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline radio">
                                        <label htmlFor="twoSelected" className="details">+ 2
                                            <input onChange={() => setNumberOfCoffee(2)}
                                            type={"radio"} 
                                            className={"form-check-input"} 
                                            value={2}
                                            checked={numberOfCoffee === 2 }
                                            id={"twoSelected"} 
                                            disabled={buttonDisabled}/> 
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline radio">
                                        <label htmlFor="threeSelected" className="details">+ 3
                                            <input onChange={() => setNumberOfCoffee(3)}  
                                            type={"radio"} 
                                            className={"form-check-input"}
                                            value={3}
                                            checked={numberOfCoffee === 3 }
                                            id={"threeSelected"} 
                                            disabled={buttonDisabled}/> 
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline radio">
                                        <label htmlFor="fourSelected" className="details">+ 4
                                            <input onChange={() => setNumberOfCoffee(4)} 
                                            type={"radio"} 
                                            className={"form-check-input"}
                                            value={4}
                                            checked={numberOfCoffee === 4 }
                                            id={"fourSelected"} 
                                            disabled={buttonDisabled}/> 
                                        </label>
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="Note" className="details">Special requests: 
                                            <input />
                                        </label>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-outline-success button">Place order</button>
                    </form>
                </div>
            </div>
        <hr></hr>
        {/* <button className="btn btn-outline-secondary">Previous Orders</button> */}

        <Link to="/" className="btn btn-outline-success">Home</Link>
        </div>
        
    )
};

export default Order;
