export const addToCart = ( order = {} ) => ({
  type: 'ADD_TO_CART',
  order
})

export const clearCart = () => ({
  type: 'CLEAR_CART'
})

export const increaseCount = ( index = -1, count = 0 ) => ({
  type: 'INCREASE_COUNT',
  count, index
})

export const removeFromCart = ( index = -1 ) => ({
  type: 'REMOVE_FROM_CART',
  index
})

export const setEvents = ( events = [] ) => ({
  type: 'SET_EVENTS',
  events
})

export const setMyEvents = ( events = [] ) => ({
  type: 'SET_MY_EVENTS',
  events
})

export const setUser = ( user = {}) => ({
  type: 'SET_USER',
  user
});

export const toggleCartSidebar = ( cartSidebarOpen = false ) => ({
  type: 'TOGGLE_CART',
  cartSidebarOpen
});

export const unsetUser = () => ({
  type: 'UNSET_USER'
});
