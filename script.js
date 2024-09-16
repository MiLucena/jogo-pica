document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const gameDiv = document.getElementById('game');
    const questionDiv = document.getElementById('question');
    const optionsDiv = document.getElementById('options');
    const levelDiv = document.getElementById('level');
    const backgroundMusic = document.getElementById('backgroundMusic');

    // Perguntas sobre sobrevivência e escolhas no universo de "The Last of Us"
    const questions = [
        {
            question: 'Você encontrou um abrigo em uma área deserta. O que você faz primeiro?',
            options: [
                'Explora o interior em busca de suprimentos.',
                'Constrói barricadas para se proteger.',
                'Procura uma fonte de água nas proximidades.',
                'Procura um local mais seguro.',
            ],
            answer: 2 // Melhor opção para sobrevivência
        },
        {
            question: 'Você está sendo perseguido por um grupo de inimigos. Qual é a melhor maneira de escapar?',
            options: [
                'Atacar os inimigos e tentar derrotá-los.',
                'Buscar um esconderijo e esperar até que eles se afastem.',
                'Correr sem parar até encontrar um local seguro.',
                'Tentar negociar com eles e oferecer seus recursos.',
            ],
            answer: 1 // Melhor opção para sobreviver com segurança
        },
        {
            question: 'Você encontra uma mochila abandonada. O que você faz?',
            options: [
                'Verifica rapidamente o conteúdo e continua a jornada.',
                'Leva a mochila com você, mas fica atento a armadilhas.',
                'Ignora a mochila e segue seu caminho.',
                'Procura sinais de que alguém pode ter deixado a mochila como uma armadilha.',
            ],
            answer: 3 // Melhor opção para evitar armadilhas
        },
        {
            question: 'Em um ambiente urbano devastado, onde é mais seguro procurar recursos?',
            options: [
                'Em edifícios altos e abandonados.',
                'Em veículos abandonados na estrada.',
                'Em lojas e supermercados que ainda parecem intactos.',
                'Em áreas residenciais onde os recursos podem estar escondidos.',
            ],
            answer: 2 // Melhor lugar para encontrar suprimentos
        },
        {
            question: 'Você está com fome e encontra um campo de cultivo abandonado. O que você faz?',
            options: [
                'Colhe e consome os alimentos disponíveis.',
                'Procura sinais de que o local foi contaminado.',
                'Deixa os alimentos onde estão e continua procurando em outro lugar.',
                'Constrói uma pequena área de cultivo para garantir um suprimento futuro.',
            ],
            answer: 1 // Melhor opção para evitar contaminação
        },
        {
            question: 'Qual é a prioridade ao encontrar um novo grupo de sobreviventes?',
            options: [
                'Oferece ajuda e tenta se aliar ao grupo.',
                'Mantém distância e observa o comportamento deles.',
                'Tenta estabelecer uma negociação para obter recursos.',
                'Evita contato e segue em outra direção.',
            ],
            answer: 1 // Melhor opção para garantir a segurança
        },
        {
            question: 'Você encontrou um mapa que indica uma área segura, mas está a vários dias de viagem. O que você faz?',
            options: [
                'Decide partir imediatamente para a área segura.',
                'Analisa o mapa e planeja a viagem cuidadosamente.',
                'Ignora o mapa e continua sua rotina atual.',
                'Procura mais informações antes de decidir partir.',
            ],
            answer: 1 // Melhor opção para garantir uma viagem segura
        },
        {
            question: 'Você está em um confronto com um inimigo e tem a chance de usar uma arma improvisada. O que você faz?',
            options: [
                'Usa a arma improvisada para ganhar vantagem.',
                'Tenta desarmar o inimigo e negociar uma trégua.',
                'Foge do confronto e procura outro caminho.',
                'Usa suas habilidades de furtividade para evitar o confronto.',
            ],
            answer: 3 // Melhor opção para evitar confronto desnecessário
        },
        {
            question: 'Você encontra um suprimento médico em um local de perigo. O que você faz?',
            options: [
                'Pega o suprimento e corre para um local seguro.',
                'Verifica se o local é seguro antes de pegar o suprimento.',
                'Ignora o suprimento e continua sua jornada.',
                'Tenta avaliar se o suprimento pode ser uma armadilha.',
            ],
            answer: 1 // Melhor opção para garantir a segurança ao pegar suprimentos
        },
        {
            question: 'Qual é a melhor maneira de se proteger durante uma tempestade?',
            options: [
                'Procura abrigo em um edifício robusto.',
                'Constrói um abrigo improvisado com materiais encontrados.',
                'Fica ao ar livre e tenta se proteger com roupas.',
                'Viaja rapidamente para um local mais seguro.',
            ],
            answer: 0 // Melhor opção para proteção contra tempestades
        },
        {
            question: 'Você encontra uma área com sinais de infecção recente. O que você faz?',
            options: [
                'Investiga a área em busca de sobreviventes.',
                'Evita a área e procura um caminho alternativo.',
                'Marca a área no seu mapa e continua explorando.',
                'Tenta desinfetar a área para tornar o local seguro.',
            ],
            answer: 1 // Melhor opção para evitar riscos de infecção
        }
    ];

    let currentLevel = 0;

    function showQuestion(level) {
        const question = questions[level];
        questionDiv.textContent = question.question;
        optionsDiv.innerHTML = '';

        question.options.forEach((option, idx) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'option-button';
            button.addEventListener('click', () => handleOptionClick(idx, question.answer));
            optionsDiv.appendChild(button);
        });

        levelDiv.textContent = `Nível: ${level + 1}`;
    }

    function handleOptionClick(selectedIndex, correctIndex) {
        if (selectedIndex === correctIndex) {
            if (currentLevel + 1 >= questions.length) {
                questionDiv.textContent = 'Você completou todos os níveis! Parabéns!';
                optionsDiv.innerHTML = '';
                restartButton.classList.remove('hidden');
            } else {
                currentLevel++;
                showQuestion(currentLevel);
            }
        } else {
            questionDiv.textContent = 'Resposta errada. Tente novamente!';
            optionsDiv.innerHTML = '';
            setTimeout(() => showQuestion(currentLevel), 2000); // Repetir a pergunta após 2 segundos
        }
    }

    function restartGame() {
        currentLevel = 0;
        showQuestion(currentLevel);
        restartButton.classList.add('hidden');
    }

    startButton.addEventListener('click', () => {
        startButton.classList.add('hidden');
        gameDiv.classList.remove('hidden');
        showQuestion(currentLevel);
    });

    restartButton.addEventListener('click', restartGame);
});

