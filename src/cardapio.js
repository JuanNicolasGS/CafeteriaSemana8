// src/cardapio.js

// Importa a função de inicialização do componente de cards
import initCardsComponent from "./components/cards.js";
import footerComponent from "./components/footer.js";
import headerComponent from "./components/header.js";

let cardsModule; // Variável para armazenar a instância do módulo de cards

document.addEventListener("DOMContentLoaded", function () {
    // Inicializa componentes de header e footer (assumindo que já existem)
    headerComponent();
    footerComponent();

    // Inicializa o componente de cards e armazena os métodos retornados.
    // Usamos 'Infinity' como limite padrão para que todos os cards visuais apareçam no cardápio.
    cardsModule = initCardsComponent(Infinity);

    // --- Lógica para o Modal de Cadastro de Item ---
    const addModalBootstrap = new bootstrap.Modal(document.getElementById('addModal')); // Instância do modal Bootstrap
    const formCadastrarItem = document.getElementById('form-cadastrar-item');
    const btnSalvarProduto = document.querySelector('.modal-footer .btn-success'); // Botão "Salvar" do modal de cadastro

    // Adiciona o listener para o botão "Salvar" do modal de cadastro
    btnSalvarProduto.addEventListener('click', function() {
        // Coleta os valores dos campos do formulário
        const nome = document.getElementById('nome-produto').value.trim();
        const imagem = document.getElementById('imagem-produto').value.trim();
        let preco = document.getElementById('preco-produto').value.trim();
        const descricao = document.getElementById('descricao-produto').value.trim();

        // Validação básica dos campos
        if (!nome || !preco || !descricao) {
            alert('Por favor, preencha todos os campos obrigatórios: Nome, Preço e Descrição.');
            return; // Interrompe a função se a validação falhar
        }

        // Validação e formatação do preço
        preco = parseFloat(preco);
        if (isNaN(preco) || preco <= 0) {
            alert('Por favor, insira um preço válido (apenas números, maior que zero).');
            return;
        }
        preco = preco.toFixed(2); // Garante 2 casas decimais para o armazenamento

        // Cria o objeto com os dados do novo produto
        const novoProdutoData = {
            nome: nome,
            preco: preco, // Armazena como string numérica formatada
            descricao: descricao,
            imagem: imagem || './assets/image/default-coffee.png' // Usa imagem padrão se o campo estiver vazio
        };

        // Chama a função 'adicionarProduto' do módulo de cards para salvar e re-renderizar
        if (cardsModule && cardsModule.adicionarProduto) {
            cardsModule.adicionarProduto(novoProdutoData);
        } else {
            console.error("Erro: Módulo de cards não inicializado ou função 'adicionarProduto' ausente.");
        }

        // Fecha o modal de cadastro e limpa o formulário
        addModalBootstrap.hide();
        formCadastrarItem.reset();
    });

    // --- Lógica para o Input de Busca (NOVA ADIÇÃO) ---
    const searchInput = document.getElementById('search'); // Pega o elemento do input de busca
    if (searchInput) {
        searchInput.addEventListener('input', function() { // Escuta o evento 'input' (a cada digitação)
            const searchTerm = this.value.trim().toLowerCase(); // Pega o valor, remove espaços e converte para minúsculas
            
            if (cardsModule && cardsModule.getProdutos && cardsModule.renderizarTabela && cardsModule.renderizarCards) {
                const todosOsProdutos = cardsModule.getProdutos(); // Obtém todos os produtos

                // Filtra os produtos com base no termo de busca
                const produtosFiltrados = todosOsProdutos.filter(produto => {
                    return produto.nome.toLowerCase().includes(searchTerm) || produto.descricao.toLowerCase().includes(searchTerm);
                });

                // Re-renderiza a tabela e os cards visuais com os produtos filtrados
                cardsModule.renderizarTabela(produtosFiltrados);
                cardsModule.renderizarCards(produtosFiltrados);
            }
        });
    }

    // --- Opcional: Lógica para o Modal "Comprar Café" (staticBackdrop) ---
    document.addEventListener('click', (event) => {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('btn-outline-success') &&
            clickedElement.dataset.bsToggle === 'modal' &&
            clickedElement.dataset.bsTarget === '#staticBackdrop')
        {
            const cardElement = clickedElement.closest('.card');
            const productId = cardElement ? parseInt(cardElement.dataset.id) : null;

            if (productId !== null && cardsModule && cardsModule.getProdutos) {
                const produtosAtuais = cardsModule.getProdutos();
                const product = produtosAtuais.find(p => p.id === productId);

                if (product) {
                    const buyModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
                    const modalTitle = document.getElementById('staticBackdropLabel');
                    const modalBody = document.querySelector('#staticBackdrop .modal-body');

                    modalTitle.textContent = `Comprar ${product.nome}`;

                    modalBody.innerHTML = `
                        <div class="d-flex flex-column align-items-center">
                            <img src="${product.imagem}" alt="${product.nome}" style="max-width: 150px; height: auto; margin-bottom: 15px; border-radius: 8px;">
                            <p class="text-center"><strong>${product.nome}</strong></p>
                            <p class="text-center">${product.descricao}</p>
                            <p class="text-center fs-4 fw-bold text-success">${parseFloat(product.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                    `;

                    buyModal.show();
                }
            }
        }
    });
});