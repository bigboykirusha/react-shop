import React, { useContext, useEffect, useState } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Placeholder from "../components/Placeholder";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";

const Home = () => {
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProp: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://645590daa74f994b335ca976.mockapi.io/items?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sortType.sortProp.replace("-", "")}&order=${
          sortType.sortProp.includes("-") ? "asc" : "desc"
        }&search=${searchValue ? searchValue : ""}`
      )
      .then((response) => {
        setTimeout(() => {
          setIsLoading(false);
          setItems(response.data);
        }, 200);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType.sortProp, searchValue, currentPage]);

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
          ? [...new Array(4)].map((_, i) => <Placeholder key={i} />)
          : pizzas}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
