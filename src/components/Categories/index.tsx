import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setCategoryId } from "../../redux/Filter/slice";

const Categories: React.FC = () => {
  const CATEGORIES = [
    "Все",
    "Фрайтонамаки",
    "Поко",
    "Темпура",
    "Острые",
    "Корейские",
  ];
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const search = useSelector((state: RootState) => state.filter.searchValue);
  console.log("uh", categoryId);
  const dispatch = useDispatch();
  const onChangeCategory = (id: number): void => {
    dispatch(setCategoryId(id));
  };
  return (
    <div className="categories">
      <ul>
        {CATEGORIES.map((categoryName, i) => (
          <li key={categoryName} className={categoryId === i ? "active" : ""}>
            <button
              disabled={search !== ""}
              onClick={() => onChangeCategory(i)}
            >
              {categoryName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
