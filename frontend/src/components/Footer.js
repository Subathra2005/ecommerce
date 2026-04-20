import React from 'react'
import axios from 'axios';
import API_BASE_URL from '../config';

export default function Footer(props) {
  const handleCheckout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/cart/checkout`, {
      userId: props.userId,
      email: props.email
    });

      if (response.data?.success) {
        props.onCheckoutSuccess?.(response.data);
      }

      const warning = response.data?.warning;
      alert(warning ? `${response.data.message}\n${warning}` : response.data.message);
  } catch (err) {
    console.error('Checkout failed:', err.response?.data || err);
      alert(err.response?.data?.message || 'Checkout failed. See console for details.');
  }
};
  return (
    <div className='row fixed-bottom'>
        <button className='btn btn-danger col-2'onClick={()=>{props.resetQuantity()}}>Reset</button>
        <div className='col-8 bg-dark text-white text-center'>
            {props.totalAmount}
        </div>
        <button className='btn btn-primary col-2' onClick={handleCheckout}>Pay Now</button>
    </div>
  )
}
