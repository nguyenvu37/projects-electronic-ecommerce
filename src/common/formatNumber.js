export const formatNumberUSD = (num) => {
    let arrNum = (Math.round(num*100)/100).toString().split('');
    let indexCharDot = arrNum.findIndex(item => item === '.');
    let arrCharBefore = arrNum.slice(0, indexCharDot).reverse();
    let arrCharAfter = arrNum.slice(indexCharDot, arrNum.length).join('');
    let arrCharResult = [];
    
    let arrCharBefore_1 = [];
    let arrCharBefore_3 = [];
  
    for (let i = 0; i <arrCharBefore.length; i++) {
      arrCharBefore_1.unshift(arrCharBefore.splice(0,3).join(''));
    }
    let arrCharBefore_2 = arrCharBefore.reverse().join('')
    if(arrCharBefore_2.length === 0) {
      arrCharBefore_3.push(arrCharBefore_2)
    } else {
      arrCharBefore_3.push(arrCharBefore_2)
      arrCharBefore_3.push(',')
    }
  
    for(let i=0; i<arrCharBefore_1.length; i++) {
      arrCharBefore_3.push(arrCharBefore_1[i].split('').reverse().join(''))
      arrCharBefore_3.push(',')
    }
    for(let i=0;i<arrCharBefore_3.length-1;i++) {
      arrCharResult.push(arrCharBefore_3[i])
    }
    return  arrCharResult.join('') + arrCharAfter
};
