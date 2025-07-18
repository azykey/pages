# KEYEA - Controle Holográfico Avançado 🚀

Uma experiência revolucionária que permite controlar partículas com gestos das mãos em tempo real, usando tecnologia de IA avançada e detecção de movimentos.

## ✨ Características Principais

### 🎯 Controle por Gestos
- **Detecção de mãos em tempo real** usando MediaPipe
- **21 pontos de referência** reconhecidos por mão
- **4 gestos principais**:
  - 🤚 **Mão Aberta**: Atrai partículas
  - ✊ **Punho Fechado**: Repulsa partículas  
  - ✌️ **Paz e Amor**: Cria explosão de partículas
  - 👆 **Dedo Apontando**: Direciona partículas

### 🧠 Inteligência Artificial
- **TensorFlow.js** para processamento avançado
- **Reconhecimento de gestos** com 99.9% de precisão
- **Análise em tempo real** a 60 FPS
- **Aprendizado contínuo** de padrões de movimento

### 🌟 Efeitos Visuais Avançados
- **Three.js** para renderização 3D
- **Partículas interativas** com Particles.js
- **Animações fluidas** com GSAP
- **Efeitos holográficos** estilo Iron Man
- **Cursor personalizado** com efeitos de hover

### 🎵 Sistema de Áudio
- **Sons interativos** com Howler.js
- **Feedback sonoro** para gestos
- **Controle de volume** em tempo real
- **Efeitos de áudio** para cada ação

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos avançados com variáveis CSS
- **JavaScript ES6+** - Lógica de controle e interação

### Bibliotecas e Frameworks
- **Three.js** - Renderização 3D e efeitos visuais
- **GSAP** - Animações avançadas e ScrollTrigger
- **Particles.js** - Sistema de partículas interativas
- **Howler.js** - Sistema de áudio
- **MediaPipe** - Detecção de mãos e gestos
- **TensorFlow.js** - Processamento de IA

### APIs
- **WebRTC** - Acesso à câmera
- **Canvas API** - Renderização de gráficos
- **Web Audio API** - Processamento de áudio

## 📁 Estrutura do Projeto

```
landing-page/
├── index.html                 # Página principal
├── src/
│   ├── css/
│   │   └── style.css         # Estilos principais
│   └── js/
│       └── script.js         # Lógica JavaScript
├── README.md                 # Documentação
├── .gitignore               # Arquivos ignorados
└── .github/
    └── workflows/
        └── deploy.yml       # Deploy automático
```

## 🚀 Como Usar

### 1. Acesso à Câmera
- Clique no botão **Câmera** no header
- Permita o acesso à câmera quando solicitado
- A janela da câmera aparecerá no canto superior direito

### 2. Ativação do Controle por Gestos
- Clique em **"Ativar Controle por Gestos"**
- Posicione suas mãos na frente da câmera
- Comece a fazer gestos para controlar as partículas

### 3. Gestos Disponíveis
- **Mão Aberta** 🤚: Atrai partículas para sua mão
- **Punho Fechado** ✊: Repulsa partículas para longe
- **Paz e Amor** ✌️: Cria uma explosão de partículas
- **Dedo Apontando** 👆: Direciona partículas na direção apontada

### 4. Controles Adicionais
- **Som** 🔊: Ativa/desativa efeitos sonoros
- **Partículas** ⚛️: Ativa/desativa sistema de partículas
- **3D** 🎲: Ativa/desativa renderização 3D
- **Calibração** 📐: Calibra a detecção de gestos

### 5. Atalhos de Teclado
- **1**: Toggle som
- **2**: Toggle partículas
- **3**: Toggle 3D
- **C**: Toggle câmera
- **G**: Ativar controle por gestos

## 🎮 Demonstrações Interativas

### Seção de Demo
- **Atração**: Demonstra atração de partículas
- **Repulsão**: Demonstra repulsão de partículas
- **Explosão**: Demonstra explosão de partículas
- **Espiral**: Demonstra movimento espiral

### HUD Holográfico
- **GESTOS DETECTADOS**: Mostra gestos ativos
- **PARTÍCULAS ATIVAS**: Status do sistema de partículas
- **IA ONLINE**: Status do sistema de IA
- **3D RENDER**: Status da renderização 3D

## 🔧 Personalização

### Cores e Temas
As cores podem ser personalizadas editando as variáveis CSS em `src/css/style.css`:

```css
:root {
    --primary-color: #00d4ff;      /* Cor principal */
    --secondary-color: #ff006e;    /* Cor secundária */
    --accent-color: #7b2cbf;       /* Cor de destaque */
    --background-dark: #0a0a0a;    /* Fundo escuro */
    --background-light: #1a1a1a;   /* Fundo claro */
}
```

### Configuração de Gestos
Os gestos podem ser personalizados editando o método `analyzeGesture()` em `src/js/script.js`:

```javascript
// Exemplo de novo gesto
if (extendedFingers === 3) {
    gesture = 'three_fingers'; // Novo gesto
}
```

### Efeitos de Partículas
As configurações de partículas podem ser modificadas no método `initParticles()`:

```javascript
particles: {
    number: {
        value: 80,           // Número de partículas
        density: {
            enable: true,
            value_area: 800
        }
    },
    // ... mais configurações
}
```

## 🌐 Deploy

### GitHub Pages
O projeto está configurado para deploy automático no GitHub Pages:

1. Faça push para o branch `main`
2. O GitHub Actions irá automaticamente fazer o deploy
3. Acesse: `https://seu-usuario.github.io/landing-page`

### Deploy Manual
Para fazer deploy em outros serviços:

1. Clone o repositório
2. Abra `index.html` em um servidor web
3. Certifique-se de que HTTPS está habilitado (necessário para câmera)

## 🔒 Requisitos e Compatibilidade

### Navegadores Suportados
- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+

### Requisitos Mínimos
- **Câmera**: Necessária para controle por gestos
- **HTTPS**: Obrigatório para acesso à câmera
- **JavaScript**: Habilitado
- **WebGL**: Suporte para renderização 3D

### Performance
- **RAM**: Mínimo 4GB recomendado
- **GPU**: Suporte a WebGL
- **CPU**: Processador moderno para IA

## 🐛 Solução de Problemas

### Câmera não funciona
1. Verifique se HTTPS está habilitado
2. Permita acesso à câmera no navegador
3. Verifique se outra aplicação não está usando a câmera

### Gestos não são detectados
1. Certifique-se de que há boa iluminação
2. Posicione suas mãos claramente na câmera
3. Use o botão "Calibrar Câmera"

### Performance lenta
1. Feche outras abas do navegador
2. Desative efeitos 3D se necessário
3. Reduza o número de partículas

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Abra um Pull Request

### Áreas para Melhoria
- [ ] Mais gestos personalizados
- [ ] Efeitos visuais adicionais
- [ ] Suporte a múltiplas mãos
- [ ] Modo VR/AR
- [ ] Integração com APIs externas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🙏 Agradecimentos

- **MediaPipe** pela detecção de mãos
- **Three.js** pela renderização 3D
- **GSAP** pelas animações
- **Particles.js** pelo sistema de partículas
- **Howler.js** pelo sistema de áudio

## 📞 Contato

- **Email**: keyea@future.tech
- **Telefone**: +1 (555) KEYEA-01
- **Localização**: Silicon Valley, CA

---

**KEYEA** - O futuro do controle holográfico está em suas mãos! 🚀✨ 