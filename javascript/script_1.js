
// По нажатию на ссылку в меню ul переходим к элементам.
(function(){
    $('header li, .button').click(function(){
        var target = $(this).data('name');     // Узнаём до какого элемента нам нужно скролить.
        var speed = $(this).data('speed')*1;    // Узнаём скорость при которой будем скролить.

        var scroll_height;    // Переменная котороая будет хранить высоту страницы полностью, со всеми скролами и барами, чтобы можно было промотать вниз до конца на андроиде.

        // Проверяем, если мы зашли с мобильного девайса или с планшета у которого ширина браузера равна меньше чем 1024px
        if(('ontouchstart' in window) & screen.width < 1024 & target == 'content_box_4' || window.DocumentTouch && document instanceof DocumentTouch & screen.width < 1024 & target == 'content_box_4'){    // screen.width - это размер окна, а не размер браузера. Сравниваем с ним.
            scroll_height = Math.max(    // Узнаём всю длинну сайта. Надёжно определить размер страницы с учётом прокрутки лучше так.
                document.body.scrollHeight, document.documentElement.scrollHeight,
                document.body.offsetHeight, document.documentElement.offsetHeight,
                document.body.clientHeight, document.documentElement.clientHeight
            );

            $('html').stop(false,true).animate({scrollTop: scroll_height}, speed, function(){    // Скролим в самый низ сайта
                // Делаем на весь экран сайт, то есть заходим в фулскрин. Для того чтобы сайт на андроиде лучше смотрелся.
                if($('html')[0].requestFullscreen){
                    $('html')[0].requestFullscreen();
                }
                else if($('html')[0].mozRequestFullScreen){
                    $('html')[0].mozRequestFullScreen();
                }
                else if($('html')[0].webkitRequestFullscreen){
                    $('html')[0].webkitRequestFullscreen();
                }
            });
        }
        else{    // Иначе мы зашли с компа.
            scroll = $('.'+target).offset().top;    // Скролим до того элемента который передали. Полуаем его координаты и скролим до него.
            $('html').stop(false,true).animate({scrollTop: scroll}, speed);  // по сайту скролим к диву с айди, и лазеем на 10px вверх, за 300 милисек
        }
    });

    $('html, body').on('touchmove ', function(){    // Свойсто 'touchmove' это когда палец двигается по панели тач на планшете. Если оно сработало..
        // выходим из фуллскрина, то етсь сворачиваем видео
        if(document.cancelFullScreen){    // для всех обозревателей (в данный момент гугл хром не подерживает эту функцию, поэтому для него пропишем ниже)
            document.cancelFullScreen();    // возвращаем сайт в нормальный вид
        }
        else if(document.mozCancelFullScreen){    // если это мазила
            document.mozCancelFullScreen();    // возвращаем сайт в нормальный вид
        }
        else if(document.webkitCancelFullScreen){    // если это гугл хром
            document.webkitCancelFullScreen();    // возвращаем сайт в нормальный вид
        }
    });
})();



// Герлянды. Создаём мерцание элементов li
(function(){
    var flag = false;

    $('.content_box_2 ul li').hover(function(){
        flag = true;    // Если навели, то указываем это в переменной.
    },function(){
        flag = false;
    });

    // По очереди включаем псевдо элементы. Они включаются с помощью родителей li у которых есть классы, в данном случае .active.
    (function garlands(){    // Создаём функцию герлянды, где по очереди будут зажигаться по 2 штуки элемнты li.
        setTimeout(function(){    // Первая функция запустится сразу, другие каждую секунду.
            if(!flag){    // Меняем цвет у элемента li в том случае, если мышка не наведена на какой либо из элементов li
                $('.content_box_2 ul li').removeClass('active');
                $('.content_box_2 ul li:eq(2), .content_box_2 ul li:eq(7)').addClass('active');
            }
            setTimeout(function(){
                if(!flag){    // Меняем цвет у элемента li в том случае, если мышка не наведена на какой либо из элементов li
                    $('.content_box_2 ul li').removeClass('active');
                    $('.content_box_2 ul li:eq(8), .content_box_2 ul li:eq(3)').addClass('active');
                }
                setTimeout(function(){
                    if(!flag){
                        $('.content_box_2 ul li').removeClass('active');
                        $('.content_box_2 ul li:eq(4), .content_box_2 ul li:eq(9)').addClass('active');
                    }
                    setTimeout(function(){
                        if(!flag){
                            $('.content_box_2 ul li').removeClass('active');
                            $('.content_box_2 ul li:eq(0), .content_box_2 ul li:eq(5)').addClass('active');
                        }
                        setTimeout(function(){
                            if(!flag){
                                $('.content_box_2 ul li').removeClass('active');
                                $('.content_box_2 ul li:eq(6), .content_box_2 ul li:eq(1)').addClass('active');
                            }
                            setTimeout(function(){
                                if(!flag){
                                    $('.content_box_2 ul li').removeClass('active');
                                }
                                garlands();
                            },1000);
                        },1000);
                    },1000);
                },1000);
            },1000);
        },0);
    })();
})();





/*

// Создаём летающие прямоугольники из стороны в сторону для двух SVG.
$.fn.my_animation = function(){    // Создаём метод который будем применять к каждому SVG. Метод создаёт 8 объектов-прямоугольников с классами to_left, to_right, находит элементы с тэтими же классами и двигает их.

    var svg = this[0];    // Получаем svg с которым работаем

    // Ширина и высота SVG
    var parrent_width = $(svg).width();
    var parrent_height = $(svg).height();

    // Задаём область просмотра
    $(svg).attr('viewBox','0 0 ' + parrent_width + ' ' + parrent_height);

    // Функция будет отдавать нам случайные числа от минимального до максимального
    function random_val(min, max){    // Функция создаст случайное число от от минимального до максимального. Это нужно для того чтобы мы смогли отрегулировать как цвет, так и насыщеность и яркость цвета.
        return Math.floor(Math.random() * (max - min) + 1) + min;
    }

    function Rect(vector, f){
        this.vector = vector;
        this.f = f || 0;

        // Сделаем ширину и высоту нашего прямоугольника который будет двигаться длинной с диагонали канваса умноженное на 2. Примерно такая длинна нужна, чтобы не было видно углов прямоугольников на канвасе.
        var svg_diagonal = Math.sqrt( Math.pow(parrent_width, 2) + Math.pow(parrent_height, 2) );    // Найдём диагональ канваса
        svg_diagonal = svg_diagonal * 2.5;    // И ещё умножем на 2.5 диагональ канваса

        // Ширина и высота каждого прямоуголника который будет перемещаться равна диагонали канваса умноженное на 2.
        this.width = svg_diagonal;
        this.height = svg_diagonal;

        this.pos_x = -this.width/2;    // Как рисуется прямоугольник, то есь ставим его так чтобы он оказался в верхнем левом углу своим центром на углу.
        this.pos_y = -this.height/2;    // Как рисуется прямоугольник, то есь ставим его так чтобы он оказался в верхнем левом углу своим центром на углу.
        this.fill = 'rgba(0,0,0,0.2)';
        this.duration = random_val(2000, 3000);

        // Проверяем куда поедет прямоугольник и взависимости от этого смотрим на сколько мы его можем повернуть.
        switch(vector){    // Кидаем переменную если она прилетела при создании прямоугольника на проверку
            case 'to_right':    // Если квадрат поедет вправо
                this.angle = Math.round(random_val(-35, 35));    // Начальный поворот в градусах
            break;
            case 'to_left':    // Если квадрат поедет влево
                this.angle = Math.round(random_val(-35, 35));    // Начальный поворот в градусах
            break;
            case 'to_right_bottom':
                this.angle = Math.round(random_val( 30, 60 ));    // Начальный поворот в градусах
            break;
            case 'to_left_bottom':
                this.angle = Math.round(random_val( -30, -60 ));    // Начальный поворот в градусах
            break;
            case 'to_left_top':
                this.angle = Math.round(random_val( 30, 60 ));    // Начальный поворот в градусах
            break;
            case 'to_right_top':
                this.angle = Math.round(random_val( -30, -60 ));    // Начальный поворот в градусах
            break;
            case 'to_bottom':
                this.angle = Math.round(random_val( (90-(45/2)), (90+(45/2)) ));    // Начальный поворот в градусах
            break;
            case 'to_top':
                this.angle = Math.round(random_val( (90-(45/2)), (90+(45/2)) ));    // Начальный поворот в градусах
            break;
        }

        this.radian = this.angle * (Math.PI / 180);    // Переделываем поворот в радианы


        this.rotate_width = this.width * Math.abs(Math.cos(this.radian)) + this.height * Math.abs(Math.sin(this.radian));
        this.rotate_height = this.height * Math.abs(Math.cos(this.radian)) + this.width * Math.abs(Math.sin(this.radian));

        // Откуда начинаем движение самая первая итерация
        var x, y;    // Это координаты откуда прямоугольник начинает своё движение.

        switch(vector){    // Кидаем переменную если она прилетела при создании прямоугольника на проверку
            case 'to_right':    // Если квадрат поедет вправо, то ставим его слева
                x = -this.rotate_width/2;    // Прячем слева за канвасом
                y = parrent_height/2;    // Ставим по центру канваса
            break;
            case 'to_left':    // Если квадрат поедет влево, то ставим его справа.
                x = parrent_width + this.rotate_width/2;    // Прячем справа после канваса
                y = parrent_height/2;
            break;
            case 'to_right_bottom':
                x = -this.rotate_width/2;
                y = -this.rotate_height/2;
            break;
            case 'to_left_bottom':
                x = parrent_width + this.rotate_width/2
                y = -this.rotate_height/2;
            break;
            case 'to_left_top':
                x = parrent_width + this.rotate_width/2;    // Начальная точка, откуда стартуем.
                y = parrent_height + this.rotate_height/2;
            break;
            case 'to_right_top':
                x = -this.rotate_width/2;    // Начальная точка, откуда стартуем.
                y = parrent_height + this.rotate_height/2;
            break;
            case 'to_bottom':
                x = parrent_width/2;    // Начальная точка, откуда стартуем.
                y = -this.rotate_height/2;
            break;
            case 'to_top':
                x = parrent_width/2;    // Начальная точка, откуда стартуем.
                y = parrent_height + this.rotate_height/2;
            break;
        }

        this.x = x;    // Откуда прямоугольник стартует в самый первый раз по оси х
        this.y = y;    // Откуда прямоугольник стартует в самый первый раз по оси у

        this.x1 = x;    // Стартовая координата, или координата на которой закончилась прошлая анимация по оси у.
        this.y1 = y;    // Стартовая координата, или координата на которой закончилась прошлая анимация у.


        // Докуда едет прямоугольник
        var x2, y2;    // Если мы не передадим при создании прямоугольника конечные координаты, то создадим их здесь.

        switch(vector){    // Получаем направление куда поедет прямоугольник при создании объекта
            case 'to_right':    // Если прямоугольник поедет вправо, то находим его конечную точку так, чтобы он полностью смог заезать вправо и по вертикали по центу.
                x2 = (parrent_width + this.rotate_width/2);
                y2 = (parrent_height/2);
            break;
            case 'to_left':
                x2 = -this.rotate_width/2;
                y2 = (parrent_height/2);
            break;
            case 'to_right_bottom':
                x2 = parrent_width + this.rotate_width/2;    // Конечная точка куда нужно приехать
                y2 = parrent_height + this.rotate_height/2;
            break;
            case 'to_left_bottom':
                x2 = -this.rotate_width/2;    // Конечная точка куда нужно приехать
                y2 = parrent_height + this.rotate_height/2;
            break;
            case 'to_left_top':
                x2 = -this.rotate_width/2;
                y2 = -this.rotate_height/2;
            break;
            case 'to_right_top':
                x2 = parrent_width + this.rotate_width/2;    // Конечная точка куда нужно приехать
                y2 = -this.rotate_height/2;
            break;
            case 'to_bottom':
                x2 = parrent_width/2;    // Конечная точка куда нужно приехать
                y2 = parrent_height + this.rotate_height/2;
            break;
            case 'to_top':
                x2 = parrent_width/2;    // Конечная точка куда нужно приехать
                y2 = -this.rotate_height/2;
            break;
        }

        this.x2 = x2; // Координата докуда надо двигать прямоугольник по оси х
        this.y2 = y2; // Координата докуда надо двигать прямоугольник по оси у

        this.steps = (Math.random()*3 + 0.1).toFixed(2);    // Создаём случайное число от 0.1 до 1, которое будем передавать в каждую функцию.
        this.dist =  Math.abs(Math.sqrt( (this.x2 - this.x1) * (this.x2 - this.x1) + (this.y2 - this.y1) * (this.y2 - this.y1) ));
        this.speed = this.steps / this.dist;
    }

    Rect.prototype.draw = function(){
        // Делаем шаг по временной шкале
        this.f += this.speed;    // При делении количества шагов на растояние мы получаем такую временную шкалу от 0.0 до 1.0 И когда будет 1.0 то это 100%, значит анимация закончена.

        // Рассчитываем текущую позицию х / у по нашей временной шкале от 0.0 до 1.0
        this.x = this.x1 + (this.x2 - this.x1) * this.f;
        this.y = this.y1 + (this.y2 - this.y1) * this.f;

        if(this.f < 1){
            this.wrap_rect.css('transform','translateX('+this.x+'px) translateY('+this.y+'px) rotate('+this.angle+'deg)');
        }
        else{
            var vector = this.vector;    // Кидаем в переменную направление куда должен ехать прямоугольник. Направление берём из текущего прямоугольника.

            var rect = new Rect(vector);    // Создаём новый объект-прямоугольник с помощью нашей функции и передаём в нашу функцию направление куда поедет прямоугольник.

            for(i in rect){    // Данный цик делает вот что: Промегаемся по всему объеку
                this[i] = rect[i];    // И из нового объекта вытаскиваем все значения ключей в старый объект, таким образом заменяя на новые значения старого объекта.
            }
        }

    }

    var rects = [];    // Массив в котором будут находится объекты с настройками прямоугольников
    var vectors = ['to_right','to_left','to_right_bottom','to_left_bottom','to_left_top','to_right_top','to_bottom','to_top'];
    var count_rect = vectors.length; // Сколько всего будет прямоугольников

    for(var i = v = 0; i < count_rect; i++, v++){    // Сколько нужно сделать прямоугольников смотрим из переменной count_rect и создаём их.
        // Прописываем для каждого прямоугольника стартовую позицию. Так чтобы начиналось красиво.

        var rect;    // Создаём переменную в которую будем заносить объект
        // Если вектора, то есть направления в массиве куда поедет прямоугольник кончатся, то пусть они снова начинаются с первого числа в массиве.
        if(v > vectors.length-1) v = 0;    // Если в массиве кончились направления (left, right, top и т.д), то начинаем присваивать эти направления с первого который есть в массиве дальне новым элементам, так как массив с элементами ещё не закончился.

        // Самый первый запуска прямоугольников. Ихнюю стартовую позицию можно и нужно указывать с зоны видимости, примерно с центра экрана, а уже после после первой итерации, прямоугольники должны брать своё начало строго за канвасом по бокам.
        if(i > (vectors.length-1)){    // После 8-го прямоугольника прячем все созданные прямоугольники за канвасом.
            rect = new Rect(vectors[v]);    // Передаём только направление куда поедет прямоугольник. По этому получив только направление, функция примит его и спрячет за канвасом этот прямоугольник.
        }
        else{    // Первые 8 прямоугольников рисуем так чтобы было видно только первые 8 прямоугольников.
            var f = Math.random() * 1;    // Откуда будет начинать своё движение прямоугольник на самой первой итерации. Например 0.1 это будет означать что 10% от своей анимации он уже проехал.
            rect = new Rect(vectors[v], f);    // Создаём объект прямоугольник и передаём ему вектор и координаты х и у, чтобы этот прямоугольник расположился на канвасе так, чтобы мы его видели.
        }

        // Создаём новую обёртку с квадратом для этого объекта - прямоугольника
        var svgns = "http://www.w3.org/2000/svg";
        var g = document.createElementNS(svgns, 'g');    // Создаём новую обёртку для прямоугольника
        g.setAttribute('class', this.vector);    // Добавляем обёртке класс чтобы её можно было перемещать
        var r = document.createElementNS(svgns, 'rect');    // Создаём прямоугольник

        // Добавляем стили прямоугольнику, выбрав его как jQuery
        $(r).css({'x': rect.pos_x, 'y': rect.pos_y, width: rect.width, height: rect.height, 'fill':rect.fill});    // Устанавливаем координаты и размеры прямоугольника.
        g.appendChild(r);    // Вставляем прямоугольник в обёртку
        svg.appendChild(g);    // Вставляем в SVG обёртку с прямоугольником

        rect.wrap_rect = $(g);    // В объект добавляем нами созданную обёртку которую теперь будем перемещать изменяя как CSS значения, так и значения в объекте
        rects.push(rect);    // Вставляем новый объект с настройками для прямоугольника в массив
        rect.draw();    // Перемещаем прямоугольник
    }

    function draw(rect){    // Эта функция отрисовывает каждый прямоугольник.
        rect.draw();    // Запускаем метод на полученном прямоугольнике из массива rects после внутри цикла forEach и передаём draw методу контекст на котором рисуем.
    }

    (function drawFrame(){    // Начинаем рисовать
        requestAnimationFrame(drawFrame);    // Снова запускаем эту же функцию в цикле
        rects.forEach(draw);    // Из массива rects с помощью forEach в функцию draw которая принимает каждый раз по одному прямоугольнику из массива и запускаем на этом прямоугольнике rect метод draw который принимает контекст на котором рисуем.
    })();

}

//$('.content_box_1 svg.rectangle_animation').my_animation();    // Запускаем созданный нами метод на первом SVG

*/









// Дым на канвас.
(function(){


    // Дым на canvas.
    $.fn.smoke = function(){

        var canvas = this[0];

        canvas.width  = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        var config = {
            TEXTURE_DOWNSAMPLE: 1,    // Было значение 1.
            DENSITY_DISSIPATION: 0.97,
            VELOCITY_DISSIPATION: 0.99,
            PRESSURE_DISSIPATION: 0.8,
            PRESSURE_ITERATIONS: 25,
            CURL: 30,
            SPLAT_RADIUS: 0.005    // Размер клуба быма.
        };

        var pointers   = [];
        var splatStack = [];

        var _getWebGLContext     = getWebGLContext( canvas );
        var gl                   = _getWebGLContext.gl;
        var ext                  = _getWebGLContext.ext;
        var support_linear_float = _getWebGLContext.support_linear_float;

        function getWebGLContext( canvas ) {

            var params = {
                alpha: true,    // Включаем только прозрачность.
                depth: false,
                stencil: false,
                antialias: false
            };

            var gl = canvas.getContext( 'webgl2', params );

            var isWebGL2 = !!gl;

            if ( !isWebGL2 ) gl = canvas.getContext( 'webgl', params ) || canvas.getContext( 'experimental-webgl', params );

            var halfFloat            = gl.getExtension( 'OES_texture_half_float' );
            var support_linear_float = gl.getExtension( 'OES_texture_half_float_linear' );

            if ( isWebGL2 ) {
                gl.getExtension( 'EXT_color_buffer_float' );
                support_linear_float = gl.getExtension( 'OES_texture_float_linear' );
            }



            // Прозразный фон.
            gl.clearColor(0, 0, 0, 0);
            gl.colorMask(true, true, true, false);    // Главное стобы третий параметр был false.
            gl.clear(gl.COLOR_BUFFER_BIT);




            var internalFormat   = isWebGL2 ? gl.RGBA16F : gl.RGBA;
            var internalFormatRG = isWebGL2 ? gl.RG16F : gl.RGBA;
            var formatRG         = isWebGL2 ? gl.RG : gl.RGBA;
            var texType          = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;

            return {
                gl: gl,
                ext: {
                    internalFormat: internalFormat,
                    internalFormatRG: internalFormatRG,
                    formatRG: formatRG,
                    texType: texType
                },
                support_linear_float: support_linear_float
            };
        }

        function pointerPrototype() {
            this.id    = -1;
            this.x     = 0;
            this.y     = 0;
            this.dx    = 0;
            this.dy    = 0;
            this.down  = false;
            this.moved = false;
            this.color = [ 30, 0, 300 ];
        }

        pointers.push( new pointerPrototype() );

        var GLProgram = function () {

            function GLProgram( vertexShader, fragmentShader ) {

                if ( !(this instanceof GLProgram) )
                    throw new TypeError( "Cannot call a class as a function" );

                this.uniforms = {};
                this.program  = gl.createProgram();

                gl.attachShader( this.program, vertexShader );
                gl.attachShader( this.program, fragmentShader );
                gl.linkProgram( this.program );

                if ( !gl.getProgramParameter( this.program, gl.LINK_STATUS ) ) throw gl.getProgramInfoLog( this.program );

                var uniformCount = gl.getProgramParameter( this.program, gl.ACTIVE_UNIFORMS );

                for ( var i = 0; i < uniformCount; i++ ) {

                    var uniformName = gl.getActiveUniform( this.program, i ).name;

                    this.uniforms[ uniformName ] = gl.getUniformLocation( this.program, uniformName );

                }
            }

            GLProgram.prototype.bind = function bind() {
                gl.useProgram( this.program );
            };

            return GLProgram;

        }();

        function compileShader( type, source ) {

            var shader = gl.createShader( type );

            gl.shaderSource( shader, source );
            gl.compileShader( shader );

            if ( !gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) throw gl.getShaderInfoLog( shader );

            return shader;

        }

        var baseVertexShader               = compileShader( gl.VERTEX_SHADER, 'precision highp float; precision mediump sampler2D; attribute vec2 aPosition; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform vec2 texelSize; void main () {     vUv = aPosition * 0.5 + 0.5;     vL = vUv - vec2(texelSize.x, 0.0);     vR = vUv + vec2(texelSize.x, 0.0);     vT = vUv + vec2(0.0, texelSize.y);     vB = vUv - vec2(0.0, texelSize.y);     gl_Position = vec4(aPosition, 0.0, 1.0); }' );
        var clearShader                    = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uTexture; uniform float value; void main () {     gl_FragColor = value * texture2D(uTexture, vUv); }' );
        var displayShader                  = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uTexture; void main () {     gl_FragColor = texture2D(uTexture, vUv); }' );
        var splatShader                    = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius; void main () {     vec2 p = vUv - point.xy;     p.x *= aspectRatio;     vec3 splat = exp(-dot(p, p) / radius) * color;     vec3 base = texture2D(uTarget, vUv).xyz;     gl_FragColor = vec4(base + splat, 1.0); }' );
        var advectionManualFilteringShader = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation; vec4 bilerp (in sampler2D sam, in vec2 p) {     vec4 st;     st.xy = floor(p - 0.5) + 0.5;     st.zw = st.xy + 1.0;     vec4 uv = st * texelSize.xyxy;     vec4 a = texture2D(sam, uv.xy);     vec4 b = texture2D(sam, uv.zy);     vec4 c = texture2D(sam, uv.xw);     vec4 d = texture2D(sam, uv.zw);     vec2 f = p - st.xy;     return mix(mix(a, b, f.x), mix(c, d, f.x), f.y); } void main () {     vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy;     gl_FragColor = dissipation * bilerp(uSource, coord);     gl_FragColor.a = 1.0; }' );
        var advectionShader                = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation; void main () {     vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;     gl_FragColor = dissipation * texture2D(uSource, coord); }' );
        var divergenceShader               = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uVelocity; vec2 sampleVelocity (in vec2 uv) {     vec2 multiplier = vec2(1.0, 1.0);     if (uv.x < 0.0) { uv.x = 0.0; multiplier.x = -1.0; }     if (uv.x > 1.0) { uv.x = 1.0; multiplier.x = -1.0; }     if (uv.y < 0.0) { uv.y = 0.0; multiplier.y = -1.0; }     if (uv.y > 1.0) { uv.y = 1.0; multiplier.y = -1.0; }     return multiplier * texture2D(uVelocity, uv).xy; } void main () {     float L = sampleVelocity(vL).x;     float R = sampleVelocity(vR).x;     float T = sampleVelocity(vT).y;     float B = sampleVelocity(vB).y;     float div = 0.5 * (R - L + T - B);     gl_FragColor = vec4(div, 0.0, 0.0, 1.0); }' );
        var curlShader                     = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uVelocity; void main () {     float L = texture2D(uVelocity, vL).y;     float R = texture2D(uVelocity, vR).y;     float T = texture2D(uVelocity, vT).x;     float B = texture2D(uVelocity, vB).x;     float vorticity = R - L - T + B;     gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0); }' );
        var vorticityShader                = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt; void main () {     float L = texture2D(uCurl, vL).y;     float R = texture2D(uCurl, vR).y;     float T = texture2D(uCurl, vT).x;     float B = texture2D(uCurl, vB).x;     float C = texture2D(uCurl, vUv).x;     vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L));     force *= 1.0 / length(force + 0.00001) * curl * C;     vec2 vel = texture2D(uVelocity, vUv).xy;     gl_FragColor = vec4(vel + force * dt, 0.0, 1.0); }' );
        var pressureShader                 = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uPressure; uniform sampler2D uDivergence; vec2 boundary (in vec2 uv) {     uv = min(max(uv, 0.0), 1.0);     return uv; } void main () {     float L = texture2D(uPressure, boundary(vL)).x;     float R = texture2D(uPressure, boundary(vR)).x;     float T = texture2D(uPressure, boundary(vT)).x;     float B = texture2D(uPressure, boundary(vB)).x;     float C = texture2D(uPressure, vUv).x;     float divergence = texture2D(uDivergence, vUv).x;     float pressure = (L + R + B + T - divergence) * 0.25;     gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0); }' );
        var gradientSubtractShader         = compileShader( gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uPressure; uniform sampler2D uVelocity; vec2 boundary (in vec2 uv) {     uv = min(max(uv, 0.0), 1.0);     return uv; } void main () {     float L = texture2D(uPressure, boundary(vL)).x;     float R = texture2D(uPressure, boundary(vR)).x;     float T = texture2D(uPressure, boundary(vT)).x;     float B = texture2D(uPressure, boundary(vB)).x;     vec2 velocity = texture2D(uVelocity, vUv).xy;     velocity.xy -= vec2(R - L, T - B);     gl_FragColor = vec4(velocity, 0.0, 1.0); }' );

        var textureWidth  = void 0;
        var textureHeight = void 0;
        var density       = void 0;
        var velocity      = void 0;
        var divergence    = void 0;
        var curl          = void 0;
        var pressure      = void 0;

        initFramebuffers();

        var clearProgram           = new GLProgram( baseVertexShader, clearShader );
        var displayProgram         = new GLProgram( baseVertexShader, displayShader );
        var splatProgram           = new GLProgram( baseVertexShader, splatShader );
        var advectionProgram       = new GLProgram( baseVertexShader, support_linear_float ? advectionShader : advectionManualFilteringShader );
        var divergenceProgram      = new GLProgram( baseVertexShader, divergenceShader );
        var curlProgram            = new GLProgram( baseVertexShader, curlShader );
        var vorticityProgram       = new GLProgram( baseVertexShader, vorticityShader );
        var pressureProgram        = new GLProgram( baseVertexShader, pressureShader );
        var gradienSubtractProgram = new GLProgram( baseVertexShader, gradientSubtractShader );

        function initFramebuffers() {

            textureWidth  = gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE;
            textureHeight = gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;

            var iFormat   = ext.internalFormat;
            var iFormatRG = ext.internalFormatRG;
            var formatRG  = ext.formatRG;
            var texType   = ext.texType;

            density    = createDoubleFBO( 0, textureWidth, textureHeight, iFormat, gl.RGBA, texType, support_linear_float ? gl.LINEAR : gl.NEAREST );
            velocity   = createDoubleFBO( 2, textureWidth, textureHeight, iFormatRG, formatRG, texType, support_linear_float ? gl.LINEAR : gl.NEAREST );
            divergence = createFBO( 4, textureWidth, textureHeight, iFormatRG, formatRG, texType, gl.NEAREST );
            curl       = createFBO( 5, textureWidth, textureHeight, iFormatRG, formatRG, texType, gl.NEAREST );
            pressure   = createDoubleFBO( 6, textureWidth, textureHeight, iFormatRG, formatRG, texType, gl.NEAREST );

        }

        function createFBO( texId, w, h, internalFormat, format, type, param ) {

            gl.activeTexture( gl.TEXTURE0 + texId );

            var texture = gl.createTexture();

            gl.bindTexture( gl.TEXTURE_2D, texture );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE );
            gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE );
            gl.texImage2D( gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null );

            var fbo = gl.createFramebuffer();

            gl.bindFramebuffer( gl.FRAMEBUFFER, fbo );
            gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0 );
            gl.viewport( 0, 0, w, h );
            gl.clear( gl.COLOR_BUFFER_BIT );

            return [ texture, fbo, texId ];

        }

        function createDoubleFBO( texId, w, h, internalFormat, format, type, param ) {

            var fbo1 = createFBO( texId, w, h, internalFormat, format, type, param );
            var fbo2 = createFBO( texId + 1, w, h, internalFormat, format, type, param );

            return {
                get first() {
                    return fbo1;
                },
                get second() {
                    return fbo2;
                },
                swap: function swap() {
                    var temp = fbo1;

                    fbo1 = fbo2;
                    fbo2 = temp;
                }
            };

        }

        var blit = function () {

            gl.bindBuffer( gl.ARRAY_BUFFER, gl.createBuffer() );
            gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( [ -1, -1, -1, 1, 1, 1, 1, -1 ] ), gl.STATIC_DRAW );
            gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer() );
            gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( [ 0, 1, 2, 0, 2, 3 ] ), gl.STATIC_DRAW );
            gl.vertexAttribPointer( 0, 2, gl.FLOAT, false, 0, 0 );
            gl.enableVertexAttribArray( 0 );

            return function ( destination ) {
                gl.bindFramebuffer( gl.FRAMEBUFFER, destination );
                gl.drawElements( gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0 );
            };

        }();

        var lastTime = Date.now();

        update();

        function update() {

            resizeCanvas();

            var dt = Math.min( (Date.now() - lastTime) / 1000, 0.016 );
            lastTime = Date.now();

            gl.viewport( 0, 0, textureWidth, textureHeight );

            if ( splatStack.length > 0 ) {
                for ( var m = 0; m < splatStack.pop(); m++ ) {

                    var color = [ Math.random() * 10, Math.random() * 10, Math.random() * 10 ];
                    var x     = canvas.width * Math.random();
                    var y     = canvas.height * Math.random();
                    var dx    = 1000 * (Math.random() - 0.5);
                    var dy    = 1000 * (Math.random() - 0.5);

                    splat( x, y, dx, dy, color );
                }
            }

            advectionProgram.bind();
            gl.uniform2f( advectionProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
            gl.uniform1i( advectionProgram.uniforms.uVelocity, velocity.first[ 2 ] );
            gl.uniform1i( advectionProgram.uniforms.uSource, velocity.first[ 2 ] );
            gl.uniform1f( advectionProgram.uniforms.dt, dt );
            gl.uniform1f( advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION );
            blit( velocity.second[ 1 ] );
            velocity.swap();

            gl.uniform1i( advectionProgram.uniforms.uVelocity, velocity.first[ 2 ] );
            gl.uniform1i( advectionProgram.uniforms.uSource, density.first[ 2 ] );
            gl.uniform1f( advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION );
            blit( density.second[ 1 ] );
            density.swap();

            for ( var i = 0, len =  pointers.length; i < len; i++ ) {
                var pointer = pointers[ i ];

                if ( pointer.moved ) {
                    splat( pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color );
                    pointer.moved = false;
                }
            }

            curlProgram.bind();
            gl.uniform2f( curlProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
            gl.uniform1i( curlProgram.uniforms.uVelocity, velocity.first[ 2 ] );
            blit( curl[ 1 ] );

            vorticityProgram.bind();
            gl.uniform2f( vorticityProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
            gl.uniform1i( vorticityProgram.uniforms.uVelocity, velocity.first[ 2 ] );
            gl.uniform1i( vorticityProgram.uniforms.uCurl, curl[ 2 ] );
            gl.uniform1f( vorticityProgram.uniforms.curl, config.CURL );
            gl.uniform1f( vorticityProgram.uniforms.dt, dt );
            blit( velocity.second[ 1 ] );
            velocity.swap();


            divergenceProgram.bind();
            gl.uniform2f( divergenceProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
            gl.uniform1i( divergenceProgram.uniforms.uVelocity, velocity.first[ 2 ] );
            blit( divergence[ 1 ] );

            clearProgram.bind();

            var pressureTexId = pressure.first[ 2 ];

            gl.activeTexture( gl.TEXTURE0 + pressureTexId );
            gl.bindTexture( gl.TEXTURE_2D, pressure.first[ 0 ] );
            gl.uniform1i( clearProgram.uniforms.uTexture, pressureTexId );
            gl.uniform1f( clearProgram.uniforms.value, config.PRESSURE_DISSIPATION );
            blit( pressure.second[ 1 ] );
            pressure.swap();

            pressureProgram.bind();
            gl.uniform2f( pressureProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
            gl.uniform1i( pressureProgram.uniforms.uDivergence, divergence[ 2 ] );
            pressureTexId = pressure.first[ 2 ];
            gl.activeTexture( gl.TEXTURE0 + pressureTexId );

            for ( var _i = 0; _i < config.PRESSURE_ITERATIONS; _i++ ) {
                gl.bindTexture( gl.TEXTURE_2D, pressure.first[ 0 ] );
                gl.uniform1i( pressureProgram.uniforms.uPressure, pressureTexId );
                blit( pressure.second[ 1 ] );
                pressure.swap();
            }

            gradienSubtractProgram.bind();
            gl.uniform2f( gradienSubtractProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight );
            gl.uniform1i( gradienSubtractProgram.uniforms.uPressure, pressure.first[ 2 ] );
            gl.uniform1i( gradienSubtractProgram.uniforms.uVelocity, velocity.first[ 2 ] );
            blit( velocity.second[ 1 ] );
            velocity.swap();

            gl.viewport( 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight );
            displayProgram.bind();
            gl.uniform1i( displayProgram.uniforms.uTexture, density.first[ 2 ] );
            blit( null );

            requestAnimationFrame( update );

        }

        function splat( x, y, dx, dy, color ) {

            splatProgram.bind();
            gl.uniform1i( splatProgram.uniforms.uTarget, velocity.first[ 2 ] );
            gl.uniform1f( splatProgram.uniforms.aspectRatio, canvas.width / canvas.height );
            gl.uniform2f( splatProgram.uniforms.point, x / canvas.width, 1.0 - y / canvas.height );
            gl.uniform3f( splatProgram.uniforms.color, dx, -dy, 1.0 );
            gl.uniform1f( splatProgram.uniforms.radius, config.SPLAT_RADIUS );
            blit( velocity.second[ 1 ] );
            velocity.swap();

            gl.uniform1i( splatProgram.uniforms.uTarget, density.first[ 2 ] );
            gl.uniform3f( splatProgram.uniforms.color, color[ 0 ] * 0.3, color[ 1 ] * 0.3, color[ 2 ] * 0.3 );
            blit( density.second[ 1 ] );
            density.swap();

        }

        function resizeCanvas() {

            ( canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight ) && ( canvas.width  = canvas.clientWidth, canvas.height = canvas.clientHeight, initFramebuffers() );

        }

        var count    = 0;
        var colorArr = [ Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2 ];

        document.body.addEventListener( 'mousemove', function ( e ) {

            count++;

            ( count > 25 ) && (colorArr = [ Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2 ], count = 0);

            pointers[ 0 ].down  = true;
            pointers[ 0 ].color = colorArr;
            pointers[ 0 ].moved = pointers[ 0 ].down;
            pointers[ 0 ].dx    = (e.pageX - $(canvas).offset().left - pointers[ 0 ].x) * 10.0;
            pointers[ 0 ].dy    = (e.pageY - $(canvas).offset().top - pointers[ 0 ].y) * 10.0;
            pointers[ 0 ].x     = e.pageX - $(canvas).offset().left;
            pointers[ 0 ].y     = e.pageY - $(canvas).offset().top;

        } );




        // Для мобильников.
        document.body.addEventListener( 'touchmove', function ( e ) {

            e.preventDefault();

            var touches = e.targetTouches;

            count++;

            ( count > 25 ) && (colorArr = [ Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2 ], count = 0);

            for ( var i = 0, len = touches.length; i < len; i++ ) {

                if ( i >= pointers.length ) pointers.push( new pointerPrototype() );

                pointers[ i ].id    = touches[ i ].identifier;
                pointers[ i ].down  = true;
                pointers[ i ].x     = touches[ i ].pageX;
                pointers[ i ].y     = touches[ i ].pageY;
                pointers[ i ].color = colorArr;

                var pointer = pointers[ i ];

                pointer.moved = pointer.down;
                pointer.dx    = (touches[ i ].pageX - pointer.x) * 10.0;
                pointer.dy    = (touches[ i ].pageY - pointer.y) * 10.0;
                pointer.x     = touches[ i ].pageX;
                pointer.y     = touches[ i ].pageY;

            }

        }, false );


    }

    $('.smoke').eq(0).smoke();    // Применяем метод к канвасу.


})();









































































