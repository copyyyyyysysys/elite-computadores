// Lógica global do E-commerce - Elite Computadores
document.addEventListener('DOMContentLoaded', () => {
  // Inicializações Globais
  initHeaderSearch();
  initHeroSlider();
  initCatalog();
  initFAQ();
  initMobileMenu();
});

// ==========================================================================
// 1. BUSCA E REDIRECIONAMENTO DO HEADER UNIFICADO
// ==========================================================================
function initHeaderSearch() {
  const headerSearchInput = document.getElementById('header-search-input');
  const headerSearchBtn = document.getElementById('header-search-submit');

  function handleSearch() {
    if (!headerSearchInput) return;
    const query = headerSearchInput.value.trim();
    if (query) {
      window.location.href = `catalogo.html?search=${encodeURIComponent(query)}`;
    }
  }

  if (headerSearchInput) {
    headerSearchInput.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSearch();
      }
    });
  }

  if (headerSearchBtn) {
    headerSearchBtn.addEventListener('click', e => {
      e.preventDefault();
      handleSearch();
    });
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
// 3. SISTEMA DE CATÁLOGO DINÂMICO DE CATEGORIAS (COM FILTROS E BUSCA SEGURA)
// ==========================================================================
function initCatalog() {
  const catalogGrid = document.getElementById('catalog-product-grid');
  const searchInput = document.getElementById('catalog-search-input');
  const filterItems = document.querySelectorAll('.filter-item');
  const mobileFilterDropdown = document.getElementById('mobile-filter-select');

  if (!catalogGrid) return; // Só roda na página do catálogo

  let activeCategory = 'all';
  let searchQuery = '';

  // Validação estrita de categorias conhecidas
  const validCategories = ['all', 'pcs', 'gpus', 'cpus', 'motherboards', 'ram', 'storage', 'power', 'cases', 'cooling', 'monitors', 'perifericos'];
  
  function validateCategory(cat) {
    return validCategories.includes(cat) ? cat : 'all';
  }

  // Renderiza categorias baseadas no filtro e busca
  function renderCatalog() {
    const filtered = categoriesData.filter(category => {
      const matchCat = activeCategory === 'all' || category.category === activeCategory;
      const matchSearch = category.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          category.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          category.specs.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });

    catalogGrid.innerHTML = '';

    if (filtered.length === 0) {
      const emptyEl = document.createElement('div');
      emptyEl.className = 'cart-empty-message';
      emptyEl.style.gridColumn = '1 / -1';
      emptyEl.textContent = 'Nenhuma categoria encontrada para "';
      
      const termSpan = document.createElement('span');
      termSpan.style.fontWeight = 'bold';
      termSpan.textContent = searchQuery; // Seguro contra injeção
      
      emptyEl.appendChild(termSpan);
      emptyEl.appendChild(document.createTextNode('".'));
      catalogGrid.appendChild(emptyEl);
      return;
    }

    filtered.forEach(category => {
      const card = document.createElement('div');
      card.className = 'product-card reveal-item revealed';

      // Badge de destaque (se existir)
      if (category.badge) {
        const badge = document.createElement('div');
        badge.className = 'product-badge';
        badge.textContent = category.badge; // Seguro
        card.appendChild(badge);
      }

      // Imagem Box
      const imgBox = document.createElement('div');
      imgBox.className = 'product-img-box';
      const img = document.createElement('img');
      img.src = category.image;
      img.alt = category.title;
      img.loading = 'lazy';
      imgBox.appendChild(img);
      card.appendChild(imgBox);

      // Chips de Destaques Técnicos / Especificações Comuns
      const chips = document.createElement('div');
      chips.className = 'product-specs-chips';
      category.specs.forEach(spec => {
        const span = document.createElement('span');
        span.textContent = spec;
        chips.appendChild(span);
      });
      card.appendChild(chips);

      // Título
      const title = document.createElement('h3');
      title.className = 'product-title';
      title.textContent = category.title;
      card.appendChild(title);

      // Descrição
      const desc = document.createElement('p');
      desc.className = 'product-desc';
      desc.style.height = 'auto'; // Ajuste automático de altura para categorias
      desc.style.webkitLineClamp = 'initial'; // Permite texto completo de curadoria
      desc.textContent = category.desc;
      card.appendChild(desc);

      // Botão de Contato WhatsApp
      const actions = document.createElement('div');
      actions.className = 'product-actions';
      actions.style.marginTop = '20px';

      const waLink = document.createElement('a');
      waLink.className = 'btn-laser';
      waLink.style.width = '100%';
      waLink.style.textAlign = 'center';
      waLink.href = `https://wa.me/message/NR2ONO462GFLA1?text=${encodeURIComponent(category.message)}`;
      waLink.target = '_blank';
      waLink.setAttribute('rel', 'noopener noreferrer');
      waLink.textContent = 'Falar com Consultor no WhatsApp';
      actions.appendChild(waLink);

      card.appendChild(actions);
      catalogGrid.appendChild(card);
    });
  }

  // Listener da Caixa de Busca do Catálogo
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

  // Lê parâmetros iniciais da query string (?filter=pcs ou ?search=termo)
  const urlParams = new URLSearchParams(window.location.search);
  const initialFilter = urlParams.get('filter');
  const initialSearch = urlParams.get('search');

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

  if (initialSearch) {
    searchQuery = initialSearch;
    if (searchInput) {
      searchInput.value = searchQuery;
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
// 5. MENU MOBILE / REDIMENSIONAMENTO
// ==========================================================================
function initMobileMenu() {
  window.addEventListener('resize', () => {
    // Redimensionamentos resilientes se necessários
  });
}
