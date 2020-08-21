import React from "react";
import {Link} from "react-router-dom";
import ReviewOrder from "./ReviewOrder";

const Review = () => {
    return(
        <div>
            <h2>Review Your Orders</h2>
            <Link to="/order">Add another order</Link>
            <ReviewOrder />
        </div>
    );
};

export default Review;