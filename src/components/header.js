let headerComponent = () => {
  const headerElement = document.querySelector("header");
  if (headerElement) {
    headerElement.innerHTML = `<nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div class="container">
        <a class="navbar-brand" href="../../index.html">
          <img
            src="./assets/image/latte.png"
            alt="Logo"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
            id="image"
          />
          Coffee
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="../../index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./cardapio.html">Cardápio</a>
            </li>

            <li class="nav-item d-none d-lg-block">
                <div class="vr mx-2"></div>
            </li>

            <li class="nav-item hidden">
                <button type="button" class="btn btn-outline-secondary position-relative me-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fas fa-shopping-cart"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        3
                    </span>
                </button>
            </li>
            <li class="nav-item">
                <button class="btn btn-outline-secondary" id="theme-toggle">
                    <i class="fas fa-sun"></i>
                </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>`;

    const themeToggleBtn = headerElement.querySelector('#theme-toggle');
    const htmlElement = document.documentElement;

    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-bs-theme', theme);
        const themeIcon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    };

    // Verifica o tema salvo no localStorage quando o componente é carregado
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Adiciona o evento de clique ao botão
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = htmlElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
  }
};

export default headerComponent;