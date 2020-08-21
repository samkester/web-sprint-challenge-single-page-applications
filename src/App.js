import React, { useState } from "react";
import {Switch, Link, NavLink, Route} from "react-router-dom";
import Home from "./components/Home";
import Review from "./components/Review";
import Order from "./components/Order";
import Axios from "axios";
import data from "./data/data";

const defaultFormValues = {
  name: "",
  size: "",
  instructions: "",
};

const defaultFormErrors = {
  name: "Please enter your name.",
  size: "Please select a size.",
};

const App = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [formErrors, setFormErrors] = useState(defaultFormErrors);
  const [orders, setOrders] = useState([]);

  const setFormValue = (name, value) => {
    setFormValues({...formValues, [name]: value});
  };

  const resetOrder = () => {
    setFormValues(defaultFormValues);
  }

  const submitOrder = () => {
    Axios.post(data.pizzaAPI, formValues)
    .then(response => setOrders(orders.concat(response.data)))
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
