import React from "react";
import ContentLoader from "react-content-loader";

export default () => (
  <ContentLoader
    height={197}
    width={350}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    className="stonk-skeleton"
  >
    <rect x="0" y="30" rx="4" ry="4" width="100" height="6" />
    <rect x="0" y="45" rx="4" ry="4" width="80" height="6" />
    <rect x="0" y="77" rx="3" ry="3" width="110" height="6" />
    <rect x="0" y="107" rx="3" ry="3" width="110" height="6" />
    <rect x="0" y="137" rx="3" ry="3" width="110" height="6" />
  </ContentLoader>
);
