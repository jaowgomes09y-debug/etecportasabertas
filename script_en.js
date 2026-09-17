document.addEventListener("DOMContentLoaded", () => {
    var menuBtn = document.getElementById("menuBtn");
    var menu = document.getElementById("menu");

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

    // Validação do formulário com mensagens em inglês
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
                        if (campo.validity.valueMissing) erro.textContent = "Please fill out this field.";
                        else if (campo.validity.typeMismatch) erro.textContent = "Please enter a valid email address.";
                        else erro.textContent = "Please check this field.";
                    }
                } else if (erro) {
                    erro.textContent = "";
                }
            });

            if (valido) {
                formMsg.textContent = "Review submitted successfully!";
                form.reset();
            } else {
                formMsg.textContent = "";
            }
        });
    }
});