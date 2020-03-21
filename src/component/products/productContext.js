import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export function ProductProvider(props){
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);
  const [sort, setSort] = useState('popular');

  const [breed, setBreed] = useState({
    pug: false,
    husky: false,
    chowchow: false,
    poodle: false,
    search:''
  });
  const [size, setSize] = useState({
    s: false,
    m: false,
    l: false,
  });
  const [valuePrice, setValuePrice] = useState([20, 1500]);

  useEffect(()=>{
    const getProducts = async () => {
      const res = await axios.get('/product/product')
      setProducts(res.data);
      setProducts2(res.data);
      setLoading(false)
    }
    getProducts()
  },[])
  useEffect(() => {
    filterSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuePrice] )

  const onChangeCurrentPage = (event, value) => {
    setCurrentPage(value);
  };
  const onChangeSort = (event)=> {
    setSort(event.target.value);
    if(event.target.value==='price lower'){
      let productsClone = [...products2]
      productsClone.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      setProducts(productsClone)
    }
    else if(event.target.value==='price higher'){
      let productsClone = [...products2]
      productsClone.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      setProducts(productsClone)
    }
    else{
      setProducts(products2)
    }
  }
  
  const changeSearchBreed = (event) =>{
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
  const CheckSize = name => event => {
    setSize({ ...size, [name]: event.target.checked });
  };
  const handleChangePrice = (event, newValue) => {
    setValuePrice(newValue);
  };
  const filterSearch = () =>{
    const product = products2.filter(product => {
      return product.price>valuePrice[0] && product.price<valuePrice[1]
    })
    setProducts(product)
  }
  //get current posts
  const indexLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexLastPost - postPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexLastPost);
  const numberOfPage = Math.ceil(products.length/postPerPage) ;
  return(
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