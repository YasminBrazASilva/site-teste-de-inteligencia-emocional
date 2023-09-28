
const botaoComecar = document.getElementById('botaoComecar');
const grupoIntroducao = document.getElementById('grupoIntroducao');
const grupoDetalheUsuario = document.getElementById('grupoDetalheUsuario');
const botaoOk = document.getElementById('ok');
const grupoPerguntas = document.getElementById('grupoPerguntas');
const afirmacao = document.getElementById('afirmacao');
const grupoOpcoes = document.getElementById('grupoOpcoes');
const opcoes = document.querySelectorAll('.circulo');
const botaoProxima = document.getElementById('botaoProxima');
const botaoEnviar = document.getElementById('botaoEnviar');
const grupoProgresso = document.getElementById('grupoProgresso');
const barraProgresso = document.getElementById('barraProgresso');
const progressoDetalhe = document.getElementById('progressoDetalhe');
const grupoResultado = document.getElementById('grupoResultado');

let dados = {};
let indiceQuestaoAtual = 0;
const respostasSelecionadas = [];

const questoes = { 
    1: "Estou ciente das minhas reações físicas (gestos, dores, mudanças súbitas) que sinalizam uma reação emocional 'visceral'.",
    2: "Eu admito meus erros de bom grado e peço desculpas.",
    3: "Eu não me apego aos problemas, raiva ou mágoa do passado e sou capaz de deixá-los para trás e seguir adiante.",
    4: "Eu geralmente tenho uma ideia exata de como a outra pessoa me percebe quando estamos interagindo.",
    5: "Tem várias coisas importantes na minha vida em que fico empolgada e deixo isso latente em minhas ações.",
    6: "Eu tenho facilidade de conhecer ou iniciar conversas com estranhos quando preciso.",
    7: "Eu faço uma pausa ou uso outro método ativo para aumentar meu nível de energia quando percebo que está diminuindo.",
    8: "Não costumo demorar muito tempo para assumir riscos prudentes.",
    9: "Procuro ter abertura com as pessoas de maneira polida, mas o suficiente para não dar a impressão de estar sendo frio e distante.",
    10: "Eu posso ser participativo na interação com outra pessoa e conseguir ter uma boa percepção dos sinais não verbais que ela me envia.",
    11: "Não é incomum que outras pessoas digam que se sentem inspirados e encorajados depois de conversar comigo.",
    12: "Eu não tenho nenhuma dificuldade em fazer uma apresentação para um grupo ou liderar uma reunião.",
    13: "Todos os dias eu dedico um tempo para refletir sobre algo.",
    14: "Eu costumo tomar a iniciativa e sigo em frente com as tarefas que precisam ser realizadas.",
    15: "Eu costumo abster-me de formar uma opinião sobre as questões e somente expressar-me quando sei de todos os fatos.",
    16: "Tenho várias pessoas a quem posso recorrer e pedir ajuda quando tenho necessidade.",
    17: "Eu tento encontrar o lado positivo em qualquer situação.",
    18: "Sinto-me capaz de enfrentar com calma, serenidade e proativamente as manifestações emocionais de outras pessoas.",
    19: "Geralmente sou capaz de identificar o tipo de emoção que estou sentindo.",
    20: "De forma geral me sinto confortável quando estou diante de novas situações.",
    21: "Eu não escondo minha raiva, mas também, não desconto nos outros.",
    22: "Eu sou empático e demonstro meus sentimentos quando estou com outras pessoas.",
    23: "Apesar de encontrar obstáculos à frente, eu sou capaz de avançar em projetos importantes que realizo.",
    24: "Mesmo que as pessoas não concordem comigo, me sinto respeitado e tenho apreço por isso.",
    25: "Eu tenho clareza sobre meus próprios objetivos e valores.",
    26: "Eu expresso meus pontos de vista com honestidade e de forma ponderada sem sentir que é uma sobrecarga.",
    27: "Eu posso controlar meu humor e raramente demonstrarei emoções negativas em meu trabalho.",
    28: "Eu concentro toda a minha atenção na outra pessoa demonstrando escuta ativa.",
    29: "Acredito que o trabalho que faço todos os dias faz sentido e agrega valor à sociedade.",
    30: "Eu consigo persuadir de forma efetiva os outros para que adotem meu ponto de vista sem que se sintam coagidos."
};

const qtdeQuestoes = Object.keys(questoes).length;

botaoComecar.addEventListener('click', () => {
    comecar();
});

function comecar() {
    ocultarElemento(botaoComecar);
    ocultarElemento(grupoIntroducao);
    exibirElemento(grupoDetalheUsuario);
};

function ocultarElemento(elemento) {
    elemento.classList.add('oculto');
};

function exibirElemento(elemento) {
    elemento.classList.remove('oculto');
};

botaoOk.addEventListener('click', () => {
    const nomeCompletoResposta = document.getElementById('nomeCompleto').value;
    const emailResposta = document.getElementById('email').value;
    const empresaResposta = document.getElementById('empresa').value;

    if (!nomeCompletoResposta || !emailResposta || !empresaResposta) {
        alert('Por favor, preencha todas as informações.');
        return;
    }

    salvarDados("nomeCompleto", nomeCompletoResposta);
    salvarDados("email", emailResposta);
    salvarDados("empresa", empresaResposta)
    iniciarTeste();
});

function salvarDados(titulo, objeto) {
    dados[titulo] = objeto;
};

function iniciarTeste() {
    ocultarElemento(grupoDetalheUsuario);

    exibirElemento(grupoProgresso);
    exibirElemento(grupoPerguntas);
    mostrarQuestao(0);
};

function mostrarQuestao(indiceQuestaoAtual) {
    atualizarTextoHTML(grupoPerguntas.innerHTML, '');
    removerSelecaoAnterior();

    afirmacao.textContent = questoes[indiceQuestaoAtual + 1];
    
    exibirElemento(grupoPerguntas);

    opcoes.forEach((opcao, indiceOpcao) => {
        opcao.addEventListener('click', () => {
            removerSelecaoAnterior();
            opcao.classList.add('selecionada');
            armazenarResposta(indiceOpcao+1); 
        });
    });
};

function atualizarTextoHTML(elemento, texto) {
    elemento.innerHTML = texto;
};

function adicionarElementoHTMLFilho(pai, filho) {
    pai.appendChild(filho);
};

function removerSelecaoAnterior() {
    const alternativaJaSelecionada = document.querySelector('.selecionada');
    if (alternativaJaSelecionada) {
        alternativaJaSelecionada.classList.remove('selecionada');
    }
};

function armazenarResposta(indiceSelecionado) {
    respostasSelecionadas[indiceQuestaoAtual] = indiceSelecionado;
    chamarBotaoAvancar();
};

function chamarBotaoAvancar() {
    const indiceUltimaPergunta = qtdeQuestoes - 1;

    if (indiceQuestaoAtual < indiceUltimaPergunta) {
        exibirElemento(botaoProxima);
    } else {
        exibirElemento(botaoEnviar);
    }
};

botaoProxima.addEventListener('click', () => {
    avancarQuestao();
});

function avancarQuestao() {
    indiceQuestaoAtual++;
    ocultarElemento(botaoProxima);

    if (indiceQuestaoAtual < qtdeQuestoes) {
        mostrarQuestao(indiceQuestaoAtual);
        atualizarProgresso();
    }  
};

function atualizarProgresso() {
    const progressoAtual = (indiceQuestaoAtual / qtdeQuestoes) * 100;
    progressoDetalhe.textContent = `${progressoAtual.toFixed(1)}%`;
    barraProgresso.value = progressoAtual;
};

botaoEnviar.addEventListener('click', () => {
    finalizarTeste();
});

function finalizarTeste() {
    ocultarElemento(botaoEnviar);
    ocultarElemento(grupoPerguntas);
    ocultarElemento(grupoProgresso);
    imprimirOResultado();
    enviarDadosParaPlanilha(dados);
};


function enviarDadosParaPlanilha(dados) {
    fetch('https://script.google.com/macros/s/AKfycbx6lP5VqmmTrtlB_Mo3jG_-wwxWNkFrwlgWMRW7ZR2O3S8E-G3TQenCARSrKSj-mDek/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(dados)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data.result);
        })
        .catch(error => {
            console.error('Erro ao armazenar os dados na planilha:', error);
        });
};



// CÁLCULOS PARA IDENTIFICAR O NÍVEL DE IE DO USUÁRIO
const competencias = {
    "C": ["autoconsciencia", "Autoconsciência"],
    "E": ["empatia", "Empatia"],
    "N": ["autoconfianca", "Autoconfiança"],
    "M": ["motivacao", "Motivação"],
    "T": ["autocontrole", "Autocontrole"],
    "S": ["competenciaSocial", "Competência social"]
};

const questoesCompetencias = {
    1: "C",
    2: "N",
    3: "T",
    4: "E",
    5: "M",
    6: "S",
    7: "C",
    8: "N",
    9: "T",
    10: "E",
    11: "M",
    12: "S",
    13: "C",
    14: "N",
    15: "T",
    16: "E",
    17: "M",
    18: "S",
    19: "C",
    20: "N",
    21: "T",
    22: "E",
    23: "M",
    24: "S",
    25: "C",
    26: "N",
    27: "T",
    28: "E",
    29: "M",
    30: "S"
};

function imprimirOResultado() {
    resultado = somarValores();
    
    Object.keys(resultado).forEach((competenciaLetra) => {
        const dadosCompetencia = competencias[competenciaLetra];
        const grupoCompetencia = document.getElementById(dadosCompetencia[0]);
        
        salvarDados(dadosCompetencia[0], resultado[competenciaLetra]);

        grupoCompetencia.querySelector('progress').value = resultado[competenciaLetra]; 
        grupoCompetencia.querySelector('div').textContent = `${resultado[competenciaLetra]} pontos`


    });

    exibirElemento(grupoResultado);
};

function somarValores() {
    const resultado = {};

    for (let i = 0; i < qtdeQuestoes; i++) {
        const resposta = respostasSelecionadas[i];
        salvarDados(`pergunta${i+1}`, resposta);

        const competencia = questoesCompetencias[i + 1];
        if (competencia in resultado) {
            resultado[competencia] += resposta;
        } else {
            resultado[competencia] = resposta;
        }
    };

    return resultado;
};