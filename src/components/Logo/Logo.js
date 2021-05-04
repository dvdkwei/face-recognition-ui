import React from "react";
import Tilt from "react-tilt/dist/tilt";
import orca from './orca.png';
import './Logo.css';

import 'tachyons';

const Logo = () => {
    return(
      <div className='ma4 mt0'>
          <Tilt className="Tilt br2 shadow-2 center" options={{ max : 65 }} style={{ height: 150, width: 150 }} >
              <div className="Tilt-inner pa3">
                  <img style={{paddingTop: '5px', height: 100, width: 100}} src={orca} alt='orca-logo'/>
              </div>
          </Tilt>
      </div>
    );
}

export default Logo;