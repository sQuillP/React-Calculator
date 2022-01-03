import React,{useState} from 'react';

import '../CSS/About.css';

const About = ()=>
{

    const [showContent, updateShowContent] = useState(false);

     
    const displayShowContent = ()=>
    {
        if(!showContent)
            return <p onClick ={()=>updateShowContent(!showContent)} style={{color: 'red'}}><i class="far fa-question-circle"></i></p>;
        return (
            <div className ='popupContent-container'>
                <div className='close-popup-container' onClick ={()=>updateShowContent(!showContent)}>
                    <i class="far fa-times-circle"></i>
                </div>
                <div className ='popup-title-container'>
                    <h2 className ='popup-title'>About</h2>
                </div>
                <div className='popupQuestion'>
                    <h3>Trig function evaluation</h3>
                    <ul>
                        <li><p>Trig functions cannot contain expressions, only rational number values</p></li>
                        <li><p>The result of passing an expression to a trig function, the result will be a syntax error</p></li>
                    </ul>
                </div>
                <div className='popupQuestion'>
                    <h3>When bigNumMode is off...</h3>
                    <ul>
                        <li><p>input values are limited, resulting calculations are truncated if they are too large</p></li>
                        <li><p>If the input value is too large, Infinity will be the resulting value</p></li>
                    </ul>
                </div>
                <div className='popupQuestion'>
                    <h3>When bigNumMode is on...</h3>
                    <ul>
                        <li><p>Inputs and outputs will be limited to integers only. Trig functions are also disabled</p></li>
                        <li><p>Any division result will have the floor() function applied to maintain integer input/output</p></li>
                        <li><p>Resulting calcuations can have hundreds of digits</p></li>
                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className ='info-container'>
            {displayShowContent()}
        </div>
    );
}


export default About;