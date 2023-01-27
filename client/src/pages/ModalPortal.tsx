import ReactDOM from "react-dom";

function ModalPortal(props: { children: React.ReactNode }) {
  const modalRoot = document.querySelector("#modal-root")!;
  return ReactDOM.createPortal(props.children, modalRoot);
}

export default ModalPortal;
