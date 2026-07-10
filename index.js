/* ==========================================================================
   INTERATIVIDADE E LOGICA E-COMMERCE — ELITE COMPUTADORES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 1. INICIALIZAR LUCIDE ICONS
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. MENSAGENS DO WHATSAPP (MAPEAMENTO CONTEXTUAL - CORREÇÃO 3)
    const whatsappBaseUrl = "https://wa.me/message/NR2ONO462GFLA1";
    
    const whatsappMessages = {
        "pcs-gamer": "Olá! Quero ver os PCs Gamer disponíveis.",
        "setup-completo": "Olá! Quero montar um setup completo.",
        "placas-video": "Olá! Quero ver as placas de vídeo disponíveis.",
        "perifericos": "Olá! Quero ver os periféricos disponíveis.",
        "monitores": "Olá! Quero ver os monitores disponíveis.",
        "gabinetes": "Olá! Quero ver os gabinetes disponíveis.",
        "hardwares": "Olá! Quero ver os hardwares disponíveis.",
        "refrigeracao": "Olá! Quero ver as opções de refrigeração.",
        "ofertas": "Olá! Quero ver as ofertas do momento."
    };

    // Função de redirecionamento seguro para o WhatsApp
    const redirectToWhatsApp = (category) => {
        if (category && whatsappMessages[category]) {
            const messageText = whatsappMessages[category];
            const finalUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(messageText)}`;
            window.open(finalUrl, '_blank', 'noopener,noreferrer');
        } else {
            window.open(whatsappBaseUrl, '_blank', 'noopener,noreferrer');
        }
    };

    // Configurar redirecionamento seguro nos botões de conversão (.wpp-conversion-btn)
    const conversionButtons = document.querySelectorAll('.wpp-conversion-btn');
    conversionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const category = button.getAttribute('data-category');
            redirectToWhatsApp(category);
        });
    });

    // 3. EFEITO DE SCROLL NO HEADER (BORDER GLOW E TRANSPARÊNCIA)
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. MENU MOBILE TOGGLE (DESLIZAMENTO LATERAL & CONTROLES)
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
    
    const openMobileMenu = () => {
        if (mobileNav && mobileNavBackdrop && menuToggle) {
            mobileNav.classList.add('open');
            mobileNavBackdrop.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Trava scroll da página
        }
    };

    const closeMobileMenu = () => {
        if (mobileNav && mobileNavBackdrop && menuToggle) {
            mobileNav.classList.remove('open');
            mobileNavBackdrop.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = ''; // Libera scroll
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileNav.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (menuClose) menuClose.addEventListener('click', closeMobileMenu);
    if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileMenu);

    // Fechar menu mobile ao clicar em qualquer link dele
    if (mobileNav) {
        const mobileLinks = mobileNav.querySelectorAll('a, .mobile-nav-item');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
    }

    // 5. CARROSSEL DE AVALIAÇÕES (PROVA SOCIAL) - Otimizado para esteira infinita CSS

    // 6. ACORDEÃO DO FAQ (CONTROLE DE ALTURA DINÂMICA)
    const faqQuestions = document.querySelectorAll('.faq-question-btn');
    
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Fechar todas as outras perguntas do acordeão
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherButton = otherItem.querySelector('.faq-question-btn');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
                    if (otherAnswer) otherAnswer.style.maxHeight = '0';
                }
            });

            // Toggle do item clicado
            if (isActive) {
                item.classList.remove('active');
                btn.setAttribute('aria-expanded', 'false');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 7. GESTÃO DO CARRINHO (DRAWER DRAWER EXP)
    const cartTrigger = document.getElementById('cart-trigger');
    const cartClose = document.getElementById('cart-close');
    const cartDrawer = document.getElementById('cart-drawer');
    const cartBackdrop = document.getElementById('cart-backdrop');

    const openCart = () => {
        if (cartDrawer && cartBackdrop) {
            cartDrawer.classList.add('active');
            cartBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden'; // trava scroll da página
        }
    };

    const closeCart = () => {
        if (cartDrawer && cartBackdrop) {
            cartDrawer.classList.remove('active');
            cartBackdrop.classList.remove('active');
            document.body.style.overflow = ''; // libera scroll
        }
    };

    if (cartTrigger) cartTrigger.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

    // 8. MOBILE FILTER DRAWER
    const mobileFilterOpen = document.getElementById('mobile-filter-open');
    const mobileFilterClose = document.getElementById('mobile-filter-close');
    const mobileFilterDrawer = document.getElementById('mobile-filter-drawer');
    const filterBackdrop = document.getElementById('filter-backdrop');

    const openFilter = () => {
        if (mobileFilterDrawer && filterBackdrop) {
            mobileFilterDrawer.classList.add('open');
            filterBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeFilter = () => {
        if (mobileFilterDrawer && filterBackdrop) {
            mobileFilterDrawer.classList.remove('open');
            filterBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (mobileFilterOpen) mobileFilterOpen.addEventListener('click', openFilter);
    if (mobileFilterClose) mobileFilterClose.addEventListener('click', closeFilter);
    if (filterBackdrop) filterBackdrop.addEventListener('click', closeFilter);

    // 9. DIRECIONAMENTO DIRETO PARA O WHATSAPP NOS DEPARTAMENTOS (ESTILO ELITE)
    const filterButtons = document.querySelectorAll('[data-filter]');
    const searchInput = document.getElementById('live-search');
    const searchBtn = document.querySelector('.search-btn');

    // Mapeamento de filtros para categorias do WhatsApp
    const filterMap = {
        "pcs-gamer": "pcs-gamer",
        "setup-completo": "setup-completo",
        "placas-video": "placas-video",
        "perifericos": "perifericos",
        "monitores": "monitores",
        "gabinetes": "gabinetes",
        "hardwares": "hardwares",
        "refrigeracao": "refrigeracao",
        "ofertas": "ofertas"
    };

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const filter = btn.getAttribute('data-filter');
            if (filter && filterMap[filter]) {
                redirectToWhatsApp(filterMap[filter]);
            } else if (filter === 'all') {
                // Rola suave até a vitrine de categorias na home ou redireciona
                const target = document.getElementById('vitrine');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = "index.html#vitrine";
                }
            } else {
                redirectToWhatsApp();
            }
        });
    });

    // Barra de Busca: Transforma pesquisas em leads diretos do WhatsApp
    const handleSearchSubmit = () => {
        const query = searchInput.value.trim();
        if (query) {
            const searchMessage = `Olá! Gostaria de consultar sobre a disponibilidade de: "${query}".`;
            const finalUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(searchMessage)}`;
            window.open(finalUrl, '_blank', 'noopener,noreferrer');
        }
    };

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearchSubmit();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleSearchSubmit();
        });
    }

    // 10. LIGHTBOX MODAL PARA IMAGENS DE FEEDBACK (PROVA SOCIAL)
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    const feedImages = document.querySelectorAll('.review-feed-img');

    if (lightboxModal && lightboxImg) {
        feedImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                const src = img.getAttribute('src');
                if (src) {
                    lightboxImg.setAttribute('src', src);
                    lightboxModal.classList.add('active');
                    lightboxModal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        lightboxModal.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });

        if (lightboxCloseBtn) {
            lightboxCloseBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                lightboxModal.classList.remove('active');
                lightboxModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        }
    }

    // 11. FORMULÁRIO DE RASTREAMENTO DE PEDIDO (RASTREIO.HTML)
    const rastreioForm = document.getElementById('rastreio-form-el');
    const rastreioInput = document.getElementById('rastreio-input-el');
    if (rastreioForm && rastreioInput) {
        rastreioForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const val = rastreioInput.value.trim();
            let text = "Olá! Quero rastrear meu pedido.";
            if (val) {
                text = `Olá! Quero rastrear meu pedido: ${val}`;
            }
            const finalUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(text)}`;
            window.open(finalUrl, '_blank', 'noopener,noreferrer');
        });
    }

    // 12. BALÃO FLUTUANTE DE SORTEIO (CRISP STYLE - APENAS SE SORTEIO-FAB EXISTIR)
    const sorteioFab = document.getElementById('sorteio-fab');
    if (sorteioFab) {
        // Criar o balão dinamicamente no DOM
        const bubble = document.createElement('div');
        bubble.className = 'sorteio-bubble';
        bubble.id = 'sorteio-bubble';
        bubble.innerHTML = `
            <span class="sorteio-bubble-text">🎁 Sorteio de PC Gamer! Clique e participe.</span>
            <button class="sorteio-bubble-close" id="sorteio-bubble-close" aria-label="Fechar">&times;</button>
        `;
        document.body.appendChild(bubble);

        const bubbleClose = document.getElementById('sorteio-bubble-close');

        // Variáveis de controle de timeouts
        let autoHideTimeout = null;
        let nextTriggerTimeout = null;
        let isBubbleOpen = false;

        // Recuperar e salvar dados da sessão no sessionStorage
        const getSessionCount = () => {
            const count = sessionStorage.getItem('sorteio_bubble_shows');
            return count ? parseInt(count, 10) : 0;
        };

        const incrementSessionCount = () => {
            const count = getSessionCount();
            sessionStorage.setItem('sorteio_bubble_shows', count + 1);
        };

        const isUserConverted = () => {
            return sessionStorage.getItem('sorteio_clicked') === 'true';
        };

        // Função para mostrar o balão
        const showBubble = (isAuto = true) => {
            if (isUserConverted()) return;
            if (isAuto && getSessionCount() >= 3) return;
            if (isBubbleOpen) return;

            bubble.classList.add('active');
            sorteioFab.classList.add('pulse-intense');
            isBubbleOpen = true;

            if (isAuto) {
                incrementSessionCount();
            }

            // Ocultar automaticamente após 8 segundos
            clearTimeout(autoHideTimeout);
            autoHideTimeout = setTimeout(() => {
                hideBubble();
            }, 8000);
        };

        // Função para ocultar o balão
        const hideBubble = () => {
            if (!isBubbleOpen) return;
            bubble.classList.remove('active');
            sorteioFab.classList.remove('pulse-intense');
            isBubbleOpen = false;
            clearTimeout(autoHideTimeout);
        };

        // Clique no balão -> navega para sorteio.html
        bubble.addEventListener('click', (e) => {
            if (e.target.closest('#sorteio-bubble-close')) return;
            
            sessionStorage.setItem('sorteio_clicked', 'true');
            hideBubble();
            window.location.href = 'sorteio.html';
        });

        // Clique no X -> fecha o balão
        bubbleClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hideBubble();

            // Interrompe o fluxo automático atual e reagenda para 30 segundos depois
            clearTimeout(nextTriggerTimeout);
            if (getSessionCount() < 3 && !isUserConverted()) {
                nextTriggerTimeout = setTimeout(runAutoCycle, 30000);
            }
        });

        // Clique no botão flutuante direto -> marca como convertido (não exibe mais nesta sessão)
        sorteioFab.addEventListener('click', () => {
            sessionStorage.setItem('sorteio_clicked', 'true');
            hideBubble();
        });

        // Hover no botão flutuante -> mostra imediatamente se estiver fechado
        sorteioFab.addEventListener('mouseenter', () => {
            if (!isBubbleOpen && !isUserConverted()) {
                showBubble(false); // Mostra por hover (não conta para o limite de exibições espontâneas)
            }
        });

        // Lógica do ciclo de repetição automático (a cada 45 segundos)
        const runAutoCycle = () => {
            if (isUserConverted() || getSessionCount() >= 3) {
                clearTimeout(nextTriggerTimeout);
                return;
            }

            showBubble(true);

            // Agenda a próxima tentativa para 45 segundos a partir de agora
            clearTimeout(nextTriggerTimeout);
            nextTriggerTimeout = setTimeout(runAutoCycle, 45000);
        };

        // Inicia o ciclo: primeira aparição após 5 segundos
        nextTriggerTimeout = setTimeout(runAutoCycle, 5000);
    }

});
