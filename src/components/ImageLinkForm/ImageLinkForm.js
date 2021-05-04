import React from "react";
import 'tachyons';

import './ImageLinkForm.css';

const ImageLinkForm = () => {
    return(
        <div>
            <p className='f3'>
                {'Orca wants to detect faces in your pictures. Give it a chance.'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex'/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue'>
                        detect.
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;