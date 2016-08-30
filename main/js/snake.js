function $(id){
    return document.getElementById(id);
};
// 1获取canvas  对象
var canvas = $("canvas");
var bgid = $("bgid");
var eat = $("eat");
var over = $("over");
var score = $("score");
score.innerText = "0";
//  2获取绘画环境   上下文
var ctx = canvas.getContext("2d");
var s = 600;
// 蛇的长度
var  snakeCount = 6;
// 定义蛇
var snake = [];
// 定义食物的坐标
var fooX = 0;
var fooY = 0;
var  toGo = 3;
// 绘画方法
function draw(){
    // 绘画网格
    // 编译网格定义  x  y  坐标
    for (var i=0; i < s ; i+=40)  {
        ctx.beginPath();
        ctx.moveTo(0,i+40);
        ctx.lineTo(s,i+40);
        ctx.moveTo(i+40,0);
        ctx.lineTo(i+40,s);
        ctx.stroke();
    }
    // 画蛇身
    for (var i =0; i<snakeCount ;i++ ){
        ctx.beginPath();
        ctx.strokeStyle = "#4a4a4a";
        ctx.fillRect(snake[i].x,snake[i].y,40,40);
        ctx.moveTo(snake[i].x,snake[i].y);  // 0 0
        ctx.lineTo(snake[i].x+40,snake[i].y); // 40 0
        ctx.lineTo(snake[i].x+40,snake[i].y+40);// 40 40
        ctx.lineTo(snake[i].x,snake[i].y+40);// 0 40
        ctx.closePath();
        ctx.stroke();
    }
    ctx.fillRect(foodX,foodY,40,40);
};
// 定义蛇的坐标
function start(){
    for (var i = 0; i<snakeCount ; i++ ){
        snake[i] = {x:i*40,y:0};
    }
    addFood();
    draw();
};
// 添加食物
function addFood(){
    foodX = Math.floor(Math.random()*15)*40;
    foodY = Math.floor(Math.random()*15)*40;
};

// snake 的移动
function move(){
    switch (toGo){
        case 1:
                snake.push({x:snake[snakeCount-1].x-40,y:snake[snakeCount-1].y});
                break;
        case 2:
                snake.push({x:snake[snakeCount-1].x,y:snake[snakeCount-1].y-40});
                break;
        case 3:
                snake.push({x:snake[snakeCount-1].x+40,y:snake[snakeCount-1].y});
                break;
        case 4:
                snake.push({x:snake[snakeCount-1].x,y:snake[snakeCount-1].y+40});
                break;

    }
    snake.shift();
    ctx.clearRect(0,0,600,600);
    isEat();
    isDead();
    draw();
};
// 吃食物的时候
function isEat(){
    if (snake[snakeCount-1].x==foodX &&snake[snakeCount-1].y==foodY){
        addFood();
        snakeCount++;
        //向数组添加一个元素  并返回新的数组长度
        snake.unshift({x:-40,y:-40});
        score.innerText = parseInt(score.innerText)+50;
        eat.play();
    }
};
// 定义游戏规则
function isDead(){
    // 边界上下左右
    if (
        snake[snakeCount-1].x>560||
        snake[snakeCount-1].y>560||
        snake[snakeCount-1].x<0||
        snake[snakeCount-1].y<0
    )
    {
        over.play();
        bgid .pause();  // 暂停背景音乐
        alert("Ide老师太帅了，想不开");
        window.location.reload();
    }
    //自身判断
    for (var i=0;i<snakeCount-1 ; i++ ){
        if (
            snake[snakeCount-1].x == snake[i].x &&
            snake[snakeCount-1].y == snake[i].y
        )
        {
            over.play();
            bgid .pause();  // 暂停背景音乐
            alert("何必为难自己！");
            window.location.reload();
        }
    }
};
// 键盘获取键盘触发判断
function  keyDown(e){
    switch (e.keyCode){
        case 37:
                toGo = 1;
                break;
        case 38:
                toGo = 2;
                break;
        case 39:
                toGo = 3;
                break;
        case 40:
                toGo = 4;
                break;
        }
};
//开始游戏
function btnstart(){
    bgid.play();
    setInterval(move,150);
    document.onkeydown = function(e){
        var  e =  e||  window.event;
        keyDown(e);
    };
}
// 重新开始
function repaly(){
    window.location.reload();
};
//  加载 完成后  执行
window.onload= function(){
    start();
}
