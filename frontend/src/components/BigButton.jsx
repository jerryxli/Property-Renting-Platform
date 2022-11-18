import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const BigButton = (props) => {
  const styleObj = {
    fontSize: '14pt',
    position: 'absolute',
    top: '10px',
    right: '10px'
  };

  return (
    <Button sx={styleObj} onClick={props.onClick} variant="outlined">
      {props.children}
    </Button>
  );
};

BigButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string
}

export default BigButton;
