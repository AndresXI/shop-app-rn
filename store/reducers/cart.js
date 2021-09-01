import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import CartItem from '../../models/cart-item'

const initialState = {
  items: {},
  totalAmount: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product
      const productPrice = addedProduct.price
      const productTitle = addedProduct.title
      // encountering new product
      if (!state.items[addedProduct.id]) {
        const newCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        )
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + productPrice,
        }
      }
      // updating existing cart item
      const updatedCartItem = new CartItem(
        state.items[addedProduct.id].quantity + 1,
        productPrice,
        productTitle,
        state.items[addedProduct.id].sum + productPrice
      )
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedCartItem },
        totalAmount: state.totalAmount + productPrice,
      }

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId]
      const currentQty = selectedCartItem.quantity
      let updatedCartItems
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        )
        updatedCartItems = {
          ...state.items,
          [action.productId]: updatedCartItem,
        }
      } else {
        updatedCartItems = { ...state.items }
        delete updatedCartItems[action.productId]
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: Math.abs(
          state.totalAmount - selectedCartItem.productPrice
        ),
      }

    default:
      break
  }
  return state
}
