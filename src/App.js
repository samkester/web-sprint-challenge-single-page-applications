import React, { useState } from "react";
import {Switch, Link, NavLink, Route} from "react-router-dom";
import Home from "./components/Home";
import Review from "./components/Review";
import Order from "./components/Order";

const defaultFormValues = {
  name: "",
  size: "",
  toppings: {},
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
          <Order values={formValues} errors={formErrors} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
};
export default App;
