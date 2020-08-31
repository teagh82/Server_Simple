// 자바 스크립트에서 함수 : 처리해야할 일에 대한 정보 담고 있는 statement이자 값
// => 함수도 배열과 객체에 담을 수 있다

var f = function(){
    console.log(1+1);
    console.log(1+2);
}
console.log(f);
f();

var a = [f];
a[0]();

var o = {
    func : f
}
o.func();
