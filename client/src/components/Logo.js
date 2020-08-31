import React from 'react';

function Logo(props) {
  return (
    <img
      alt="Logo"
      src="/static/logo.jpg"
      {...props}
      style={{width:100, height:50}}
    />
  );
}

export default Logo;
