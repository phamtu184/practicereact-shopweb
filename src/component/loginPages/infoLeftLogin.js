import React from 'react';
import { Button } from '@material-ui/core';

export default function Leftinfologin(props) {
  return(
    <div
      type="fadeInLeft"
      delay=".3s"
      className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
    >
      <h1 className="h1-responsive font-weight-bold">
        Sign up right now!
      </h1>
      <hr className="hr-light" />
      <h6 className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Rem repellendus quasi fuga nesciunt dolorum nulla magnam
        veniam sapiente, fugiat! Commodi sequi non animi ea dolor
        molestiae, quisquam iste, maiores. Nulla.
      </h6>
      <Button>
        Learn More
      </Button>
    </div>
  )
}