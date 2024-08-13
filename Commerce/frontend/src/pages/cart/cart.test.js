
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for extended matchers
import { Cart } from './cart';
import { ShopContext } from '../../context/shop-context';
import { PRODUCTS } from '../../products';
import { useNavigate } from 'react-router-dom';

const mockCheckout = jest.fn();
const mockGetTotalCartAmount = jest.fn(() => 100);
const mockCartItems = { 1: 2 }; // Example cart items

const MockShopContextProvider = ({ children }) => (
  <ShopContext.Provider value={{ cartItems: mockCartItems, getTotalCartAmount: mockGetTotalCartAmount, checkout: mockCheckout }}>
    {children}
  </ShopContext.Provider>
);

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Cart Component', () => {
  const navigate = useNavigate();

  it('renders cart items correctly', () => {
    render(
      <MockShopContextProvider>
        <Cart />
      </MockShopContextProvider>
    );

    expect(screen.getByText(/Your Cart Items/i)).toBeInTheDocument();
    expect(screen.getByText(/Subtotal: \$100/i)).toBeInTheDocument();
    expect(screen.getByText(/Continue Shopping/i)).toBeInTheDocument();
    expect(screen.getByText(/Checkout/i)).toBeInTheDocument();
  });

  it('displays cart items based on cartItems context', () => {
    render(
      <MockShopContextProvider>
        <Cart />
      </MockShopContextProvider>
    );

    PRODUCTS.forEach((product) => {
      if (mockCartItems[product.id]) {
        expect(screen.getByText(product.productName)).toBeInTheDocument();
      }
    });
  });

  it('navigates to the home page when Continue Shopping is clicked', () => {
    render(
      <MockShopContextProvider>
        <Cart />
      </MockShopContextProvider>
    );

    fireEvent.click(screen.getByText(/Continue Shopping/i));
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('calls checkout and navigates to checkout page when Checkout is clicked', () => {
    render(
      <MockShopContextProvider>
        <Cart />
      </MockShopContextProvider>
    );

    fireEvent.click(screen.getByText(/Checkout/i));
    expect(mockCheckout).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/checkout');
  });

  it('displays "Your Shopping Cart is Empty" when there are no items in the cart', () => {
    const emptyCartContext = {
      cartItems: {},
      getTotalCartAmount: () => 0,
      checkout: mockCheckout,
    };

    render(
      <ShopContext.Provider value={emptyCartContext}>
        <Cart />
      </ShopContext.Provider>
    );

    expect(screen.getByText(/Your Shopping Cart is Empty/i)).toBeInTheDocument();
  });
});