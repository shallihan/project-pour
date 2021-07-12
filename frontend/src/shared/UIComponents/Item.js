import React from "react";
const Item = (props) => {
    if (props.type === "blockquote") {
        return (
           <div className="item-block-container">
               <blockquote>{props.children}</blockquote>
           </div>
        );
    }
  return (
    <React.Fragment>
      <div className="item-container">
        <p className="label">{props.label}</p>
        <p>{props.children}</p>
      </div>
    </React.Fragment>
  );
};

export default Item;
