import React, {useRef, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { setDataSearch } from '../../action/action';
import {db} from '../../../firebase';

function MainHeader (props) {
const inputSearch = useRef(null);
const selectValue = useRef(null);
const [qtyCart, setQtyCart] = useState(0)
let dataAddToCart = props.dataAddToCart;
let indexDelete = props.indexDelete;
let checkout = props.checkout;

const fetchData = () => {
  let data = [];
  db.collection(`cart`)
  .get()
  .then(snapshot => snapshot.docs.map(doc => {
    data.push({...doc.data(), id: doc.id})
    setQtyCart(data.length)
    return true;
  }))
}

useEffect(() => {
 fetchData()
  return () => {
    setQtyCart(0)
  }
}, [dataAddToCart])

useEffect(() => {
  fetchData()
  return () => {
    setQtyCart(0)
  }
}, [indexDelete])

useEffect(() => {
  fetchData()
  return () => {
    setQtyCart(0)
  }
}, [checkout])


const removeAccents = (str) => {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ",
    "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ",
  ];

  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
}

const onSearchData = () => {
  const keywordSearch = removeAccents(inputSearch.current.value);
  props.getDataSearch(keywordSearch, selectValue.current.value)

}


  return (
    <header>
      <div id='header'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='header-logo'>
                <Link to='/' className='logo'>
                  <img src={require('./../../../img/logo.png')} alt='' />
                </Link>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='header-search'>
                <form>
                  <select className='input-select' ref={selectValue}>
                    <option value='all'>All Categories</option>
                    <option value='hotdeal'>Hot Deals</option>
                    <option value='laptop'>Laptops</option>
                    <option value='smartphone'>Smartphones</option>
                    <option value='camera'>Cameras</option>
                    <option value='accessorie'>Accessories</option>
                  </select>
                  <input placeholder='Search here' ref={inputSearch} />
                  <Link to='/search'>
                    <button className='search-btn' onClick={onSearchData}>Search</button>
                  </Link>
                </form>
              </div>
            </div>
            <div className='col-md-3 clearfix'>
              <div className='header-ctn'>
                <Link to='/my-cart' className="btn">
                  <div
                    className='cart text-center'
                  >
                    <i className='fa fa-shopping-cart'></i>
                    <span>Your Cart</span>
                    <div className='qty' style={{fontSize: '14px', fontWeight: '600'}}>{qtyCart}</div>
                  </div>
                </Link>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
const mapStateToProps = state => {
  return {
    dataAddToCart: state.addToCart,
    indexDelete: state.deleteProduct,
    checkout: state.checkout
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDataSearch: (q, category) => dispatch(setDataSearch(q, category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);