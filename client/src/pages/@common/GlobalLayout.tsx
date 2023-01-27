import React from "react";

function GlobalLayout(props: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex justify-center items-center bg-blue-50">
      {props.children}
    </div>
  );
}

export default GlobalLayout;
