import ReactDOMServer from "react-dom/server";
import React from "react";

const renderToString = (Component, props = {}) => {
  return ReactDOMServer.renderToString(<Component {...props} />);
};

export default renderToString;
