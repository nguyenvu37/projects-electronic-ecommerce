import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { NotificationManager} from 'react-notifications';
import {formatNumberUSD} from '../../../common/formatNumber';
import {db} from '../../../firebase';

const CartPageItem = (props) => {
  const data = props.data;
  const index = props.index;
  const refQty = useRef(null);
 
  const [qtyVlue, setQtyVlue] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    refQty.current.value = data.qty;
    setQtyVlue(refQty.current.value);
    setTotal(data.qty * data.newPrice);
  }, [data.qty, data.newPrice])

  useEffect(() => {
    refQty.current.value = qtyVlue;
  }, [qtyVlue])

  const editQtyData = (id, qty) => {
    let total = qty* data.newPrice;
    db.collection("cart").doc(id).update({
      ...data,
      qty: qty,
      total: total
     });
    // callApi(`cart/${id}`, 'put', {...data, qty: qty, total: total})
  }

  function onMinusQty() {
    let qty = parseInt(qtyVlue);
    qty--;
    if (qty <= 1) {
      editQtyData(data.id, 1);
      setQtyVlue(1);
      setTotal(data.newPrice);
      props.onMinusQty({qty: 1, price: data.newPrice});
    } else {
      editQtyData(data.id, qty);
      setQtyVlue(qty);
      setTotal(data.newPrice * qty);
      props.onMinusQty({qty: qty, price: data.newPrice});
    }    
    
  }

  function onPlusQty() {
    let qty = parseInt(qtyVlue);
    qty++;
    editQtyData(data.id, qty);
    setQtyVlue(qty);
    setTotal(data.newPrice * qty);
    props.onPlusQty({qty: qty, price: data.newPrice})
  }

  function onDeleteProduct(id) {
      if(window.confirm('Do you want to delete this product?')){
        db.collection("cart").doc(id).delete()
        .then(() => {
          props.onDeleteProduct(id)
          NotificationManager.success('Deleted successfully.');
        })
      } 
  }

  let oldPrice = data.oldPrice ? `$${formatNumberUSD(data.oldPrice)}` : '';
  let statusClassName = data.status === 'unpaid' ? 'text-warning' : 'text-danger';
  let disabledProduct = data.status === 'paid' ? true : false;
  return (
  <tr>
      <td>{index+1}</td>
      <td className="img"><img src={require(`./../../../img/${data.img}`)} alt="" /></td>
      <td><Link to={`/detail/${data.idProduct}`} className="name-product">{data.name}</Link></td>
      <td
        className='text-success'
        style={{ fontSize: '20px', fontWeight: '600' }}
      >
        ${formatNumberUSD(data.newPrice)}
      </td>
      <td
        className='text-secondary'
        style={{
          fontSize: '20px',
          fontWeight: '600',
          textDecoration: 'line-through'
        }}
      >
        {oldPrice}
      </td>
      <td className='d-flex justify-content-center'>
        <button
          className='btn btn-primary '
          style={{ width: '40px', height: '40px' }}
          onClick={() => onMinusQty()}
          disabled={disabledProduct}
        >
          <i className='fas fa-minus'></i>
        </button>
        <input
          text='number'
          name='value'
          ref={refQty}
          style={{ padding: '0 10px', width: '60px' }}
          disabled={disabledProduct}
        />
        <button
          className='btn btn-danger'
          style={{ width: '40px', height: '40px' }}
          onClick={() => onPlusQty()}
          disabled={disabledProduct}
        >
          <i className='fas fa-plus'></i>
        </button>
      </td>
      <td
        className='text-success'
        style={{ fontSize: '20px', fontWeight: '600' }}
      >
        ${formatNumberUSD(total)}
      </td>
      <td className={`text-uppercase ${statusClassName}`} style={{fontWeight:'600'}}>
        {data.status}
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => onDeleteProduct(data.id)}>
          <i className='fas fa-trash-alt'></i>
        </button>
      </td>
    </tr>
  )
}

export default CartPageItem
