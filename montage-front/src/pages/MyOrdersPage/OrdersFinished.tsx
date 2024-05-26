import React from 'react';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import ProjectCell from '../../components/ProjectCell/ProjectCell';
import './OrdersCurrent/OrdersCurrent.css'
import { Outlet } from 'react-router-dom';

const OrdersFinished: React.FC = () => {
    return (
        <div className='Orders__linked'>
                    <FilterPanel />
                    
                    <div className='Linked__orders'>
                        <ProjectCell />
                    </div>
                  
            
            
            <Outlet />
        </div>   
    )
};

export default OrdersFinished;