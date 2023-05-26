import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../../redux/slices/filterSlice";

const Categories: React.FC = () => {
  const CATEGORIES = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const dispatch = useDispatch();
  const onChangeCategory = (id: number): void => {
    dispatch(setCategoryId(id));
  };
  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((categoryName, i) => (
          <li
            key={categoryName}
            onClick={() => onChangeCategory(i)}
            className={categoryId === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;