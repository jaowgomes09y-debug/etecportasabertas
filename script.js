document.addEventListener("DOMContentLoaded", () => {
    var menuBtn = document.getElementById("menuBtn");
    var menu = document.getElementById("menu");
    var languageBtn = document.getElementById("languageBtn");

    if (menuBtn && menu) {
        menuBtn.addEventListener("click", () => {
            menu.classList.toggle("aberto");
        });
    }

    let idioma = localStorage.getItem("idioma") || "pt";

    function atualizarIdioma() {
        document.querySelectorAll("[data-pt][data-en]").forEach(elemento => {
            elemento.innerHTML = idioma === "pt" ? elemento.dataset.pt : elemento.dataset.en;
        });

        document.documentElement.lang = idioma === "pt" ? "pt-BR" : "en";
        if (languageBtn) languageBtn.textContent = idioma === "pt" ? "EN" : "PT";
    }

    if (languageBtn) {
        languageBtn.addEventListener("click", () => {
            idioma = idioma === "pt" ? "en" : "pt";
            localStorage.setItem("idioma", idioma);
            atualizarIdioma();
        });
    }

    atualizarIdioma();

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

    // Validação do formulário
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
                formMsg.textContent = idioma === "pt"
                    ? "Avaliação enviada com sucesso!"
                    : "Review submitted successfully!";
                form.reset();
            } else {
                formMsg.textContent = "";
            }
        });
    }
});
