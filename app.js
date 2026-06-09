/**
 * WORKSHOP: Pensando como um Jogo
 * DESAFIO DOS ALUNOS: Descobrir qual padrão lógico clássico rege este sistema!
 */

// 1. Definição do Estado Inicial do Sistema
let pontuacaoUsuario = 0;
let pontuacaoMaquina = 0;
let interacaoBloqueada = false;

// Estrutura de dados contendo as opções possíveis
const matrizOpcoes = ['esquerda', 'centro', 'direita'];

// 2. Mapeamento de Componentes de Interface (DOM)
const elementoJogador = document.getElementById('jogador');
const elementoGoleiro = document.getElementById('goleiro');
const elementoBola = document.getElementById('bola');
const painelStatus = document.getElementById('game-status');
const areaCampo = document.getElementById('campo-stadium');

const displayJogador = document.getElementById('player-score');
const displayGoleiro = document.getElementById('cpu-score');
const botaoReiniciar = document.getElementById('btn-reset');
const seletoresAcao = document.querySelectorAll('.btn-shoot');

/**
 * Dispara a sequência de eventos e processa as decisões
 */
function executarAcao(escolhaUsuario) {
    if (interacaoBloqueada) return;
    interacaoBloqueada = true;

    limparEstadosVisuais();

    // Sorteio probabilístico para a tomada de decisão da máquina
    const escolhaMaquina = matrizOpcoes[Math.floor(Math.random() * matrizOpcoes.length)];

    // Gatilho da primeira animação física (Deslocamento do Atacante)
    elementoJogador.classList.add('jogador-chutando');

    // Cronograma de execução física das animações (Linha do tempo)
    setTimeout(() => {
        elementoBola.classList.add(`bola-${escolhaUsuario}`);
        elementoGoleiro.classList.remove('goleiro-idle');
        elementoGoleiro.classList.add(`goleiro-${escolhaMaquina}`);

        // Atraso intencional para aguardar o cruzamento dos dados na tela
        setTimeout(() => {
            processarRegraDeNegocio(escolhaUsuario, escolhaMaquina);
        }, 400);

    }, 300);
}

/* ATENÇÃO ALUNOS: Analisem esta função! 
 * Qual é o comportamento lógico/matemático acontecendo aqui? */
function processarRegraDeNegocio(parametroA, parametroB) {

    // CASO 1: Avaliação de Igualdade Absoluta
    if (parametroA === parametroB) {
        pontuacaoMaquina++;
        displayGoleiro.textContent = pontuacaoMaquina;
        painelStatus.textContent = `❌ BLOQUEADO! Ambos os sistemas convergiram para a posição: ${parametroB.toUpperCase()}!`;
        painelStatus.style.color = '#ff5252';
    }
    // CASO 2: Avaliação de Divergência de Parâmetros
    else {
        pontuacaoUsuario++;
        displayJogador.textContent = pontuacaoUsuario;
        painelStatus.textContent = `⚽ SUCESSO! Entrada do usuário: ${parametroA.toUpperCase()} | Resposta da máquina: ${parametroB.toUpperCase()}!`;
        painelStatus.style.color = '#69f0ae';
        areaCampo.classList.add('gol-festa');
    }

    // Retorno ao estado estável do sistema
    setTimeout(() => {
        restaurarInterface();
        interacaoBloqueada = false;
    }, 2000);
}

function limparEstadosVisuais() {
    areaCampo.classList.remove('gol-festa');
    elementoGoleiro.classList.remove('goleiro-esquerda', 'goleiro-centro', 'goleiro-direita');
    elementoBola.classList.remove('bola-esquerda', 'bola-centro', 'bola-direita');
}

function restaurarInterface() {
    limparEstadosVisuais();
    elementoJogador.classList.remove('jogador-chutando');
    elementoGoleiro.classList.add('goleiro-idle');
    painelStatus.textContent = 'AGUARDANDO NOVA TOMADA DE DECISÃO...';
    painelStatus.style.color = 'white';
}

function resetarSistemaCompleto() {
    pontuacaoUsuario = 0;
    pontuacaoMaquina = 0;
    displayJogador.textContent = '0';
    displayGoleiro.textContent = '0';
    restaurarInterface();
    painelStatus.textContent = 'SISTEMA ZERADO. Inicie quando pronto.';
    interacaoBloqueada = false;
}

// 3. Vinculação dos Gatilhos de Evento (Inputs)
seletoresAcao.forEach(botao => {
    botao.addEventListener('click', (e) => {
        const direcaoDefinida = e.target.getAttribute('data-direction');
        executarAcao(direcaoDefinida);
    });
});

botaoReiniciar.addEventListener('click', resetarSistemaCompleto);