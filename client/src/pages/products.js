import React from 'react';

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
export default function Products() {
  return (
    <ProductProvider>
      <CarouselCus items={items} animatedClass='animated rollIn' />
      <div className='container mt-4'>
        <div className='parent'>
          <div className='search-bar'>
            <SearchBar />
          </div>
          <div className='products-section ml-3 mt-2'>
            <SortTopBar />
            <ProductsList />
          </div>
        </div>
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