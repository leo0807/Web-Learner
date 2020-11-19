const quizData = [
    {
        question: "How old is  Florion?",
        a: 10,
        b: 17,
        c: 26,
        d: 110,
        correct: 'c'
    },
    {
        question:'What is the most popular programming language in 2020?',
        a: 'Java',
        b: 'Python',
        c: 'TypeScript',
        d: 'Python',
        correct: 'a' 
    },
    {
        question: 'Who is the President of United States?',
        a: 'Florin Pop',
        b: 'Donald Trump',
        c: 'Ivan Saldano',
        d: 'Mihai Andrei',
        correct: 'b'
    },
    {
        question: 'What does HTML stand for?',
        a: 'Hypertext Markup Language',
        b: 'Cascading Style Sheet',
        c: 'Jason Object Notation',
        d: 'Application Programming Interface',
        correct: 'a'
    },
    {
        question: 'What year was Javascript lanuched?',
        a: '2020',
        b: '2019',
        c: '2018',
        d: 'none of above',
        correct: 'd'
    }
];

const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');


let currentQuestion = 0;

loadQuiz();
function loadQuiz(){
    deSelected();
    const currentQuiz = quizData[currentQuestion];
    questionEl.innerHTML = currentQuiz.question;

    a_text.innerText = currentQuiz.a;
    b_text.innerText = currentQuiz.b;
    c_text.innerText = currentQuiz.c;
    d_text.innerHTML = currentQuiz.d;
}

function getSelected(){
    // console.log(answerEls);
    let answer = undefined;
    answerEls.forEach((answerEl) =>{

        if(answerEl.checked){
            answer = answerEl.id;
        }
    });
    return answer;
}
function deSelected(){
    answerEls.forEach((answerEl) =>{
        answerEl.checked = false;
    });
}
let score = 0;
submitBtn.addEventListener('click', ()=>{
    const returnedAnswer = getSelected();
    if(returnedAnswer){
        if(returnedAnswer === quizData[currentQuestion].correct){
            score++;
        }
        currentQuestion++;
        if(currentQuestion < quizData.length){
            loadQuiz();
        }else{
            quiz.innerHTML = `<h2>You answered correctly at ${score}/${quizData.length}.</h2>`
        }
    } 
});