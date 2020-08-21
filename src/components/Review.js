import React from "react";
import {Link} from "react-router-dom";
import ReviewOrder from "./ReviewOrder";
import styled from "styled-components";

const StyledReview = styled.div`
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
      margin-top: ${props => props.theme.margin};
  }
`;

const Review = ({orders}) => {
    return(
        <StyledReview>
            <h2>Review Your Orders</h2>
            {orders && orders.map(order => 
                <ReviewOrder key={order.id} order={order} />
            )}
            {orders.length > 0 ? 
            <Link to="/pizza">Add another order</Link>
            :
            <div>You don't have any orders yet. Why not <Link to="/pizza">create one?</Link></div>
            }
        </StyledReview>
    );
};

export default Review;