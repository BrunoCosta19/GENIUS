let gameorder = [];
let playerOrder = [];
let score = 0;

/*0 - verde
 *1 - vermelho
 *2 - amarelo
 *3 - azul
 * */

const monitor = document.querySelector(".monitor");

const green = document.querySelector('.green');
const sndGreen = document.querySelector('#snd-green');
	green.onclick = () => click(0);
	
const red = document.querySelector('.red');
const sndRed = document.querySelector('#snd-red');
	red.onclick = () => click(1);
	
const yellow = document.querySelector('.yellow');
const sndYellow = document.querySelector('#snd-yellow');
	yellow.onclick = () => click(2);

const blue = document.querySelector('.blue');
const sndBlue = document.querySelector('#snd-blue');
	blue.onclick = () => click(3);
	
	
function shuffleOrder(){
	let colorOrder = Math.floor(Math.random() * 4);
	
	gameorder.push(colorOrder);
	playerOrder = [];
	
	for(let i in gameorder){
		let color = gameorder[i];
		let elementColor = createColorElement(color);
		lightColor(elementColor, Number(i) + 1, color);
	}
}

function lightColor(element, num, color){
	num *= 800;
	
	setTimeout(function(){
		playSound(color);
		element.classList.add("selected");
	},num-300);
	
	setTimeout(function(){
		element.classList.remove("selected");
	},num-50);
}

function checkOrder(){
	for(let i in playerOrder){
		if(playerOrder[i] != gameorder[i]){
			gameOver();
			return;
		}
	}
	
	if(playerOrder.length == gameorder.length){
		score++;
		monitor.innerHTML = `<p>PARABÉNS<br>VOCÊ ACERTOU<br>VOCÊ TEM ${score} PONTO(S)<br> - - - <br>CLIQUE AQUI PARA COMEÇAR...<br>O PRÓXIMO NÍVEL</p>`;
		monitor.addEventListener('click',nextLevel);
		monitor.classList.remove("inactive")
	}
}

function click(color){
	playSound(color);
	playerOrder.push(color);
	createColorElement(color).classList.add("selected");
	
	setTimeout(function(){
		createColorElement(color).classList.remove("selected");
	}, 200);
	
	setTimeout(checkOrder,300);
}

function createColorElement(color){
	switch(color){
		case 0:
			return green;
			break;
		case 1:
			return red;
			break;
		case 2:
			return yellow;
			break;
		case 3:
			return blue;
			break;
	}
}

function nextLevel(){
	monitor.removeEventListener('click',nextLevel);
	monitor.classList.add("inactive");
	monitor.innerHTML = '';
	shuffleOrder();
}

function gameOver(){
	gameorder = [];
	playerOrder = [];
	
	monitor.innerHTML = `<p>OPS... VOCÊ ERROU<br>MAS TUDO BEM<br>:)<br>VOCÊ FEZ ${score} PONTO(S)<br> - - - <br>CLIQUE AQUI E<br>JOGUE NOVAMENTE</p>`;
	monitor.addEventListener('click',playGame);
	monitor.classList.remove("inactive");
}

function playGame(){
	monitor.removeEventListener('click',playGame);
	score = 0;
	monitor.innerHTML = `<p>BEM-VINDO AO GENIUS<br> - - - <br>CLIQUE AQUI<br>PARA JOGAR</p>`;
	monitor.addEventListener('click',nextLevel);
	monitor.classList.remove("inactive");
}

function playSound(color){
	switch(color){
		case 0:
			sndGreen.currentTime = 0;
			sndGreen.play();
			break;
		case 1:
			sndRed.currentTime = 0;
			sndRed.play();
			break;
		case 2:
			sndYellow.currentTime = 0;
			sndYellow.play();
			break;
		case 3:
			sndBlue.currentTime = 0;
			sndBlue.play();
			break;
	}
}

playGame();

















