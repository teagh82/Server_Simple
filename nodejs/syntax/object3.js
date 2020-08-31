// 연관된 데이터(변수, 함수(처리방법) ...) 묶어서 객체로 
// 코드의 복잡성 낮추는 방법
var o = {
    v1:'v1',
    v2:'v2',
    f1:function (){
        console.log(this.v1);
    },
    f2:function (){
        console.log(this.v2);
    }
}

o.f1();
o.f2();