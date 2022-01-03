import React from 'react';
import '../CSS/Button.css';



const Button = ({value,getButtonValue, isBigNumMode})=>{

    
    const setBackground = ()=>
    {
        if(/[0-9.]|\(-\)/gi.test(value))
            return "#333333";

        if(/[\+\-\x÷\=]/gi.test(value))
            return "#fb4f14";
        return "lightgray";
    }

    const setOpacity = ()=> isBigNumMode && /sin|cos|tan|\./gi.test(value)?'0.2':'1';

    const setText = ()=> 
    {
        const currentColor = setBackground(value);
        if(currentColor === "#333333")
            return "white";
    }


    const handleClick = ()=>
    {
        if(isBigNumMode && !/[0-9+\-÷=()\^x]|clear|delete/gi.test(value))
            return;
        getButtonValue(value);
    }

    const styles = 
    {
        background: setBackground(),
        color: setText(),
        opacity: setOpacity()
    };


    return (
        <div className ='button' 
            style={styles}
            onClick = {()=>handleClick()}
        >
            {value}
        </div>
    );
}


export default Button;