import React from 'react';
import styled from 'styled-components';
import CarouselCus from '../component/carousel/CarouselCus';
import SearchBar from '../component/products/searchBar';
import ProductsList from '../component/products/productsList'
import SortTopBar from '../component/products/sortTopBar';
import { ProductProvider } from '../component/products/productContext';

import Background1 from '../image/background/slide1.jpg';
import Background2 from '../image/background/slide2.jpg';
import Background3 from '../image/background/slide3.jpg';
const items = [
  {
    src: Background1,
    altText: 'Slide 1',
    captionHeader3: 'Website',
    captionHeader1: 'Cửa hàng',
    captionText: 'Được xây dựng với react và nodejs',
    captionButton: 'Mua sắm ngay'
  },
  {
    src: Background2,
    altText: 'Slide 2',
    captionHeader3: 'Website',
    captionHeader1: 'Cửa hàng',
    captionText: 'Được xây dựng với react và nodejs',
    captionButton: 'Mua sắm ngay'
  },
  {
    src: Background3,
    altText: 'Slide 3',
    captionHeader3: 'Website',
    captionHeader1: 'Cửa hàng',
    captionText: 'Được xây dựng với react và nodejs',
    captionButton: 'Mua sắm ngay'
  }
];
const DivParentPro = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
grid-template-rows: repeat(5, 1fr);
grid-column-gap: 0px;
grid-row-gap: 0px;
.search-bar { 
  grid-area: 1 / 1 / 6 / 2; 
}
.products-section { 
  grid-area: 1 / 2 / 6 / 6; 
  .search-top-bar{
    display: flex;
    flex-wrap: wrap;
  }
  .product-list{
    display: flex;
    flex-wrap: wrap;
    .product-thumb{
      overflow: hidden;
      border: 1px solid #e5e5e5;
      position: relative;
      .product-img{
        display: block;
        overflow: hidden;
        transition: all 0.3s ease-out 0s;
        -webkit-transition: all 0.3s ease-out 0s;
        width: 100%;
        max-width: 100%;
        height: auto;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
      }
      .product-extra-link{
        position: absolute;
        height: 100px;
        top: 0;
        bottom: 0;
        margin: auto;
        left: 0;
        right: 0;
        z-index: 12;
        transition: all 0.3s ease-out 0s;
        -webkit-transition: all 0.3s ease-out 0s;
        text-align: center;
        ul{
          margin: 0 0 1em;
          padding: 0;
          list-style: none outside;
          clear: both;
          display: flex;
          justify-content: space-evenly;
          li{
            display: inline-block;
            vertical-align: top;
            list-style: none outside;
            .MuiTooltip-arrow{
              color: #03a9f4;
            }
            button{
              color:#1e88e5;
              border: 2px solid #1e88e5;
              background-color: white;
              padding: 7px;
              svg{
                font-size: 18px;
              }
            }
            button:hover{
              color:white;
              background-color: #1e88e5;
            }
          }
        }
        button{
          transition: all 0.3s ease-out 0s;
          transform: scale(0);
          -webkit-transform: scale(0);
        }
        .btn-addtocart{
          border-radius: 5px;
          background-color: #1e88e5;
          span{
            color: white;
            font-weight: 550;
          }
        }
        .btn-addtocart:hover{
          background-color: #1565c0;
        }
      }
    }
    .product-thumb:hover{
      .product-extra-link{
        button{
          transform: scale(1);
          -webkit-transform: scale(1);
        }
      }
      .product-img{
        filter: opacity(50%);
        transform: scale(1.2);
      }
    }
    .product-info{
      .product-name{
        font-family: 'Dosis', sans-serif;
        color: #1e88e5;
        text-transform: uppercase;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 700;
        font-size: 18px;
      }
      .product-rating{
        width: 200;
        display: flex;
        align-items: flex-start;
        label{
          display: block;
        }
      }
      .product-desc{
        margin-bottom: 0.25rem;
      }
    }
  }
  .MuiPagination-root{
    .Mui-selected{
      color: #1976d2
    }
  }
}
`
export default function Products() {
  return (
    <ProductProvider>
      <CarouselCus items={items} animatedClass='animated rollIn' />
      <div className='container mt-4'>
        <DivParentPro >
          <div className='search-bar'>
            <SearchBar />
          </div>
          <div className='products-section ml-3 mt-2'>
            <SortTopBar />
            <ProductsList />
          </div>
        </DivParentPro>
      </div>
    </ProductProvider>
  )
}
//class Products extends Component{
  // constructor(props){
  //   super(props);
  //   this.state= {
  //     products:[]
  //   };
  // }
  // componentDidMount(){
  //   axios.get('http://localhost:4000/products')
  //   .then(response => {
  //     this.setState({
  //       products: response.data
  //     });
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  // }
 // render(){
    //const {products} = this.state;
    //return(
     // <div>
        //Products
      //</div>
      // <MDBContainer>
      //   <h2>Products</h2>
      //   <MDBRow>
      //     {products.map((product, index)=>(
      //       <MDBCol md='4' key={index}>
      //         <MDBCard style={{ width: "300px", height:"400px"}} className="mt-4">
      //           <MDBCardImage className="img-fluid" src={product.img} waves />
      //           <MDBCardBody>
      //             <MDBCardTitle>{product.name}</MDBCardTitle>
      //             <MDBCardText>{product.desc}</MDBCardText>
      //             <CartContext.Consumer>
      //               {({addToCart}) => (
      //                 <MDBBtn onClick={() => addToCart(product)}>Add to card</MDBBtn>
      //               )}
      //             </CartContext.Consumer>
      //           </MDBCardBody>
      //         </MDBCard>
      //       </MDBCol>
      //     ))}
      //   </MDBRow>
      // </MDBContainer>
    //)
  //}
  // render(){
  //   return(
  //     <h1>Products</h1>
  //   )
  // }
//}

//export default Products;