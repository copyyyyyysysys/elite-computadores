// Banco de dados compartilhado de produtos - Elite Computadores
const products = [
  // Categoria: pcs (PCs Gamer Prontos)
  {
    id: 1,
    title: "PC Gamer Elite Hyperdrive",
    category: "pcs",
    featured: true,
    image: "assets/real_setup_master.png",
    specs: ["i9-14900K", "RTX 4090", "64GB DDR5", "2TB NVMe"],
    desc: "Máquina extrema com refrigeração líquida premium, projetada para jogos em 4K e streaming simultâneo de alto nível.",
    badge: "Mais Vendido"
  },
  {
    id: 2,
    title: "PC Gamer Elite Shift",
    category: "pcs",
    featured: true,
    image: "assets/real_elite_shift.png",
    specs: ["Ryzen 7 7800X3D", "RTX 4070 Ti Super", "32GB DDR5", "1TB NVMe"],
    desc: "O equilíbrio perfeito para jogos competitivos e produtividade com resfriamento otimizado de fluxo contínuo.",
    badge: "Destaque"
  },
  {
    id: 3,
    title: "PC Gamer Liquid Jade Edition",
    category: "pcs",
    featured: true,
    image: "assets/real_liquid_jade.png",
    specs: ["i9-14900KF", "RTX 4080 Super", "32GB DDR5", "2TB NVMe"],
    desc: "PC Gamer de alta performance com coolers RGB coordenados no tom de assinatura Liquid Jade da Elite.",
    badge: "Premium"
  },
  {
    id: 4,
    title: "PC Gamer Obsidian Silent",
    category: "pcs",
    featured: false,
    image: "assets/hero_setup.png",
    specs: ["Ryzen 5 7600", "RTX 4070 Super", "32GB DDR5", "1TB NVMe"],
    desc: "Construção ultra silenciosa com amortecimento acústico ativo e performance de ponta para jogos em 1440p.",
    badge: ""
  },
  {
    id: 5,
    title: "PC Gamer Streamer Pro",
    category: "pcs",
    featured: false,
    image: "assets/real_setup_red_fans.png",
    specs: ["i7-14700F", "RTX 4060 Ti", "32GB DDR5", "1TB NVMe"],
    desc: "Máquina otimizada com encoder de vídeo avançado para criadores de conteúdo e streaming de eSports.",
    badge: "Novidade"
  },

  // Categoria: gpus (Placas de Vídeo)
  {
    id: 6,
    title: "NVIDIA GeForce RTX 4090 ROG Strix",
    category: "gpus",
    featured: true,
    image: "assets/real_liquid_jade.png", // Usando kit de mídia existente no projeto
    specs: ["24GB GDDR6X", "DLSS 3.0", "Ray Tracing"],
    desc: "A placa de vídeo mais rápida do mundo, com o sistema de resfriamento premium da ASUS ROG.",
    badge: "Mais Vendida"
  },
  {
    id: 7,
    title: "NVIDIA GeForce RTX 4080 Super Gaming OC",
    category: "gpus",
    featured: false,
    image: "assets/real_elite_shift.png",
    specs: ["16GB GDDR6X", "Gigabyte Windforce", "Dual BIOS"],
    desc: "Performance fantástica em 4K e excelente eficiência térmica para sessões longas de jogo.",
    badge: ""
  },
  {
    id: 8,
    title: "NVIDIA GeForce RTX 4070 Ti Super Trinity",
    category: "gpus",
    featured: false,
    image: "assets/real_elite_shift.png",
    specs: ["16GB GDDR6X", "Zotac Trinity", "IceStorm 2.0"],
    desc: "16GB de memória VRAM dedicados para rodar qualquer jogo moderno com texturas no máximo.",
    badge: ""
  },
  {
    id: 9,
    title: "AMD Radeon RX 7900 XTX Pulse",
    category: "gpus",
    featured: false,
    image: "assets/real_setup_red_fans.png",
    specs: ["24GB GDDR6", "FSR 3.0", "Sapphire Pulse"],
    desc: "A GPU topo de linha da AMD com performance de rasterização líder e 24GB de memória de vídeo.",
    badge: ""
  },

  // Categoria: cpus (Processadores)
  {
    id: 10,
    title: "Intel Core i9-14900K",
    category: "cpus",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["24 Cores", "32 Threads", "Até 6.0 GHz"],
    desc: "O processador desktop definitivo para gamers entusiastas, streamers e editores profissionais.",
    badge: "Líder"
  },
  {
    id: 11,
    title: "AMD Ryzen 7 7800X3D",
    category: "cpus",
    featured: true,
    image: "assets/real_setup_master.png",
    specs: ["8 Cores", "16 Threads", "3D V-Cache"],
    desc: "Eleito o melhor processador do mundo para jogos devido ao seu cache vertical de alta velocidade.",
    badge: "Melhor para Jogos"
  },
  {
    id: 12,
    title: "Intel Core i7-14700K",
    category: "cpus",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["20 Cores", "28 Threads", "Até 5.6 GHz"],
    desc: "Excelente equilíbrio de performance multi-thread e velocidade de clock para todas as tarefas.",
    badge: ""
  },
  {
    id: 13,
    title: "AMD Ryzen 9 7950X3D",
    category: "cpus",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["16 Cores", "32 Threads", "3D V-Cache"],
    desc: "O poder de 16 núcleos combinado com o 3D V-Cache para máxima performance em trabalho e diversão.",
    badge: ""
  },

  // Categoria: motherboards (Placas-mãe)
  {
    id: 14,
    title: "ASUS ROG Maximus Z790 Dark Hero",
    category: "motherboards",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["LGA 1700", "PCIe 5.0", "Wi-Fi 7", "DDR5"],
    desc: "Placa-mãe entusiasta premium com VRM robusto e resfriamento avançado de dissipadores.",
    badge: "Premium"
  },
  {
    id: 15,
    title: "MSI MAG B650 Tomahawk WiFi",
    category: "motherboards",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["Socket AM5", "PCIe 4.0", "Wi-Fi 6E", "DDR5"],
    desc: "A melhor placa-mãe AM5 em custo-benefício, estabilidade e recursos para Ryzen 7000 e 9000.",
    badge: "Recomendado"
  },
  {
    id: 16,
    title: "GIGABYTE Z790 AORUS Elite AX",
    category: "motherboards",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["LGA 1700", "PCIe 5.0", "Wi-Fi 6E", "DDR5"],
    desc: "Construção de alta qualidade com conectividade premium para setups modernos.",
    badge: ""
  },

  // Categoria: ram (Memórias RAM)
  {
    id: 17,
    title: "Corsair Vengeance RGB 32GB (2x16GB) DDR5",
    category: "ram",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["6000MHz", "CL30", "Intel XMP 3.0"],
    desc: "Memória DDR5 de alta velocidade com iluminação RGB dinâmica personalizável via iCUE.",
    badge: ""
  },
  {
    id: 18,
    title: "G.Skill Trident Z5 Neo RGB 64GB (2x32GB)",
    category: "ram",
    featured: true,
    image: "assets/real_setup_master.png",
    specs: ["6000MHz", "CL30", "AMD EXPO"],
    desc: "Desempenho DDR5 extremo otimizado para plataformas AMD Ryzen, com dissipador premium de alumínio.",
    badge: "Destaque"
  },
  {
    id: 19,
    title: "Kingston FURY Beast RGB 16GB (2x8GB)",
    category: "ram",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["5600MHz", "CL36", "Kingston Fury"],
    desc: "Memória estável de alta fidelidade para builds gamers de entrada a intermediários.",
    badge: ""
  },

  // Categoria: storage (Armazenamento SSD/NVMe)
  {
    id: 20,
    title: "SSD Kingston FURY Renegade 2TB M.2 NVMe",
    category: "storage",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["Leitura: 7300MB/s", "Gravação: 7000MB/s", "Gen 4x4"],
    desc: "Carregamentos instantâneos para jogos e transferências gigantescas de dados com dissipador de grafeno.",
    badge: "Ultra Velocidade"
  },
  {
    id: 21,
    title: "SSD Samsung 990 Pro 1TB M.2 NVMe",
    category: "storage",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["Leitura: 7450MB/s", "Gravação: 6900MB/s", "Gen 4x4"],
    desc: "O SSD mais cobiçado por profissionais e gamers pela sua durabilidade de gravação e consistência.",
    badge: ""
  },
  {
    id: 22,
    title: "SSD Crucial T500 2TB M.2 NVMe Gen4",
    category: "storage",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["Leitura: 7400MB/s", "Gravação: 7000MB/s", "Gen 4x4"],
    desc: "Alta capacidade e velocidade topo de linha para aumentar sua biblioteca de jogos no PC ou PS5.",
    badge: ""
  },

  // Categoria: power (Fontes)
  {
    id: 23,
    title: "Corsair RM1000x 1000W Modular",
    category: "power",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["80 Plus Gold", "Full Modular", "Capacitores Japoneses"],
    desc: "Energia limpa, estável e silenciosa para alimentar as placas de vídeo mais exigentes do mercado.",
    badge: "Recomendado"
  },
  {
    id: 24,
    title: "MSI MAG A850GL 850W PCIe 5.0",
    category: "power",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["80 Plus Gold", "Full Modular", "ATX 3.0 Ready"],
    desc: "Pronta para a nova geração de placas de vídeo com cabo nativo de 16 pinos 12VHPWR.",
    badge: "ATX 3.0"
  },
  {
    id: 25,
    title: "Seasonic Focus GX-750 750W",
    category: "power",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["80 Plus Gold", "Full Modular", "Garantia 10 anos"],
    desc: "Uma das fontes de 750W mais premiadas e confiáveis do mundo, com engenharia premium Seasonic.",
    badge: ""
  },

  // Categoria: cases (Gabinetes)
  {
    id: 26,
    title: "Lian Li O11 Dynamic EVO RGB Black",
    category: "cases",
    featured: true,
    image: "assets/real_liquid_jade.png",
    specs: ["Dual Chamber", "Fita RGB Integrada", "Vidro Temperado"],
    desc: "O gabinete premium definitivo para montagens com visual 'aquário' e fluxo de ar otimizado.",
    badge: "Lançamento"
  },
  {
    id: 27,
    title: "NZXT H9 Flow White Edition",
    category: "cases",
    featured: false,
    image: "assets/hero_setup.png",
    specs: ["Panoramic Glass", "NZXT Flow", "Cor Branca"],
    desc: "Design panorâmico de tirar o fôlego com fluxo de ar massivo pelas telas de metal perfurado.",
    badge: ""
  },
  {
    id: 28,
    title: "Corsair 4000D Airflow Black",
    category: "cases",
    featured: false,
    image: "assets/real_elite_shift.png",
    specs: ["Mesh Frontal", "Filtro de Poeira", "Gerenciamento de Cabos"],
    desc: "Compacto, com ventilação espetacular e visual sóbrio, perfeito para qualquer ambiente.",
    badge: ""
  },

  // Categoria: cooling (Coolers/Water Cooling)
  {
    id: 29,
    title: "Water Cooler NZXT Kraken Elite 360 RGB",
    category: "cooling",
    featured: true,
    image: "assets/real_liquid_jade.png",
    specs: ["Radiador 360mm", "Tela LCD Customizável", "Fans RGB F120 Core"],
    desc: "Controle térmico absoluto com uma tela LCD de alta resolução para exibir GIFs e estatísticas do PC.",
    badge: "Destaque"
  },
  {
    id: 30,
    title: "Corsair iCUE Link H150i RGB 360mm",
    category: "cooling",
    featured: false,
    image: "assets/real_liquid_jade.png",
    specs: ["Radiador 360mm", "iCUE Link Smart", "Zero RPM Mode"],
    desc: "Simplifique sua build com conexões de cabo único inteligentes do ecossistema Corsair Link.",
    badge: ""
  },
  {
    id: 31,
    title: "Air Cooler Noctua NH-D15 chromax.black",
    category: "cooling",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["Dual Tower", "2x NF-A15 PWM Fans", "Design Silencioso"],
    desc: "A lenda dos air coolers. Performance que compete de igual com water coolers de 240mm.",
    badge: ""
  },

  // Categoria: monitors (Monitores)
  {
    id: 32,
    title: "Monitor Asus ROG Swift OLED 27\" 240Hz",
    category: "monitors",
    featured: true,
    image: "assets/real_setup_master.png",
    specs: ["WQHD OLED", "240Hz", "0.03ms GtG", "G-Sync Compatible"],
    desc: "Cores inacreditáveis, pretos verdadeiramente profundos e tempo de resposta instantâneo para eSports.",
    badge: "Competitivo"
  },
  {
    id: 33,
    title: "Monitor LG UltraGear 27\" IPS 144Hz",
    category: "monitors",
    featured: false,
    image: "assets/real_setup_red_fans.png",
    specs: ["FHD IPS", "144Hz", "1ms MBR", "HDR10"],
    desc: "Excelente fidelidade de cores IPS com taxa de atualização fluida de 144Hz para qualquer setup gamer.",
    badge: "Custo-Benefício"
  },
  {
    id: 34,
    title: "Monitor Alienware 34\" QD-OLED Curvo",
    category: "monitors",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["UWQHD QD-OLED", "175Hz", "0.1ms", "Curvatura 1800R"],
    desc: "Uma experiência panorâmica imersiva definitiva com tecnologia Quantum Dot OLED líder da indústria.",
    badge: "Ultra-Wide"
  },

  // Categoria: perifericos (Periféricos Gamer)
  {
    id: 35,
    title: "Mouse Attack Shark X11",
    category: "perifericos",
    featured: true,
    image: "assets/real_attack_shark.png", // Produto real existente
    specs: ["Sensor PixArt 3311", "59g Ultralight", "Base Magnética Recarga", "Wireless 2.4G"],
    desc: "O mouse gamer sem fio ultraleve de precisão profissional de assinatura da Elite.",
    badge: "Original Elite"
  },
  {
    id: 36,
    title: "Teclado Magnético Attk Gasket",
    category: "perifericos",
    featured: true,
    image: "assets/real_custom_keyboard.png", // Produto real existente
    specs: ["Efeito Hall", "Switches Magnéticos", "Rapid Trigger", "RGB Custom"],
    desc: "Teclado mecânico compacto profissional com switches de atuação magnética instantânea configuráveis.",
    badge: "Original Elite"
  },
  {
    id: 37,
    title: "Mouse Logitech G PRO X Superlight 2",
    category: "perifericos",
    featured: false,
    image: "assets/real_attack_shark.png",
    specs: ["Sensor HERO 2", "60g", "Wireless Lightspeed", "95h bateria"],
    desc: "O preferido dos jogadores profissionais de FPS em todo o mundo por sua confiabilidade e peso pluma.",
    badge: ""
  },
  {
    id: 38,
    title: "Headset HyperX Cloud III Wireless",
    category: "perifericos",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["Drivers 53mm", "Até 120h bateria", "DTS Headphone:X"],
    desc: "Conforto lendário com áudio imersivo de alta precisão de áudio e microfone ultra limpo.",
    badge: ""
  },

  // Categoria: chairs (Cadeiras Gamer)
  {
    id: 39,
    title: "Cadeira Gamer Noblechairs Hero Black",
    category: "chairs",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["Couro PU Híbrido", "Apoio Lombar Ajustável", "Suporta até 150kg"],
    desc: "Design sóbrio e ergonômico inspirado em assentos de carros esportivos de luxo para máximo conforto.",
    badge: "Premium"
  },
  {
    id: 40,
    title: "Cadeira Gamer Corsair T3 Rush Charcoal",
    category: "chairs",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["Tecido Respirável", "Almofada de Memória", "Apoio de Braço 4D"],
    desc: "Revestida em tecido macio respirável para sessões longas de jogo em dias quentes.",
    badge: ""
  },
  {
    id: 41,
    title: "Cadeira Gamer DT3 Sports Elise",
    category: "chairs",
    featured: false,
    image: "assets/real_setup_master.png",
    specs: ["Estrutura de Aço", "Reclinação 180°", "Design Racing"],
    desc: "Um dos modelos mais populares e duráveis do mercado, aliando ergonomia e estilo clássico racing.",
    badge: "Mais Vendida"
  }
];
