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
        // Criar o balão dinamicamente no DOM com a nova estrutura de título + descrição
        const bubble = document.createElement('div');
        bubble.className = 'sorteio-bubble';
        bubble.id = 'sorteio-bubble';
        bubble.innerHTML = `
            <button class="sorteio-bubble-close" id="sorteio-bubble-close" aria-label="Fechar Sorteio">&times;</button>
            <div class="sorteio-bubble-content">
                <span class="sorteio-bubble-emoji">🎁</span>
                <div class="sorteio-bubble-text-container">
                    <span class="sorteio-bubble-title">Sorteio de PC Gamer!</span>
                    <span class="sorteio-bubble-desc">Clique e participe agora 🎯</span>
                </div>
            </div>
        `;
        document.body.appendChild(bubble);

        const bubbleClose = document.getElementById('sorteio-bubble-close');

        // Variáveis de estado locais (em memória simples, reiniciadas a cada carregamento)
        const maxBubbles = 8;
        let bubbleCount = 0;
        let clickedSorteio = false;
        let isBubbleOpen = false;
        
        let autoHideTimeout = null;
        let nextTriggerTimeout = null;

        // Função para mostrar o balão
        const mostrarBalao = (isAuto = true) => {
            if (clickedSorteio) return;
            if (isAuto && bubbleCount >= maxBubbles) return;
            if (isBubbleOpen) return;

            // Incrementa contagem se for exibição automática
            if (isAuto) {
                bubbleCount++;
            }

            // Exibir visualmente
            bubble.classList.add('active');
            sorteioFab.classList.add('pulse-intense');
            isBubbleOpen = true;

            // Determinar o tempo visível:
            // Primeiras 4 exibições automáticas: 10 segundos
            // 5ª exibição em diante (ou hover manual): 8 segundos
            const visibleDuration = (isAuto && bubbleCount <= 4) ? 10000 : 8000;

            // Agendar ocultação automática
            clearTimeout(autoHideTimeout);
            autoHideTimeout = setTimeout(() => {
                esconderBalao(isAuto);
            }, visibleDuration);
        };

        // Função para esconder o balão e agendar o próximo ciclo
        const esconderBalao = (isAuto = true) => {
            if (!isBubbleOpen) return;

            // Ocultar visualmente
            bubble.classList.remove('active');
            sorteioFab.classList.remove('pulse-intense');
            isBubbleOpen = false;
            
            clearTimeout(autoHideTimeout);

            // AGENDAR A PRÓXIMA APARIÇÃO AQUI — apenas se a ocultação veio do fluxo automático/manual legítimo
            if (bubbleCount < maxBubbles && !clickedSorteio) {
                clearTimeout(nextTriggerTimeout);
                
                // Intervalo: 20s para as 4 primeiras, 90s depois
                const intervalo = (bubbleCount <= 3) ? 20000 : 90000;
                
                nextTriggerTimeout = setTimeout(() => {
                    mostrarBalao(true);
                }, intervalo);
            }
        };

        // Clique no balão -> navega localmente para sorteio.html e desativa para esta exibição atual na Home
        bubble.addEventListener('click', (e) => {
            if (e.target.closest('#sorteio-bubble-close')) return;
            
            clickedSorteio = true;
            
            // Oculta e para os timers de vez localmente
            bubble.classList.remove('active');
            sorteioFab.classList.remove('pulse-intense');
            isBubbleOpen = false;
            clearTimeout(autoHideTimeout);
            clearTimeout(nextTriggerTimeout);

            window.location.href = 'sorteio.html';
        });

        // Clique no X -> fecha o balão e agenda a próxima
        bubbleClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // O X apenas chama esconderBalao, que cuida de re-agendar de acordo com as regras de timing
            esconderBalao(true);
        });

        // Clique no botão flutuante direto -> desativa para esta exibição atual na Home
        sorteioFab.addEventListener('click', () => {
            clickedSorteio = true;
            bubble.classList.remove('active');
            sorteioFab.classList.remove('pulse-intense');
            isBubbleOpen = false;
            clearTimeout(autoHideTimeout);
            clearTimeout(nextTriggerTimeout);
        });

        // Hover no botão flutuante -> mostra imediatamente se estiver fechado
        sorteioFab.addEventListener('mouseenter', () => {
            if (!isBubbleOpen && !clickedSorteio) {
                // Hover não incrementa o bubbleCount e exibe o balão
                clearTimeout(nextTriggerTimeout);
                mostrarBalao(false); 
            }
        });

        // Primeiro agendamento automático após 5 segundos
        if (!clickedSorteio && bubbleCount < maxBubbles) {
            nextTriggerTimeout = setTimeout(() => {
                mostrarBalao(true);
            }, 5000);
        }
    }

    // --- GOOGLE REVIEWS CAROUSEL ---
    const googleCarousel = document.querySelector('.google-reviews-carousel');
    const googlePrevBtn = document.querySelector('.google-carousel-btn.prev');
    const googleNextBtn = document.querySelector('.google-carousel-btn.next');

    if (googleCarousel && googlePrevBtn && googleNextBtn) {
        googleNextBtn.addEventListener('click', () => {
            const card = googleCarousel.querySelector('.google-review-card');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = 20;
                const scrollAmount = cardWidth + gap;
                const maxScrollLeft = googleCarousel.scrollWidth - googleCarousel.clientWidth;
                
                if (googleCarousel.scrollLeft >= maxScrollLeft - 10) {
                    googleCarousel.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    googleCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }
        });

        googlePrevBtn.addEventListener('click', () => {
            const card = googleCarousel.querySelector('.google-review-card');
            if (card) {
                const cardWidth = card.offsetWidth;
                const gap = 20;
                const scrollAmount = cardWidth + gap;
                
                if (googleCarousel.scrollLeft <= 10) {
                    const maxScrollLeft = googleCarousel.scrollWidth - googleCarousel.clientWidth;
                    googleCarousel.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
                } else {
                    googleCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
        });
    }

    // --- SCROLL REVEAL ANIMATION OBSERVER ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    if (revealElements.length > 0) {
        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            revealElements.forEach(el => revealObserver.observe(el));
        } else {
            revealElements.forEach(el => el.classList.add('visible'));
        }
    }

});
