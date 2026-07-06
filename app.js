// Script principal - Elite Computadores
document.addEventListener('DOMContentLoaded', () => {
  // --- 1. BUSCA CENTRALIZADA DO HEADER (GLOBAL) ---
  const searchInput = document.getElementById('header-search-input');
  const searchBtn = document.getElementById('header-search-submit');

  const executeSearch = () => {
    if (searchInput) {
      const query = searchInput.value.trim();
      window.location.href = `catalogo.html?search=${encodeURIComponent(query)}`;
    }
  };

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        executeSearch();
      }
    });
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', executeSearch);
  }

  // Sincronizar o termo de busca do Header com a URL se estivermos no Catálogo
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  if (searchQuery && searchInput && window.location.pathname.includes('catalogo.html')) {
    searchInput.value = searchQuery;
  }

  // --- 2. PÁGINA: CATÁLOGO (catalogo.html) ---
  const catalogGrid = document.getElementById('catalog-product-grid');
  const catalogSearchInput = document.getElementById('catalog-search-input');
  const filterItems = document.querySelectorAll('.filter-item');
  const mobileFilterSelect = document.getElementById('mobile-filter-select');

  let currentCategory = 'all';
  let currentSearchText = searchQuery || '';

  // Renderização Dinâmica de Categorias no Catálogo
  const renderCatalog = () => {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = '';

    const filtered = categoriesData.filter(cat => {
      const matchesCategory = (currentCategory === 'all' || cat.category === currentCategory);
      
      // Busca segura textual
      const queryClean = currentSearchText.toLowerCase().trim();
      const matchesSearch = !queryClean || 
                            cat.title.toLowerCase().includes(queryClean) ||
                            cat.desc.toLowerCase().includes(queryClean) ||
                            cat.specs.some(spec => spec.toLowerCase().includes(queryClean));

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      // Cria feedback seguro contra XSS
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'catalog-empty-state';
      
      const titleEl = document.createElement('h3');
      titleEl.textContent = 'Nenhuma categoria encontrada';
      
      const descEl = document.createElement('p');
      descEl.textContent = 'Não encontramos nenhuma categoria correspondente ao termo "';
      const termSpan = document.createElement('span');
      termSpan.style.color = 'var(--accent)';
      termSpan.style.fontWeight = 'bold';
      termSpan.textContent = currentSearchText;
      
      descEl.appendChild(termSpan);
      descEl.appendChild(document.createTextNode('". Tente buscar por outros termos como "PCs", "RTX" ou "Processador".'));
      
      emptyDiv.appendChild(titleEl);
      emptyDiv.appendChild(descEl);
      catalogGrid.appendChild(emptyDiv);
      return;
    }

    filtered.forEach(cat => {
      const card = document.createElement('div');
      card.className = 'category-catalog-card reveal-item';

      // Chassi do card
      const imgBox = document.createElement('div');
      imgBox.className = 'cat-card-img-box';
      const img = document.createElement('img');
      img.src = cat.image;
      img.alt = cat.title;
      img.className = 'cat-card-img';
      img.loading = 'lazy';
      imgBox.appendChild(img);

      if (cat.badge) {
        const badge = document.createElement('span');
        badge.className = 'cat-card-badge';
        badge.textContent = cat.badge;
        imgBox.appendChild(badge);
      }

      const infoBox = document.createElement('div');
      infoBox.className = 'cat-card-info';

      const title = document.createElement('h3');
      title.textContent = cat.title;

      const desc = document.createElement('p');
      desc.className = 'cat-card-desc';
      desc.textContent = cat.desc;

      // Chips de especificações técnicas
      const specWrapper = document.createElement('div');
      specWrapper.className = 'cat-card-specs';
      cat.specs.forEach(spec => {
        const specChip = document.createElement('span');
        specChip.className = 'spec-chip';
        specChip.textContent = spec;
        specWrapper.appendChild(specChip);
      });

      // Botão CTA para o WhatsApp com mensagem pré-preenchida codificada de forma segura
      const ctaBtn = document.createElement('a');
      ctaBtn.className = 'btn-laser cat-card-cta';
      ctaBtn.href = `https://wa.me/message/NR2ONO462GFLA1?text=${encodeURIComponent(cat.message)}`;
      ctaBtn.target = '_blank';
      ctaBtn.rel = 'noopener noreferrer';
      ctaBtn.textContent = 'Solicitar Orçamento';

      infoBox.appendChild(title);
      infoBox.appendChild(desc);
      infoBox.appendChild(specWrapper);
      infoBox.appendChild(ctaBtn);

      card.appendChild(imgBox);
      card.appendChild(infoBox);
      catalogGrid.appendChild(card);
    });

    // Ativar scroll reveal nos itens renderizados
    setTimeout(() => {
      const items = catalogGrid.querySelectorAll('.reveal-item');
      items.forEach(el => el.classList.add('revealed'));
    }, 50);
  };

  // Sincronizar busca interna do catálogo
  if (catalogSearchInput) {
    if (currentSearchText) {
      catalogSearchInput.value = currentSearchText;
    }
    catalogSearchInput.addEventListener('input', (e) => {
      currentSearchText = e.target.value;
      renderCatalog();
    });
  }

  // Lógica de Filtro na Sidebar Desktop
  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      filterItems.forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      currentCategory = item.getAttribute('data-category');
      
      // Sincronizar com o mobile select se existir
      if (mobileFilterSelect) {
        mobileFilterSelect.value = currentCategory;
      }
      
      renderCatalog();
    });
  });

  // Lógica de Filtro no Mobile Select
  if (mobileFilterSelect) {
    mobileFilterSelect.addEventListener('change', (e) => {
      currentCategory = e.target.value;

      // Sincronizar com a sidebar desktop se existir
      filterItems.forEach(el => {
        if (el.getAttribute('data-category') === currentCategory) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });

      renderCatalog();
    });
  }

  // Executar renderização se estivermos no Catálogo
  if (catalogGrid) {
    renderCatalog();
    
    // Tratamento específico de filtro passado pela URL (?filter=cpus)
    const filterQuery = urlParams.get('filter');
    if (filterQuery) {
      const targetFilter = filterItems ? Array.from(filterItems).find(el => el.getAttribute('data-category') === filterQuery) : null;
      if (targetFilter) {
        targetFilter.click();
      } else if (mobileFilterSelect) {
        mobileFilterSelect.value = filterQuery;
        mobileFilterSelect.dispatchEvent(new Event('change'));
      }
    }
  }

  // --- 3. PÁGINA: RASTREIO (rastreio.html) ---
  const trackingInput = document.getElementById('trackingInput');
  const trackBtn = document.getElementById('trackBtn');
  const errorMsg = document.getElementById('errorMsg');
  const resultsContainer = document.getElementById('trackingResults');
  
  const stepTitle = document.getElementById('stepTitle');
  const stepDesc = document.getElementById('stepDesc');
  const stepTime = document.getElementById('stepTime');
  const deliveryEst = document.getElementById('deliveryEst');
  const trackingCodeDisplay = document.getElementById('trackingCodeDisplay');
  const progressLine = document.getElementById('progressLine');
  const steps = document.querySelectorAll('.step-item');

  const executeTracking = () => {
    if (!trackingInput) return;
    const code = trackingInput.value.trim().toUpperCase();
    
    // Expressão regular de segurança para aceitar apenas letras, números e traço (sem caracteres de injeção)
    const secureRegex = /^[A-Z0-9\-]{4,15}$/;

    if (!secureRegex.test(code)) {
      errorMsg.style.display = 'block';
      resultsContainer.style.display = 'none';
      return;
    }

    errorMsg.style.display = 'none';
    
    // Simula a busca baseada no hash do código digitado para dar consistência
    let sum = 0;
    for (let i = 0; i < code.length; i++) {
      sum += code.charCodeAt(i);
    }
    
    // Mapeia o hash para um dos 4 estados da timeline
    const activeStepIndex = sum % 4; // 0, 1, 2 ou 3
    
    // Dados de simulação correspondentes a cada passo
    const stepDetails = [
      {
        title: "Pedido Confirmado & Fila de Produção",
        desc: "A confirmação de pagamento foi validada. O computador entrou na nossa fila técnica de montagem e as peças foram reservadas.",
        time: "Atualizado há 1 dia"
      },
      {
        title: "Montagem Artesanal & Organização de Cabos",
        desc: "Os técnicos iniciaram a montagem física. A organização dos cabos (cable management) e a instalação do kit de coolers/refrigeração estão em andamento.",
        time: "Atualizado há 12 horas"
      },
      {
        title: "Fase de Testes de Stress (12 Horas)",
        desc: "O hardware foi montado por completo. O PC gamer está em nosso rack de testes rodando softwares de stress de CPU, GPU e memória para garantir 100% de estabilidade.",
        time: "Atualizado há 2 horas"
      },
      {
        title: "Pedido Despachado / Pronto para Retirada",
        desc: "Máquina aprovada no controle de qualidade. Embalada com proteção dupla de espuma de alta densidade e despachada via transportadora oficial.",
        time: "Atualizado agora mesmo"
      }
    ];

    // Atualiza exibição de forma segura
    trackingCodeDisplay.textContent = code;
    
    // Atualiza a visualização dos passos no stepper
    steps.forEach((step, idx) => {
      if (idx <= activeStepIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Calcula a porcentagem da linha de progresso
    const progressPercent = (activeStepIndex / (steps.length - 1)) * 100;
    if (progressLine) {
      progressLine.style.height = `${progressPercent}%`;
    }

    // Define os detalhes textuais de forma segura
    stepTitle.textContent = stepDetails[activeStepIndex].title;
    stepDesc.textContent = stepDetails[activeStepIndex].desc;
    stepTime.textContent = stepDetails[activeStepIndex].time;

    // Estimativa de entrega
    if (activeStepIndex === 3) {
      deliveryEst.textContent = "Entregue ou Em Rota Final";
      deliveryEst.style.color = "var(--accent)";
    } else {
      const daysLeft = 4 - activeStepIndex;
      deliveryEst.textContent = `${daysLeft} a ${daysLeft + 1} dias úteis`;
      deliveryEst.style.color = "var(--text-primary)";
    }

    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  };

  if (trackBtn) {
    trackBtn.addEventListener('click', executeTracking);
  }
  if (trackingInput) {
    trackingInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        executeTracking();
      }
    });
  }

  // --- 4. PÁGINA: SUPORTE (suporte.html) ---
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');
      
      // Fecha todos os accordions
      document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

      // Abre apenas o clicado se já não estivesse ativo
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- 5. PÁGINA: FEEDBACKS (feedbacks.html) ---
  const gridPrints = document.querySelectorAll('.editorial-print');
  const lightbox = document.createElement('div');
  lightbox.className = 'feedback-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Visualização de depoimento');
  
  // Elementos internos do lightbox
  const lightboxContent = document.createElement('div');
  lightboxContent.className = 'lightbox-content';
  
  const lightboxClose = document.createElement('button');
  lightboxClose.className = 'lightbox-close';
  lightboxClose.innerHTML = '&times;';
  lightboxClose.setAttribute('aria-label', 'Fechar visualização');
  
  const lightboxImg = document.createElement('img');
  lightboxImg.className = 'lightbox-img';
  
  const lightboxPrev = document.createElement('button');
  lightboxPrev.className = 'lightbox-nav prev';
  lightboxPrev.innerHTML = '&#10094;';
  lightboxPrev.setAttribute('aria-label', 'Depoimento anterior');
  
  const lightboxNext = document.createElement('button');
  lightboxNext.className = 'lightbox-nav next';
  lightboxNext.innerHTML = '&#10095;';
  lightboxNext.setAttribute('aria-label', 'Próximo depoimento');
  
  lightboxContent.appendChild(lightboxClose);
  lightboxContent.appendChild(lightboxImg);
  lightboxContent.appendChild(lightboxPrev);
  lightboxContent.appendChild(lightboxNext);
  lightbox.appendChild(lightboxContent);
  
  let currentTestimonialIndex = 0;
  
  // Função para abrir o lightbox
  const openLightbox = (index) => {
    const targetImg = gridPrints[index];
    if (!targetImg) return;
    
    currentTestimonialIndex = index;
    lightboxImg.src = targetImg.src;
    lightboxImg.alt = targetImg.alt;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      lightbox.classList.add('active');
    }, 10);
  };
  
  // Fechar lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (lightbox.parentNode) {
        lightbox.parentNode.removeChild(lightbox);
      }
    }, 300);
  };
  
  // Navegação
  const showNextTestimonial = () => {
    currentTestimonialIndex = (currentTestimonialIndex + 1) % gridPrints.length;
    const targetImg = gridPrints[currentTestimonialIndex];
    lightboxImg.src = targetImg.src;
    lightboxImg.alt = targetImg.alt;
  };
  
  const showPrevTestimonial = () => {
    currentTestimonialIndex = (currentTestimonialIndex - 1 + gridPrints.length) % gridPrints.length;
    const targetImg = gridPrints[currentTestimonialIndex];
    lightboxImg.src = targetImg.src;
    lightboxImg.alt = targetImg.alt;
  };

  // Event Listeners dos clicks nas imagens do grid
  gridPrints.forEach((print, idx) => {
    print.style.cursor = 'pointer';
    print.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextTestimonial);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevTestimonial);
  
  // Fechar no clique de fundo do overlay
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Controle por teclado
  document.addEventListener('keydown', (e) => {
    if (!lightbox.parentNode) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextTestimonial();
    if (e.key === 'ArrowLeft') showPrevTestimonial();
  });

  // Gestos swipe no mobile
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showPrevTestimonial();
      } else {
        showNextTestimonial();
      }
    }
  }, { passive: true });
});
