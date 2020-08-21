import React from "react";
import {Link} from "react-router-dom";
import ReviewOrder from "./ReviewOrder";

const Review = ({orders}) => {
    return(
        <div>
            <h2>Review Your Orders</h2>
            {orders && orders.map(order => 
                <ReviewOrder key="order.id" order={order} />
            )}
            {orders.count > 0 ? 
            <Link to="/order">Add another order</Link>
            :
            <div>You don't have any orders yet. Why not <Link to="/order">create one?</Link></div>
            }
        </div>
    );
};

export default Review;