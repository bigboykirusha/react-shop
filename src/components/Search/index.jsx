import React, { useCallback, useContext, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

const Search = () => {
  const [value, setValue] = useState("");
  const { setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();
  const onClickClear = () => {
    inputRef.current.focus();
    setSearchValue("");
    setValue("");
  };

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  /* eslint-disable */
  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    []
  );
  /* eslint-enable */
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="heroicon-ui"
          d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
        />
      </svg>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        value={value}
        type="text"
        className={styles.input}
        placeholder={"Поиск пиццы..."}
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clear}
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />
          <g>
            <path d="M18.83,16l8.59-8.59a2,2,0,0,0-2.83-2.83L16,13.17,7.41,4.59A2,2,0,0,0,4.59,7.41L13.17,16,4.59,24.59a2,2,0,1,0,2.83,2.83L16,18.83l8.59,8.59a2,2,0,0,0,2.83-2.83Z" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default Search;
