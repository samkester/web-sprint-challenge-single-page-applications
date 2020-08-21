import React, { useState } from "react";
import {Switch, NavLink, Route, useHistory} from "react-router-dom";
import Home from "./components/Home";
import Review from "./components/Review";
import Order from "./components/Order";
import Axios from "axios";
import data from "./data/data";
import orderSchema from "./data/orderSchema";
import * as Yup from "yup";
import styled from "styled-components";

const defaultToppingValues = () => {
  const result = {};
  data.toppings.forEach(topping => result[`topping_${topping}`] = false)
  return result;
}

const defaultFormValues = () => {
  const result = {
    name: "",
    size: "",
    instructions: "",
  };
  const toppings = defaultToppingValues();
  
  return {...result, ...toppings};
};

const defaultFormErrors = {
  name: "",
  size: data.errors.BAD_SIZE,
};

const StyledApp = styled.div`
  color: ${props => props.theme.color.main};
  background-color: ${props => props.theme.backgroundColor.main};
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  header{
    color: ${props => props.theme.color.header};
    background-color: ${props => props.theme.backgroundColor.header};

    border-radius: 1rem;
    padding: ${props => props.theme.padding};

    nav{
      display: flex;
      justify-content: space-between;

      a, a:hover{
        color:currentColor;
      }

      a:active, a.active{
        color: ${props => props.theme.color.active};
        background-color: ${props => props.theme.backgroundColor.active};
      }
    }
  }
`;

const App = () => {
  const [formValues, setFormValues] = useState(defaultFormValues());
  const [formErrors, setFormErrors] = useState(defaultFormErrors);
  const [orders, setOrders] = useState([]);

  //console.log(defaultFormValues());
  //console.log(formValues);

  const history = useHistory();

  const setFormValue = (name, value) => {
    setFormValues({...formValues, [name]: value});

    //console.log(orderSchema);

    if(orderSchema._nodes.includes(name))
      {
      Yup.reach(orderSchema, name)
      .validate(value)
      .then(() => setFormErrors({...formErrors, [name]: ""}))
      .catch(error => setFormErrors({...formErrors, [name]: error.errors[0]}))
      }
    };

  const resetOrder = () => {
    setFormValues(defaultFormValues);
    setFormErrors(defaultFormErrors);
  }

  const submitOrder = () => {
    //console.log(formValues);

    Axios.post(data.pizzaAPI, formValues)
    .then(response => {
      //console.log(response);
      setOrders(orders.concat(response.data));
      history.push("/review");
    })
    .catch(error => console.log(error))
    .finally(resetOrder());
  };
  
  return (
    <StyledApp>
      <header>
        <h1>Lambda Eats</h1>
        <nav>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/order">Order</NavLink>
          <NavLink to="/review">Review</NavLink>
        </nav>
      </header>
      <Switch>
        <Route path="/review">
          <Review orders={orders} />
        </Route>
        <Route path="/order">
          <Order values={formValues} errors={formErrors} setValue={setFormValue} reset={resetOrder} submit={submitOrder} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </StyledApp>
  );
};
export default App;
