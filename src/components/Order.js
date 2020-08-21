import React from "react";
import {Link} from "react-router-dom";

const Order = () => {
    return(
        <div>
            <h2>Create an Order</h2>
            <Link to="/review">Review previous orders.</Link>
        </div>
    );
};

export default Order;