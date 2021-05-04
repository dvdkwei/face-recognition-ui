import React from 'react';

import 'tachyons';

const Navigation = () => {
    return(
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p className='f3 link dim black underline pa2 pointer'>sign out</p>
      </nav>
    );
}

export default Navigation;