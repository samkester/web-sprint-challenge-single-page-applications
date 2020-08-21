import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import data from "../data/data";
import orderSchema from "../data/orderSchema";

const Order = ({values, errors, setValue, reset, submit}) => {
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const wrappedSubmit = event => {
        //console.log("do the thing");
        event.preventDefault();
        submit();
    }

    const changeInput = event => {
        setValue(event.target.name, event.target.value);
    }

    const changeCheckbox = event => {
        setValue(event.target.name, event.target.checked);
    }

    useEffect(() => {
        orderSchema.isValid(values).then(valid => setButtonEnabled(valid));
    }, [values]);

    return(
        <div>
            <h2>Create an Order</h2>
            <Link to="/review">Review previous orders.</Link>
            <form onSubmit={wrappedSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={values.name} placeholder="Name" onChange={changeInput} />
                </label>
                <label>
                    Size:
                    <select name="size" value={values.size} onChange={changeInput}>
                        <option value="">-- select a size --</option>
                        {data.sizes.map(size => <option key={size} value={size}>{size}</option>)}
                    </select>
                </label>
                <div>
                    <p>Toppings (check one or more):</p>
                    {data.toppings.map(topping => 
                        <label key={topping}>
                            {topping}
                            <input type="checkbox"
                            name={`topping_${topping}`}
                            onChange={changeCheckbox}
                            checked={values[`topping_${topping}`]}>
                            </input>
                        </label>
                    )}
                </div>
                <label>
                    Additional Instructions:
                    <input type="text" name="instructions" value={values.instructions} onChange={changeInput} />
                </label>
            </form>
            <div className="errorList">
                <div>{errors.name}</div>
                <div>{errors.size}</div>
            </div>
            <button className="hero" disabled={!buttonEnabled} onClick={wrappedSubmit}>Submit Order</button>
            <button onClick={reset}>Reset Order</button>
        </div>
    );
};

export default Order;