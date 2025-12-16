
const riddles = [
    { question: "Holaaaa, &iquest;c&oacute;mo te llamas?", answer: "milena" },
    { question: "&iquest;Y tu novio?", answer: "iker" },
    { question: "uy, &iquest;eres mi novia??", answer: "si" },
    { question: "A ver, &iquest; qu&eacute; equipo hacemos?", answer: "ikersito y mimi" },
    { question: "Chiii, &iquest;cu&aacute;l es nuestro mes?", answer: "mayo" },
    { question: "&iquest;Te acuerdas del d&iacute;a de la semana en la que nos dimos nuestro primer beso?", answer: "sabado" },
    { question: "Qu&eacute; recuerdos eeeeh, te quieroooo &iquest;t&uacute; me quieres?", answer: "si" },
    { question: "Segura???", answer: "si" },
    { question: "yomaaaaas, &iquest;Te acuerdas del primer regalo que me diste?", answer: "pulsera" },
    { question: "Qu&eacute; mona jope. &iquest;Qu&eacute; bebida no falta en nuestras meriendas?", answer: "batido" },
    { question: "&iquest;Y comida?", answer: "brownies" },
    { question: "&iquest;A qu&eacute; sitio nos queremos ir de viaje juntos?", answer: "estocolmo" },
    { question: "&iquest;Joe entonces s&iacute; que eres mi novia?", answer: "si" },
    { question: "mmmmm y en qu&eacute; mes es tu cumple", answer: "junio" },
    { question: "Y el d&iacute;a?", answer: "12" },
    { question: "OSTRAS si eso ha sido hace nada, no?", answer: "si" },
    { question: "joeee que no me he preparado nada... A ver, d&eacute;jame improvisar, te apetecen unas adivinanzas?", answer: "si" },
    { question: "Con patas cortas o largas, sobre m&iacute; se come y se trabaja, &iquest;Qu&eacute; soy?", answer: "mesa" },
    { question: "Oleeeeeee, toma esto jsjsjs, cuando quieras seguir escribe te quiero", answer: "te quiero" },
    { question: "Yomaaaaas. Ahora te toca buscar por mi hab, cuando quieras pasar, escribe CUMPLE, prueba:", answer: "cumple" },
    { question: "Mu bien, atenta: En una galleta escondida, palabras sabias encuentras esparcidas", answer: "cumple" },
    { question: "Ni soy grande ni mesa, pero junto a la cama me hallar&aacute;s", answer: "cumple" },
    { question: "En spray estoy guardado, para tu alivio r&aacute;pido he sido creado", answer: "cumple" },
    { question: "En invierno nos usas cuando calor necesitas", answer: "cumple" },
    { question: "Vuelo alto en el cielo, colorido y ligero soy", answer: "cumple" },
    { question: "Bueno ya valeeee que nos tiramos aqu&iacute; todo el d&iacute;a jsjs", answer: "cumple" },
    { question: "A no ser que quieras lo &uacute;ltimo ya del todo. &iquest;Quieres?", answer: "si" },
    { question: "Venga va, cuando un pedo te tires (pedorraaaa), de mi ayuda pides", answer: "cumple" },
    { question: "Oleeeeee, ahora ya s&iacute; que s&iacute; eh que tienes m&aacute;s cosas que hacer", answer: "cumple" },
    { question: "Venga suerte, TE QUIERO", answer: "te quiero" }
];

let currentRiddle = 0;

window.onload = function () {
    document.getElementById('riddle').innerHTML = riddles[currentRiddle].question;
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function checkAnswer() {
    const userAnswer = normalizeString(document.getElementById('answer').value.trim());
    const correctAnswer = normalizeString(riddles[currentRiddle].answer.trim());
    const feedback = document.getElementById('feedback');

    if (userAnswer === correctAnswer) {
        feedback.innerHTML = "Oleeeee";
        feedback.style.color = "green";
        currentRiddle++;

        if (currentRiddle < riddles.length) {
            setTimeout(() => {
                document.getElementById('riddle').innerHTML = riddles[currentRiddle].question;
                document.getElementById('answer').value = '';
                feedback.innerHTML = '';
            }, 2000); // 2s
        } else {
            feedback.innerHTML = "FELICIDADES MI AMOR.<br><br>(Dame un besito y seguimos)";
            document.getElementById('answer').style.display = 'none';
            document.querySelector('button').style.display = 'none';
            setTimeout(() => {
                document.getElementById('next-game').style.display = 'block';
            }, 10000); // 10000ms = 10s
        }
    } else {
        feedback.innerHTML = "Noooo payasa piensa";
        feedback.style.color = "red";
    }
}
