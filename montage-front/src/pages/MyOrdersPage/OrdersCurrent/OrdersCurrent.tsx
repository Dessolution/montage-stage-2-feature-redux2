import React, { Children } from 'react';
import { Link, Outlet } from "react-router-dom";
import { AppRoute } from "../../../utils/const";
import FilterPanel from '../../../components/FilterPanel/FilterPanel';
import ProjectCell from '../../../components/ProjectCell/ProjectCell';
import './OrdersCurrent.css'
import Button from '../../../components/Button/Button';

const OrdersCurrent: React.FC = () => {
    return (
            <div className='Orders__linked'>
                    <FilterPanel />

                    <div className='Linked__orders'>
                        <ProjectCell />
                    </div>
                    <Link to={AppRoute.Chat}><Button className='Chat'>Chat</Button></Link>
            
            
            <Outlet />
        </div>      
            
        
        
    )
};

export default OrdersCurrent;