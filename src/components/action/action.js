export function setDataSearch(q, category) {
    return {
      type: "SETDATASEARCH",
      q,
      category
    };
  }

export const addToCart = (data) => {
  return {
    type: "ADDTOCART",
    data
  }
}

export const onDeleteProduct = (id) => {
  return {
    type: "DELETEPRODUCT",
    id
  }
}

export const onCheckout = (pay) => {
  return {
    type: "CHECKOUT",
    pay
  }
}