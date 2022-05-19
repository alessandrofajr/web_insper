// define uma variável para selecionar a div board
let scoreboard = document.querySelector( '.board' )

// função para verificar se o gatilho chegou ao topo da página
function escutaScroll(event){
    // A função deve...
    // Pegar a lista de gatilhos
    let gatilhos = document.querySelectorAll(".gatilhos > div");

    // A função deve...
    // Fazer loop pela lista de gatilhos
    for(let gatilho of gatilhos){
        // Para cada um deles, pegar a posição atual
        let posicao = gatilho.getBoundingClientRect();
        // Para cada um deles, pegar o valor da propriedade data-alvo
        let alvo = gatilho.dataset.alvo;
        // Selecionar o elemento reference a este alvo
            // let passo = document.querySelector('.'+alvo);
        // Verificar se o gatilho está acima do topo da página
        if(posicao.top <= 0 && posicao.top > -posicao.height){
            // se sim, altera o texto dentro do elemento
            if (alvo == '0'){
                document.getElementById('score-usa').innerHTML = "0";
                document.getElementById('score-bra').innerHTML = "0";
                document.getElementById('timer').innerHTML = "20:00";
                document.getElementById('which-half').innerHTML = "1";
            }
            else if (alvo == '1'){
                document.getElementById('score-usa').innerHTML = "51";
                document.getElementById('score-bra').innerHTML = "35";
                document.getElementById('timer').innerHTML = "05:25";
                document.getElementById('which-half').innerHTML = "1";
             }

            else if (alvo == '2'){
                document.getElementById('score-usa').innerHTML = "68";
                document.getElementById('score-bra').innerHTML = "54";
                document.getElementById('timer').innerHTML = "00:00";
                document.getElementById('which-half').innerHTML = "1";
             }

            else if (alvo == '3'){               
                document.getElementById('score-usa').innerHTML = "77";
                document.getElementById('score-bra').innerHTML = "73";
                document.getElementById('timer').innerHTML = "14:10";
                document.getElementById('which-half').innerHTML = "2";
             }

            else if (alvo == '4'){
                document.getElementById('score-usa').innerHTML = "81";
                document.getElementById('score-bra').innerHTML = "83";
                document.getElementById('timer').innerHTML = "10:49";
                document.getElementById('which-half').innerHTML = "2";
             }

            else if (alvo == '5'){
                document.getElementById('score-usa').innerHTML = "115";
                document.getElementById('score-bra').innerHTML = "120";
                document.getElementById('timer').innerHTML = "00:00";
                document.getElementById('which-half').innerHTML = "2";
                scoreboard.style.display = 'initial' 
             }
             //ao chegar no 6º alvo, esconde o scoreboard
             else if (alvo == '6'){
                scoreboard.style.display = 'none' 
             }
        }
    }
}

// 2. pede ao navegador para escutar o evento de rolagem da página
window.addEventListener('scroll', escutaScroll);