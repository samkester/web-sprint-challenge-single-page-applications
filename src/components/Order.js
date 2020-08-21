import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import data from "../data/data";
import orderSchema from "../data/orderSchema";
import styled from "styled-components";

const StyledOrder = styled.div`
  color: ${props => props.theme.color.header};
  background-color: ${props => props.theme.backgroundColor.header};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 1rem;
  margin: ${props => props.theme.margin};
  padding: ${props => props.theme.padding};

  h2{
    margin-bottom: 2rem;
  }

  a{
    margin-bottom: 2rem;
    color: currentColor;
  }

  input{
    margin: ${props => props.theme.padding};
  }

  button{
    margin: ${props => props.theme.padding};
    padding: ${props => props.theme.padding};
    color: currentColor;
    border: 2px solid currentColor;
    font-size: 1.6rem;
    background-color: transparent;
    border-radius: 1rem;
  }
`;

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
        <StyledOrder>
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
            <div className="buttonList">
                <button className="hero" disabled={!buttonEnabled} onClick={wrappedSubmit}>Submit Order</button>
                <button onClick={reset}>Reset Order</button>
            </div>
        </StyledOrder>
    );
};

export default Order;