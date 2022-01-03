import React, {useState} from 'react';

import '../CSS/Switch.css';


const Switch = ({getCurrentState, isBigNumMode, updateBigNumMode})=>{
    
    return (
        <div className ={'switch '+  (isBigNumMode?"switch-on":"")} onClick = {()=>{updateBigNumMode(!isBigNumMode)}}>
            <div className = {'slider '+  (isBigNumMode?"slider-on":"")} ></div>
        </div>
    );
}


export default Switch;