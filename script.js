document.addEventListener("DOMContentLoaded", () => {
    var menuBtn = document.getElementById("menuBtn");
    var menu = document.getElementById("menu");

    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a[href]");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#")) return;

        const cleanHref = href.split("#")[0];
        const isCreditsPage = cleanHref === "creditos.html" || cleanHref === "creditos_en.html";

        if (cleanHref === currentPage && !isCreditsPage) {
            link.classList.add("ativo");
        } else {
            link.classList.remove("ativo");
        }
    });

    // Menu mobile
    if (menuBtn && menu) {
        menuBtn.addEventListener("click", () => {
            menu.classList.toggle("aberto");
        });
    }

    // Filtro de profissões
    const filtros = document.querySelectorAll(".filtro");
    const profissoes = document.querySelectorAll(".prof-card");

    filtros.forEach(filtro => {
        filtro.addEventListener("click", () => {
            filtros.forEach(f => f.classList.remove("ativo-filtro"));
            filtro.classList.add("ativo-filtro");

            const categoria = filtro.dataset.filter;
            profissoes.forEach(card => {
                card.style.display =
                    categoria === "todos" || card.dataset.category === categoria
                    ? "grid"
                    : "none";
            });
        });
    });

    // Validação do formulário com mensagens em português
    var form = document.getElementById("contactForm");
    var formMsg = document.getElementById("formMsg");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            var valido = true;
            var campos = form.querySelectorAll("input, select, textarea");

            campos.forEach(campo => {
                var erro = campo.parentElement.querySelector(".erro");
                if (!campo.checkValidity()) {
                    valido = false;
                    if (erro) {
                        if (campo.validity.valueMissing) erro.textContent = "Preencha este campo.";
                        else if (campo.validity.typeMismatch) erro.textContent = "Digite um e-mail válido.";
                        else erro.textContent = "Verifique este campo.";
                    }
                } else if (erro) {
                    erro.textContent = "";
                }
            });

            if (valido) {
                formMsg.textContent = "Avaliação enviada com sucesso!";
                form.reset();
            } else {
                formMsg.textContent = "";
            }
        });
    }
});