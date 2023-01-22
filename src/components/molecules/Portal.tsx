import ReactDOM from "react-dom";

const Portal = ({ children }:any) => {
  const element = document.querySelector("#root");
  return element ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
