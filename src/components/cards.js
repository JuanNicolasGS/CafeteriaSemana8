let cards = (limite = 6) => {
  let items = [
    {
      src: "./assets/image/secondCard.jpg",
      title: "Blend da Casa",
      description:
        "Nosso café assinatura. Um blend equilibrado e versátil, desenvolvido para um paladar que aprecia notas de nozes e cacau.",
      price: "$ 22,90",
    },
    {
      src: "./assets/image/secondCard2.jpg",
      title: "Café Raízes",
      description:
        "Um tributo à terra. Café orgânico de cultivo regenerativo, que preserva o solo e entrega um sabor limpo e verdadeiro.",
      price: "R$ 17,50",
    },
    {
      src: "./assets/image/coffee1.jpg",
      title: "Café Brisa da Serra",
      description:
        "Cultivado de forma sustentável em altas altitudes, resultando em uma bebida pura, com acidez delicada e notas florais.",
      price: "R$ 16,90",
    },

    {
      src: "./assets/image/rohan-gupta-tJ8hz_XJchs-unsplash.jpg",
      title: "Café Clássico",
      description: "Um blend tradicional com notas de chocolate e caramelo.",
      price: "R$ 18,99",
    },
    {
      src: "./assets/image/coffeProduct2.jpg",
      title: "Café Gourmet",
      description: "Grãos selecionados com sabor intenso e aroma marcante.",
      price: "R$ 22,99",
    },
    {
      src: "./assets/image/coffeeProduct.jpg",
      title: "Grão de Ouro",
      description:
        "A joia da nossa seleção. Grãos escolhidos a dedo, com torra mestra que revela um sabor aveludado e aroma inesquecível.",
      price: "R$ 31,50",
    },

    
  ];

  const card = document.querySelector("#bester-coffee-cards");
  const itemsToShow = items.slice(0, limite);

  for (let item of itemsToShow) {
    card.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="col-md-4 mb-3">
            <div class="card">
              <img
                src="${item.src}"
                class="card-img-top"
                alt="${item.title}"
              />
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text text-truncate">
                  ${item.description}
                </p>
                <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-outline-success">${item.price}</button>
              </div>
            </div>
          </div>
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Comprar Café</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="container d-flex flex-row justify-content-between ">
                <i class="fa fa-code"></i>
                <p>WIP</p>
                <i class="fa fa-code"></i>

                </div>
                
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-success">Comprar</button>
              </div>
            </div>
          </div>
        </div>
        `
    );
  }
};

export default cards;
