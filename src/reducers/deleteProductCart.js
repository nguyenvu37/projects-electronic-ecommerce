const initialStateUser = ''

  let deleteProduct = (state = initialStateUser, action) => {
    let new_state = { ...state };
    switch (action.type) {
      case "DELETEPRODUCT":
        console.log("action", action);
        new_state = action.id;
        return {...new_state};
      default:
        return {...new_state};
    }
  };
  export default deleteProduct;