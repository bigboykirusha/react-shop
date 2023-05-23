import React, { useContext, useEffect, useRef, useState } from "react";
import Categories from "../components/Categories";
import Sort, { LIST } from "../components/Sort";
import Placeholder from "../components/Placeholder";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Redux logic
  const { categoryId, sortType, currentPage } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const fetchItems = () => {
    setIsLoading(true);

    const sortBy = sortType.sortProp.replace("-", "");
    const order = sortType.sortProp.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";
    axios
      .get(
        `https://645590daa74f994b335ca976.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`
      )
      .then((response) => {
        setTimeout(() => {
          setIsLoading(false);
          setItems(response.data);
        }, 300);
      });
  };

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  /* eslint-disable */
  useEffect(() => {
    if (window.location.search) {
      const Params = qs.parse(window.location.search.substring(1));
      const sortType = LIST.find((obj) => obj.sortProp === Params.sortProp);

      dispatch(
        setFilters({
          ...Params,
          sortType,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchItems();
    }
    isSearch.current = false;
  }, [categoryId, sortType.sortProp, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProp: sortType.sortProp,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProp, searchValue, currentPage]);

  /* eslint-enable */

  return (
    <div className={"container"}>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, i) => <Placeholder key={i} />)
          : pizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
