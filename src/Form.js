import React, {useState, useEffect} from 'react';
// import socketIOClient from 'socket.io-client';
import './form.css';

import logo from './assets/usku_logo.png';

const Form = () => {
    // const [endpoint] = useState("http://localhost:3001");
    // const [response, setResponse] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [details, setDetails] = useState("");

    const [nameWarning, setNameWarning] = useState(false);
    const [addressWarning, setAddressWarning] = useState(false);
    const [detailsWarning, setDetailsWarning] = useState(false);

    useEffect(() => {
        // const socket = socketIOClient(endpoint);
        // socket.on("news", data => {
        //     console.log("data: ", data);
        //     setResponse(data)
        // });
    }, [])

    const sendOrder = () => {
        setNameWarning(false);
        setAddressWarning(false);
        setDetailsWarning(false);
        if (!name) {setNameWarning(true)}
        if (!address) {setAddressWarning(true)}
        if (!details) {setDetailsWarning(true)}
        if (!name || !address || !details) {
            console.log("missing field");
        }
        else {
            setName("");
            setAddress("");
            setDetails("");
            const message = name + "\n\n" + address + "\n\n" + details;
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

    return (
        <div className="form">
            <div className="form-container">
                <img style={{height: '300px'}} src={logo} alt="Usku" />
                <div className="input-container">
                    <label className={nameWarning ? 'red' : ''}>Name</label>
                    <input onChange={(e) => setName(e.target.value)} type="text" value={name} />
                </div>
                <div className="input-container">
                    <label className={addressWarning ? 'red' : ''}>Address</label>
                    <input onChange={(e) => setAddress(e.target.value)} type="text" value={address} />
                </div>
                <div className="input-container">
                    <label className={detailsWarning ? 'red' : ''}>Order Details</label>
                    <textarea onChange={(e) => setDetails(e.target.value)} type="text" value={details} />
                </div>
                <button onClick={() => sendOrder()}>Place Order</button>
            </div>
        </div>
    )
}

export default Form;
