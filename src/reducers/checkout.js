const initialStateUser = ''

  let search = (state = initialStateUser, action) => {
    let new_state = { ...state };
    switch (action.type) {
      case "CHECKOUT":
        console.log("action", action);
        new_state = action.pay;
        return {...new_state};
      default:
        return {...new_state};
    }
  };
  export default search;