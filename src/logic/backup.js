



/*
    evaluate an expression and return the result

*/


class Stack
{
    constructor()
    {
        this.items = [];
    }

    push(data)
    {
        this.items.push(data);
    }

    pop()
    {
        if(this.isEmpty())
            return null;
        return this.items.pop();
    }

    peek()
    {
        if(this.items.length === 0)
            return null;
        return this.items[this.items.length-1];
    }

    isEmpty()
    {
        return this.items.length === 0;
    }

};



/*Add two strings together*/
function add(num1, num2)
{
    let result = "", idx1 = num1.length-1, idx2 = num2.length-1;
    let carry = false, isNegativeResult = false;

    if(num1[0] === '-' && num2[0] === '-')
    {
        isNegativeResult = true;
        num1 = num1.substring(1);
        num2 = num2.substring(1);
        idx1--;
        idx2--;
    }
    else if(num1[0] === '-' )
        return subtract(num2,num1.substring(1));
    else if(num2[0] === '-')
        return subtract(num1,num2.substring(1));
    while(idx1>=0 && idx2 >=0)
    {
        let sum = Number(num1[idx1--]) + Number(num2[idx2--]) + (carry?1:0);

        if(sum>9)
            carry = true;
        else
            carry = false;

        result = sum%10+""+result;
    }

    let finalIdx = -1, numSegment = "";
    if(idx1>=0)
    {
        numSegment = num1;
        finalIdx = idx1;
    }
    else if(idx2>=0)
    {
        numSegment = num2;
        finalIdx = idx2;
    }

    while(finalIdx>=0)
    {
        let sum = Number(numSegment[finalIdx--])+(carry?1:0);
        if(sum>9)
            carry = true;
        else
            carry = false;
        result = sum%10+""+result;
    }

    if(carry)
        result = '1'+result;
    if(isNegativeResult)
        return '-'+result;
    return result;
}


//many fixes must be made to this program.
/*Return true if num2 is less than num1*/
function lessThan(num1,num2)
{
    let isNegative = false;
    if(num1[0] === '-' && num2[0] === '-')
    {
        if(num1.length<num2.length)
            return false;
        else if(num1.length>num2.length)
            return true;
    }
    else if(num1[0] === '-' )
        return true;
    else if(num2[0] === '-')
        return false;
    else if(num1.length<num2.length)
        return true;
    else if(num1.length > num2.length)
        return false;
    if(num1[0] === '-')
        isNegative = true;

    for(let i = 0; i<num1.length; i++)
    {
        if(Number(num1[i]) < Number(num2[i]) && !isNegative)
            return true;
        else if(Number(num1[i]) < Number(num2[i]) && isNegative)
            return false;
        else if(Number(num1[i]) > Number(num2[i]) && isNegative)
            return true;
        else if(Number(num1[i]) > Number(num2[i]) && !isNegative)
            return false;
    }
    return false;
}

function trimZeroes(num)
{
    let trimZeroes = 0
    while(trimZeroes < num.length && num !== '0' && num[trimZeroes++] === '0');
        trimZeroes--;
    return num.substring(trimZeroes);
}


/*subtract two string values and return the difference*/
function subtract(num1, num2)
{
    let ans = "";
    let bigStr = '', littleStr = '';
    if(num1[0] === '-' && num2[0] === '-')
    {
        let temp = num1;
        num1 = num2.substring(1);
        num2 = temp.substring(1);
    }
    if(num1[0] === '-')
        return add(num1,'-'+num2);
    if(num2[0] ==='-')
        return add(num1,num2.substring(1));

    if(lessThan(num1,num2))
    {
        bigStr = num2;
        littleStr = num1;
    }
    else
    {
        bigStr = num1;
        littleStr = num2;
    }

    let idx1 = bigStr.length-1, idx2 = littleStr.length-1;

    bigStr = bigStr.split('');
    littleStr = littleStr.split('');

    while( idx1>=0 && idx2 >= 0 )
    {
        let borrow = false;
        if( Number(bigStr[idx1]) < Number(littleStr[idx2]) )
        {
            borrow = true;

            let tempIdx1 = idx1-1;

            while(tempIdx1 >= 0 && bigStr[tempIdx1] === '0') // look for a non-zero integer to borrow from in bigStr
                tempIdx1--;

            bigStr[tempIdx1] = String(bigStr[tempIdx1] - '1') // borrow 1 from that integer
            tempIdx1++; //increment the index

            while(tempIdx1 < bigStr.length && bigStr[tempIdx1] === '0' && tempIdx1 !== idx1)//set all adjacent zeroes to 9
                bigStr[tempIdx1++] = '9';
        }

        ans = String( Number(bigStr[idx1--])+(borrow?10:0) - Number(littleStr[idx2--]))+ans; //perform the subtraction of the two strings

        borrow = false;
    }
    while(idx1>=0 && bigStr[idx1] !== 0)
        ans = bigStr[idx1--] + ans;
    
    ans = trimZeroes(ans);

    if(lessThan(num1,num2))
        return '-'+ans;

    return ans;
}



/*Multiply two string values together and return the result as a string*/
function multiply(num1, num2)
{
    let result = "0", carry = 0, multipliedNumber = '';
    let negativeResult = false;
    if(num1[0] === '-' && num2[0] === '-')
    {
        num1 = num1.substring(1);
        num2 = num2.substring(1);
    }
    else if(num1[0] === '-')
    {
        num1 = num1.substring(1);
        negativeResult = true;
    }
    else if(num2[0] === '-')
    {
        num2 = num2.substring(1);
        negativeResult = true;
    }
    for(let i = num1.length-1; i >= 0; i--)
    {
        multipliedNumber = '0'.repeat(num1.length-1-i);

        for(let j = num2.length-1; j >= 0; j--)
        {
            let multipliedResult = String( Number(num2[j]) * Number(num1[i])+Number(carry));
            if(multipliedResult.length > 1)
                carry = multipliedResult[0];
            else
                carry = '0';
            
            multipliedNumber = multipliedResult[multipliedResult.length-1] + multipliedNumber;
        }
        if(carry !== '0')
            multipliedNumber = carry + multipliedNumber;
        
        carry = '0';
        result = add(multipliedNumber,result);
    }

    return (negativeResult?'-':'')+result;
}



/*Perform integer division on two strings. The order of execution goes as num1/num2*/
function divide(num1,num2)
{
    let answer = '';
    if(num2 === '0')
        return 'INDETERMINANT';
    else if(num1 === '0' || lessThan(num1.replace('-',''),num2.replace('-','')))
        return '0';
    else
    {
        let negativeResult = false;
        if(num1[0] === '-' && num2[0] === '-')
        {
            num1 = num1.substring(1);
            num2 = num2.substring(1);
        }
        else if(num1[0] === '-')
        {
            negativeResult = true;
            num1 = num1.substring(1);
        }
        else if(num2[0] === '-')
        {
            negativeResult = true;
            num2 = num2.substring(1);
        }
        // num1 / num2
        let numeratorSubstring = num1.substring(0,num2.length), idx = num2.length-1;

        if(lessThan(numeratorSubstring,num2))
        {
            numeratorSubstring = num1.substring(0,num2.length+1);
            idx++;
        }
        let accumulatedSum = '0';
        
        while(idx < num1.length)
        {
            let dividedResult = 0;

            while(lessThan(accumulatedSum,numeratorSubstring))
            {
                accumulatedSum = add(num2,accumulatedSum);
                dividedResult++;
            }

            if(accumulatedSum !== numeratorSubstring)
            {
                dividedResult--;
                accumulatedSum = subtract(accumulatedSum, num2);
            }
            
            answer += String(dividedResult);
            numeratorSubstring = subtract(numeratorSubstring, accumulatedSum);
            accumulatedSum = '0';

            numeratorSubstring += num1[++idx];

            while(idx+1<num1.length && lessThan(numeratorSubstring,num2))
                numeratorSubstring += num1[++idx];

            numeratorSubstring = trimZeroes(numeratorSubstring);
        }
        return (negativeResult?'-':'') + answer;
    }
}

function power(x,n)
{
    let result = x;
    if(n === '0')
        return '1';
    n--;
    while(n--)
        result = multiply(result, x);
    return result;
}

function performOperation(num1, operator, num2,isBigNumMode)
{
    if(operator === '+')
        return isBigNumMode? add(num1,num2) : Number(num1)+Number(num2)+'';
    else if(operator === '-')
        return isBigNumMode?subtract(num1,num2): Number(num1)+Number(num2)+'';
    else if(operator === 'x')
        return isBigNumMode?multiply(num1,num2):Number(num1)*Number(num2)+'';
    else if(operator === '^')
        return isBigNumMode? power(num1,num2): Number(num1)**Number(num2)+'';

    return isBigNumMode?divide(num1,num2): Number(num1)/Number(num2);
}


function hasPrecedence(op1, op2)
{
    if(op2 === ')' || op2 === '(')
        return false;

    if( op1 ==='^' || ((op1 === 'x' || op1 ==='÷')&&(op2 === '+'||op2==='-')) )
        return false;

    return true;
}





/* PEMDAS */
export default function parseEquation(equation,isBigNumMode)
{
    let syntaxError = "syntax error";
    let operationsStack = new Stack();
    let valuesStack = new Stack();
    equation = equation.match(/^-\d+|(?<=[+\-x\^÷(])-\d+|[\-+x÷^()]|\d+/gi);
    console.log(equation);
    while(equation.length !== 0)
    {
        let token = equation.shift();
        if(/-\d+|\d+/gi.test(token))
            valuesStack.push(token);
        else if(token === '(')
            operationsStack.push(token);
        else if(token === ')')
        {
           while(operationsStack.peek() !== '(')
           {
               let num2 = valuesStack.pop(), num1 = valuesStack.pop();
               if(num1 === null || num2 === null)
                    return syntaxError;
               valuesStack.push(performOperation(num1,operationsStack.pop(),num2,isBigNumMode));
           }
           operationsStack.pop();
        }
        else if(token === '-'||token ==='+'||token ==='x' || token ==='÷'||token ==='^')
        {
            while(!operationsStack.isEmpty() && hasPrecedence(token, operationsStack.peek()))
            {
                let num2 = valuesStack.pop(), num1 = valuesStack.pop();
                if(num1 === null || num2 === null)
                    return syntaxError;
                valuesStack.push(performOperation(num1,operationsStack.pop(), num2,isBigNumMode));
            }
            operationsStack.push(token);
        }
        else
            return syntaxError;
    }
    while(!operationsStack.isEmpty())
    {
        let num2 = valuesStack.pop(), num1 = valuesStack.pop();
        if(num1 === null || num2 === null)
            return syntaxError;
        valuesStack.push(performOperation(num1,operationsStack.pop(),num2,isBigNumMode));
    }
    let answer = valuesStack.pop();
    if(!valuesStack.isEmpty() || !operationsStack.isEmpty())
        return syntaxError;
    return answer;
}



// export default {add, subtract, multiply, divide};

/**/