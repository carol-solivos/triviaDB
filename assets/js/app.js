//https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean
//https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple
const container = document.getElementById('container');
init()
const btnBoolean = document.getElementById('boolean');// boton seleccion verdadero o falso
const btnmultiple = document.getElementById('multiple');// boton seleccion multiple

btnBoolean.addEventListener('click', function () {
	answerBoolean = btnBoolean.value;
	getQuestions(answerBoolean);
})

btnmultiple.addEventListener('click', function () {
	answermultiple = btnmultiple.value;
	getQuestions(answermultiple);
})

function init() {
	container.innerHTML = `<h2>Prueba tus conocimientos</h2>
    <h4>¿Que estilo quieres jugar?</h4>
    <button class="btn" id="multiple" value="multiple">Selección múltiple</button>
    <button id="boolean" class="btn" value="boolean">Verdadero o falso</button>`;
}

function getQuestions(answer){
	//creando objeto con el new
	const qRequest = new XMLHttpRequest();
	//abriendo coneccion con el open
	qRequest.open('GET', `https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=${answer}`);
	qRequest.onload = showQuestions;
	qRequest.onerror = handleError;
	//enviando la peticion
	qRequest.send();
}

function showQuestions(){
	// convertir la respuesta que esta en json en una respuesta javascript
	const data = JSON.parse(this.responseText);
	if (data.results[0].type === 'boolean') {
		booleanQuestions(data);
	}
	if (data.results[0].type === 'multiple') {
		multipleQuestions(data);		
	}	
// console.log(data)
}

function booleanQuestions(data) {
	let points = 0;
	for (let i in data.results){
		const responseQuestion = data.results[i].question;
		const responseAnswer = data.results[i].correct_answer;
		const responseIncorrectAnswer = data.results[i].incorrect_answers;
		container.innerHTML = '';
		container.innerHTML = `<h1 class="">${responseQuestion}</h1><button id="true" class="btn" value="True">true</button><button id="false" class="btn" value="False">false</button>`;
		const btnTrue = document.getElementById('true');
		const btnFalse = document.getElementById('false');
		btnTrue.addEventListener('click', function () {
			if (responseAnswer === btnTrue.val) {
				points = points + 10;
			}
			if (responseAnswer !== btnTrue.val) {
				points = points;
			}
		})	
		
	} return console.log(points)
	
}
	// container.innerHTML = `<h1 class="">Acertaste un ${points}%</h1><button class="btn" value="True">true</button>`;


function multipleQuestions(data) {
	const responseQuestion = data.results[i].question;
	const responseAnswer = data.results[i].correct_answer;
	container.innerHTML = `<h1 class="">${responseQuestion}</h1><button class="btn" value="true">true</button><br><button class="btn" value="false">false</button><br><button class="btn" value="false">false</button><br><button class="btn" value="false">false</button>`;
	
}

// funcion que muestra el mensaje de error 
function handleError () {
  console.log( 'An error occurred 😞' );
}