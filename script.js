
// ELEMENTOS
const abertura = document.getElementById("abertura");
const convite = document.getElementById("convite");
const botaoAbrir = document.getElementById("abrirConvite");

const paginas = document.querySelectorAll(".pagina");
const botaoAnterior = document.getElementById("paginaAnterior");
const botaoProxima = document.getElementById("proximaPagina");
const numeroPagina = document.getElementById("numeroPagina");

let paginaAtual = 0;

// DATA E HORÁRIO DA FESTA
// 06 de dezembro de 2026, às 16h, horário de Brasília.
const dataFesta = new Date("2026-12-06T16:00:00-03:00").getTime();

// MOSTRAR PÁGINA
function mostrarPagina(indice) {
  if (indice < 0 || indice >= paginas.length) {
    return;
  }

  paginaAtual = indice;

  paginas.forEach((pagina, index) => {
    pagina.classList.toggle("ativa", index === paginaAtual);
  });

  botaoAnterior.disabled = paginaAtual === 0;

  botaoProxima.disabled = paginaAtual === paginas.length - 1;

  numeroPagina.textContent = `${paginaAtual + 1} de ${paginas.length}`;
}

// ABRIR CONVITE
botaoAbrir.addEventListener("click", () => {
  abertura.style.display = "none";
  convite.classList.remove("escondido");

  mostrarPagina(0);
});

// BOTÃO VOLTAR
botaoAnterior.addEventListener("click", () => {
  mostrarPagina(paginaAtual - 1);
});

// BOTÃO PRÓXIMA
botaoProxima.addEventListener("click", () => {
  mostrarPagina(paginaAtual + 1);
});

// NAVEGAÇÃO PELO TECLADO
document.addEventListener("keydown", (event) => {
  if (convite.classList.contains("escondido")) {
    return;
  }

  if (event.key === "ArrowRight") {
    mostrarPagina(paginaAtual + 1);
  }

  if (event.key === "ArrowLeft") {
    mostrarPagina(paginaAtual - 1);
  }
});

// CONTAGEM REGRESSIVA
function atualizarContagem() {
  const agora = new Date().getTime();
  const distancia = dataFesta - agora;

  const dias = document.getElementById("dias");
  const horas = document.getElementById("horas");
  const minutos = document.getElementById("minutos");
  const segundos = document.getElementById("segundos");
  const mensagem = document.getElementById("mensagemContagem");

  if (distancia <= 0) {
    dias.textContent = "00";
    horas.textContent = "00";
    minutos.textContent = "00";
    segundos.textContent = "00";

    mensagem.textContent = "Chegou o grande dia! Vamos comemorar! 🤠";
    return;
  }

  const quantidadeDias = Math.floor(
    distancia / (1000 * 60 * 60 * 24)
  );

  const quantidadeHoras = Math.floor(
    (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  const quantidadeMinutos = Math.floor(
    (distancia % (1000 * 60 * 60)) / (1000 * 60)
  );

  const quantidadeSegundos = Math.floor(
    (distancia % (1000 * 60)) / 1000
  );

  dias.textContent = String(quantidadeDias).padStart(2, "0");
  horas.textContent = String(quantidadeHoras).padStart(2, "0");
  minutos.textContent = String(quantidadeMinutos).padStart(2, "0");
  segundos.textContent = String(quantidadeSegundos).padStart(2, "0");
}

// ATUALIZA A CONTAGEM A CADA SEGUNDO
atualizarContagem();
setInterval(atualizarContagem, 1000);

// INICIA NA PRIMEIRA PÁGINA
mostrarPagina(0);
