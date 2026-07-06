// Banco de dados compartilhado - Elite Computadores (Vitrine de Categorias)

const categoriesData = [
  {
    id: "pcs",
    title: "PCs Gamer Prontos",
    category: "pcs",
    image: "assets/real_setup_master.png",
    desc: "Máquinas completas de altíssima performance, projetadas de forma artesanal e otimizadas para jogos exigentes, streaming e produtividade extrema.",
    specs: ["Lian Li Aquário", "RTX 4090 / 4080 Super", "i9-14900K / Ryzen X3D", "Cable Management"],
    badge: "Montagem Exclusiva",
    message: "Olá Elite Computadores! Tenho interesse em configurar um PC Gamer Pronto sob medida e gostaria de iniciar um atendimento."
  },
  {
    id: "gpus",
    title: "Placas de Vídeo (GPUs)",
    category: "gpus",
    image: "assets/real_liquid_jade.png",
    desc: "As melhores placas gráficas do mercado mundial para renderização ultrarrápida, Ray Tracing avançado e inteligência artificial.",
    specs: ["NVIDIA RTX 4090", "RTX 4080 / 4070 Ti Super", "AMD Radeon RX 7900", "Ray Tracing & DLSS 3.0"],
    badge: "Destaque Técnico",
    message: "Olá Elite Computadores! Gostaria de consultar modelos e valores disponíveis de Placas de Vídeo."
  },
  {
    id: "cpus",
    title: "Processadores (CPUs)",
    category: "cpus",
    image: "assets/real_elite_shift.png",
    desc: "O cérebro da sua máquina. CPUs líderes de mercado que garantem estabilidade, altíssimas taxas de FPS e potência contínua sob qualquer nível de estresse.",
    specs: ["Intel Core i9-14900K", "AMD Ryzen 7 7800X3D", "Intel Core i7 / Ryzen 7", "Até 24 Cores / Cache 3D"],
    badge: "Performance Bruta",
    message: "Olá Elite Computadores! Gostaria de cotar opções de Processadores de alta performance."
  },
  {
    id: "motherboards",
    title: "Placas-mãe",
    category: "motherboards",
    image: "assets/real_elite_shift.png",
    desc: "Bases robustas com dissipação reforçada nos VRMs, conectividade de última geração e barramento PCIe 5.0 para máxima largura de banda.",
    specs: ["ASUS ROG Strix", "Gigabyte AORUS", "Chipsets Z790 / B650 / X670", "Wi-Fi 7 & PCIe 5.0"],
    badge: "Estabilidade Total",
    message: "Olá Elite Computadores! Gostaria de ajuda para escolher a melhor Placa-Mãe para o meu setup."
  },
  {
    id: "ram",
    title: "Memórias RAM",
    category: "ram",
    image: "assets/real_liquid_jade.png",
    desc: "Módulos DDR5 de alta frequência e baixa latência que proporcionam multitarefa suave e o fim definitivo de engasgos durante jogos pesados.",
    specs: ["G.Skill Trident Z5", "Corsair Dominator Titanium", "DDR5 6000MHz - 7200MHz", "CL30 - CL32 Latency"],
    badge: "Máxima Velocidade",
    message: "Olá Elite Computadores! Gostaria de verificar opções e kits de Memória RAM DDR5."
  },
  {
    id: "storage",
    title: "Armazenamento (SSD/NVMe)",
    category: "storage",
    image: "assets/real_setup_master.png",
    desc: "SSDs de altíssimo desempenho para tempos de carregamento instantâneos no sistema operacional e nos seus jogos favoritos.",
    specs: ["Kingston KC3000", "Crucial T700 PCIe 5.0", "Até 7400MB/s Leitura", "Capacidades de 1TB a 4TB"],
    badge: "Instant Load",
    message: "Olá Elite Computadores! Gostaria de cotar SSDs NVMe de alta velocidade de armazenamento."
  },
  {
    id: "cases",
    title: "Fontes e Gabinetes",
    category: "cases",
    image: "assets/real_setup_red_fans.png",
    desc: "Gabinetes com design inovador estilo aquário e fontes com certificações de alta eficiência para entrega de energia limpa e fluxo de ar ideal.",
    specs: ["Lian Li O11 Dynamic", "Fontes Modular ATX 3.0", "ROG Thor / NZXT H9", "80 Plus Gold / Platinum"],
    badge: "Energia & Fluxo",
    message: "Olá Elite Computadores! Tenho interesse em escolher Fontes e Gabinetes para o meu setup."
  },
  {
    id: "cooling",
    title: "Refrigeração (Water Coolers/Coolers)",
    category: "cooling",
    image: "assets/real_liquid_jade.png",
    desc: "Water Coolers de alto desempenho com telas LCD customizáveis e kits de ventoinhas de fluxo contínuo para refrigeração silenciosa sob estresse.",
    specs: ["Lian Li Galahad II LCD", "NZXT Kraken Elite LCD", "Kits Fans TL/Infinity", "Fluidos Translúcidos Custom"],
    badge: "Resfriamento Extremo",
    message: "Olá Elite Computadores! Gostaria de planejar o sistema de Refrigeração e Coolers do meu PC."
  },
  {
    id: "monitors",
    title: "Monitores",
    category: "monitors",
    image: "assets/hero_setup.png",
    desc: "Telas de alta taxa de atualização, painéis OLED e cores vibrantes que dão vida a cada detalhe dos seus jogos em resoluções QHD e 4K.",
    specs: ["QD-OLED & OLED Panels", "240Hz a 360Hz Refresh Rate", "Resolução QHD / 4K UHD", "0.03ms Resposta Instantânea"],
    badge: "Imersão Total",
    message: "Olá Elite Computadores! Gostaria de consultar opções de Monitores Premium de alta frequência."
  },
  {
    id: "perifericos",
    title: "Periféricos Gamer",
    category: "perifericos",
    image: "assets/peripherals.png",
    desc: "Equipamentos de alta performance competitiva. Mouses ultraleves de nível profissional e teclados mecânicos/magnéticos com resposta instantânea.",
    specs: ["Attack Shark X11 / R1", "Teclados Magnéticos Switch Hall", "Mouses Ultraleves < 59g", "Tecnologia Rapid Trigger"],
    badge: "Alta Precisão",
    message: "Olá Elite Computadores! Gostaria de consultar as opções de Mouses e Teclados Magnéticos."
  }
];

const testimonialsData = [
  {
    name: "Adriano M.",
    avatar: "assets/avatars/avatar-adriano.jpg",
    feedPrint: "assets/feeds/feed1.PNG",
    product: "PC Gamer RTX 3060 + Z690",
    quote: "Entrega super rápida e montagem impecável. O PC ficou perfeito para meus jogos e trabalho, excelente atendimento!",
    time: "14:32"
  },
  {
    name: "Tiago S.",
    avatar: "assets/avatars/avatar-tiago.jpg",
    feedPrint: "assets/feeds/feed2.PNG",
    product: "PC Gamer GTX 1650 + A520M",
    quote: "Muito satisfeito com o meu computador novo. Roda tudo que eu preciso liso, e a montagem ficou extremamente organizada!",
    time: "11:04"
  },
  {
    name: "Lucas V.",
    avatar: "assets/avatars/avatar-lucas.jpg",
    feedPrint: "assets/feeds/feed3.PNG",
    product: "PC Gamer Entry VX-500",
    quote: "Atendimento nota dez desde o orçamento até a entrega do computador. Recomendo muito o trabalho da Elite!",
    time: "16:48"
  },
  {
    name: "André L.",
    avatar: "assets/avatars/avatar-andre.jpg",
    feedPrint: "assets/feeds/feed4.PNG",
    product: "PC Gamer RTX 3060 + GS600",
    quote: "Muito top a máquina, tudo montado com peças de qualidade e atendimento nota mil. Valeu cada centavo!",
    time: "20:05"
  },
  {
    name: "Bruno K.",
    avatar: "assets/avatars/avatar-bruno.jpg",
    feedPrint: "assets/feeds/feed9.PNG",
    product: "PC Gamer Water Cooled",
    quote: "Montagem impecável, gerenciamento de cabos excelente and performance de outro mundo. O water cooler segura a temperatura perfeitamente!",
    time: "23:54"
  },
  {
    name: "Sandra R.",
    avatar: "assets/avatars/avatar-sandra.jpg",
    feedPrint: "assets/feeds/feed6.PNG",
    product: "PC Gamer Personalizado",
    quote: "Oii meninos! Passando para dar um feedback pelo serviço de vocês. A máquina ficou maravilhosa, tudo funcionando perfeitamente, meu filho amou. Muito obrigada pelo atendimento também, sempre muito dedicados e atenciosos. Ganhou uma cliente fiel.",
    time: "10:46"
  },
  {
    name: "Ricardo O.",
    avatar: "assets/avatars/avatar-ricardo.jpg",
    feedPrint: "assets/feeds/feed7.PNG",
    product: "Placa de Vídeo RTX 3080 Ti",
    quote: "Natal chegando mais cedo pra alguns! Placa de vídeo monstra, atendimento impecável e entrega rápida. Recomendo muito a Elite Computadores!",
    time: "14:32"
  },
  {
    name: "Carla S.",
    avatar: "assets/avatars/avatar-carla.jpg",
    feedPrint: "assets/feeds/feed8.PNG",
    product: "Setup Gamer Razer + Curvo",
    quote: "Meu filho adorou o presente! O setup completo ficou incrível, a montagem impecável e o suporte de vocês foi sensacional!",
    time: "18:15"
  },
  {
    name: "Rodrigo T.",
    avatar: "assets/avatars/avatar-rodrigo.jpg",
    feedPrint: "assets/feeds/feed10.PNG",
    product: "Workstation de Edição",
    quote: "Essa máquina tá aqui mandando ver no trabalho kkk. Vai vendendo dessa daí pq ela aguenta firme o trabalho e n trava nd, com programas de edições eu tenho 7 aqui instalados e n perde em nd!",
    time: "12:25"
  },
  {
    name: "Patrícia M.",
    avatar: "assets/avatars/avatar-patricia.jpg",
    feedPrint: "assets/feeds/feed11.jpg",
    product: "Atendimento Premium",
    quote: "Eu que te agradeço. Nunca fui atendida tão bem, muito obrigada mesmo!",
    time: "13:33"
  },
  {
    name: "José Vitor",
    avatar: "assets/avatars/avatar-jose.jpg",
    feedPrint: "assets/feeds/feed12.jpg",
    product: "Montagem e Entrega Rápida",
    quote: "Serviço de qualidade, entregaram o meu computador muito rápido. Preço justo, muito atencioso. Recomendo para todos.",
    time: "15:45"
  },
  {
    name: "Gabriel S.",
    avatar: "assets/avatars/avatar-gabriel.jpg",
    feedPrint: "assets/feeds/feed13.png",
    product: "Monitor Alienware 240Hz",
    quote: "Boa noite chefe. O monitor chegou certinho aqui, só agradece! Desculpa por mandar várias mensagens, mas sabe como é a ansiedade né kkk!",
    time: "21:06"
  }
];
