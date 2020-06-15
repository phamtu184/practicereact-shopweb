import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import url from "../../config/url";

export const ProductContext = createContext();

export function ProductProvider(props) {
  const [products, setProducts] = useState([]);
  const [productsTemp, setProductsTemp] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breed, setBreed] = useState("");
  const [size, setSize] = useState("");
  useEffect(() => {
    getProducts();
    getCatalog();
  }, []);
  //get current posts
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);
  const indexLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexLastPost - postPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexLastPost);
  const numberOfPage = Math.ceil(products.length / postPerPage);
  const onChangeCurrentPage = (event, value) => {
    setCurrentPage(value);
  };
  const getProducts = async () => {
    setLoading(true);
    const res = await axios.get(`${url.LOCAL}/product/products`);
    setProducts(
      res.data.sort(
        (a, b) => parseFloat(b.viewCounts) - parseFloat(a.viewCounts)
      )
    );
    setProductsTemp(res.data);
    setLoading(false);
  };
  const getCatalog = async () => {
    try {
      const res = await axios.get(`${url.LOCAL}/product/catalog`);
      setCatalog(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const reset = () => {
    getProducts();
    setSize("");
    setBreed("");
    setValuePrice([20, 1500]);
  };
  const handleChangeSize = (e) => {
    setSize(e.target.value);
  };
  const handleChangeBreed = (e) => {
    setBreed(e.target.value);
  };
  const filterProducts = () => {
    setLoading(true);
    axios
      .get(`${url.BASE || url.LOCAL}/product/filterproduct`, {
        params: {
          size:
            size === "s"
              ? "nhỏ"
              : size === "m"
              ? "vừa"
              : size === "l"
              ? "lớn"
              : "",
          breed,
          valuePrice,
        },
      })
      .then((res) => {
        setProducts(
          res.data.sort(
            (a, b) => parseFloat(b.viewCounts) - parseFloat(a.viewCounts)
          )
        );
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };
  // -------handle sort---------
  const [sort, setSort] = useState("popular");
  const onChangeSort = (event) => {
    setSort(event.target.value);
    let productsClone = [];
    if (event.target.value === "price lower") {
      productsClone = products.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    } else if (event.target.value === "price higher") {
      productsClone = products.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    } else if (event.target.value === "rating") {
      productsClone = products.sort(
        (a, b) => parseFloat(b.rates) - parseFloat(a.rates)
      );
    } else {
      productsClone = products.sort((a, b) => b.viewCounts - a.viewCounts);
    }
    setProducts(productsClone);
  };
  // -------handle search price--------
  const [valuePrice, setValuePrice] = useState([20, 1500]);
  const handleChangePrice = (event, newValue) => {
    setValuePrice(newValue);
  };
  return (
    <ProductContext.Provider
      value={{
        products: currentPosts,
        productsTemp,
        loading,
        // sort
        sort,
        onChangeSort,
        // pagination
        postPerPage,
        setPostPerPage,
        numberOfPage,
        currentPage,
        onChangeCurrentPage,
        // search form
        catalog,
        valuePrice,
        handleChangePrice,
        handleChangeSize,
        handleChangeBreed,
        reset,
        filterProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}
