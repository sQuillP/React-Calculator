import React from 'react';

import '../CSS/Screen.css';


const Screen = ({currentValue})=>{

    return (
        <div className ='screenDisplay'>
            {currentValue}
        </div>
    );
}

export default Screen;