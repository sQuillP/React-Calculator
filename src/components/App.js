import React, {useState, useEffect} from 'react';
import Screen from './Screen';
import Button from './Button';
import Switch from './Switch';
import About from './About';

import ParseString from '../logic/Evaluate';
import '../CSS/App.css'


const keyPad = 
[
    ['^','(',')','del'],
    ['sin','cos','tan','clear'],
    ['1','2','3','÷'],
    ['4','5','6','x'],
    ['7','8','9','-'],
    ['0','.','=','+']
];


const App = ()=>{

    const [currentValue, updateCurrentValue] = useState("0");
    const [isBigNumMode,updateBigNumMode] = useState(false);


    const renderKeyRow = (row)=>
    {
        return keyPad[row].map((x,i)=>{
            return <Button key = {i} value ={x} getButtonValue = {getButtonValue} isBigNumMode = {isBigNumMode} />;
        });
    }


    useEffect(()=>{
        updateCurrentValue('0');
    },[isBigNumMode]);


    const getButtonValue = (value)=>{

        if(isBigNumMode && /sin|cos|tan|\./gi.test(value))
            return;
        let tempValue = currentValue;
        if(tempValue === '0'&&/[1-9(]|sin|cos|tan/gi.test(value))
            tempValue = "";
        if(value === 'clear')
            updateCurrentValue("0");
        else if(value === 'del')
        {
            if(tempValue.length === 1 || tempValue ==='syntax error')
                updateCurrentValue('0');
            else
                updateCurrentValue(currentValue.substring(0,currentValue.length-1));
        }
        else if(value === '0' && tempValue === '0')
            return;
        else if(value === "=")
        {
            let result = ParseString(currentValue,isBigNumMode);
            updateCurrentValue(result);
        }
        else
            updateCurrentValue(tempValue + value);
    }


    const renderKeyPad = ()=>
    {
        let rows = []
        for(let i = 0; i<6; i++)
            rows.push(<div className ='keyRow' key ={i}> {renderKeyRow(i)} </div>);

        return rows;
    }


    return(
        <div className ='appContainer'>
            <div className ='app-title'>
                <h1>Calculator!</h1>
            </div>
            <div className ='calculatorBody'>
                <Screen currentValue = {currentValue}/>
                <div className ='bigNumMode-container'>
                    <Switch updateBigNumMode={updateBigNumMode} isBigNumMode = {isBigNumMode}/>
                    <p>BigNum Mode</p>
                </div>
                <div className ='keyPad'>
                    {renderKeyPad()}
                </div>
                <About/>
            </div>
        </div>
    );
}


export default App;