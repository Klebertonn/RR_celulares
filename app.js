const defaultProducts = [
  {
    name: "iPhone 13 128GB",
    category: "Celulares",
    price: "R$ 2.699,00",
    image:
      "https://images.unsplash.com/photo-1592286927505-2fdc8d6f0f1a?auto=format&fit=crop&w=600&q=80",
    tag: "Mais vendido",
  },
  {
    name: "Galaxy A55 5G",
    category: "Celulares",
    price: "R$ 1.899,00",
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80",
    tag: "Novo",
  },
  {
    name: "Película 3D Premium",
    category: "Acessórios",
    price: "R$ 39,90",
    image:
      "https://images.unsplash.com/photo-1609592424634-7e3b8c7d3c19?auto=format&fit=crop&w=600&q=80",
    tag: "Favorito",
  },
  {
    name: "Troca de tela",
    category: "Manutenção",
    price: "A partir de R$ 149,00",
    image:
      "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Capa Antichoque",
    category: "Acessórios",
    price: "R$ 59,90",
    image:
      "https://images.unsplash.com/photo-1603313011108-4e0a2f39c22d?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Limpeza e revisão",
    category: "Manutenção",
    price: "R$ 79,90",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
  },
];
let products =
  JSON.parse(localStorage.getItem("casaAuroraProducts") || "null") ||
  defaultProducts;
let categories =
  JSON.parse(localStorage.getItem("casaAuroraCategories") || "null") || [
    "Celulares",
    "Acessórios",
    "Manutenção",
  ];
let storeSettings =
  JSON.parse(localStorage.getItem("casaAuroraSettings") || "null") || {
    address: "Rua Eduardo Cozac, 119, Loja B, Centro de Sarzedo",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Rua+Eduardo+Cozac+119+Sarzedo",
    phone: "(31) 99596-1377",
    instagram: "",
    facebook: "",
  };
let adminAccount =
  JSON.parse(localStorage.getItem("casaAuroraAdminAccount") || "null") || {
    username: "admin",
    password: "admin123",
    email: "admin@rrcelulares.com.br",
  };
let banners = JSON.parse(
  localStorage.getItem("casaAuroraBanners") || "null",
) || [
  {
    title: "Seu celular, sempre conectado.",
    text: "Encontre aparelhos, acessórios e assistência de confiança.",
    label: "OFERTA DA SEMANA",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    fixed: true,
  },
];
let promotions = JSON.parse(
  localStorage.getItem("casaAuroraPromotions") || "null",
) || [
  {
    title: "Semana do Cliente",
    detail: "10% off em acessórios selecionados",
    code: "CELULAR10",
  },
  {
    title: "Película grátis",
    detail: "Na troca de tela do aparelho",
    code: "TELA10",
  },
];
let events = JSON.parse(localStorage.getItem("casaAuroraEvents") || "null") || [
  {
    title: "Feirão de Celulares",
    date: "12",
    month: "SET",
    detail: "12 de setembro · 9h às 18h",
  },
  {
    title: "Plantão da Assistência",
    date: "28",
    month: "SET",
    detail: "28 de setembro · atendimento especial",
  },
];
const $ = (selector) => document.querySelector(selector);
const save = () => {
  localStorage.setItem("casaAuroraProducts", JSON.stringify(products));
  localStorage.setItem("casaAuroraBanners", JSON.stringify(banners));
  localStorage.setItem("casaAuroraPromotions", JSON.stringify(promotions));
  localStorage.setItem("casaAuroraCategories", JSON.stringify(categories));
  localStorage.setItem("casaAuroraSettings", JSON.stringify(storeSettings));
  localStorage.setItem("casaAuroraAdminAccount", JSON.stringify(adminAccount));
};
function productCard(product, compact = false) {
  const location = product.location
    ? `<a class="location-link" href="${product.location.startsWith("http") ? product.location : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(product.location)}`}" target="_blank" rel="noreferrer">⌖ Ver no Google Maps</a>`
    : "";
  const sale = product.promotionName
    ? `<span class="promotion-tag">${product.promotionName}</span><small class="promotion-period">${product.promotionPeriod || "Oferta especial"} · ${product.promotionPrice || product.price}</small>`
    : "";
  const controls = compact ? "" : `<div class="product-card-actions"><button class="edit-product" data-edit-product="${products.indexOf(product)}">Editar</button><button class="delete-product" data-delete-product="${products.indexOf(product)}">Excluir</button></div>`;
  return `<article class="${compact ? "" : "product-card"}"><div class="product-thumb" style="background-image:url('${product.image || ""}')"><span class="tag">${product.tag || product.category || "Produto"}</span></div><div class="product-info"><strong>${product.name || "Produto sem nome"}<span class="product-price">${product.promotionPrice || product.price || ""}</span></strong><small>${product.category || "Sem categoria"} · Disponível</small>${product.description ? `<p class="product-description">${product.description}</p>` : ""}${sale}${location}</div>${controls}</article>`;
}
function renderProducts() {
  const query = ($("#productSearch")?.value || "").toLowerCase();
  const category = $("#categoryFilter")?.value || "all";
  const filtered = products.filter(
    (p) =>
      (p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)) &&
      (category === "all" || p.category === category),
  );
  $("#productGrid").innerHTML =
    filtered.map((p) => productCard(p)).join("") ||
    '<p class="subtitle">Nenhum produto encontrado.</p>';
  $("#featuredProducts").innerHTML = products
    .slice(0, 3)
    .map((p) => productCard(p, true))
    .join("");
  $("#productNavCount").textContent = products.length;
  $("#activeStat").textContent = products.length + 18;
  renderCategories();
}
function renderCategories() {
  const filter = $("#categoryFilter");
  if (filter) {
    const selected = filter.value || "all";
    filter.innerHTML = '<option value="all">Todas as categorias</option>' + categories.map((category) => `<option>${category}</option>`).join("");
    filter.value = categories.includes(selected) ? selected : "all";
  }
  const list = $("#categoryList");
  if (list) list.innerHTML = categories.map((category, index) => `<span class="category-admin-item">${category}<button type="button" data-delete-category="${index}" aria-label="Excluir categoria">×</button></span>`).join("");
}
function renderSettings() {
  const form = $("#settingsForm");
  if (!form) return;
  Object.entries(storeSettings).forEach(([name, value]) => {
    if (form.elements[name]) form.elements[name].value = value;
  });
  const phone = $("#footerPhone");
  const address = $("#footerAddress");
  const map = $("#footerMapLink");
  const instagram = $("#footerInstagram");
  const facebook = $("#footerFacebook");
  if (phone) {
    phone.textContent = storeSettings.phone ? `☎ ${storeSettings.phone}` : "";
    phone.href = `tel:${(storeSettings.phone || "").replace(/\D/g, "")}`;
  }
  if (address) address.textContent = storeSettings.address || "";
  if (map) {
    map.href = storeSettings.mapLink || "#";
    map.hidden = !storeSettings.mapLink;
  }
  if (instagram) {
    instagram.textContent = storeSettings.instagram ? "Instagram" : "";
    instagram.href = storeSettings.instagram || "#";
    instagram.hidden = !storeSettings.instagram;
  }
  if (facebook) {
    facebook.textContent = storeSettings.facebook ? "Facebook" : "";
    facebook.href = storeSettings.facebook || "#";
    facebook.hidden = !storeSettings.facebook;
  }
}
function renderBanners() {
  $("#bannerSlides").innerHTML = banners
    .map((banner, index) => {
      const parts = banner.title.split(",");
      return `<article class="banner-slide ${index === currentSlide ? "active" : ""}"><div class="banner-image" style="background-image:linear-gradient(90deg,rgba(50,70,54,.1),rgba(50,70,54,.35)),url('${banner.image}')"></div><div class="banner-copy"><span class="live-label">● ${banner.label || "BANNER ATIVO"}</span><h2>${parts[0]}${parts[1] ? `,<br><em>${parts.slice(1).join(",")}</em>` : ""}</h2><p>${banner.text}</p></div></article>`;
    })
    .join("");
  $("#carouselDots").innerHTML = banners
    .map(
      (_, index) =>
        `<button class="carousel-dot ${index === currentSlide ? "active" : ""}" data-slide="${index}" aria-label="Banner ${index + 1}"></button>`,
    )
    .join("");
  $("#bannerManagerList").innerHTML = banners
    .map(
      (banner, index) =>
        `<div class="banner-manager-item"><span class="banner-mini" style="background-image:url('${banner.image}')"></span><span class="banner-manager-copy"><strong>${banner.title}</strong><small>${banner.fixed ? "Banner fixo" : "Banner adicional"}</small></span><button class="edit-banner" data-edit-banner="${index}" aria-label="Editar banner">Editar</button>${banner.fixed ? '<span class="fixed-label">Fixo</span>' : `<button class="remove-banner" data-remove-banner="${index}" aria-label="Remover banner">×</button>`}</div>`,
    )
    .join("");
}
function renderClientBanners() {
  $("#clientBannerSlides").innerHTML = banners
    .map(
      (banner, index) =>
        `<article class="client-banner-slide ${index === currentSlide ? "active" : ""}" style="background-image:linear-gradient(90deg,rgba(28,47,35,.92),rgba(38,61,44,.25)),url('${banner.image}')"><div><span class="live-label">${banner.label || "DESTAQUE DA LOJA"}</span><h1>${banner.title}</h1><p>${banner.text}</p><button class="client-map-button" id="clientMapHeroButton">⌖ Como chegar</button></div></article>`,
    )
    .join("");
  $("#clientBannerDots").innerHTML = banners
    .map(
      (_, index) =>
        `<button class="client-carousel-dot ${index === currentSlide ? "active" : ""}" data-client-slide="${index}" aria-label="Banner ${index + 1}"></button>`,
    )
    .join("");
}
function renderClientMainBanner() {
  return;
}
function renderClientProducts() {
  const query = ($("#clientSearch")?.value || "").toLowerCase();
  const category =
    document.querySelector(".category-chip.active")?.dataset.clientCategory ||
    "all";
  const filtered = products.filter(
    (p) =>
      (p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)) &&
      (category === "all" || p.category === category),
  );
  $("#clientProductGrid").innerHTML =
    filtered
      .map(
        (p) =>
          `<article class="client-product-card"><div class="client-product-image" style="background-image:url('${p.image}')"><span>${p.promotionName || p.tag || p.category}</span></div><div class="client-product-info"><small>${p.category}</small><h3>${p.name}</h3><strong>${p.promotionPrice || p.price}</strong>${p.promotionPrice ? `<del>${p.price}</del>` : ""}${p.promotionName ? `<em class="client-promotion-period">${p.promotionName} · ${p.promotionPeriod || "Oferta especial"}</em>` : ""}<button class="client-detail-button">Ver detalhes →</button></div></article>`,
      )
      .join("") || '<p class="subtitle">Nenhum produto encontrado.</p>';
}
function renderPromotions() {
  const productPromotions = products.filter((product) => product.promotionName);
  $("#promotionList").innerHTML =
    promotions
      .map(
        (p) =>
          `<article class="promotion-card"><span class="promotion-badge">%</span><div><h3>${p.title}</h3><p>${p.detail} · Código ${p.code}</p></div><span class="status">Ativa</span></article>`,
      )
      .join("") +
    productPromotions
      .map(
        (p) =>
          `<article class="promotion-card"><span class="promotion-badge">%</span><div><h3>${p.promotionName}</h3><p>${p.name} · ${p.promotionPeriod || "Oferta especial"} · ${p.promotionPrice}</p></div><span class="status">No produto</span></article>`,
      )
      .join("");
  $("#promoNavCount").textContent =
    promotions.length + productPromotions.length;
  $("#promoStat").textContent = promotions.length + productPromotions.length;
}
function renderEvents() {
  $("#eventGrid").innerHTML = events
    .map(
      (e, i) =>
        `<article class="event-card"><div class="event-color ${i % 2 ? "peach-event" : ""}"><span class="eyebrow" style="color:#e9eee5">EVENTO ESPECIAL</span><h3>${e.title}</h3><span class="event-date"><b>${e.date}</b>${e.month}</span></div><div class="event-body"><p>${e.detail}</p></div></article>`,
    )
    .join("");
  $("#eventNavCount").textContent = events.length;
  $("#eventsStat").textContent = events.length;
}
function showView(name) {
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  $(`#${name}View`).classList.add("active");
  document
    .querySelectorAll(".nav-item")
    .forEach((b) => b.classList.toggle("active", b.dataset.view === name));
  document.body.classList.toggle("public-mode", name === "client");
  $("#pageCrumb").textContent =
    {
      overview: "Visão geral",
      products: "Produtos",
      promotions: "Promoções",
      client: "Catálogo público",
    }[name] || "Catálogo público";
  renderProducts();
  if (name === "client") renderClientProducts();
  if (name === "settings") renderSettings();
}
const formConfigs = {
  product: {
    title: "Cadastrar produto ou serviço",
    subtitle: "Inclua um item na vitrine da sua loja.",
    fields: `<label>Nome do produto ou serviço<input name="name" placeholder="Ex.: Troca de tela iPhone 11"></label><label>Categoria<select name="category" id="productCategoryField"></select></label><label>Preço<input name="price" placeholder="R$ 0,00"></label><label>Descrição<textarea name="description" placeholder="Detalhes do produto ou serviço"></textarea></label><div class="promotion-fields"><span class="form-section-label">PROMOÇÃO DO PRODUTO</span><label>Nome da promoção<input name="promotionName" placeholder="Ex.: Promoção de Natal"></label><label>Preço promocional<input name="promotionPrice" placeholder="Ex.: R$ 2.499,00"></label><label>Período da promoção<input name="promotionPeriod" placeholder="Ex.: 01/12 a 24/12"></label></div><label>Imagem do produto<input name="imageFile" type="file" accept="image/png,image/jpeg,image/webp"><small class="file-hint">Escolha uma imagem ou informe uma URL.</small></label><label>URL alternativa da imagem<input name="image" placeholder="https://..."></label><div class="image-preview" id="imagePreview">Prévia da imagem</div><label>Localização no Google Maps<input name="location" placeholder="Endereço ou link do Maps"></label>`,
  },
  banner: {
    title: "Adicionar banner",
    subtitle: "Crie um novo slide para o catálogo público.",
    fields: `<label>Título do banner<input name="title" placeholder="Ex.: Promoção de Ano Novo"></label><label>Texto do banner<textarea name="text" placeholder="Ex.: Ofertas especiais para começar o ano"></textarea></label><label>Etiqueta<input name="label" placeholder="Ex.: PROMOÇÃO ATIVA"></label><label>Imagem do banner<input name="imageFile" type="file" accept="image/png,image/jpeg,image/webp"><small class="file-hint">Envie uma imagem ou informe uma URL abaixo.</small></label><label>URL alternativa da imagem<input name="image" placeholder="https://..."></label><div class="image-preview" id="imagePreview">Prévia da imagem</div>`,
  },
  promotion: {
    title: "Criar promoção",
    subtitle: "Destaque uma oferta especial para seus clientes.",
    fields: `<label>Nome da promoção<input name="title" required placeholder="Ex.: Promoção de Natal"></label><label>Descrição<input name="detail" required placeholder="Ex.: Desconto em acessórios"></label><label>Código da oferta<input name="code" required placeholder="NATAL10"></label>`,
  },
};
let currentModal = "product";
let uploadedImage = "";
let editingBannerIndex = null;
let editingProductIndex = null;
function openModal(type, itemIndex = null) {
  currentModal = type;
  editingBannerIndex = type === "banner" ? itemIndex : null;
  editingProductIndex = type === "product" ? itemIndex : null;
  uploadedImage = "";
  const config = formConfigs[type];
  const banner = type === "banner" && itemIndex !== null ? banners[itemIndex] : null;
  const product = type === "product" && itemIndex !== null ? products[itemIndex] : null;
  $("#modalTitle").textContent = banner ? "Editar bloco de slide" : config.title;
  $("#modalSubtitle").textContent = config.subtitle;
  $("#formFields").innerHTML = config.fields;
  $("#modalBackdrop").classList.toggle("product-modal-open", type === "product");
  if (type === "product") {
    $("#productCategoryField").innerHTML = categories.map((category) => `<option>${category}</option>`).join("");
  }
  $("#modalBackdrop").classList.add("open");
  if (type === "product" || type === "banner") {
    setupImageUpload();
    if (banner) {
      $("input[name=title]").value = banner.title || "";
      $("input[name=text]").value = banner.text || "";
      $("input[name=label]").value = banner.label || "";
      $("input[name=image]").value = banner.image || "";
      showImagePreview(banner.image);
    }
    if (product) {
      Object.entries(product).forEach(([name, value]) => {
        if ($("[name='" + name + "']")) $("[name='" + name + "']").value = value || "";
      });
      showImagePreview(product.image);
    }
  }
  setTimeout(() => $("#formFields input")?.focus(), 50);
}
function closeModal() {
  $("#modalBackdrop").classList.remove("open");
  $("#modalBackdrop").classList.remove("product-modal-open");
}
function setupImageUpload() {
  const fileInput = $('input[name="imageFile"]');
  const imageUrl = $('input[name="image"]');
  const preview = $("#imagePreview");
  fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      uploadedImage = reader.result;
      showImagePreview(uploadedImage);
    };
    reader.readAsDataURL(file);
  };
  imageUrl.oninput = () => {
    if (!uploadedImage && imageUrl.value) {
      preview.style.backgroundImage = `url('${imageUrl.value}')`;
      preview.classList.add("has-image");
      preview.textContent = "";
    }
  };
}
function showImagePreview(image) {
  const preview = $("#imagePreview");
  if (!preview || !image) return;
  preview.style.backgroundImage = `url('${image}')`;
  preview.classList.add("has-image");
  preview.textContent = "";
}
document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-view]");
  if (nav) showView(nav.dataset.view);
  const modal = e.target.closest("[data-modal]");
  if (modal) openModal(modal.dataset.modal);
  const link = e.target.closest("[data-view-link]");
  if (link) showView(link.dataset.viewLink);
  const publicView = e.target.closest("[data-public-view]");
  if (publicView) window.location.href = "index.html";
  const category = e.target.closest("[data-client-category]");
  if (category) {
    document
      .querySelectorAll(".category-chip")
      .forEach((chip) => chip.classList.remove("active"));
    category.classList.add("active");
    renderClientProducts();
  }
  const remove = e.target.closest("[data-remove-banner]");
  if (remove) {
    banners.splice(Number(remove.dataset.removeBanner), 1);
    currentSlide = Math.min(currentSlide, banners.length - 1);
    save();
    renderBanners();
    showSlide(currentSlide);
  }
  const edit = e.target.closest("[data-edit-banner]");
  if (edit) openModal("banner", Number(edit.dataset.editBanner));
  const editProduct = e.target.closest("[data-edit-product]");
  if (editProduct) openModal("product", Number(editProduct.dataset.editProduct));
  const deleteProduct = e.target.closest("[data-delete-product]");
  if (deleteProduct) {
    products.splice(Number(deleteProduct.dataset.deleteProduct), 1);
    save();
    renderProducts();
    renderClientProducts();
    showToast("Produto excluído.");
  }
  const deleteCategory = e.target.closest("[data-delete-category]");
  if (deleteCategory) {
    categories.splice(Number(deleteCategory.dataset.deleteCategory), 1);
    save();
    renderCategories();
    showToast("Categoria excluída.");
  }
});
document.addEventListener("click", (e) => {
  const section = e.target.closest("[data-public-section]");
  if (!section) return;
  document
    .querySelectorAll(".public-nav-item")
    .forEach((item) => item.classList.toggle("active", item === section));
  if (section.dataset.publicSection === "home")
    window.scrollTo({ top: 0, behavior: "smooth" });
  if (section.dataset.publicSection === "services") {
    showView("client");
    document.querySelector('[data-client-category="Manutenção"]').click();
  }
  if (section.dataset.publicSection === "store") {
    showView("client");
    document
      .querySelector(".client-product-grid")
      .scrollIntoView({ behavior: "smooth" });
  }
  if (section.dataset.publicSection === "contact")
    document
      .querySelector(".site-footer")
      .scrollIntoView({ behavior: "smooth" });
});
$("#headerAddButton").onclick = () => openModal("product");
$("#modalClose").onclick = closeModal;
$("#modalBackdrop").onclick = (e) => {
  if (e.target.id === "modalBackdrop") closeModal();
};
$("#productSearch").oninput = renderProducts;
$("#categoryFilter").onchange = renderProducts;
$("#clientSearch").oninput = renderClientProducts;
$("#clientMapButton").onclick = () =>
  window.open(
    storeSettings.mapLink || "https://www.google.com/maps/search/?api=1&query=Rua+Eduardo+Cozac+119+Sarzedo",
    "_blank",
  );
$("#catalogForm").onsubmit = (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (currentModal === "product") {
    data.image = uploadedImage || data.image || (editingProductIndex !== null ? products[editingProductIndex].image : "");
    delete data.imageFile;
    if (editingProductIndex === null) products.unshift({ ...data, tag: data.promotionName ? "Promoção" : "Novo" });
    else products[editingProductIndex] = { ...products[editingProductIndex], ...data };
  }
  if (currentModal === "banner") {
    data.image = uploadedImage || data.image || (editingBannerIndex !== null ? banners[editingBannerIndex].image : "");
    delete data.imageFile;
    if (editingBannerIndex === null) banners.push(data);
    else banners[editingBannerIndex] = { ...banners[editingBannerIndex], ...data };
    save();
    renderBanners();
  }
  if (currentModal === "promotion") promotions.unshift(data);
  save();
  renderProducts();
  renderPromotions();
  renderClientProducts();
  closeModal();
  showToast("Cadastro salvo com sucesso.");
  e.target.reset();
};
$("#settingsForm").onsubmit = (e) => {
  e.preventDefault();
  storeSettings = Object.fromEntries(new FormData(e.target));
  save();
  showToast("Configurações salvas.");
};
$("#categoryForm").onsubmit = (e) => {
  e.preventDefault();
  const category = new FormData(e.target).get("category").trim();
  if (!category || categories.includes(category)) return;
  categories.push(category);
  save();
  renderCategories();
  e.target.reset();
  showToast("Categoria adicionada.");
};
$("#loginForm").onsubmit = (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  if (data.username !== adminAccount.username || data.password !== adminAccount.password) {
    showToast("Usuário ou senha inválidos.");
    return;
  }
  sessionStorage.setItem("casaAuroraAdminSession", "authenticated");
  $("#loginBackdrop").classList.remove("open");
};
$("#forgotAccessButton").onclick = () => {
  $("#loginBackdrop").classList.remove("open");
  $("#recoveryBackdrop").classList.add("open");
  $("#recoveryFields").hidden = true;
  $("#recoveryForm button[type=submit]").textContent = "Continuar →";
};
$("#backToLoginButton").onclick = () => {
  $("#recoveryBackdrop").classList.remove("open");
  $("#loginBackdrop").classList.add("open");
};
$("#recoveryClose").onclick = () => {
  $("#recoveryBackdrop").classList.remove("open");
  $("#loginBackdrop").classList.add("open");
};
$("#recoveryForm").onsubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form));
  if (data.email.toLowerCase() !== adminAccount.email.toLowerCase()) {
    showToast("E-mail não encontrado.");
    return;
  }
  if (form.elements.newUsername.value && form.elements.newPassword.value) {
    adminAccount = {
      ...adminAccount,
      username: form.elements.newUsername.value.trim(),
      password: form.elements.newPassword.value,
    };
    save();
    form.reset();
    $("#recoveryFields").hidden = true;
    $("#recoveryBackdrop").classList.remove("open");
    $("#loginBackdrop").classList.add("open");
    showToast("Acesso atualizado. Faça login novamente.");
    return;
  }
  $("#recoveryFields").hidden = false;
  $("#recoveryForm button[type=submit]").textContent = "Salvar novo acesso →";
  form.elements.newUsername.focus();
};
$("#logoutButton").onclick = () => {
  sessionStorage.removeItem("casaAuroraAdminSession");
  $("#loginBackdrop").classList.add("open");
};
const mobileMenuToggle = $("#mobileMenuToggle");
const mobileSidebar = document.querySelector(".sidebar");
mobileMenuToggle.onclick = () => {
  const isOpen = mobileSidebar.classList.toggle("menu-open");
  mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
};
document.addEventListener("click", (event) => {
  if (!event.target.closest(".mobile-navigation [data-view], .mobile-navigation [data-public-section]")) return;
  mobileSidebar.classList.remove("menu-open");
  mobileMenuToggle.setAttribute("aria-expanded", "false");
});
function showToast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("show");
  setTimeout(() => $("#toast").classList.remove("show"), 2600);
}
let currentSlide = 0;
function showSlide(index) {
  const slides = document.querySelectorAll(".banner-slide");
  if (!slides.length) return;
  const dots = document.querySelectorAll(".carousel-dot");
  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) =>
    slide.classList.toggle("active", i === currentSlide),
  );
  dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
  renderClientBanners();
}
function nextSlide() {
  showSlide(currentSlide + 1);
}
$("#bannerNext").onclick = nextSlide;
$("#bannerPrevious").onclick = () => showSlide(currentSlide - 1);
$("#clientBannerNext").onclick = nextSlide;
$("#clientBannerPrevious").onclick = () => showSlide(currentSlide - 1);
setInterval(nextSlide, 6000);
document.addEventListener("click", (e) => {
  const dot = e.target.closest("[data-client-slide]");
  if (dot) showSlide(Number(dot.dataset.clientSlide));
});
renderProducts();
renderSettings();
renderPromotions();
renderClientProducts();
renderBanners();
renderClientMainBanner();
renderClientBanners();
renderSettings();
showView("overview");
if (sessionStorage.getItem("casaAuroraAdminSession") === "authenticated") {
  $("#loginBackdrop").classList.remove("open");
}
