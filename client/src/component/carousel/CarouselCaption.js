import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { mapToCssModules } from './utils';
import { Button } from '@material-ui/core';

const CarouselCaption = (props) => {
  const { captionHeader3, captionHeader1, captionText, cssModule, className, captionButton } = props;
  const classes = mapToCssModules(classNames(
    className,
    'carousel-caption',
    'd-none',
    'd-md-block'
  ), cssModule);
  return (
    <div className={classes}>
      <h3>{captionHeader3}</h3>
      <h1>{captionHeader1}</h1>
      <p>{captionText}</p>
      <Button>{captionButton}</Button>
    </div>
  );
};

CarouselCaption.propTypes = {
  captionHeader: PropTypes.node,
  captionText: PropTypes.node.isRequired,
  cssModule: PropTypes.object,
  className: PropTypes.string,
};

export default CarouselCaption;
