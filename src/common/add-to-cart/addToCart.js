import React, { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { addToCart } from "./../../components/action/action";
import { db } from "../../firebase";

function AddToCart(props) {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [dataCarts, setDataCarts] = useState([]);
  let { id } = props;
  let { qtyDetail } = props;

  const fetchDataCart = async () => {
    let data = [];
    let idCart = [];
    await db
      .collection("cart")
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          data.push({ ...doc.data(), id: doc.id });
          idCart.push(doc.id);
          return true;
        })
      );
    if (data.length > 0) {
      setDataCarts([...data]);
    } else {
      setDataCarts([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      let new_data = [];
      await db
        .collection("products")
        .get()
        .then((snapshot) =>
          snapshot.docs.map((doc) => {
            data.push({ ...doc.data(), id: doc.id });
            return true;
          })
        );
      data.filter((item) => {
        if (item.id === id) {
          new_data.push({ ...item });
        }
        return true;
      });
      if (new_data.length > 0) {
        setData([...new_data]);
      } else {
        setData([]);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      let data = [];
      let new_data = [];
      await db
        .collection("products")
        .get()
        .then((snapshot) =>
          snapshot.docs.map((doc) => {
            data.push({ ...doc.data(), id: doc.id });
            return true;
          })
        );
      data.filter((item) => {
        if (item.id === id) {
          new_data.push({ ...item });
        }
        return true;
      });
      if (new_data.length > 0) {
        setData([...new_data]);
      } else {
        setData([]);
      }
    };
    fetchData();
  }, [qtyDetail, id]);

  useEffect(() => {
    fetchDataCart();
  }, [products]);

  const fetchIndex = (dataCarts, dataCart) => {
    let index = -1;
    if (data.length > 0) {
      if (dataCarts.length > 0) {
        for (let i = 0; i < dataCarts.length; i++) {
          if (dataCarts[i].idProduct === dataCart.idProduct) {
            if (dataCarts[i].status === "unpaid") {
              index = i;
              return index;
            } else index = -1;
          } else index = -1;
        }
      }
    }
    return index;
  };

  const handleAddCart = () => {
    let dataCart = {
      idProduct: data[0].id,
      name: data[0].name,
      img: data[0].img,
      newPrice: data[0].newPrice,
      oldPrice: data[0].oldPrice,
      status: "unpaid",
      discount: data[0].discount,
      qty: props.qtyDetail ? props.qtyDetail : 1,
      total: data[0].newPrice,
    };

    let indexData = fetchIndex(dataCarts, dataCart);
    if (indexData !== -1) {
      const id = dataCarts[indexData].id;
      db.collection("cart")
        .doc(id)
        .update({
          ...dataCart,
          id: dataCarts[indexData].id,
          qty: props.qtyDetail
            ? dataCarts[indexData].qty + parseInt(props.qtyDetail)
            : dataCarts[indexData].qty + 1,
          total: (dataCarts[indexData].qty + 1) * dataCarts[indexData].newPrice,
        });
      setProducts({ ...dataCart });
    } else {
      db.collection("cart").add({ ...dataCart });
      setProducts({ ...dataCart });
    }
    props.onAddToCart({ ...dataCart });
    NotificationManager.success("Add to cart successfully");
  };

  return (
    <div className="add-to-cart">
      <button
        className="add-to-cart-btn"
        style={{ outline: "none" }}
        onClick={handleAddCart}
      >
        <i className="fa fa-shopping-cart" /> add to cart
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddToCart: (data) => dispatch(addToCart(data)),
  };
};

export default connect(null, mapDispatchToProps)(AddToCart);
