// ================================================
// SPLASH E SLIDESHOWS
// ================================================
let splashSlideIndex = 0;
const splashSlides = document.querySelectorAll('.splash-slide');
function nextSplashSlide() { if(splashSlides.length){ splashSlides[splashSlideIndex].classList.remove('active'); splashSlideIndex = (splashSlideIndex+1)%splashSlides.length; splashSlides[splashSlideIndex].classList.add('active'); } }
if(splashSlides.length) setInterval(nextSplashSlide, 4000);

let heroSlideIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
function nextHeroSlide() { if(heroSlides.length){ heroSlides[heroSlideIndex].classList.remove('active'); heroSlideIndex = (heroSlideIndex+1)%heroSlides.length; heroSlides[heroSlideIndex].classList.add('active'); } }
if(heroSlides.length) setInterval(nextHeroSlide, 5000);

function entrar() { document.getElementById('splash').style.display = 'none'; document.getElementById('mainSite').classList.add('show'); }

// ================================================
// CONFIGURAÇÕES
// ================================================
let settingsOpen = false;
function toggleSettings() { const panel = document.getElementById('settingsPanel'); settingsOpen = !settingsOpen; panel.classList.toggle('show', settingsOpen); }

function toggleTheme() {
    const body = document.body;
    if(body.classList.contains('light')){
        body.classList.remove('light');
        body.classList.add('dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
    }
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
}

function mudarFonte(fonte) {
    const body = document.body;
    body.classList.remove('font-default','font-moderna','font-classica','font-futurista','font-natureza');
    body.classList.add(`font-${fonte}`);
    localStorage.setItem('fonte', fonte);
}

function resetarConfiguracoes() {
    document.body.classList.remove('dark'); document.body.classList.add('light');
    document.body.classList.remove('font-moderna','font-classica','font-futurista','font-natureza');
    document.body.classList.add('font-default');
    localStorage.setItem('theme', 'light'); localStorage.setItem('fonte', 'default');
    alert('✅ Configurações resetadas para o padrão!');
}

const savedTheme = localStorage.getItem('theme');
const savedFonte = localStorage.getItem('fonte');
if(savedTheme === 'dark') document.body.classList.add('dark');
if(savedFonte && savedFonte !== 'default') document.body.classList.add(`font-${savedFonte}`);

// ================================================
// MENU MOBILE
// ================================================
let mobileMenuOpen = false;
function toggleMobileMenu() { const tabs = document.getElementById('tabsContainer'); mobileMenuOpen = !mobileMenuOpen; tabs.classList.toggle('mobile-show', mobileMenuOpen); }

function mudarTab(tabId, element) {
    if(mobileMenuOpen) toggleMobileMenu();
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    element.classList.add('active');
}

// ================================================
// SIMULADOR
// ================================================
let simState = { agua: 'consciente', energia: 'limpa', plantio: 'sustentavel' };
function simular(cat, val, btn) {
    simState[cat] = val;
    btn.parentElement.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    let lucro = 100000, impacto = "Médio", agua = 70;
    if(simState.agua === 'consciente'){ agua = 45; lucro += 15000; } else { agua = 90; lucro -= 5000; impacto = "Alto"; }
    if(simState.energia === 'limpa'){ lucro += 20000; if(impacto === "Alto") impacto = "Médio"; else impacto = "Baixo"; } else { lucro -= 10000; impacto = "Alto"; agua += 5; }
    if(simState.plantio === 'sustentavel'){ lucro += 25000; if(impacto === "Alto") impacto = "Médio"; else impacto = "Baixo"; agua -= 12; } else { lucro -= 8000; impacto = "Alto"; agua += 15; }
    agua = Math.min(100, Math.max(20, agua));
    let estrelas = impacto === "Baixo" ? "★★★★★" : (impacto === "Médio" ? "★★★☆☆" : "★☆☆☆☆");
    document.getElementById('lucro').innerHTML = `R$ ${lucro.toLocaleString()}`;
    document.getElementById('impacto').innerHTML = impacto;
    document.getElementById('agua').innerHTML = `${Math.floor(agua)}%`;
    document.getElementById('estrelas').innerHTML = estrelas;
}
setTimeout(() => {
    document.querySelectorAll('.opt-group:first-child .opt-btn')[0]?.classList.add('active');
    document.querySelectorAll('.opt-group:nth-child(2) .opt-btn')[0]?.classList.add('active');
    document.querySelectorAll('.opt-group:last-child .opt-btn')[0]?.classList.add('active');
}, 100);

// ================================================
// QUIZ (5 PERGUNTAS)
// ================================================
const perguntas = [
    { texto: "❓ Qual tecnologia utiliza sensores para irrigação precisa e reduz desperdício de água em até 60%?", opts: ["Drone Agrícola", "Irrigação Inteligente", "Trator Autônomo", "Biotecnologia"], correta: 1, dica: "💡 DICA: Pense em um sistema que entrega água direto na raiz da planta, gota a gota!" },
    { texto: "❓ Qual prática agrícola ajuda a recuperar solos degradados e sequestrar carbono da atmosfera?", opts: ["Monocultura", "Agricultura Regenerativa", "Queimada controlada", "Uso excessivo de fertilizantes"], correta: 1, dica: "💡 DICA: É uma prática que devolve vida ao solo, usando técnicas como plantio direto e adubação verde!" },
    { texto: "❓ Qual fonte de energia renovável é mais vantajosa para propriedades rurais remotas?", opts: ["Carvão Mineral", "Energia Solar", "Diesel", "Gás Natural"], correta: 1, dica: "💡 DICA: Vem do sol e não precisa de fios elétricos até a propriedade!" },
    { texto: "❓ O que são bioinsumos na agricultura sustentável?", opts: ["Produtos químicos tóxicos", "Defensivos naturais à base de organismos vivos", "Agrotóxicos sintéticos", "Fertilizantes industriais"], correta: 1, dica: "💡 DICA: São produtos feitos com fungos, bactérias ou insetos benéficos que combatem pragas naturalmente!" },
    { texto: "❓ Qual o benefício da rotação de culturas?", opts: ["Empobrece o solo", "Aumenta pragas", "Melhora a fertilidade do solo", "Reduz biodiversidade"], correta: 2, dica: "💡 DICA: Plantar diferentes culturas em sequência evita que o solo perca nutrientes específicos!" }
];
let perguntaAtual = 0, respostasUsuario = [], quizFinalizado = false;

function carregarQuiz() {
    if(quizFinalizado) return;
    const q = perguntas[perguntaAtual];
    document.getElementById('pergunta').innerHTML = `🧠 ${q.texto}`;
    const container = document.getElementById('quizOptions');
    container.innerHTML = '';
    q.opts.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt';
        btn.innerHTML = `${String.fromCharCode(65+idx)}) ${opt}`;
        btn.onclick = () => {
            if(respostasUsuario[perguntaAtual] !== undefined){ document.getElementById('quizFeedback').innerHTML = '<span style="color:#c44536;">⚠️ Você já respondeu!</span>'; return; }
            respostasUsuario[perguntaAtual] = idx;
            document.getElementById('quizFeedback').innerHTML = idx === q.correta ? '<span style="color:#2d8c5a;">✅ Correto!</span>' : `<span style="color:#c44536;">❌ Errado! ${q.dica}</span>`;
            document.querySelectorAll('.quiz-opt').forEach(opt => opt.style.opacity = '0.5');
        };
        container.appendChild(btn);
    });
    if(respostasUsuario[perguntaAtual] !== undefined) document.querySelectorAll('.quiz-opt').forEach(opt => opt.style.opacity = '0.5');
}

function proximaPergunta() {
    if(quizFinalizado) return;
    if(respostasUsuario[perguntaAtual] === undefined){ document.getElementById('quizFeedback').innerHTML = '<span style="color:#c44536;">⚠️ Responda primeiro!</span>'; return; }
    if(perguntaAtual+1 < perguntas.length){ perguntaAtual++; carregarQuiz(); }
    else finalizarQuiz();
}

function finalizarQuiz() {
    quizFinalizado = true;
    let acertos = 0;
    for(let i=0;i<perguntas.length;i++) if(respostasUsuario[i] === perguntas[i].correta) acertos++;
    const porcentagem = (acertos/perguntas.length)*100;
    let classificacao = porcentagem >= 80 ? "🌿 EXPERT EM SUSTENTABILIDADE! 🏆" : (porcentagem >= 50 ? "🌱 BOM TRABALHO! Continue aprendendo! 💚" : "📚 Que tal estudar mais com o Agribot? Vamos melhorar! 🌍");
    document.getElementById('quizPontuacao').innerHTML = `📊 Pontuação: ${porcentagem.toFixed(0)}%`;
    document.getElementById('quizAcertos').innerHTML = `✅ Acertos: ${acertos}`;
    document.getElementById('quizErros').innerHTML = `❌ Erros: ${perguntas.length-acertos}`;
    document.getElementById('quizClassificacao').innerHTML = classificacao;
    document.getElementById('quizResultadoArea').style.display = 'block';
    document.getElementById('pergunta').style.display = 'none';
    document.getElementById('quizOptions').style.display = 'none';
    document.getElementById('nextQuizBtn').style.display = 'none';
}

function reiniciarQuiz() { perguntaAtual = 0; respostasUsuario = []; quizFinalizado = false; document.getElementById('quizResultadoArea').style.display = 'none'; document.getElementById('pergunta').style.display = 'block'; document.getElementById('quizOptions').style.display = 'flex'; document.getElementById('nextQuizBtn').style.display = 'inline-block'; carregarQuiz(); }
carregarQuiz();

// ================================================
// AGRIBOT - APENAS DICAS (SEM RESPOSTAS PRONTAS)
// ================================================
function responderBot(pergunta) {
    const p = pergunta.toLowerCase();
    
    if(p.includes('dica pergunta 1') || (p.includes('pergunta 1') && p.includes('dica'))) {
        return "💡 *DICA PERGUNTA 1:*\n\n" + perguntas[0].dica + "\n\n🌟 Pense em algo que entrega água direto na raiz da planta!";
    }
    if(p.includes('dica pergunta 2') || (p.includes('pergunta 2') && p.includes('dica'))) {
        return "💡 *DICA PERGUNTA 2:*\n\n" + perguntas[1].dica + "\n\n🌱 Essa prática devolve vida ao solo usando técnicas naturais!";
    }
    if(p.includes('dica pergunta 3') || (p.includes('pergunta 3') && p.includes('dica'))) {
        return "💡 *DICA PERGUNTA 3:*\n\n" + perguntas[2].dica + "\n\n☀️ O sol é a chave para essa energia!";
    }
    if(p.includes('dica pergunta 4') || (p.includes('pergunta 4') && p.includes('dica'))) {
        return "💡 *DICA PERGUNTA 4:*\n\n" + perguntas[3].dica + "\n\n🦠 Feitos com fungos, bactérias ou insetos benéficos!";
    }
    if(p.includes('dica pergunta 5') || (p.includes('pergunta 5') && p.includes('dica'))) {
        return "💡 *DICA PERGUNTA 5:*\n\n" + perguntas[4].dica + "\n\n🔄 Alternar culturas ajuda o solo a não ficar cansado!";
    }
    
    if(p.includes('quiz') || p.includes('dica para o quiz') || p.includes('me dê uma dica sobre o quiz')) {
        return "📚 *DICAS PARA ESTUDAR PARA O QUIZ:*\n\n" +
               "Aqui estão dicas (sem dar a resposta direta!):\n\n" +
               "❓ **Pergunta 1:** " + perguntas[0].dica + "\n\n" +
               "❓ **Pergunta 2:** " + perguntas[1].dica + "\n\n" +
               "❓ **Pergunta 3:** " + perguntas[2].dica + "\n\n" +
               "❓ **Pergunta 4:** " + perguntas[3].dica + "\n\n" +
               "❓ **Pergunta 5:** " + perguntas[4].dica + "\n\n" +
               "💡 Use as dicas e você vai conseguir acertar! Boa sorte! 🌟";
    }
    
    if(p.includes('simulador') || p.includes('dica para o simulador')) {
        return "📊 *DICAS PARA VOCÊ GANHAR NO SIMULADOR!* 📊\n\n" +
               "Para ter o MELHOR RESULTADO (Lucro alto + Impacto Baixo):\n\n" +
               "✅ **ÁGUA:** Escolha USO CONSCIENTE (economiza 45% de água)\n" +
               "✅ **ENERGIA:** Escolha ENERGIA LIMPA (Solar/Biomassa)\n" +
               "✅ **PLANTIO:** Escolha SUSTENTÁVEL (Rotação de culturas)\n\n" +
               "🌟 *RESULTADO:* Lucro ~R$160.000 | Impacto BAIXO | 5 ESTRELAS!\n\n" +
               "⚠️ Se escolher opções não sustentáveis, seu impacto sobe e lucro cai!";
    }
    
    if(p.includes('agricultura sustentável') || p.includes('sustentabilidade')) {
        return "🌿 *AGRICULTURA SUSTENTÁVEL EXPLICADA* 🌿\n\n" +
               "É um sistema que PRODUZ alimentos de forma RESPONSÁVEL, preservando o meio ambiente!\n\n" +
               "🔹 *PRINCÍPIOS:*\n" +
               "• Reduzir desperdício de água e recursos\n" +
               "• Proteger o solo contra erosão\n" +
               "• Usar bioinsumos (defensivos naturais)\n" +
               "• Rotacionar culturas para não empobrecer o solo\n\n" +
               "🔹 *BENEFÍCIOS:*\n" +
               "• Solo mais fértil por mais tempo\n" +
               "• Menos poluição dos rios\n" +
               "• Alimentos mais saudáveis\n" +
               "• Futuro garantido para próximas gerações! 🌍";
    }
    
    if(p.includes('energia solar')) {
        return "☀️ *ENERGIA SOLAR NO CAMPO* ☀️\n\n" +
               "A energia solar é PERFEITA para propriedades rurais porque:\n\n" +
               "✅ REDUZ custos com eletricidade (economia de até 90%!)\n" +
               "✅ É RENOVÁVEL e não polui (zero emissão de carbono)\n" +
               "✅ Traz AUTONOMIA para áreas remotas (sem depender da rede)\n" +
               "✅ Perfeita para: irrigação, cercas elétricas, refrigeração do leite\n\n" +
               "💡 *CURIOSIDADE:* Uma fazenda solar pode economizar mais de R$30.000 por ano!";
    }
    
    if(p.includes('água') || p.includes('economizar água') || p.includes('reduzir água')) {
        return "💧 *COMO ECONOMIZAR ÁGUA NA LAVOURA* 💧\n\n" +
               "🌟 *TÉCNICAS EFICIENTES:*\n\n" +
               "1. **IRRIGAÇÃO INTELIGENTE** (gotejamento) → economiza até 60% de água!\n" +
               "2. **SENSORES DE SOLO** → irrigam só quando necessário\n" +
               "3. **CAPTAÇÃO DE ÁGUA DA CHUVA** → aproveite a natureza\n" +
               "4. **PLANTIO DIRETO NA PALHA** → mantém a umidade do solo\n" +
               "5. **ROTAÇÃO DE CULTURAS** → melhora a retenção de água\n\n" +
               "🌱 *RESULTADO:* Plantações mais saudáveis e conta de água reduzida!";
    }
    
    if(p.includes('tecnologias') || p.includes('tecnologia do futuro')) {
        return "🔬 *TECNOLOGIAS DO FUTURO PARA O CAMPO* 🔬\n\n" +
               "🚁 **DRONE AGRÍCOLA** → monitora pragas e saúde das plantas\n" +
               "💧 **IRRIGAÇÃO INTELIGENTE** → água só onde precisa\n" +
               "☀️ **ENERGIA SOLAR** → energia limpa e gratuita\n" +
               "📊 **SENSORES DE SOLO** → dados em tempo real\n" +
               "🚜 **TRATORES AUTÔNOMOS** → dirigem sozinhos com GPS\n" +
               "🧬 **BIOTECNOLOGIA** → sementes resistentes a pragas\n\n" +
               "🌟 Essas tecnologias estão REVOLUCIONANDO o campo brasileiro!";
    }
    
    return "🌱 *AGRIBOT - SEU ASSISTENTE DE ESTUDOS* 🌱\n\n" +
           "Posso te ajudar com:\n\n" +
           "📖 *'Me dê uma dica sobre o quiz'* → dicas para estudar (sem dar a resposta!)\n" +
           "📊 *'Dica para o simulador'* → como vencer no jogo\n" +
           "🌿 *'O que é agricultura sustentável?'* → conceitos importantes\n" +
           "☀️ *'Benefícios da energia solar'* → vantagens para o campo\n" +
           "💧 *'Como economizar água?'* → dicas práticas\n" +
           "🔬 *'Tecnologias do futuro'* → inovações no agro\n\n" +
           "Pergunte o que quiser! 🚀";
}

function enviarMensagem() {
    const input = document.getElementById('chatInput');
    const texto = input.value.trim();
    if(!texto) return;
    
    const chat = document.getElementById('chatArea');
    chat.innerHTML += `<div style="margin:8px 0; text-align:right;"><strong>👤 Você:</strong> ${texto}</div>`;
    const resposta = responderBot(texto).replace(/\n/g, '<br>');
    chat.innerHTML += `<div style="margin:8px 0; text-align:left;"><strong>🤖 Agribot:</strong><br><div class="chat-message-bot">${resposta}</div></div>`;
    chat.scrollTop = chat.scrollHeight;
    input.value = '';
}

function perguntaRapida(texto) {
    const chat = document.getElementById('chatArea');
    chat.innerHTML += `<div style="margin:8px 0; text-align:right;"><strong>👤 Você:</strong> ${texto}</div>`;
    const resposta = responderBot(texto).replace(/\n/g, '<br>');
    chat.innerHTML += `<div style="margin:8px 0; text-align:left;"><strong>🤖 Agribot:</strong><br><div class="chat-message-bot">${resposta}</div></div>`;
    chat.scrollTop = chat.scrollHeight;
}

// EASTER EGG
let eggCount = 0;
function ativarEasterEgg() {
    eggCount++;
    if(eggCount === 5) {
        eggCount = 0;
        const msg = document.createElement('div');
        msg.innerHTML = "🎉 PARABÉNS! VOCÊ ENCONTROU O EASTER EGG! 🎉<br>🌱 Você é um verdadeiro explorador do AgroFuturo! 🌟";
        msg.style.position = "fixed";
        msg.style.top = "50%";
        msg.style.left = "50%";
        msg.style.transform = "translate(-50%, -50%)";
        msg.style.background = "#2d8c5a";
        msg.style.color = "white";
        msg.style.padding = "30px";
        msg.style.borderRadius = "30px";
        msg.style.zIndex = "10000";
        msg.style.textAlign = "center";
        msg.style.fontSize = "1.3rem";
        msg.style.fontWeight = "bold";
        msg.style.boxShadow = "0 10px 40px rgba(0,0,0,0.3)";
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
    }
}

document.addEventListener('click', function(event) {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const tabs = document.getElementById('tabsContainer');
    if(mobileMenuOpen && !tabs.contains(event.target) && !menuBtn.contains(event.target)) toggleMobileMenu();
});
