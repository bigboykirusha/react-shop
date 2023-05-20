import React, { useState } from "react";

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const CATEGORIES = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const onClickCategory = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((value, i) => (
          <li
            key={value}
            onClick={() => onClickCategory(i)}
            className={activeIndex === i ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
