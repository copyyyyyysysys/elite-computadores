// Lógica global do E-commerce - Elite Computadores
document.addEventListener('DOMContentLoaded', () => {
  // Inicializações Globais
  initCart();
  initHeroSlider();
  initCatalog();
  initFAQ();
  initMobileMenu();
});

// ==========================================================================
// 1. SACOLA DE ORÇAMENTOS (CARRINHO LOCALSTORAGE)
// ==========================================================================
let cart = [];

function initCart() {
  const storedCart = localStorage.getItem('elite_cart');
  if (storedCart) {
    try {
      // Sanitização básica dos dados lidos do localStorage
      const parsed = JSON.parse(storedCart);
      if (Array.isArray(parsed)) {
        cart = parsed.filter(item => {
          return item && typeof item.id === 'number' && typeof item.quantity === 'number';
        });
      }
    } catch (e) {
      cart = [];
    }
  }
  updateCartUI();

  // Event Listeners dos botões de abrir/fechar sacola
  const triggers = document.querySelectorAll('.cart-trigger');
  const closeBtn = document.getElementById('cart-close');
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');

  if (triggers) {
    triggers.forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.preventDefault();
        toggleCart(true);
      });
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleCart(false));
  }

  if (overlay) {
    overlay.addEventListener('click', () => toggleCart(false));
  }

  // Interceptar clicks globais para botões de "Adicionar ao Orçamento"
  document.body.addEventListener('click', e => {
    const addBtn = e.target.closest('.btn-add-to-cart');
    if (addBtn) {
      e.preventDefault();
      const id = parseInt(addBtn.getAttribute('data-id'), 10);
      if (id) {
        addToCart(id);
        toggleCart(true); // Abre a sacola ao adicionar
      }
    }
  });
}

function toggleCart(open) {
  const overlay = document.getElementById('cart-overlay');
  const drawer = document.getElementById('cart-drawer');
  if (overlay && drawer) {
    if (open) {
      overlay.classList.add('active');
      drawer.classList.add('active');
    } else {
      overlay.classList.remove('active');
      drawer.classList.remove('active');
    }
  }
}

function addToCart(productId) {
  // Busca o produto na base
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      image: product.image,
      quantity: 1
    });
  }
  saveCart();
}

function updateCartQuantity(productId, delta) {
  const item = cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  saveCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function saveCart() {
  localStorage.setItem('elite_cart', JSON.stringify(cart));
  updateCartUI();
}

// Atualizar interface visual da sacola
function updateCartUI() {
  const badges = document.querySelectorAll('.cart-badge');
  const itemsContainer = document.getElementById('cart-items');
  const checkoutBtn = document.getElementById('cart-checkout-btn');

  // Calcula total de itens
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Atualiza badges do header
  badges.forEach(badge => {
    badge.textContent = totalQty;
    badge.style.display = totalQty > 0 ? 'flex' : 'none';
  });

  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<div class="cart-empty-message">Sua sacola está vazia. Adicione produtos do catálogo!</div>';
    if (checkoutBtn) checkoutBtn.style.display = 'none';
    return;
  }

  if (checkoutBtn) checkoutBtn.style.display = 'block';

  // Renderização segura sem innerHTML bruto de dados externos
  itemsContainer.innerHTML = '';
  cart.forEach(item => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    
    // Imagem
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.title;
    img.className = 'cart-item-img';
    itemEl.appendChild(img);

    // Detalhes
    const info = document.createElement('div');
    info.className = 'cart-item-info';
    
    const title = document.createElement('div');
    title.className = 'cart-item-title';
    title.textContent = item.title; // Seguro: texto plano
    info.appendChild(title);

    const qty = document.createElement('div');
    qty.className = 'cart-item-qty';

    // Botão Menos
    const btnMinus = document.createElement('button');
    btnMinus.className = 'qty-btn';
    btnMinus.textContent = '-';
    btnMinus.addEventListener('click', () => updateCartQuantity(item.id, -1));
    qty.appendChild(btnMinus);

    const qtyText = document.createElement('span');
    qtyText.textContent = item.quantity;
    qty.appendChild(qtyText);

    // Botão Mais
    const btnPlus = document.createElement('button');
    btnPlus.className = 'qty-btn';
    btnPlus.textContent = '+';
    btnPlus.addEventListener('click', () => updateCartQuantity(item.id, 1));
    qty.appendChild(btnPlus);

    info.appendChild(qty);
    itemEl.appendChild(info);

    // Botão Remover
    const btnRemove = document.createElement('button');
    btnRemove.className = 'cart-item-remove';
    btnRemove.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`;
    btnRemove.addEventListener('click', () => removeFromCart(item.id));
    itemEl.appendChild(btnRemove);

    itemsContainer.appendChild(itemEl);
  });

  // Atualizar link de checkout WhatsApp
  if (checkoutBtn) {
    let message = "Olá Elite Computadores! Montei meu carrinho no site e gostaria de solicitar um orçamento para os seguintes itens:\n\n";
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.title} (R$ Sob Consulta)\n`;
    });
    message += "\nGostaria de verificar a disponibilidade e condições comerciais.";

    const encodedMessage = encodeURIComponent(message);
    checkoutBtn.setAttribute('href', `https://wa.me/message/NR2ONO462GFLA1?text=${encodedMessage}`);
  }
}

// ==========================================================================
// 2. HERO SLIDER BANNER (COM RESPECT A PREFERS-REDUCED-MOTION)
// ==========================================================================
function initHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (slides.length === 0) return;

  let currentIdx = 0;
  let timer = null;

  // Cria bolinhas de navegação
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(idx) {
    slides[currentIdx].classList.remove('active');
    currentIdx = (idx + slides.length) % slides.length;
    slides[currentIdx].classList.add('active');

    // Atualiza bolinhas
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, dotIdx) => {
      dot.classList.toggle('active', dotIdx === currentIdx);
    });

    resetTimer();
  }

  function nextSlide() {
    goToSlide(currentIdx + 1);
  }

  function prevSlide() {
    goToSlide(currentIdx - 1);
  }

  function startTimer() {
    // Respeita prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Não inicia autoplay

    timer = setInterval(nextSlide, 6000); // 6 segundos por slide
  }

  function resetTimer() {
    if (timer) {
      clearInterval(timer);
      startTimer();
    }
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  startTimer();
}

// ==========================================================================
// 3. SISTEMA DE CATÁLOGO DINÂMICO (COM SEGURANÇA E FILTROS)
// ==========================================================================
function initCatalog() {
  const catalogGrid = document.getElementById('catalog-product-grid');
  const searchInput = document.getElementById('catalog-search-input');
  const filterItems = document.querySelectorAll('.filter-item');
  const mobileFilterDropdown = document.getElementById('mobile-filter-select');

  if (!catalogGrid) return; // Só roda na página do catálogo

  let activeCategory = 'all';
  let searchQuery = '';

  // Sanitização de string contra XSS
  function sanitizeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // Validação estrita de categorias conhecidas
  const validCategories = ['all', 'pcs', 'gpus', 'cpus', 'motherboards', 'ram', 'storage', 'power', 'cases', 'cooling', 'monitors', 'perifericos', 'chairs'];
  
  function validateCategory(cat) {
    return validCategories.includes(cat) ? cat : 'all';
  }

  // Renderiza produtos baseados no filtro e busca
  function renderCatalog() {
    const filtered = products.filter(product => {
      const matchCat = activeCategory === 'all' || product.category === activeCategory;
      const matchSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });

    catalogGrid.innerHTML = '';

    if (filtered.length === 0) {
      const emptyEl = document.createElement('div');
      emptyEl.className = 'cart-empty-message';
      emptyEl.style.gridColumn = '1 / -1';
      emptyEl.textContent = `Nenhum produto encontrado para "${sanitizeHTML(searchQuery)}".`;
      catalogGrid.appendChild(emptyEl);
      return;
    }

    filtered.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card reveal-item revealed';

      // Badge de destaque (se existir)
      if (product.badge) {
        const badge = document.createElement('div');
        badge.className = 'product-badge';
        badge.textContent = product.badge; // Seguro
        card.appendChild(badge);
      }

      // Imagem Box
      const imgBox = document.createElement('div');
      imgBox.className = 'product-img-box';
      const img = document.createElement('img');
      img.src = product.image;
      img.alt = product.title;
      img.loading = 'lazy';
      imgBox.appendChild(img);
      card.appendChild(imgBox);

      // Chips de Especificações
      const chips = document.createElement('div');
      chips.className = 'product-specs-chips';
      product.specs.forEach(spec => {
        const span = document.createElement('span');
        span.textContent = spec;
        chips.appendChild(span);
      });
      card.appendChild(chips);

      // Título
      const title = document.createElement('h3');
      title.className = 'product-title';
      title.textContent = product.title;
      card.appendChild(title);

      // Descrição
      const desc = document.createElement('p');
      desc.className = 'product-desc';
      desc.textContent = product.desc;
      card.appendChild(desc);

      // Botões de Ação
      const actions = document.createElement('div');
      actions.className = 'product-actions';

      const addBtn = document.createElement('button');
      addBtn.className = 'btn-laser btn-add-to-cart';
      addBtn.setAttribute('data-id', product.id);
      addBtn.innerHTML = `Adicionar ao Orçamento`;
      actions.appendChild(addBtn);

      const directMsg = `Olá Elite Computadores! Gostaria de tirar uma dúvida sobre o produto: ${product.title}`;
      const waLink = document.createElement('a');
      waLink.className = 'btn-secondary';
      waLink.href = `https://wa.me/message/NR2ONO462GFLA1?text=${encodeURIComponent(directMsg)}`;
      waLink.target = '_blank';
      waLink.setAttribute('rel', 'noopener noreferrer');
      waLink.textContent = 'Perguntar no WhatsApp';
      actions.appendChild(waLink);

      card.appendChild(actions);
      catalogGrid.appendChild(card);
    });
  }

  // Listener da Caixa de Busca (Sanitizada)
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value;
      renderCatalog();
    });
  }

  // Listeners dos Filtros Laterais
  if (filterItems) {
    filterItems.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        filterItems.forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        
        const cat = item.getAttribute('data-category');
        activeCategory = validateCategory(cat);
        renderCatalog();

        // Sincroniza com mobile dropdown se existir
        if (mobileFilterDropdown) {
          mobileFilterDropdown.value = activeCategory;
        }
      });
    });
  }

  // Listener do Dropdown de Categoria Mobile
  if (mobileFilterDropdown) {
    mobileFilterDropdown.addEventListener('change', e => {
      activeCategory = validateCategory(e.target.value);
      renderCatalog();

      // Sincroniza com sidebar desktop
      filterItems.forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-category') === activeCategory);
      });
    });
  }

  // Lê categoria inicial da query string (?filter=pcs)
  const urlParams = new URLSearchParams(window.location.search);
  const initialFilter = urlParams.get('filter');
  if (initialFilter) {
    activeCategory = validateCategory(initialFilter);
    // Ativa na interface
    filterItems.forEach(el => {
      el.classList.toggle('active', el.getAttribute('data-category') === activeCategory);
    });
    if (mobileFilterDropdown) {
      mobileFilterDropdown.value = activeCategory;
    }
  }

  renderCatalog();
}

// ==========================================================================
// 4. FAQ / ACORDION EM SUPORTE.HTML
// ==========================================================================
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Fecha todos os outros FAQs
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ==========================================================================
// 5. MENU MOBILE / REDIMENSIONAMENTO RESILIENTE
// ==========================================================================
function initMobileMenu() {
  // Garante que ao redimensionar a tela, nenhum elemento (ex: Sacola) quebre
  window.addEventListener('resize', () => {
    const isDesktop = window.innerWidth > 768;
    if (isDesktop) {
      // Opcional: fechar drawer mobile se necessário
    }
  });
}
