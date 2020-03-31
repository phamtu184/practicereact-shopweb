import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export function ProductProvider(props) {
  const [products, setProducts] = useState([]);
  const [productsTemp, setProductsTemp] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('/product/product')
      setProducts(res.data);
      setProductsTemp(res.data);
      setLoading(false)
    }
    getProducts()
  }, [])
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
  // -------handle sort---------
  const [sort, setSort] = useState('popular');
  const onChangeSort = (event) => {
    setSort(event.target.value);
    let productsClone = []
    if (event.target.value === 'price lower') {
      productsClone = products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    else if (event.target.value === 'price higher') {
      productsClone = products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
    else {
      productsClone = products
    }
    setProducts(productsClone)
  }
  // -------handle search breed--------
  const [breed, setBreed] = useState({
    pug: false,
    husky: false,
    chowchow: false,
    poodle: false,
    search: ''
  });
  const changeSearchBreed = (event) => {
    setBreed({
      pug: false,
      husky: false,
      chowchow: false,
      poodle: false,
      search: event.target.value
    })
  }
  const CheckBreed = name => event => {
    setBreed({ ...breed, [name]: event.target.checked, search: '' });
  };
  // -------handle search size--------
  const [size, setSize] = useState({
    s: false,
    m: false,
    l: false
  });
  const CheckSize = (name) => event => {
    setSize({ ...size, [name]: event.target.checked });
  };
  const { s, m, l } = size
  const filterS = productsTemp.filter(product => {
    return product.size === 'Nhỏ'
  })
  const filterM = productsTemp.filter(product => {
    return product.size === 'Vừa'
  })
  const filterL = productsTemp.filter(product => {
    return product.size === 'Lớn'
  })
  // -------handle search price--------
  const [valuePrice, setValuePrice] = useState([20, 1500]);
  useEffect(() => {
    filterSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuePrice, size])
  const filterSearch = () => {
    let productsClone = [...productsTemp];
    let productsRs = [];
    const productPrice = productsClone.filter(product => {
      return product.price > valuePrice[0] && product.price < valuePrice[1]
    })
    if ((s === false && m === false && l === false) || (s === true && m === true && l === true)) {
      productsRs = productPrice;
    }
    else {
      if (s === true) {
        productsRs = filterS.filter(x => productPrice.includes(x))
      }
      if (m === true) {
        productsRs = filterM.filter(x => productPrice.includes(x))
      }
      if (l === true) {
        productsRs = filterL.filter(x => productPrice.includes(x))
      }
      if (s === true && l === true) {
        productsRs = filterS.concat(filterL).filter(x => productPrice.includes(x))
      }
      if (s === true && m === true) {
        productsRs = filterS.concat(filterM).filter(x => productPrice.includes(x))
      }
      if (m === true && l === true) {
        productsRs = filterM.concat(filterL).filter(x => productPrice.includes(x))
      }
    }
    setProducts(productsRs)
  }
  const handleChangePrice = (event, newValue) => {
    setValuePrice(newValue);
  };
  return (
    <ProductContext.Provider
      value={{
        products: currentPosts,
        loading: loading,
        // sort
        sort: sort,
        onChangeSort: onChangeSort,
        // pagination
        postPerPage: postPerPage,
        setPostPerPage: setPostPerPage,
        numberOfPage: numberOfPage,
        currentPage: currentPage,
        onChangeCurrentPage: onChangeCurrentPage,
        // search form
        breed: breed,
        changeSearchBreed: changeSearchBreed,
        CheckBreed: CheckBreed,
        size: size,
        CheckSize: CheckSize,
        valuePrice: valuePrice,
        handleChangePrice: handleChangePrice
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}