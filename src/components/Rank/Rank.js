import React from "react";

const  Rank = ({entry}) => {
    return(
        <div>
            <div className='black f3'>
                {'Your current entries are:'}
            </div>
            <div className='black f1'>
                {'#'+ entry}
            </div>
        </div>
    )
}

export default Rank;