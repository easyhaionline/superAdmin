import React from 'react';
import { Link } from 'react-router-dom';

function Errorpage() {
  return (
    <>
      <div
        className="errropage"
        style={{ width: '40%', margin: 'auto', marginTop: '10%' }}
      >
        <img
          src="https://cdn.svgator.com/images/2022/01/404-page-animation-example.gif"
          alt=""
        />
        <Link to="/">
          <button
            style={{
              marginLeft: '40%',
              marginTop: '30px',
              padding: '10px',
              backgroundColor: 'rgb(253,200,64)',
              color: 'rgb(26,124,195)',

              fontWeight: 'bold',
              border: 'none',
            }}
          >
            Redirected to Home
          </button>
        </Link>
      </div>
    </>
  );
}

export default Errorpage;
