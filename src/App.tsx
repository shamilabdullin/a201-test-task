import { FormEvent, useState } from "react";

import "./global.css";
import "./styles.css";

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Some ebook book book",
    price: 8000,
  },
  {
    id: 2,
    name: "Another ebook",
    price: 3000,
  },
  {
    id: 3,
    name: "Ebook three",
    price: 2200,
  },
];

const promocodeDiscounts: Record<string, number> = {
  EXAMPLE: 10,
  PROMO1: 1,
};

export default function App() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [productCounts, setProductCounts] = useState<Record<number, number>>(
    {}
  );
  const [email, setEmail] = useState("");
  const [promocode, setPromocode] = useState("");
  const [checked, setChecked] = useState(false);
  const discount = promocodeDiscounts[promocode] ?? 0; // discount in %
  const multiplier = 1 - discount / 100;

  const toggleProduct = (product: Product) => {
    setSelectedProducts((oldSelectedProducts) => {
      if (oldSelectedProducts.includes(product)) {
        return oldSelectedProducts.filter((id) => id !== product);
      } else {
        return [...oldSelectedProducts, product];
      }
    });
  };

  const inc = (productId: number) => {
    setProductCounts((oldProductCounts) => {
      if (oldProductCounts[productId] >= 10) return oldProductCounts;
      return {
        ...oldProductCounts,
        [productId]: (oldProductCounts[productId] ?? 1) + 1,
      };
    });
  };

  const dec = (productId: number) => {
    setProductCounts((oldProductCounts) => {
      if (oldProductCounts[productId] <= 1) return oldProductCounts;
      return {
        ...oldProductCounts,
        [productId]: (oldProductCounts[productId] ?? 1) - 1,
      };
    });
  };

  const total = selectedProducts.reduce((sum, currentProduct) => {
    return (
      sum +
      currentProduct.price *
        (productCounts[currentProduct.id] === undefined
          ? 1
          : productCounts[currentProduct.id])
    );
  }, 0);
  const discountedTotal = total * multiplier;

  function validateForm(): boolean {
    if (!email || !checked) {
      return true;
    }
    return false;
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    error
      ? alert("Please, fill email field and agree to the terms of service")
      : alert(
          `Proceeding to payment with ` +
            `these products: ${products
              .filter((p) => selectedProducts.includes(p))
              .map((p) => `${p.name} (${productCounts[p.id] ?? 1})`)
              .join(
                ", "
              )}\nTotal price: ${discountedTotal} (discount: ${discount}%)`
        );
  };

  return (
    <form className={"cart"} onSubmit={onSubmit}>
      <h1>Your cart</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="product_container">
            <input
              type={"checkbox"}
              checked={selectedProducts.includes(product)}
              onChange={() => toggleProduct(product)}
              className="checkbox"
            />
            <div className="product_content_container">
              <span className="product_counter_container">
                <span className="product_name">{product.name}</span>
                <span>
                  <button
                    type="button"
                    onClick={() => dec(product.id)}
                    className="product_button"
                  >
                    <span className="crement">-</span>
                  </button>
                  <span className="product_count">
                    {productCounts[product.id] ?? 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => inc(product.id)}
                    className="product_button"
                  >
                    <span className="crement">+</span>
                  </button>
                </span>
              </span>
              <span className="product_price">
                ${product.price * (productCounts[product.id] ?? 1)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="total">
        Total:
        <span
          style={{
            textDecoration: total === discountedTotal ? "none" : "line-through",
            color: total === discountedTotal ? "#344054" : "#828282",
            margin: total === discountedTotal ? "0" : "0px 12px",
          }}
        >
          ${total}
        </span>
        {total === discountedTotal ? null : <span> ${discountedTotal}</span>}
      </div>
      <div className="input_container">
        <label>
          <div className="input_header">Promo code</div>
          <input
            className="input"
            type={"text"}
            value={promocode}
            onChange={(e) => setPromocode(e.target.value.toUpperCase())}
          />
        </label>
      </div>
      <div className="input_container">
        <label>
          <div className="input_header">Email</div>
          <input
            className="input"
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gmail.com"
          />
        </label>
      </div>
      <div className="agree_container">
        <label>
          <input
            type={"checkbox"}
            onChange={() => setChecked((prev) => !prev)}
          />{" "}
          <span className="agree_text">I agree to the terms of service</span>
        </label>
      </div>

      <button className="submit_button" type={"submit"}>
        Proceed to payment
      </button>
    </form>
  );
}
