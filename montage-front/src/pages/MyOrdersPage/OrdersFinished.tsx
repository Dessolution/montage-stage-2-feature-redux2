import React from 'react';
import { Counter } from 'src/app/entities/Counter';

const OrdersFinished: React.FC = () => {
    return (
        <>
            <h2>FinishedOrders</h2>
            <Counter />
        </>
    )
};

export default OrdersFinished;