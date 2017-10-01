import * as React from "react";
import * as ReactDOM from "react-dom";
import { products } from './data';
import { App } from "./components/App";

ReactDOM.render(
    <App products={products} />,
    document.getElementById("example")
);