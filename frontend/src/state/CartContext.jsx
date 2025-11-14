import { createContext, useContext, useMemo, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        (item) => item.id === action.payload.id && item.signature === action.payload.signature,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item === existing ? { ...item, quantity: item.quantity + action.payload.quantity } : item,
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'UPDATE': {
      return {
        ...state,
        items: state.items.map((item, idx) => (idx === action.index ? { ...item, ...action.payload } : item)),
      };
    }
    case 'REMOVE': {
      return { ...state, items: state.items.filter((_, idx) => idx !== action.index) };
    }
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => {
    const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      items: state.items,
      total,
      addItem: (item) => dispatch({ type: 'ADD', payload: item }),
      updateItem: (index, payload) => dispatch({ type: 'UPDATE', index, payload }),
      removeItem: (index) => dispatch({ type: 'REMOVE', index }),
      clear: () => dispatch({ type: 'CLEAR' }),
    };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('Cart context missing');
  return ctx;
}
