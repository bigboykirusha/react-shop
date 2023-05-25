import React, { useEffect, useRef } from "react";
import Categories from "../components/Categories";
import Sort, { LIST } from "../components/Sort";
import Placeholder from "../components/Placeholder";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import qs from "qs";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import { fetchSushi, selectSushiData } from "../redux/slices/sushiSlice";
import styles from "../components/NotFoundBlock/NotFoundBlock.module.scss";

const Home = () => {
  // Redux logic
  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectSushiData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const getSushi = async () => {
    const sortBy = sortType.sortProp.replace("-", "");
    const order = sortType.sortProp.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchSushi({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

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
    if (!isSearch.current) {
      getSushi();
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
      {status === "error" ? (
        <div className="content__error">
          <h2>Здесь пусто 🙂</h2>
          <p className={styles.description}>К сожалению, нет данных :(</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(4)].map((_, i) => <Placeholder key={i} />)
            : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
