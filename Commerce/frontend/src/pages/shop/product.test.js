
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { Product } from './product';
import { ShopContext } from '../../context/shop-context';

const mockAddToCart = jest.fn();
const mockCartItems = { 1: 2 }; 

const MockShopContextProvider = ({ children }) => (
  <ShopContext.Provider value={{ addToCart: mockAddToCart, cartItems: mockCartItems }}>
    {children}
  </ShopContext.Provider>
);

describe('Product Component', () => {
  const product = {
    id: 1,
    productName: 'Test Product',
    price: 99.99,
    productImage: 'http://example.com/image.jpg',
  };

  it('renders product information', () => {
    render(
      <MockShopContextProvider>
        <Product data={product} />
      </MockShopContextProvider>
    );

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'http://example.com/image.jpg');
  });

  it('displays the correct cart item count', () => {
    render(
      <MockShopContextProvider>
        <Product data={product} />
      </MockShopContextProvider>
    );

    expect(screen.getByText(/2/)).toBeInTheDocument();
  });

  it('calls addToCart when the button is clicked', () => {
    render(
      <MockShopContextProvider>
        <Product data={product} />
      </MockShopContextProvider>
    );

    fireEvent.click(screen.getByText(/Add To Cart/i));
    expect(mockAddToCart).toHaveBeenCalledWith(product.id);
  });
});