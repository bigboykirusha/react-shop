import React from "react";
import { Link } from "react-router-dom";
import EmptyPic from "../../assets/img/empty-cart.png";

const CartEmpty = () => {
  return (
    <div className="cart cart--empty">
      <h2>Корзина пустая 😕</h2>
      <p>
        Вероятней всего, вы еще не заказывали роллы.
        <br />
        Для того, чтобы заказать роллы, перейди на главную страницу.
      </p>
      <img src={EmptyPic} alt="Empty cart" />
      <Link to="/react-shop" className="button button--black">
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
