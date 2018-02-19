//https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean
//https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple

const btnBoolean = document.getElementById('boolean');// boton seleccion verdadero o falso
const btnmultiple = document.getElementById('multiple');// boton seleccion multiple
const container = document.getElementById('container');
btnBoolean.addEventListener('click', function () {
	answerBoolean = btnBoolean.value;
	getQuestions(answerBoolean);
})
btnmultiple.addEventListener('click', function () {
	answermultiple = btnmultiple.value;
	getQuestions(answermultiple);
})
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
	container.innerHTML = '';
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
	const responseQuestion = data.results[i].question;
	const responseAnswer = data.results[i].correct_answer;
	container.innerHTML = `<h1 class="">${responseQuestion}</h1><button class="btn" value="true">true</button><button class="btn" value="false">false</button>`;
}

function multipleQuestions(data) {
	const responseQuestion = data.results[i].question;
	const responseAnswer = data.results[i].correct_answer;
	container.innerHTML = `<h1 class="">${responseQuestion}</h1><button class="btn" value="true">true</button><br><button class="btn" value="false">false</button><br><button class="btn" value="false">false</button><br><button class="btn" value="false">false</button>`;
	
}

// funcion que muestra el mensaje de error 
function handleError () {
  console.log( 'An error occurred 😞' );
}