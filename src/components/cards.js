// src/components/cards.js

// Esta função inicializa o componente de cards, gerenciando dados e renderização.
// Ela retorna um objeto com métodos que podem ser chamados de fora.
const initCardsComponent = (limiteCardsVisuais = Infinity) => { // Mantido Infinity para não limitar por padrão
    // --- Funções de Manipulação de localStorage ---
    const carregarProdutos = () => {
        const produtosSalvos = localStorage.getItem("produtosCafeteria");
        return produtosSalvos ? JSON.parse(produtosSalvos) : [];
    };

    const salvarProdutos = (produtos) => {
        localStorage.setItem("produtosCafeteria", JSON.stringify(produtos));
    };

    // --- Array de Produtos Padrão (inicial, se localStorage estiver vazio) ---
    const produtosPadrao = [
        {
            id: 1,
            nome: "Blend da Casa",
            descricao: "Nosso café assinatura. Um blend equilibrado e versátil, desenvolvido para um paladar que aprecia notas de nozes e cacau.",
            preco: "22.90",
            imagem: "./assets/image/secondCard.jpg",
        },
        {
            id: 2,
            nome: "Café Raízes",
            descricao: "Um tributo à terra. Café orgânico de cultivo regenerativo, que preserva o solo e entrega um sabor limpo e verdadeiro.",
            preco: "17.50",
            imagem: "./assets/image/secondCard2.jpg",
        },
        {
            id: 3,
            nome: "Café Brisa da Serra",
            descricao: "Cultivado de forma sustentável em altas altitudes, resultando em uma bebida pura, com acidez delicada e notas florais.",
            preco: "16.90",
            imagem: "./assets/image/coffee1.jpg",
        },
        {
            id: 4,
            nome: "Café Clássico",
            descricao: "Um blend tradicional com notas de chocolate e caramelo.",
            preco: "18.99",
            imagem: "./assets/image/rohan-gupta-tJ8hz_XJchs-unsplash.jpg",
        },
        {
            id: 5,
            nome: "Café Gourmet",
            descricao: "Grãos selecionados com sabor intenso e aroma marcante.",
            preco: "22.99",
            imagem: "./assets/image/coffeProduct2.jpg",
        },
        {
            id: 6,
            nome: "Grão de Ouro",
            descricao: "A joia da nossa seleção. Grãos escolhidos a dedo, com torra mestra que revela um sabor aveludado e aroma inesquecível.",
            preco: "31.50",
            imagem: "./assets/image/coffeeProduct.jpg",
        },
    ];

    // Carrega produtos do localStorage. Se não houver, usa os produtos padrão.
    let produtos = carregarProdutos();
    if (produtos.length === 0) {
        produtos = produtosPadrao;
        salvarProdutos(produtos);
    }

    // --- Referências de Elementos do DOM ---
    const homeCoffeeCardsBody = document.getElementById('home-coffee-cards'); // tbody da tabela
    const besterCoffeeCardsContainer = document.getElementById('bester-coffee-cards'); // div para os cards visuais

    // --- Funções de Renderização ---

    // Renderiza os produtos na tabela
    // Aceita um array opcional de produtos para renderizar
    const renderizarTabelaProdutos = (produtosParaRenderizar = produtos) => { // << Alterado: argumento opcional
        if (homeCoffeeCardsBody) {
            homeCoffeeCardsBody.innerHTML = '';

            if (produtosParaRenderizar.length === 0) {
                homeCoffeeCardsBody.innerHTML = '<tr><td colspan="4" class="text-center">Nenhum produto encontrado.</td></tr>'; // Mensagem ajustada para busca
                return;
            }

            produtosParaRenderizar.forEach(produto => {
                const precoFormatado = parseFloat(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                const rowHTML = `
                    <tr>
                        <th scope="row">${produto.id}</th>
                        <td>${produto.nome}</td>
                        <td>${precoFormatado}</td>
                        <td>${produto.descricao}</td>
                    </tr>
                `;
                homeCoffeeCardsBody.insertAdjacentHTML('beforeend', rowHTML);
            });
        }
    };

    // Renderiza os produtos como cards visuais
    // Aceita um array opcional de produtos para renderizar
    const renderizarCardsVisuais = (produtosParaRenderizar = produtos) => { // << Alterado: argumento opcional
        if (besterCoffeeCardsContainer) {
            besterCoffeeCardsContainer.innerHTML = '';

            if (produtosParaRenderizar.length === 0) {
                besterCoffeeCardsContainer.innerHTML = '<p class="text-center w-100">Nenhum café especial encontrado no momento.</p>'; // Mensagem ajustada
                return;
            }

            // Aplica o limite de cards visuais, se especificado e não for Infinity
            const produtosExibidosComLimite = (limiteCardsVisuais === Infinity) ? produtosParaRenderizar : produtosParaRenderizar.slice(0, limiteCardsVisuais);

            produtosExibidosComLimite.forEach(item => {
                const precoFormatado = parseFloat(item.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

                const cardHTML = `
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="card h-100" data-id="${item.id}">
                            <img src="${item.imagem}" class="card-img-top" alt="${item.nome}">
                            <div class="card-body">
                                <h5 class="card-title">${item.nome}</h5>
                                <p class="card-text text-truncate">${item.descricao}</p>
                                <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-outline-success">${precoFormatado}</button>
                            </div>
                        </div>
                    </div>
                `;
                besterCoffeeCardsContainer.insertAdjacentHTML('beforeend', cardHTML);
            });
        }
    };

    // --- Função para Adicionar um Novo Produto ---
    const adicionarProduto = (novoProdutoData) => {
        const novoId = produtos.length > 0 ? Math.max(...produtos.map(p => p.id)) + 1 : 1;
        const novoProduto = { ...novoProdutoData, id: novoId };

        produtos.push(novoProduto);
        salvarProdutos(produtos);

        renderizarTabelaProdutos(); // Re-renderiza ambos os componentes com a lista completa
        renderizarCardsVisuais();
    };

    // --- Inicialização (Chamada interna ao carregar o componente) ---
    renderizarTabelaProdutos();
    renderizarCardsVisuais();

    // --- Retorna métodos que serão expostos ao `cardapio.js` ---
    return {
        adicionarProduto: adicionarProduto,
        renderizarTabela: renderizarTabelaProdutos, // Agora pode receber um argumento para busca
        renderizarCards: renderizarCardsVisuais,   // Agora pode receber um argumento para busca
        getProdutos: () => produtos // Retorna a lista completa de produtos
    };
};

export default initCardsComponent;