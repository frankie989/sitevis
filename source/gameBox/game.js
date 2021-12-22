let $start = document.querySelector('#start') //забираем кнопку старт начать
let $game = document.querySelector('#game') // забираем поле в котором будет игра
let $time = document.querySelector('#time') // забираем время самой игры из заголовка 
let $result = document.querySelector('#result') // забираем сам результат игры
let $timeHeader = document.querySelector('#time-header') // забираем Время игры название которое будем скрывать 
let $resultHeader = document.querySelector('#result-header') // забираем второй заголовок Ваш рузультат который изчезает и появляется по окончинии игры 
let $gameTime = document.querySelector('#game-time') // забираем время игры из инпута 


let colors = ['#E32636', '#78DBE2', '#FDD9B5', '#9966CC', '#E52B50', '#A8E4A0', '#C1876B', '#003153', '#B03F35', '#FFCF40','#8CCB5E', '#DD80CC','#B00000', '#34C924']  // массив с цветами для квадрата 
let score = 0 // создаем переменную счет который изначально равен нулю 
let isGameStarted = false   

$start.addEventListener('click', startGame)  // прослушка на клик кнопки старт 
$game.addEventListener('click', handleBoxClick) // прослушка на клик по квадрату 
$gameTime.addEventListener('input', setGameTime) // прослушка на инпут замена времени игры 

function show($el) {                // функция удаления класса скрытия кнопки или заголовка 
  $el.classList.remove('hide')
}

function hide($el) {               // функция добавления класса скрытия кнопки или заголовка 
  $el.classList.add('hide')
}


function startGame() {                          // функция начала игры 
  score = 0                                     // обнуление счета 
  setGameTime()                     // запуск функции которая скрывает счет и начинает отсчет времени    
  $gameTime.setAttribute('disabled', 'true')
  isGameStarted = true
  $game.style.backgroundColor = '#fff'
  hide($start)

  let interval = setInterval(function() {
    let time = parseFloat($time.textContent)
    
    if (time <= 0) {
      clearInterval(interval)
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }
  }, 100)

  renderBox()
}

function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader)
}

function endGame() {
  isGameStarted = false
  setGameScore()
  $gameTime.removeAttribute('disabled')
  show($start)
  $game.innerHTML = ''
  $game.style.backgroundColor = '#ccc'
  hide($timeHeader)
  show($resultHeader)
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return 
  }

  if (event.target.dataset.box) {
    score++
    renderBox()
  }
}

function renderBox() {
  $game.innerHTML = ''
  let box = document.createElement('div')   // создаем квадрат в игре 
  let boxSize = getRandom(30, 100)     // переменная рандомного размера квадрата или места его через функцию
  let gameSize = $game.getBoundingClientRect()      
  let maxTop = gameSize.height - boxSize   //пер определяет место квадрата по вертикали
  let maxLeft = gameSize.width - boxSize   //пер определяет место квадрата по горизонтали
  let randomColorInd = getRandom(0, colors.length)  // пер выбора цвета квадрата рандомно

  box.style.height = box.style.width = boxSize + 'px'  //установка стиля ширина и высота квадрата рандомно
  box.style.position = 'absolute'    // установка стиля позиция квадрата в зоне игры 
  box.style.backgroundColor = colors[randomColorInd]  //замена стиля квадрата цвета из массива  
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', 'true')

  $game.insertAdjacentElement('afterbegin', box)
 
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

