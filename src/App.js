import React, { useState } from "react";
import {Switch, NavLink, Route} from "react-router-dom";
import Home from "./components/Home";
import Review from "./components/Review";
import Order from "./components/Order";
import Axios from "axios";
import data from "./data/data";
import orderSchema from "./data/orderSchema";
import * as Yup from "yup";

const defaultFormValues = {
  name: "",
  size: "",
  instructions: "",
};

const defaultFormErrors = {
  name: "",
  size: data.errors.BAD_SIZE,
};

const App = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [formErrors, setFormErrors] = useState(defaultFormErrors);
  const [orders, setOrders] = useState([]);

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
    console.log(formValues);

    Axios.post(data.pizzaAPI, formValues)
    .then(response => {
      console.log(response);
      setOrders(orders.concat(response.data));})
    .catch(error => console.log(error))
    .finally(resetOrder());
  };
  
  return (
    <>
      <h1>Lambda Eats</h1>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/order">Order</NavLink>
        <NavLink to="/review">Review</NavLink>
      </nav>
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
    </>
  );
};
export default App;
