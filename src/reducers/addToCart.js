const initialStateUser = {};

  let addToCart = (state = initialStateUser, action) => {
    let new_state = { ...state };
    switch (action.type) {
      case "ADDTOCART":
        console.log("action", action);
        new_state = action.data
        console.log('new_state', new_state)
        return {...new_state};
      default:
        return {...new_state};
    }
  };
  export default addToCart;