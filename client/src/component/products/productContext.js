import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export function ProductProvider(props) {
  const [products, setProducts] = useState([]);
  const [productsTemp, setProductsTemp] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('/product/products')
      setProducts(res.data.sort((a, b) => parseFloat(b.viewCounts) - parseFloat(a.viewCounts)));
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
      productsClone = products.sort((a, b) => b.viewCounts - a.viewCounts);
    }
    setProducts(productsClone)
  }
  // -------handle search breed--------
  const [breed, setBreed] = useState({
    labrador: false,
    pug: false,
    corgi: false,
    bloodhound: false,
    search: ''
  });

  const filterLabrador = productsTemp.filter(product => {
    return product.breed === 'labrador'
  })
  const filterPug = productsTemp.filter(product => {
    return product.breed === 'pug'
  })
  const filterCorgi = productsTemp.filter(product => {
    return product.breed === 'corgi'
  })
  const filterBloodHound = productsTemp.filter(product => {
    return product.breed === 'bloodhound'
  })
  // -------handle search size--------
  const [size, setSize] = useState({
    s: false,
    m: false,
    l: false
  });
  const filterS = productsTemp.filter(product => {
    return product.size === 'nhỏ'
  })
  const filterM = productsTemp.filter(product => {
    return product.size === 'vừa'
  })
  const filterL = productsTemp.filter(product => {
    return product.size === 'lớn'
  })
  // -------handle search price--------
  const [valuePrice, setValuePrice] = useState([20, 1500]);
  useEffect(() => {
    filterSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuePrice, size, breed])
  const filterSearch = () => {
    let productsClone = [...productsTemp];
    let productsRs = [];
    const { s, m, l } = size
    const { labrador, pug, corgi, bloodhound } = breed;
    const productPrice = productsClone.filter(product => {
      return product.price > valuePrice[0] && product.price < valuePrice[1]
    })
    if ((!s && !m && !l) && (!labrador && !pug && !corgi && !bloodhound)) {
      productsRs = productPrice;
    }
    else {
      if (labrador) {
        if (s) { productsRs = filterS.filter(x => productPrice.includes(x)).filter(x => filterLabrador.includes(x)) }
        else if (m) { productsRs = filterM.filter(x => productPrice.includes(x)).filter(x => filterLabrador.includes(x)) }
        else if (l) { productsRs = filterL.filter(x => productPrice.includes(x)).filter(x => filterLabrador.includes(x)) }
        else { productsRs = filterLabrador.filter(x => productPrice.includes(x)) }
      }
      else if (pug) {
        if (s) { productsRs = filterS.filter(x => productPrice.includes(x)).filter(x => filterPug.includes(x)) }
        else if (m) { productsRs = filterM.filter(x => productPrice.includes(x)).filter(x => filterPug.includes(x)) }
        else if (l) { productsRs = filterL.filter(x => productPrice.includes(x)).filter(x => filterPug.includes(x)) }
        else { productsRs = filterPug.filter(x => productPrice.includes(x)) }
      }
      else if (corgi) {
        if (s) { productsRs = filterS.filter(x => productPrice.includes(x)).filter(x => filterCorgi.includes(x)) }
        else if (m) { productsRs = filterM.filter(x => productPrice.includes(x)).filter(x => filterCorgi.includes(x)) }
        else if (l) { productsRs = filterL.filter(x => productPrice.includes(x)).filter(x => filterCorgi.includes(x)) }
        else { productsRs = filterCorgi.filter(x => productPrice.includes(x)) }
      }
      else if (bloodhound) {
        if (s) { productsRs = filterS.filter(x => productPrice.includes(x)).filter(x => filterBloodHound.includes(x)) }
        else if (m) { productsRs = filterM.filter(x => productPrice.includes(x)).filter(x => filterBloodHound.includes(x)) }
        else if (l) { productsRs = filterL.filter(x => productPrice.includes(x)).filter(x => filterBloodHound.includes(x)) }
        else { productsRs = filterBloodHound.filter(x => productPrice.includes(x)) }
      }
      else {
        if (s) { productsRs = filterS.filter(x => productPrice.includes(x)) }
        if (m) { productsRs = filterM.filter(x => productPrice.includes(x)) }
        if (l) { productsRs = filterL.filter(x => productPrice.includes(x)) }
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
        productsTemp: productsTemp,
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
        setBreed: setBreed,
        size: size,
        setSize: setSize,
        valuePrice: valuePrice,
        handleChangePrice: handleChangePrice
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}