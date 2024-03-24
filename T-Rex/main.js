var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// 캔버스 컨텍스트를 가져옵니다. 이것은 실제로 그림을 그리고 다른 그래픽 
//작업을 수행하는 데 사용되는 객체입니다. 
//'2d'를 인수로 전달하면 2D 그래픽을 위한 컨텍스트가 반환됩니다.


//window.innerWidth 현재 브라우저 창에서 -100을 해줌
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

//네모 그릴거야
//ctx.fillStyle = "green";
//10,10 좌표에 100,100 사이즈의 네모를 그린다
//ctx.fillRect(10,10, 100,100);

//좌표와 사이즈를 미리 오프젝트로 정의
//함수로 저장해두면 그리기 쉬워짐

var img1 = new Image();
img1.src = 'cat.jpg';

//공룡 object
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    
    draw(){
        ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);
    }
}


var img2 = new Image();
img2.src = 'food.jpg';

//dino.draw();

//장애물 클래스 종류가 많아서 클래스로 만들어두는 게 효과적
class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);
    }

}

//var cactus = new Cactus();
//cactus.draw();

var timer = 0;
var cactus여러개 = [];
var jump_timer = 0;

var animation;

//애니메이션적용
//1초에 60(모니터 fps에따라다른)번 코드 실행할것 이런건 생코드고 라이브러리 사용하는 게 좋다.
function 프레임마다실행할것(){
    animation = requestAnimationFrame(프레임마다실행할것);
    timer++;

    //캔버스 지우기
    ctx.clearRect(0,0 ,canvas.width, canvas.height);

    
    //2초에 한번 그려줌
    if(timer % 200 === 0){
        var cactus = new Cactus();
        cactus여러개.push(cactus);
    }

    cactus여러개.forEach((a, i, o)=>{
    // x좌표가 0미만이면 제거
    if (a.x < 0){
        o.splice(i, 1)
    }
        a.x--;

        //충돌체크후 게임중단
        iscollision(dino,a);

        a.draw();
    })
    // cactus.draw();

    //dino.x++; 공룡이동은지움


    if (jumpimg_switch == true){
        //공룡 점프 속도
        //dino.y--;
        dino.y-=1;
        jump_timer++;
    }
    if (jumpimg_switch == false){
        if (dino.y < 200){
           dino.y++; 
        }
    }
    if(jump_timer > 100){
        jumpimg_switch = false;
        jump_timer = 0;
    }

    dino.draw();
    
}

프레임마다실행할것();

// 충돌확인
function iscollision(dino, cactus){
    var x축차이 = cactus.x - (dino.x + dino.width);
    var y축차이 = cactus.y - (dino.y + dino.height);
    if (x축차이 < 0 && y축차이 < 0){
        ctx.clearRect(0,0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}



var jumpimg_switch = false;

//이벤트리스너 스페이스바 누르면 실행됨
document.addEventListener('keydown', function(e){
    if (e.code === 'Space'){
        jumpimg_switch = true;
    }
});