import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
    return(
        <div>
            <h2>Welcome to Lambda Eats</h2>
            <Link to="/order">Click here to begin.</Link>
        </div>
    );
};

export default Home;