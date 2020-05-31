const initialStateUser = {
    q: "",
    category: ""
  };

  let search = (state = initialStateUser, action) => {
    let new_state = { ...state };
    switch (action.type) {
      case "SETDATASEARCH":
        console.log("action", action);
        new_state.q = action.q;
        new_state.category = action.category;
        return {...new_state};
      default:
        return {...new_state};
    }
  };
  export default search;