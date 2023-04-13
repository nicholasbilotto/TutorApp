import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          <img className="ui image small" src={'https://mulhollandprep.com/wp-content/uploads/2021/12/mulhollandprep_fullcolor_stacked-icon-size.png'} />
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