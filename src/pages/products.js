import React, { Component } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import axios from 'axios';
import {CartContext} from '../context/cart'

class Products extends Component{
  constructor(props){
    super(props);
    this.state= {
      products:[]
    };
  }
  componentDidMount(){
    axios.get('http://localhost:4000/products')
    .then(response => {
      this.setState({
        products: response.data
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  }
  render(){
    const {products} = this.state;
    return(
      <MDBContainer>
        <h2>Products</h2>
        <MDBRow>
          {products.map((product, index)=>(
            <MDBCol md='4' key={index}>
              <MDBCard style={{ width: "300px", height:"400px"}} className="mt-4">
                <MDBCardImage className="img-fluid" src={product.img} waves />
                <MDBCardBody>
                  <MDBCardTitle>{product.name}</MDBCardTitle>
                  <MDBCardText>{product.desc}</MDBCardText>
                  <CartContext.Consumer>
                    {({addToCart}) => (
                      <MDBBtn onClick={() => addToCart(product)}>Add to card</MDBBtn>
                    )}
                  </CartContext.Consumer>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    )
  }
  // render(){
  //   return(
  //     <h1>Products</h1>
  //   )
  // }
}

export default Products;