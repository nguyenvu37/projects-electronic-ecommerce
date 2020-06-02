import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { formatNumberUSD } from '../../../common/formatNumber';

const CheckoutItem = (props) => {
    const data = props.data;
    const index = props.index;
    const [total, setTotal] = useState(0);
    let oldPrice = data.oldPrice ? `$${formatNumberUSD(data.oldPrice)}` : '';
    let statusClassName = data.status === 'unpaid' ? 'text-warning' : 'text-danger';
    let qty = Math.floor(data.total / data.newPrice);


    useEffect(() => {
        setTotal(qty * data.newPrice);
      }, [qty, data.newPrice])


      

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
          <td style={{fontSize: '1.2rem', fontWeight: '600', color: 'violet'}}>
            {qty}
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
        </tr>
      )
};

export default CheckoutItem;