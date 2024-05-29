import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <h1 className={styles.root}>
      <span>🙂</span>
      <div className={styles.title}>Ничего не найдено :(</div>
      <p className={styles.description}>
        К сожалению, данная страница отсутсвует в нашем интернет магазине
      </p>
    </h1>
  );
};

export default NotFoundBlock;
