let billionaires = document.querySelectorAll('img') //variável para selecionar as imagens dos bilionários
let question = document.querySelector( '.question' ) //variável para selecionar o bloco de texto que apresenta dados e pergunta
let alternatives = document.querySelectorAll( 'li' ) //variável para selecionar as opções de resposta
let result //declara variável que será usada para dizer se usuário acertou ou errou
let answer //declara variável que mostrará a resposta certa
let options //declara variável que permitirá mudar quais opções aparecem no quiz
let selectedBillionaire //declara variável que guarda qual bilionário foi escolhido
let inactiveBillionaires = document.querySelector( '.billionaires' ) //variável que guarda qual bilionário foi escolhido e impede mudança
let musk = document.querySelector( '.Musk' ) //variável que seleciona a classe da img do bilionário escolhido para colocar borda ao redor da foto após clique
let bezos = document.querySelector( '.Bezos' ) //variável que seleciona a classe da img do bilionário escolhido para colocar borda ao redor da foto após clique
let arnault = document.querySelector( '.Arnault' ) //variável que seleciona a classe da img do bilionário escolhido para colocar borda ao redor da foto após clique
let playAgain = document.querySelector( '.play-again' ) //variável que seleciona a classe que mostra o botão de jogar novamente
let billionaireWealth

let userInput = document.querySelectorAll('input')
let userCalc = document.querySelectorAll('output')

userInput.forEach(input => input.addEventListener('input', validate))

function validate() {

    // Pega a string que foi digitada
    let valor = userInput.value 
    
    // Força a conversão para número inteiro
    valor = parseInt( valor )
  
    // Se valor for maior que 0
    if ( valor > 0 ) {
      calculate( valor )
    }

    console.log(billionaireWealth)
  
}

function calculate( valor ) {
    let userWealth = (valor / 5) * 12
    let wealth = billionaireWealth / userWealth
    mostrar(wealth)
    console.log(billionaireWealth)
}

function mostrar( yearsFortune ) {
    userCalc.textContent = yearsFortune
}

function checkBillionaire(event) {

    let billionaires = event.target
    selectedBillionaire = billionaires.className //guarda o nome da classe do bilionário escolhido
    answer = document.querySelector( '.answer-' + selectedBillionaire) //seleciona a classe .answer do bilionário correspondete
    options = document.querySelector( '.options-' + selectedBillionaire) 

    if (billionaires.classList.contains('Musk')) {
        question.style.display = 'initial' //exibe a pergunta do Musk. Há mudanças para cada bilionário
        options.style.display = 'initial' //exibe as opções para o Musk. Há mudanças para cada bilionário
        inactiveBillionaires.classList.add('inactive') //desativa a opção de clicar em outro bilionário
        musk.classList.add( 'img-clicked' ) //coloca a borda no bilionário selecionado
        document.getElementById('person').innerHTML = "Elon Musk"; //altera o corpo do texto que descreve a fortuna
        document.getElementById('money').innerHTML = "US$ 219 bilhões";
        document.getElementById('company').innerHTML = "Tesla";
        document.getElementById('person1').innerHTML = "Elon Musk";
        billionaireWealth = 219000000000
    }   else if (billionaires.classList.contains('Bezos')) {
        question.style.display = 'initial' 
        options.style.display = 'initial'
        inactiveBillionaires.classList.add('inactive')
        bezos.classList.add( 'img-clicked' )
        document.getElementById('person').innerHTML = "Jeff Bezos";
        document.getElementById('money').innerHTML = "US$ 171 bilhões";
        document.getElementById('company').innerHTML = "Amazon";
        document.getElementById('person1').innerHTML = "Jeff Bezos";
        billionaireWealth = 119000000000
    }   else if(billionaires.classList.contains('Arnault')) {
        question.style.display = 'initial' 
        options.style.display = 'initial'
        inactiveBillionaires.classList.add('inactive')
        arnault.classList.add( 'img-clicked' )
        document.getElementById('person').innerHTML = "Bernard Arnault";
        document.getElementById('money').innerHTML = "US$ 158 bilhões";
        document.getElementById('company').innerHTML = "LVMH (Louis Vuitton)";
        document.getElementById('person1').innerHTML = "Bernard Arnault";
        billionaireWealth = 19000000000
}
console.log(billionaireWealth)

}

for (let billionaire of billionaires){
    billionaire.addEventListener('click', checkBillionaire)
} // procura por cliques nas fotos dos bilionários

function checkAnswer(event) {
    let alternative = event.target
    alternative.classList.add( 'clicked' ) // adiciona classe que altera cor das opções após clique
    options.classList.add( 'quiz-clicked' ) //impede novos cliques nas opções do quiz
    playAgain.style.display = 'flex' // muda o display para exibir o botão de jogar de novo
    
    result = document.querySelector( '.result-' + selectedBillionaire) // seleciona a classe do bilionário correspondente

    if ( alternative.classList.contains( 'correct' ) ) {
        answer.style.display = 'initial' // mostra o infográfico do bilionário correspondente
        result.textContent = 'Acertou!' // mostra se a pessoa acertou
    
      } else {
        let correctAlternativeMusk = document.querySelector('.EMusk');
        let correctAlternativeBezos = document.querySelector('.JBezos');
        let correctAlternativeArnault = document.querySelector('.BArnault');
        correctAlternativeMusk.classList.add( 'clicked' )
        correctAlternativeBezos.classList.add( 'clicked' )
        correctAlternativeArnault.classList.add( 'clicked' )
        answer.style.display = 'initial'
        result.textContent = 'Errou!'
      }    
}
for (let alternative of alternatives){
    alternative.addEventListener('click', checkAnswer)
} // procura por cliques nas alternativas do quiz


// Adiciona função de recarregar a página em um botão
let refreshButton = document.querySelector('.refresh-button');

let refreshPage = () => {
    location.reload();
}

refreshButton.addEventListener('click', refreshPage)