import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Link to='/todos'>Create you todo</Link>
            <Link to='/login'>Login</Link>
        </div>
    );
};

export default Home;