import React from 'react';
import { Link } from "react-router-dom";
import './NotFoundPage.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className='NotFound'>
      <h1>Opps! We ran out of code. Go <Link to="/"><button>home</button></Link></h1>
    </div>
  );
};

export default NotFoundPage;
