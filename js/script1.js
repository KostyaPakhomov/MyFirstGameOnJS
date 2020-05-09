var cvs = document.getElementById("canvas");
var  ctx = cvs.getContext("2d");

//изображения
var asteroid = new Image();
asteroid.src = "img/comet3.png";

var falcon = new Image();
falcon.src = "img/falcon1.png";

var bg = new Image();
bg.src = "img/background20.jpg";

var bullet = new Image();
bullet.src = "img/bullet.png";

var empShip = new Image();
empShip.src = "img/empShip.png";

var empBullet = new Image();
empBullet.src = "img/empBullet1.png";

var bangimg = new Image();
bangimg.src = "img/bang1.png";

var bangimg1000 = new Image();
bangimg1000.src = "img/bang1000sok.png";

var gameoverimg = new Image();
gameoverimg.src = "img/gameover.jpg";

var main = new Image();
main.src = "img/mainimg1.jpg";

var logo = new Image();
logo.src = "img/war1.png";

var yoda = new Image();
yoda.src = "img/yoda3.png";

var yodaBonus = new Image();
yodaBonus.src = "img/yodaBonus1.png";

var asteroidPos = [];
var bull = [];
var emp = [];
var empBull = [];
var bang = [];
var bang1000 = [];
var bonus = [];
var ship = {x:20,y:200};
var timer = 0;
var shipDel = 0;
var starting=0;
var reloading = 0;
var startss = 0;
var score = 0;

//звуковые файлы
var bull1 = new Audio();
var bull2 = new Audio();
var fongame = new Audio();
var fonstart = new Audio();
var fonend = new Audio();
var bangbang = new Audio();
var bangme = new Audio();

bull1.src = "audio/bull1.mp3";
bull2.src = "audio/bull3.mp3";
bangbang.src = "audio/bangbang.mp3";
bangme.src = "audio/bangme1.mp3";
fonend.src = "audio/fonend.mp3";
fongame.src = "audio/marsh.mp3";
fonstart.src = "audio/light.mp3";

//движение нашего корабля мышью
function moving(event){
    ship.x = event.offsetX-falcon.width/2 ;
    ship.y = event.offsetY-falcon.height/2 ;
};
var cvx = (window.innerWidth - cvs.width) * 0.5;
var cvy = (window.innerHeight - cvs.height) * 0.7;
var mouseIsDown = false;
// Функции обработчиков тач-событий (тач-управление)
function touchStartHandler(event) {
    if (event.touches.length == 1) {
        event.preventDefault();

        ship.x = event.touches[0].pageX - cvx;
        ship.y = event.touches[0].pageY - cvy - falcon.height/2;

        mouseIsDown = true;
    };
};

function touchMoveHandler(event) {
    if (event.touches.length == 1) {

        ship.x = event.touches[0].pageX - cvx;
        ship.y = event.touches[0].pageY - cvy- falcon.height/2;
    };
};

function touchEndHandler(event) {
    mouseIsDown = false;
};

//прячем кнопку 'назад в меню'
function startall() {
    document.getElementById('return').style.visibility ='hidden';
    startss = 1;
    fonstart.play();
};
//кнопка 'press here to start'
function startgame(event){
    document.getElementById('begin').x=event;
    document.getElementById('begin').y=event;
    starting=1;
    fonstart.pause();


};
//кнопка 'return to main menu'
function reloadgame(event){
    document.getElementById('reload').x=event;
    document.getElementById('reload').y=event;
    reloading=1;
};
//правила игры
function rule(){
    ctx.fillStyle = "#F5F5F5";
    ctx.font = "30px Arial Black";
    ctx.shadowColor = "#000000";
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 3;
    wrapText(ctx, text, marginLeft, marginTop, maxWidth, lineHeight);
    document.getElementById('return').style.visibility ='visible';
    document.getElementById('text').style.display ='none';
};
//рекорды
function record(){
    document.getElementById('return').style.visibility ='visible';
    document.getElementById('text').style.display ='none';
    refreshRecords();
    tableHighscores.style.display = 'flex';
    if(localStorage.gameName !== undefined){
        userName.style.display = 'none';
    };
};
//создатели
function rights(){
    ctx.fillStyle = "#F5F5F5";
    ctx.font = "30px Arial Black";
    ctx.shadowColor = "#000000";
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 3;
    ctx.textAlign = "center";
    ctx.textBaseline = "center";
    ctx.fillText("Пахомов Константин",400,200);
    document.getElementById('return').style.visibility ='visible';
    document.getElementById('text').style.display ='none';
};
//кнопка '<= main menu'
function ret(){
    location.href=location.href;
};
//прорисовка текста
function wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight){
    var words = text.split(" ");
    var countWords = words.length;
    var line = "";
    for (var n = 0; n < countWords; n++) {
        var testLine = line + words[n] + " ";
        var testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth) {
            ctx.fillText(line, marginLeft, marginTop);
            line = words[n] + " ";
            marginTop += lineHeight;
        }
        else {
            line = testLine;
        };
    };
    ctx.fillText(line, marginLeft, marginTop);
};

var maxWidth = 750; //размер поле, где выводится текст
var lineHeight = 30;
/*если мы знаем высоту текста, то мы можем
 предположить, что высота строки должна быть именно такой*/
var marginLeft = 50;
var marginTop = 40;
var text = "Правила игры: набрать как можно больше очков, для этого игроку даётся 3 жизни. За сбитый звездолёт противника - 1 очко, " +
    "астероид - 2 очка. Бонусная иконка Йоды даёт сразу 5 очков. Звездолёт противника уничтожается с 1го " +
    "выстрела, астероид - с 3-х выстрелов. При столкновении со звездолётом, астероидом или выстрелом звездолёта - отнимается 1 жизнь.";



// Ajax таблоица рекордов

var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var records; // элемент массива - {name:'Иванов',mess:'Привет'};
var updatePassword;
var stringName='Pakhomov_tableRecords';

// показывает все сообщения из records на страницу
function showRecords() {
    var str='';
    for ( var m=0; m<records.length; m++ ) {
        var record=records[m];
        str+="<span class='clearfix'><b>"+escapeHTML(record.name)+":</b>"
            +"<i>" + escapeHTML(record.score)+"</i></span>";
    };
    document.getElementById('hi').innerHTML=str;
};

//проверка на текст и преобразовывает спец символы в строку
function escapeHTML(text) {
    if ( !text )
        return text;
    text=text.toString()
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#039;");
    return text;
};

// получает сообщения с сервера и потом показывает
function refreshRecords() {
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'READ', n : stringName },
            cache : false,
            success : readReady,
        }
    );
};

function readReady(callresult) { // сообщения получены - показывает
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        records=[];
        if ( callresult.result!="" ) { // либо строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
            records=JSON.parse(callresult.result);
            // вдруг кто-то сохранил мусор вместо LOKTEV_CHAT_MESSAGES?
            if ( !Array.isArray(records) )
                records=[];
        };
        showRecords();
    };
};

// получает сообщения с сервера, добавляет новое,
// показывает и сохраняет на сервере
function sendRecords() {
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript,
            type : 'POST', dataType:'json',
            data : { f : 'LOCKGET', n : stringName,
                p : updatePassword },
            cache : false,
            success : lockGetReady
        }
    );
};

// сообщения получены, добавляет, показывает, сохраняет
function lockGetReady(callresult) {
    if (callresult.error != undefined)
        alert(callresult.error);
    else {
        records = [];
        if (callresult.result != "") { // либо строка пустая - сообщений нет
            // либо в строке - JSON-представление массива сообщений
            records = JSON.parse(callresult.result);
            // вдруг кто-то сохранил мусор?
            if (!Array.isArray(records))
                records = [];
        }
        var playerName = JSON.parse(localStorage.gameName);
        var points = score + '';
        records.push({name: playerName, score: points});
        records.sort(function (a, b) {
            return b.score - a.score
        });
        if (records.length > 5)
            records = records.splice(0, records.length - 1);

        showRecords();

        $.ajax({
                url: ajaxHandlerScript,
                type: 'POST', dataType: 'json',
                data: {
                    f: 'UPDATE', n: stringName,
                    v: JSON.stringify(records), p: updatePassword
                },
                cache: false
            }
        );
    }
};
var tableHighscores = document.getElementById('tableHighscores');
var result = document.getElementById('result');
var inputName = document.getElementById('inputName');
var acceptName = document.getElementById('acceptName');
var name = document.getElementById('name');
var userName = document.getElementById('userName');
var changeName = document.getElementById('changeName');
//отправка рекордов на сервер
if(shipDel == 3 ) {
    result.style.display = 'block';
    result.textContent = 'Your result:  ' +  score + ' points ';
    changeName.style.display = 'none';
    document.getElementById('tableHighscores').style.display='none';
    document.getElementById('acceptName').style.display='inline';
    if(localStorage.gameName !== undefined){
        name.textContent = JSON.parse(localStorage.gameName) + '!';
        userName.style.display = 'flex';
        sendRecords();
        refreshRecords();
    } else {
        inputName.style.display = 'flex';
    };

};

acceptName.addEventListener('click', function(event) {
    var gameName = document.getElementById('gameName');
    if (gameName.value !== '') {
        localStorage.gameName = JSON.stringify(gameName.value);
        gameName.value = '';
        inputName.style.display = 'none';
        sendRecords();
        refreshRecords();
    }
});
//предзагрузка файлов игры
    bangimg1000.onload = function () {
        document.getElementById('return').style.visibility ='hidden';
        game();

    };

function game() {
    update();
    render();
    requestAnimFrame(game);
};
//игровой процесс
function update() {

if (starting == 1) {

    timer++;

//рандом астероидов
    if (timer % 30 == 0) {
        asteroidPos.push({
            x: Math.floor(Math.random() * cvs.width) + cvs.width,
            y: Math.floor(Math.random() * cvs.height),
            dx: Math.random() * 2 + 1,
            dy: Math.random() * 2 - 1,
            del: 0
        });
        //dx,dy - скорость изменения координат по осям
        //del - для удаления астероидов
    };

//рандом противников
    if (timer % 90 == 0) {
        emp.push({
            x: Math.floor(Math.random() * cvs.width) + cvs.width,
            y: Math.floor(Math.random() * cvs.height),
            dx: Math.random() + 1,
            dy: Math.random() - 1,
            del: 0
        });
        //dx,dy - скорость изменения координат по осям
        //del - для удаления противников
    };

    //выстрелы корабля противника
    for (i in emp) {
        if (timer % 250 == 0) {
            empBull.push({x: emp[i].x, y: emp[i].y + empShip.height / 2, dx: 1, dy: -5});
            bull2.play();
        };
    };

//выстрелы нашего корабля
    if (timer % 50 == 0) {
        bull.push({x: ship.x + falcon.width, y: ship.y + falcon.height / 3, dx: 2, dy: -5});
        bull1.play();
    };

//движение наших выстрелов
    for (i in bull) {
        bull[i].x += 5 * bull[i].dx;

        //очистка наших выстрелов за пределами поля
        if ((bull[i].x - bullet.width) >= 800) bull.splice(i, 1);
    };

//движение выстрелов противника
    for (i in empBull) {
        empBull[i].x -= 5 * empBull[i].dx;

        //очистка выстрелов противника за пределами поля
        if ((empBull[i].x + empBullet.width) <= 0) empBull.splice(i, 1);

        for (j in empBull) {
            //столкновение с выстрелом противника
            if (Math.abs(ship.x - empBull[j].x) < falcon.width / 2 &&
                Math.abs(ship.y + falcon.height / 2 - empBull[j].y - empBullet.height / 2) < falcon.height / 2) {
                //звук взрыва нашего корабля
                bangme.play();
                //вибрация
                window.navigator.vibrate(100);
                //взрыв нашего корабля
                bang1000.push({
                    x: ship.x - falcon.width / 2,
                    y: ship.y - ((Math.random() + 1) * falcon.height) / 2,
                    animx: 0,
                    animy: 0
                });

                //помечаем  наш корабль для дальнейших действий
                shipDel++;
                //убираем выстрел противника
                empBull.splice(j, 1);

                break;
            };
        };
    };

//движение противников
    for (i in emp) {
        emp[i].x -= 2 * emp[i].dx;

        //очистка противников за пределами поля
        if ((emp[i].x + empShip.width) <= 0) emp.splice(i, 1);

        for (j in bull) {
            //столкновение противника с нашим выстрелом
            if (Math.abs(emp[i].x - bull[j].x) < empShip.width / 2 &&
                Math.abs(emp[i].y + empShip.height / 2 - bull[j].y - bullet.height / 2) < empShip.height) {
                //добавляем 1 очко
                score++;
                //взрыв противника
                bang.push({x: emp[i].x - empShip.width / 2, y: emp[i].y - empShip.height / 2, animx: 0, animy: 0});
                bangbang.play();
                //помечаем корабль противника на удаление
                emp[i].del = 1;
                //убираем наш выстрел
                bull.splice(j, 1);

                break;
            };
        };

        //удаляем корабль противника
        if (emp[i].del == 1) emp.splice(i, 1);

        for (j in emp) {
            //столкновение с противником
            if (Math.abs(ship.x + (falcon.width - 90) - emp[j].x) < falcon.width / 3 &&
                Math.abs(ship.y + (falcon.height - 40) - emp[j].y - empShip.height / 2) < falcon.height / 2) {
                //звук взрыва нашего корабля
                bangme.play();
                //вибрация
                window.navigator.vibrate(100);
                //взрыв нашего корабля
                bang1000.push({
                    x: ship.x - falcon.width / 2,
                    y: ship.y - ((Math.random() + 1) * falcon.height) / 2,
                    animx: 0,
                    animy: 0
                });

                //отнимаем 1 жизнь
                shipDel++;
                //удаляем корабль противника
                emp.splice(j, 1);

                break;
            };
        };
    };

//анимация спрайта взрыва противника
    for (i in bang) {
        bang[i].animx += 0.4;
        if (bang[i].animx > 7) {
            bang[i].animy++;
            bang[i].animx = 0
        };

        if (bang[i].animy > 3) {
            bang.splice(i, 1);
        };
    };

    //анимация спрайта взрыва нашего коробля
    for (i in bang1000) {
        bang1000[i].animx += 0.2;
        if (bang1000[i].animx > 4) {
            bang1000[i].animy++;
            bang1000[i].animx = 0
        };
        if (bang1000[i].animy > 2) {
            bang1000.splice(i, 1);
        };
    };

//движения астероидов
    for (i in asteroidPos) {
        asteroidPos[i].x -= asteroidPos[i].dx;
        asteroidPos[i].y += asteroidPos[i].dy;

        for (j in bull) {
            //столкновение с астероидом нашего выстрела
            if (Math.abs(asteroidPos[i].x - bull[j].x) < asteroid.width / 2 &&
                Math.abs(asteroidPos[i].y + asteroid.height / 2 - bull[j].y - bullet.height / 2) < asteroid.height) {
                //звук взрыва астероида
                bangbang.play();
                //взрыв
                bang.push({
                    x: asteroidPos[i].x - asteroid.width / 2,
                    y: asteroidPos[i].y - asteroid.height / 2,
                    animx: 0,
                    animy: 0
                });

                //помечаем астероид на удаление
                asteroidPos[i].del++;
                bull.splice(j, 1);

                break;
            };
        };

        //удаляем астероид после 3-х попаданий и получаем 2 очка
        if (asteroidPos[i].del == 3) {asteroidPos.splice(i, 1); score+=2;}

        for (j in asteroidPos) {
            //столкновение с астероидом
            if (Math.abs(ship.x + (falcon.width - 90) - asteroidPos[j].x) < falcon.width / 3 &&
                Math.abs(ship.y + (falcon.height - 40) - asteroidPos[j].y - asteroid.height / 2) < falcon.height / 2) {
                //звук взрыва нашего корабля
                bangme.play();
                //вибрация
                window.navigator.vibrate(100);
                //взрыв нашего корабля
                bang1000.push({
                    x: ship.x - falcon.width / 2,
                    y: ship.y - ((Math.random() + 1) * falcon.height) / 2,
                    animx: 0,
                    animy: 0
                });

                //отнимаем жизнь
                shipDel++;
                //удаляем астероид
                asteroidPos.splice(j, 1);

                break;
            };
        };

//очистка астероидов за пределами поля
        if ((asteroidPos[i].x + asteroid.width) <= 0) asteroidPos.splice(i, 1);
        if ((asteroidPos[i].y - asteroid.height) >= cvs.height) asteroidPos.splice(i, 1);
        if ((asteroidPos[i].y + asteroid.height) <= 0) asteroidPos.splice(i, 1);
    };
    //остановка игры и вывод данных на окно game over
    if (shipDel == 3) {timer=0;
        asteroidPos.length = 0;
        emp.length = 0;
        empBull.length = 0;
        bull.length = 0;
        cvs.style.cursor = 'default';
        fonend.play();
        result.textContent = 'Your result:  ' +  score + ' points';

    };


//рандом бонуса
    if (timer % 300 == 0) {
        bonus.push({
            x: Math.floor(Math.random() * cvs.width) + cvs.width,
            y: Math.floor(Math.random() * cvs.height),
            dx: Math.random() + 1,
            dy: Math.random() - 1,
            del: 0
        });
        //dx,dy - скорость изменения координат по осям
        //del - для удаления бонусов
    };

//движение бонусов
    for (i in bonus) {
        bonus[i].x -= bonus[i].dx;

        //очистка бонусов за пределами поля
        if ((bonus[i].x + yodaBonus.width) <= 0) bonus.splice(i, 1);

        //удаляем бонус
        if (bonus[i].del == 1) bonus.splice(i, 1);

        for (j in bonus) {
            //столкновение с бонусом
            if (Math.abs(ship.x + (falcon.width - 90) - bonus[j].x) < falcon.width / 3 &&
                Math.abs(ship.y + (falcon.height - 40) - bonus[j].y - yodaBonus.height / 2) < falcon.height / 2) {

                //добавляем 5 очков
                score+=5;
                //удаляем бонус
                bonus.splice(j, 1);

                break;
            };
        };
    };
};

};

//отрисовка объектов
function render() {
//начальный экран
    ctx.drawImage(logo, 550, 280);

    if (startss==1) {
//стартовая заставка с музыкой
    document.getElementById('background').style.background = 'none';
    document.getElementById('text').style.display = 'none';
    document.getElementById('begin').style.visibility = 'visible';
    ctx.drawImage(main, 0, 0);
    ctx.drawImage(logo, 70, 50);
    document.getElementById('begin').addEventListener("click", startgame, false);
    cvs.style.cursor = 'default';
};
//игровой процесс
    if (starting == 1) {
        fongame.play();
        document.getElementById('begin').style.visibility = 'hidden';
        document.getElementById('begin').removeEventListener("click", startgame, false);
        cvs.addEventListener("mousemove", moving, false);
        cvs.addEventListener('touchstart', touchStartHandler, false);
        document.addEventListener('touchmove', touchMoveHandler, false);
        document.addEventListener('touchend', touchEndHandler, false);
        //document.getElementById('reload').style.display = 'none';
        cvs.style.cursor = 'none';
        ctx.drawImage(bg, 0, 0);
        ctx.drawImage(falcon, ship.x, ship.y);
        for (i in emp) ctx.drawImage(empShip, emp[i].x, emp[i].y);
        for (i in bonus) ctx.drawImage(yodaBonus, bonus[i].x, bonus[i].y);
        for (i in asteroidPos) ctx.drawImage(asteroid, asteroidPos[i].x, asteroidPos[i].y);
        for (i in bull) ctx.drawImage(bullet, bull[i].x, bull[i].y);
        for (i in empBull) ctx.drawImage(empBullet, empBull[i].x, empBull[i].y);
        for (i in bang) ctx.drawImage(bangimg, 70 * Math.floor(bang[i].animx), 70 * Math.floor(bang[i].animy),
            70, 70, bang[i].x, bang[i].y, 70, 70);
        for (i in bang1000) ctx.drawImage(bangimg1000, 150 * Math.floor(bang1000[i].animx),
            150 * Math.floor(bang1000[i].animy), 150, 150, bang1000[i].x, bang1000[i].y, 170, 170);
        ctx.fillStyle = "#FFA500";
        ctx.font = "25px Verdana";
        ctx.fillText("Score: " + score + " points",400,30);
        switch (shipDel) {
            case 0:
                ctx.drawImage(yoda, 20, 20);
                ctx.drawImage(yoda, 70, 20);
                ctx.drawImage(yoda, 120, 20);
                break;
            case 1:
                ctx.drawImage(yoda, 20, 20);
                ctx.drawImage(yoda, 70, 20);
                break;
            case 2:
                ctx.drawImage(yoda, 20, 20);
                break;
        };
    };
//экран game over
        if (shipDel == 3) {
            fongame.pause();
            starting = 0;
            document.getElementById('begin').style.visibility = 'hidden';
            document.getElementById('reload').style.visibility = 'visible';
            document.getElementById('reload').addEventListener("click", reloadgame, false);
            ctx.drawImage(gameoverimg, 0, 0);
            cvs.style.cursor = 'default';
            cvs.removeEventListener("mousemove", moving, false);
            document.getElementById('result').style.visibility='visible';
            document.getElementById('inputName').style.visibility='visible';
        };
//возврат на главный экран
            if (reloading == 1) {
                location.href=location.href;
            };
};

//кроссбраузерная прорисовка
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000/20);
        };
})();
