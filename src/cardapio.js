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
    // REMOVIDO O LIMITE: Agora todos os cards serão exibidos, não apenas 6.
    // Se quiser um limite específico, pode passar initCardsComponent(X) onde X é o número.
    cardsModule = initCardsComponent(); 

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

    // --- Opcional: Lógica para o Modal "Comprar Café" (staticBackdrop) ---
    // Este listener é adicionado ao documento para capturar cliques nos botões "Comprar"
    // de forma delegada, ou seja, funciona para cards existentes e novos.
    document.addEventListener('click', (event) => {
        // Verifica se o elemento clicado é o botão "Comprar" do card
        const clickedElement = event.target;
        if (clickedElement.classList.contains('btn-outline-success') &&
            clickedElement.dataset.bsToggle === 'modal' &&
            clickedElement.dataset.bsTarget === '#staticBackdrop')
        {
            // Encontra o elemento pai '.card' para obter o ID do produto
            const cardElement = clickedElement.closest('.card');
            const productId = cardElement ? parseInt(cardElement.dataset.id) : null;

            // Se um ID válido foi encontrado e o módulo de cards está pronto
            if (productId !== null && cardsModule && cardsModule.getProdutos) {
                const produtosAtuais = cardsModule.getProdutos(); // Obtém a lista atual de produtos
                const product = produtosAtuais.find(p => p.id === productId); // Encontra o produto pelo ID

                // Se o produto foi encontrado, preenche e exibe o modal de compra
                if (product) {
                    const buyModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
                    const modalTitle = document.getElementById('staticBackdropLabel');
                    const modalBody = document.querySelector('#staticBackdrop .modal-body'); // Onde está o "WIP"

                    // Atualiza o título do modal
                    modalTitle.textContent = `Comprar ${product.nome}`;

                    // Atualiza o corpo do modal com detalhes do produto
                    // Você pode estilizar isso com mais CSS para ficar mais bonito
                    modalBody.innerHTML = `
                        <div class="d-flex flex-column align-items-center">
                            <img src="${product.imagem}" alt="${product.nome}" style="max-width: 150px; height: auto; margin-bottom: 15px; border-radius: 8px;">
                            <p class="text-center"><strong>${product.nome}</strong></p>
                            <p class="text-center">${product.descricao}</p>
                            <p class="text-center fs-4 fw-bold text-success">${parseFloat(product.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                    `;

                    buyModal.show(); // Exibe o modal
                }
            }
        }
    });
});