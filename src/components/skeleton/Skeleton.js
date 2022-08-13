import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={305}
    viewBox="0 0 280 305"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="226" y="446" rx="0" ry="0" width="1" height="1" />
    <rect x="0" y="0" rx="5" ry="5" width="280" height="178" />
    <rect x="0" y="191" rx="0" ry="0" width="151" height="20" />
    <rect x="0" y="230" rx="0" ry="0" width="193" height="17" />
    <rect x="0" y="260" rx="0" ry="0" width="193" height="17" />
    <rect x="0" y="290" rx="0" ry="0" width="193" height="17" />
  </ContentLoader>
);

export default Skeleton;
