import React, {useState, useEffect} from 'react';
// import socketIOClient from 'socket.io-client';
import './form.css';

import logo from './assets/usku_logo.png';
import loading_gif from './assets/loading.gif';

const Form = () => {
    // const [endpoint] = useState("http://localhost:3001");
    // const [response, setResponse] = useState("");
    const [name, setName] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [postcode, setPostcode] = useState("");
    const [phone, setPhone] = useState("");
    const [item, setItem] = useState("");
    const [prePurchase, setPrePurchase] = useState("");
    const [cost, setCost] = useState("");
    const [pickupName, setPickupName] = useState("");
    const [pickupAddress, setPickupAddress] = useState("");
    const [pickupPostcode, setPickupPostcode] = useState("");
    const [details, setDetails] = useState("");

    const [prePurchaseSelected, setPrePurchaseSelected] = useState("");

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        // const socket = socketIOClient(endpoint);
        // socket.on("news", data => {
        //     console.log("data: ", data);
        //     setResponse(data)
        // });
    }, [])

    const sendOrder = () => {
        setSubmitted(true);
        console.log("Pre purchase selected");
        if (!name || !deliveryAddress || !postcode || !phone
            || !item || (!cost && !prePurchase) || !prePurchaseSelected || !pickupName
            || !pickupAddress || !pickupPostcode || !details)
        {
            console.log("missing field");
            return;
        }
        else {
            setLoading(true);
            const message = formatMessage();
            console.log(message);
            fetch('https://hooks.slack.com/services/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', {
                method: 'POST',
                body: JSON.stringify({"text": message})
            })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success:', data);
            })
        }
    }

    const formatMessage = () => {
        let message = `
            *name:*
            ${name}\n
            *Delivery Address:*
            ${deliveryAddress}\n
            *Postcode:*
            ${postcode}\n
            *Phone:*
            ${phone}\n
            *Item(s):*
            ${item}\n
            *Pre Purchased:*
            ${prePurchase}\n
            *Estimated Cost:*
            ${cost}\n
            *Location / Store Name:*
            ${pickupName}\n
            *Pickup Address:*
            ${pickupAddress}\n
            *Pickup Postcode:*
            ${pickupPostcode}\n
            *Delivery Instructions:*
            ${details}\n
        `

        return message.replace(/ /g,'');
        ;
    }

    return (
        <div className="form">
            <div className="form-container">
                <img className="usku-logo" src={logo} alt="Usku" />
                <h1>Place Your Order</h1>
                <p>You will hear from us shortly after placing your order</p>
                <div className="input-container">
                    <label className={(!name && submitted) ? 'red' : ''}>Name</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" value={name} />
                </div>
                <div className="input-container">
                    <label className={(!deliveryAddress && submitted) ? 'red' : ''}>Delivery Address</label>
                    <input onChange={(e) => setDeliveryAddress(e.target.value)} type="text" value={deliveryAddress} />
                </div>
                <div className="input-container">
                    <label className={(!postcode && submitted) ? 'red' : ''}>Postcode</label>
                    <input onChange={(e) => setPostcode(e.target.value)} type="text" value={postcode} />
                </div>
                <div className="input-container">
                    <label className={(!phone && submitted) ? 'red' : ''}>Phone</label>
                    <input onChange={(e) => setPhone(e.target.value)} type="text" value={phone} />
                </div>
                <div className="input-container">
                    <label className={(!item && submitted) ? 'red' : ''}>What would you like delivered?</label>
                    <input onChange={(e) => setItem(e.target.value)} type="text" value={item} />
                </div>
                <div className="input-container">
                    <label className={(!prePurchaseSelected && submitted) ? 'red' : ''}>Have you pre ordered and paid for your product?</label>
                    <input onClick={(e) => {setPrePurchase(true); setPrePurchaseSelected(true)}} type="radio" name="prePurchase" /> Yes
                    <input onClick={(e) => {setPrePurchase(false); setPrePurchaseSelected(true)}} type="radio" name="prePurchase" /> No
                </div>
                <div className="input-container">
                    <label className={(!cost && !prePurchase && submitted) ? 'red' : ''}>If no, What is the estimated price of product?</label>
                    <input onChange={(e) => setCost(e.target.value)} type="text" value={cost} />
                </div>
                <div className="input-container">
                    <label className={(!pickupName && submitted) ? 'red' : ''}>Locaion / Store Name</label>
                    <input onChange={(e) => setPickupName(e.target.value)} type="text" value={pickupName} />
                </div>
                <div className="input-container">
                    <label className={(!pickupAddress && submitted) ? 'red' : ''}>Pickup Address</label>
                    <input onChange={(e) => setPickupAddress(e.target.value)} type="text" value={pickupAddress} />
                </div>
                <div className="input-container">
                    <label className={(!pickupPostcode && submitted) ? 'red' : ''}>Pickup Postcode</label>
                    <input onChange={(e) => setPickupPostcode(e.target.value)} type="text" value={pickupPostcode} />
                </div>
                <div className="input-container">
                    <label className={(!details && submitted) ? 'red' : ''}>Delivery Instructions</label>
                    <textarea onChange={(e) => setDetails(e.target.value)} type="text" value={details} />
                </div>
                <button onClick={() => sendOrder()}>Place Order</button>
                <div className="footer">
                    &copy; Uskutechnologies 2020
                </div>
                <div className={loading ? 'loading-overlay show' : 'loading-overlay'}>
                    <img  className="loading" src={loading_gif} alt="Usku" />
                </div>
            </div>
        </div>
    )
}

export default Form;
