import React from "react";
import ContentLoader from "react-content-loader";

const Placeholder: React.FC = () => (
  <ContentLoader
    className={"sushi-block"}
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="10" y="10" rx="10" ry="10" width="260" height="260" />
    <rect x="0" y="292" rx="10" ry="10" width="280" height="22" />
    <rect x="0" y="333" rx="10" ry="10" width="280" height="57" />
    <rect x="0" y="407" rx="10" ry="10" width="100" height="40" />
    <rect x="120" y="407" rx="10" ry="10" width="160" height="40" />
  </ContentLoader>
);

export default Placeholder;
