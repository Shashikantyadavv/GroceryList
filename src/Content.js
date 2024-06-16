import React from "react";
import ItemList from "./ItemList";

const Content = ({ items, setItems, handleCheck, handleDelete }) => {
  return (
    <>
      {items.length > 0 ? (
        <ItemList
          items={items}
          setItems={setItems}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ marginTop: "2rem" }}>List is Empty!</p>
      )}
    </>
  );
};

export default Content;
