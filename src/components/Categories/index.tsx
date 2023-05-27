import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setCategoryId } from "../../redux/Filter/slice";

const Categories: React.FC = () => {
  const CATEGORIES = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  console.log("uh", categoryId);
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
