
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; 
import { PRODUCTS } from "../../products";

jest.mock("./product", () => ({
  Product: jest.fn(() => <div>Product</div>),
}));

describe("shop Component", () => {
  it("renders the shop title", () => {
    render(<shop />);
    expect(screen.getByText(/Emily's Holiday Gallery/i)).toBeInTheDocument();
  });

  it("renders a product for each item in PRODUCTS", () => {
    render(<shop />);
    PRODUCTS.forEach(product => {
      expect(screen.getAllByText("Product")).toHaveLength(PRODUCTS.length);
    });
  });
});