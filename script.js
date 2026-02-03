let produtosGlobais = [];

const buscaInput = document.getElementById("busca");
const categoriaSelect = document.getElementById("categoria");

fetch("produtos.json")
  .then(res => res.json())
  .then(produtos => {
    produtosGlobais = produtos;
    renderizar(produtos);
  });

buscaInput.addEventListener("input", filtrar);
categoriaSelect.addEventListener("change", filtrar);

function filtrar() {
  const texto = buscaInput.value.toLowerCase();
  const categoria = categoriaSelect.value;

  const filtrados = produtosGlobais.filter(p => {
    const nomeOk = p.produto.toLowerCase().includes(texto);
    const categoriaOk = categoria === "" || p.categoria === categoria;
    return nomeOk && categoriaOk;
  });

  renderizar(filtrados);
}

function renderizar(lista) {
  const container = document.getElementById("produtos");
  container.innerHTML = "";

  lista.forEach(p => {
    const precos = {
      "PP": p.pp,
      "Alio": p.alio,
      "Irmãos Biagi": p.biagi,
      "Bugança": p.buganca
    };

    const menorPreco = Math.min(...Object.values(precos));

    let html = `<div class="card">
      <h3>${p.produto}</h3>
      <small>${p.categoria}</small>`;

    for (let mercado in precos) {
      const classe = precos[mercado] === menorPreco ? "melhor" : "";
      html += `<div class="preco ${classe}">
        <span>${mercado}</span>
        <span>R$ ${precos[mercado].toFixed(2)}</span>
      </div>`;
    }

    html += `</div>`;
    container.innerHTML += html;
  });
}
