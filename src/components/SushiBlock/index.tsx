import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemById } from "../../redux/Cart/selectors";
import { addItem } from "../../redux/Cart/slice";
import { CartItem } from "../../redux/Cart/types";

const typeNames = ["Урамаки", "Хосомаки"];
const sizeValues = ["200", "500", "850"];

type SushiBlockProps = {
  id: number;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  imageUrl: string;
};
const SushiBlock: React.FC<SushiBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const addedCount = cartItem ? cartItem.count : 0;
  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizeValues[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className={"sushi-block-wrapper"}>
      <div className="sushi-block">
        <img className="sushi-block__image" src={imageUrl} alt="Sushi" />
        <h4 className="sushi-block__title">{title}</h4>
        <div className="sushi-block__selector">
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? "active" : ""}
              >
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                onClick={() => setActiveSize(i)}
                className={activeSize === i ? "active" : ""}
              >
                {size} г.
              </li>
            ))}
          </ul>
        </div>
        <div className="sushi-block__bottom">
          <div className="sushi-block__price">от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SushiBlock;
