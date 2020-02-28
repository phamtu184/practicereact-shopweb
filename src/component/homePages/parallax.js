import React from 'react';

export default function Parallax(props) {
  const setting = {
    background: `url(${props.urlimg})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    height:  props.height || '500px',
    width: '100%',
  }
  return(
    <div style={setting}>
      {props.children || null}
    </div>
  )
}