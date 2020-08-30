//내장함수 Math 이용
console.log(Math.round(1.7));   //반올림 해서 2
console.log(Math.round(1.4));   //반올림 해서 1

function sum(first, second){    //매개변수 parameter
    console.log(first);
    console.log(second);
    return first + second;
}

console.log(sum(2, 4));  //각각의 변수 argument