import React from "react";
import ContentLoader from "react-content-loader";

export default () => (
  <ContentLoader
    height={197}
    width={350}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    style={{ border: "grey dotted 1px;" }}
  >
    <rect x="70" y="15" rx="4" ry="4" width="120" height="6" />
    <rect x="70" y="35" rx="3" ry="3" width="80" height="6" />
    <rect x="0" y="80" rx="3" ry="3" width="80" height="6" />
    <rect x="0" y="100" rx="3" ry="3" width="80" height="6" />
  </ContentLoader>
);
