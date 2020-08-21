import React from "react";

const ReviewOrder = ({order}) => {
    const toppingsFromOrder = () => {
        const result = [];
        for(let i in order)
        {
            if(i.includes("topping"))
            {
                result.push(i.split("_")[1]);
            }
        }
        return result.join(", ");
    }

    return(
        <div>
            <h3>Order No. {order.id}</h3>
            <p>Name: {order.name}</p>
            <p>Size: {order.size}</p>
            <p>Toppings: {toppingsFromOrder()}</p>
            <p>Instructions: {order.instructions}</p>
        </div>
    );
};

export default ReviewOrder;