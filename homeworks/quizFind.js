
//Another way using findIndex:
// const array1 = [5, 12, 8, 130, 44];
// const number = 6;
// const quizFind = (element) => element === (parseInt(number));
// console.log(array1.findIndex(quizFind));

//part1 
// this was working the other day but I don't what I did that caused it to not work later
function quizFind(element, num){
    for(let i=0; i<element.length; i++){
     if (element[i] === (parseInt(num))){
           return i;
       } else {
       return -1;
        };
    };   
}
console.log(quizFind([3,4,7],7));
console.log(quizFind([1,1,0,3,5],6));
console.log(quizFind([1,1,0,3,5],6));


//part2
function quizLotto(){
    let arrayLotto=[];
    let randomNum = 0;
    maxRegCount=5
    while (arrayLotto.length<maxRegCount){
        randomNum=(Math.floor((Math.random() * 59) + 1));
        if(arrayLotto.indexOf(randomNum) == -1){ 
        arrayLotto.push(randomNum);
        console.log(`Regular umber: ${randomNum}`);
        };
    };
    arrayLotto.sort(function(a,b){
        return a-b;
    });
    for(let i=0; i<1; i++){
        bonus=(Math.floor((Math.random() * 35) + 1));
        console.log(`Bonus number: ${bonus}`);
        arrayLotto.push(bonus);  
    };
    console.log(arrayLotto);
    return arrayLotto; 
}
quizLotto();








