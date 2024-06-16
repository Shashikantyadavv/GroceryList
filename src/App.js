import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";
import "./index.css";
import { useEffect, useState } from "react";
import AddItem from "./AddItem";
import SearchItems from "./SearchItems";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500/items";
  const [items, setItems] = useState([]);
  const [newItem, setNewItems] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // const [color, setColor] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not recieved expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        console.log(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  // const setAndSaveItems = (listItems) => {
  //   setItems(listItems);
  //   localStorage.setItem("grocerylist", JSON.stringify(listItems));
  // };

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
    // setAndSaveItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(myNewItem),
    };
    const result = await apiRequest(API_URL, postOptions);
    if (result) {
      setFetchError(result);
    }
  };
  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : { ...item }
    );
    setItems(listItems);
    // setAndSaveItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ checked: myItem[0].checked }),
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) {
      setFetchError(result);
    }
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    // setAndSaveItems(listItems);

    const deleteOptions = {
      method: "DELETE",
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) {
      setFetchError(result);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(newItem);
    setNewItems("");
  };

  // const handleColor = (e) => {
  //   e.preventDefault();
  //   setColor(e.target.value);
  //   const el =document.getElementById("search");
  //   el.style.backgroundColor = color;
  // }

  const handleSearch = (e) => {
    console.log("hello");
    setSearch(e.target.value);
    if (search === "") {
      setItems(JSON.parse(localStorage.getItem("grocerylist")));
    } else {
      const listItems = items.filter((items) =>
        items.item.toLowerCase().includes(search.toLowerCase())
      );
      setItems(listItems);
      setSearch(e.target.value);
    }
  };
  return (
    <div className="App">
      <Header />
      <AddItem
        newItem={newItem}
        setNewItems={setNewItems}
        handleSubmit={handleSubmit}
      />
      <SearchItems search={search} setSearch={setSearch} />
      {/* <SearchItems color={color} setColor={setColor} /> */}
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && (
          <p style={{ color: "red" }}> {`Error: ${fetchError}`} </p>
        )}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((items) =>
              items.item.toLowerCase().includes(search.toLowerCase())
            )}
            setItems={setItems}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
