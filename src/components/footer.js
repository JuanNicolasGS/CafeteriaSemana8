let footerComponent = () => {
    const footerElement = document.querySelector("footer");
    if (footerElement) {
        footerElement.innerHTML = `<div class="container text-center text-md-start">
        <div class="row">
          <div class="col-md-4 col-lg-5 mx-auto mt-3">
            <h5 class="text-uppercase mb-4 fw-bold">Coffee</h5>
            <p>
              Apaixonados por transformar os melhores grãos em momentos
              inesquecíveis. Nossa seleção passa por um rigoroso processo para
              garantir sabor e aroma em cada xícara.
            </p>
          </div>

          <div class="col-md-4 col-lg-3 mx-auto mt-3">
            <h5 class="text-uppercase mb-4 fw-bold">Contato</h5>
            <p><i class="fas fa-home me-3"></i>Rua do Café, 46, PB</p>
            <p><i class="fas fa-envelope me-3"></i>coffee@coffee.com.br</p>
            <p><i class="fas fa-phone me-3"></i>(83) 98750-2604</p>
          </div>

          <div class="col-md-4 col-lg-3 mx-auto mt-3">
            <h5 class="text-uppercase mb-4 fw-bold">Siga-nos</h5>
            <a
              href="https://github.com/JuanNicolasGS"
              class="btn btn-outline-light btn-floating m-1"
              target="_blank"
              role="button"
              ><i class="fab fa-github"></i
            ></a>
            <a
              href="https://wa.me/5583987502604"
              class="btn btn-outline-light btn-floating m-1"
              target="_blank"
              role="button"
              ><i class="fab fa-whatsapp"></i
            ></a>
            <a
              href="https://www.instagram.com/nickz.hg/"
              class="btn btn-outline-light btn-floating m-1"
              target="_blank" 
              role="button"
              ><i class="fab fa-instagram"></i
            ></a>
          </div>
        </div>

        <hr class="my-4" />

        <div class="text-center py-2">
          <p>
            © 2025 Copyright:
            <a href="#" class="text-white">Coffee.com.br</a>
          </p>
        </div>
        <hr class="my-4" />
        <div>
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="../../index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./cardapio.html">Cardápio</a>
            </li>

          </ul>
        </div>
      </div>`;
    }
};

export default footerComponent;