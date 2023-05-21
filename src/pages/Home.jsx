import React, { useEffect, useState } from "react";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Placeholder from "../components/PizzaBlock/Placeholder";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import axios from "axios";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProp: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://645590daa74f994b335ca976.mockapi.io/items?${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sortType.sortProp.replace("-", "")}&order=${
          sortType.sortProp.includes("-") ? "asc" : "desc"
        }`
      )
      .then((response) => {
        setTimeout(() => {
          setIsLoading(false);
          setItems(response.data);
        }, 200);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType.sortProp]);

  return (
    <div className={"container"}>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort sortType={sortType} setSortType={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Placeholder key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
