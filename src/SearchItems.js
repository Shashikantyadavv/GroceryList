import React from "react";

const SearchItems = ({search, setSearch}) => {
  return (
    <form className="searchForm" onSubmit={(e) => e.preventDefault()} >
      <label htmlFor="seach">Search</label>
      <input
        type="text"
        id="search"
        role="searchbox"
        placeholder="Search Items"
        value = {search }
        onChange={(e) => {setSearch(e.target.value)}}
      />
    </form>
    // <form className="colorFrom" onSubmit={(e) => e.preventDefault()}>
    //     <input
    //      type="text"
    //      id="search"
    //      role="searchbox"
    //      placeholder="Search Items"
    //      value = {color }
    //      onChange={(e) => {handleColor(e)}}
    //    />
    // </form>
  );
};

export default SearchItems;
