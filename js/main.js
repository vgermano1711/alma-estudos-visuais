// Alma Estudos Visuais — interatividade da página
// Sem dependências externas: navegação mobile, animação de entrada,
// placeholders da galeria e validação do formulário de contato.

(() => {
  "use strict";

  initNavToggle();
  initFadeInOnScroll();
  initGalleryPlaceholders();
  initContactForm();

  function initNavToggle() {
    const toggle = document.getElementById("navToggle");
    const nav = document.getElementById("siteNav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initFadeInOnScroll() {
    const elements = document.querySelectorAll(".fade-in");
    if (!("IntersectionObserver" in window) || elements.length === 0) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // Gera placeholders visuais para a galeria enquanto as obras reais
  // não são adicionadas em assets/obras/. Cada bloco usa um gradiente
  // distinto apenas para diferenciação visual — substitua por <img>
  // reais apontando para os arquivos do estúdio.
  function initGalleryPlaceholders() {
    const gallery = document.getElementById("gallery");
    if (!gallery) return;

    const placeholders = [
      { title: "Obra 01", from: "#7a5c4a", to: "#4f382c" },
      { title: "Obra 02", from: "#9c8271", to: "#6b5344" },
      { title: "Obra 03", from: "#5c4a3c", to: "#2e2118" },
      { title: "Obra 04", from: "#8a6f5b", to: "#3f2c22" },
      { title: "Obra 05", from: "#6f5a4a", to: "#382a20" },
      { title: "Obra 06", from: "#b09a86", to: "#7a5c4a" },
    ];

    gallery.innerHTML = placeholders
      .map(
        (p) => `
        <div class="gallery-item" style="background-image: linear-gradient(160deg, ${p.from}, ${p.to});">
          <span>${p.title}</span>
        </div>
      `
      )
      .join("");
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("formStatus");
    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const mensagem = form.mensagem.value.trim();

      if (!nome || !email || !mensagem) {
        status.textContent = "Preencha todos os campos antes de enviar.";
        return;
      }

      if (!isValidEmail(email)) {
        status.textContent = "Informe um e-mail válido.";
        return;
      }

      // Sem backend configurado neste projeto — integrar com um serviço
      // de envio (ex.: Formspree, EmailJS, endpoint próprio) para
      // processar o envio de fato.
      status.textContent = `Obrigado, ${nome}. Sua mensagem foi registrada localmente (envio real ainda não configurado).`;
      form.reset();
    });
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
})();
