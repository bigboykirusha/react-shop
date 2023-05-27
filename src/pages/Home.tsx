import React, { useEffect, useRef } from "react";
import Categories from "../components/Categories";
import SortPopup, { LIST } from "../components/SortPopup";
import Placeholder from "../components/Placeholder";
import SushiBlock from "../components/SushiBlock";
import Pagination from "../components/Pagination";
import qs from "qs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../components/NotFoundBlock/NotFoundBlock.module.scss";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/Filter/selectors";
import { selectSushiData } from "../redux/Sushi/selectors";
import { setCurrentPage, setFilters } from "../redux/Filter/slice";
import { fetchSushi } from "../redux/Sushi/asyncActions";
import { SearchSushiParams } from "../redux/Sushi/types";

const Home: React.FC = () => {
  // Redux logic
  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectSushiData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const onChangePage = (idx: number) => {
    dispatch(setCurrentPage(idx));
  };

  const getSushi = async () => {
    const sortBy = sortType.sortProp.replace("-", "");
    const order = sortType.sortProp.includes("-") ? "asc" : "desc";
    console.log(categoryId);
    const category = categoryId > 0 ? String(categoryId) : "";
    console.log(category);
    const search = searchValue ? searchValue : "";

    dispatch(
      fetchSushi({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  const pizzas = items.map((obj: any) => <SushiBlock key={obj.id} {...obj} />);
  /* eslint-disable */
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchSushiParams;
      console.log(params);
      const sortObj = LIST.find((obj) => obj.sortProp === params.sortProp);
      console.log(categoryId);
      dispatch(
        setFilters({
          searchValue: params.searchValue,
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sortType: sortObj || LIST[0],
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
    <div className="container">
      <div className="content__top">
        <Categories />
        <SortPopup />
      </div>
      <h2 className="content__title">Все роллы</h2>
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
