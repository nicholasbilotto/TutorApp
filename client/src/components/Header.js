import React from 'react';
import { Link } from 'react-router-dom';
import headerImage from '../images/butterflylong.png';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          <img className="ui image small" src={headerImage} alt="Site Header" />
        </Link>
      <div className="right menu">
        <div className="item">
          <div>
            <Link to="/admin" class="ui primary button" tabindex="0">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;