const usersReducerDefaultState = {
  cart: [],
  cartSidebarOpen: false,
  events: [],
  my: [],
  user: {},
};

export default (state = usersReducerDefaultState, action) => {
  let {
    cartSidebarOpen,
    count,
    events,
    index,
    order,
    type,
    user
  } = action;
  
  switch (type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [
          ...state.cart,
          order
        ],
        cartSidebarOpen: true
      }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      }

    case 'INCREASE_COUNT':
      let tempCart = [...state.cart];
      let item = tempCart[index];
      item['count'] =
        count ?
          count <= item.event.tickets_left ?
            Number(count) :
              Number(item.event.tickets_left)
          : 0;
      tempCart[index] = item;
      return {
        ...state,
        cart: tempCart,
        cartSidebarOpen: true
      }

    case 'REMOVE_FROM_CART':
      let cart =
        state.cart.filter((order, i) => {
          return i !== index;
        })
      return {
        ...state,
        cart          
      }

    case 'SET_EVENTS':
      return {
        ...state,
        events
      }

    case 'SET_MY_EVENTS':
      return {
        ...state,
        my: events
      }

    case 'SET_USER':
      return {
        ...state,
        user
      }

    case 'TOGGLE_CART':
      return {
        ...state,
        cartSidebarOpen
      }

    case 'UNSET_USER':
      return {
        ...state,
        user: {},
      }

    default:
      return state;
  }
};
