import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import './Orders.css';
import { useStateValue } from '../../stateProvider';
import Order from '../Order';
function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        if (user) {
            db.collection('users')
                .doc(user?.uid)
                .collection('orders')
                .orderBy('created', 'desc')
                .onSnapshot(snapshot => ( //当前数据库的snapshot
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
        } else {
            setOrders([]);
        }
    }, [user])
    return (
        <div className="orders">
            <h1>Your Order</h1>
            <div className="orders__order">
                {orders?.map(order => (
                    <Order order={order}></Order>
                ))
                }
            </div>
        </div>
    )
}

export default Orders
