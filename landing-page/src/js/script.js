// KEYEA - Sistema Multidimensional Revolucionário
// Cada clique é um portal para uma dimensão diferente

class KeyeaMultiverse {
    constructor() {
        this.isInitialized = false;
        this.soundEnabled = true;
        this.portalsEnabled = true;
        this.fourDEnabled = true;
        this.cameraEnabled = false;
        this.currentDimension = null;
        this.activePortals = [];
        
        // Sistemas
        this.particles = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.hands = null;
        this.cameraStream = null;
        
        // Dimensões
        this.dimensions = {
            quantum: { name: 'Quântica', color: '#00ffff', effect: 'quantumFloat' },
            hologram: { name: 'Holográfica', color: '#ff00ff', effect: 'hologramRotate' },
            time: { name: 'Temporal', color: '#ffff00', effect: 'timeFlow' },
            neural: { name: 'Neural', color: '#00ff00', effect: 'neuralPulse' },
            cosmic: { name: 'Cósmica', color: '#ff8800', effect: 'cosmicExpand' },
            digital: { name: 'Digital', color: '#0088ff', effect: 'matrixFlow' },
            elemental: { name: 'Elemental', color: '#ff4400', effect: 'elementalBurn' },
            sound: { name: 'Sonora', color: '#8800ff', effect: 'soundWave' }
        };
        
        // Áudio
        this.sounds = {};
        
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando KEYEA - Multiverso Interdimensional');
        
        // Inicializar loading
        this.initLoading();
        
        // Carregar sistemas
        await this.loadSystems();
        
        // Inicializar componentes
        this.initComponents();
        
        // Configurar eventos
        this.setupEventListeners();
        
        // Finalizar inicialização
        this.finishInitialization();
    }

    initLoading() {
        const loadingScreen = document.querySelector('.loading-screen');
        const progress = document.querySelector('.loading-progress');
        const loadingText = document.querySelector('.loading-text');
        
        const loadingSteps = [
            'Carregando multiverso...',
            'Inicializando portais dimensionais...',
            'Configurando IA multidimensional...',
            'Ativando renderização 4D...',
            'Multiverso pronto!'
        ];
        
        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < loadingSteps.length) {
                loadingText.textContent = loadingSteps[currentStep];
                progress.style.width = `${((currentStep + 1) / loadingSteps.length) * 100}%`;
                currentStep++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }, 1000);
            }
        }, 600);
    }

    async loadSystems() {
        // Carregar sons
        this.loadSounds();
        
        // Inicializar Three.js
        this.initThreeJS();
        
        // Inicializar partículas
        this.initParticles();
        
        // Inicializar MediaPipe
        await this.initHandDetection();
        
        // Inicializar TensorFlow.js
        await this.initTensorFlow();
    }

    loadSounds() {
        this.sounds = {
            hover: new Howl({
                src: ['#hover-sound'],
                volume: 0.3
            }),
            click: new Howl({
                src: ['#click-sound'],
                volume: 0.5
            }),
            portal: new Howl({
                src: ['#portal-sound'],
                volume: 0.4
            })
        };
    }

    initThreeJS() {
        // Configurar cena Three.js
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: document.getElementById('bg-canvas'),
            alpha: true,
            antialias: true
        });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        // Configurar câmera
        this.camera.position.z = 5;
        
        // Adicionar luzes
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        // Criar geometria de fundo
        this.createBackgroundGeometry();
        
        // Iniciar renderização
        this.animate();
    }

    createBackgroundGeometry() {
        // Criar grade holográfica
        const gridHelper = new THREE.GridHelper(20, 20, 0x00d4ff, 0x00d4ff);
        gridHelper.material.opacity = 0.1;
        gridHelper.material.transparent = true;
        this.scene.add(gridHelper);
        
        // Criar partículas flutuantes 3D
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
            
            colors[i] = 0.0;
            colors[i + 1] = 0.8;
            colors[i + 2] = 1.0;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (this.fourDEnabled && this.particles) {
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#00d4ff'
                    },
                    shape: {
                        type: 'circle'
                    },
                    opacity: {
                        value: 0.5,
                        random: false
                    },
                    size: {
                        value: 3,
                        random: true
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00d4ff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    async initHandDetection() {
        try {
            this.hands = new Hands({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
                }
            });

            this.hands.setOptions({
                maxNumHands: 2,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });

            this.hands.onResults((results) => {
                this.onHandResults(results);
            });

            console.log('✅ Detecção de mãos inicializada');
        } catch (error) {
            console.error('❌ Erro ao inicializar detecção de mãos:', error);
        }
    }

    async initTensorFlow() {
        try {
            if (typeof tf !== 'undefined') {
                console.log('✅ TensorFlow.js carregado');
                console.log('🧠 IA multidimensional inicializada');
            }
        } catch (error) {
            console.error('❌ Erro ao inicializar TensorFlow:', error);
        }
    }

    initComponents() {
        // Inicializar cursor personalizado
        this.initCustomCursor();
        
        // Inicializar animações GSAP
        this.initGSAPAnimations();
        
        // Inicializar controles
        this.initControls();
        
        // Inicializar navegação
        this.initNavigation();
        
        // Inicializar formulário
        this.initForm();
        
        // Inicializar sistema de portais
        this.initPortalSystem();
    }

    initCustomCursor() {
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.custom-cursor-follower');
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Efeitos de hover
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('button, a, .nav-link, .control-btn, .dimension-zone')) {
                cursor.style.transform = 'scale(1.5)';
                follower.style.transform = 'scale(1.5)';
                if (this.soundEnabled) this.sounds.hover.play();
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('button, a, .nav-link, .control-btn, .dimension-zone')) {
                cursor.style.transform = 'scale(1)';
                follower.style.transform = 'scale(1)';
            }
        });
    }

    initGSAPAnimations() {
        // Animações de entrada
        gsap.from('.nexus-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });
        
        gsap.from('.nexus-description', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 1
        });
        
        gsap.from('.nexus-buttons', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 1.5
        });
        
        gsap.from('.floating-element', {
            duration: 2,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)',
            stagger: 0.2,
            delay: 2
        });
        
        // Animações de scroll
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });
        });
        
        // Animar estatísticas
        this.animateStats();
    }

    animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = stat.getAttribute('data-target');
            const isDecimal = target.toString().includes('.');
            
            gsap.to(stat, {
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                duration: 2,
                ease: 'power2.out',
                onUpdate: function() {
                    const value = Math.round(this.targets()[0]._gsap.xVal);
                    if (isDecimal) {
                        stat.textContent = (value / 10).toFixed(1);
                    } else {
                        stat.textContent = value;
                    }
                },
                xVal: target === '∞' ? 100 : parseInt(target)
            });
        });
    }

    initControls() {
        // Controle de som
        const toggleSound = document.getElementById('toggle-sound');
        toggleSound.addEventListener('click', () => {
            this.soundEnabled = !this.soundEnabled;
            toggleSound.classList.toggle('active', this.soundEnabled);
            if (this.soundEnabled) this.sounds.click.play();
        });
        
        // Controle de portais
        const togglePortals = document.getElementById('toggle-portals');
        togglePortals.addEventListener('click', () => {
            this.portalsEnabled = !this.portalsEnabled;
            togglePortals.classList.toggle('active', this.portalsEnabled);
            if (this.soundEnabled) this.sounds.click.play();
        });
        
        // Controle 4D
        const toggle4D = document.getElementById('toggle-4d');
        toggle4D.addEventListener('click', () => {
            this.fourDEnabled = !this.fourDEnabled;
            toggle4D.classList.toggle('active', this.fourDEnabled);
            const canvas = document.getElementById('bg-canvas');
            canvas.style.opacity = this.fourDEnabled ? '1' : '0';
            if (this.soundEnabled) this.sounds.click.play();
        });
        
        // Controle de câmera
        const toggleCamera = document.getElementById('toggle-camera');
        toggleCamera.addEventListener('click', () => {
            this.toggleCamera();
        });
        
        // Botões de portais
        const activatePortals = document.getElementById('activate-portals');
        activatePortals.addEventListener('click', () => {
            this.activatePortalSystem();
        });
        
        const randomDimension = document.getElementById('random-dimension');
        randomDimension.addEventListener('click', () => {
            this.enterRandomDimension();
        });
        
        // Botões de demo
        const demoButtons = document.querySelectorAll('.demo-btn');
        demoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const demo = e.target.getAttribute('data-demo');
                this.activateDemo(demo);
            });
        });
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                const section = document.querySelector(target);
                
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                if (this.soundEnabled) this.sounds.click.play();
            });
        });
    }

    initForm() {
        const form = document.getElementById('contact-form');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simular envio
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            
            submitBtn.querySelector('.btn-text').textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = 'Enviado!';
                submitBtn.style.background = '#00ff88';
                
                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
            
            if (this.soundEnabled) this.sounds.click.play();
        });
    }

    initPortalSystem() {
        // Sistema de portais dimensionais
        this.createPortalZones();
        
        // Event listeners para cliques em qualquer lugar
        document.addEventListener('click', (e) => {
            if (this.portalsEnabled && !e.target.closest('.dimension-zone, .nav-link, button, .dimension-overlay')) {
                this.createRandomPortal(e.clientX, e.clientY);
            }
        });
        
        // Event listeners para zonas dimensionais
        const dimensionZones = document.querySelectorAll('.dimension-zone');
        dimensionZones.forEach(zone => {
            zone.addEventListener('click', (e) => {
                const dimension = zone.getAttribute('data-dimension');
                this.enterDimension(dimension);
            });
        });
        
        // Event listeners para fechar dimensões
        const closeButtons = document.querySelectorAll('.close-dimension');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.exitDimension();
            });
        });
    }

    createPortalZones() {
        // Criar zonas de portal invisíveis em toda a página
        const portalZones = [];
        const zoneSize = 100;
        const cols = Math.ceil(window.innerWidth / zoneSize);
        const rows = Math.ceil(window.innerHeight / zoneSize);
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const zone = {
                    x: i * zoneSize,
                    y: j * zoneSize,
                    width: zoneSize,
                    height: zoneSize,
                    dimension: this.getRandomDimension()
                };
                portalZones.push(zone);
            }
        }
        
        this.portalZones = portalZones;
    }

    getRandomDimension() {
        const dimensions = Object.keys(this.dimensions);
        return dimensions[Math.floor(Math.random() * dimensions.length)];
    }

    createRandomPortal(x, y) {
        const dimension = this.getRandomDimension();
        const portal = document.createElement('div');
        portal.className = 'random-portal';
        portal.style.cssText = `
            position: fixed;
            left: ${x - 25}px;
            top: ${y - 25}px;
            width: 50px;
            height: 50px;
            border: 2px solid ${this.dimensions[dimension].color};
            border-radius: 50%;
            background: radial-gradient(circle, ${this.dimensions[dimension].color}20, transparent);
            pointer-events: none;
            z-index: 9999;
            animation: portalPulse 1s ease-out;
        `;
        
        document.body.appendChild(portal);
        
        // Efeito de portal
        gsap.to(portal, {
            scale: 3,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
                portal.remove();
                this.enterDimension(dimension);
            }
        });
        
        if (this.soundEnabled) this.sounds.portal.play();
    }

    enterDimension(dimension) {
        if (this.currentDimension === dimension) return;
        
        this.currentDimension = dimension;
        const overlay = document.querySelector(`.${dimension}-overlay`);
        
        if (overlay) {
            overlay.classList.add('active');
            
            // Efeito de entrada
            gsap.from(overlay.querySelector('.overlay-content'), {
                scale: 0,
                opacity: 0,
                duration: 1,
                ease: 'back.out(1.7)'
            });
            
            // Atualizar HUD
            this.updateDimensionHUD(dimension);
            
            if (this.soundEnabled) this.sounds.portal.play();
        }
    }

    enterRandomDimension() {
        const dimension = this.getRandomDimension();
        this.enterDimension(dimension);
    }

    exitDimension() {
        if (!this.currentDimension) return;
        
        const overlay = document.querySelector(`.${this.currentDimension}-overlay`);
        
        if (overlay) {
            // Efeito de saída
            gsap.to(overlay.querySelector('.overlay-content'), {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    overlay.classList.remove('active');
                    this.currentDimension = null;
                    this.updateDimensionHUD(null);
                }
            });
            
            if (this.soundEnabled) this.sounds.portal.play();
        }
    }

    updateDimensionHUD(dimension) {
        const hudElement = document.querySelector('.hud-corner.top-left .hud-element span');
        if (dimension) {
            hudElement.textContent = this.dimensions[dimension].name.toUpperCase();
        } else {
            hudElement.textContent = 'NEXUS';
        }
    }

    activatePortalSystem() {
        this.portalsEnabled = true;
        
        // Atualizar interface
        const button = document.getElementById('activate-portals');
        button.querySelector('.btn-text').textContent = 'Portais Ativos';
        button.style.background = '#00ff88';
        
        // Criar efeito visual
        this.createPortalEffect();
        
        if (this.soundEnabled) this.sounds.click.play();
    }

    createPortalEffect() {
        // Criar múltiplos portais aleatórios
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                this.createRandomPortal(x, y);
            }, i * 200);
        }
    }

    activateDemo(demoType) {
        // Ativar demonstração específica
        const demoButtons = document.querySelectorAll('.demo-btn');
        demoButtons.forEach(btn => btn.classList.remove('active'));
        
        const activeButton = document.querySelector(`[data-demo="${demoType}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Executar demo
        this.enterDimension(demoType);
        
        if (this.soundEnabled) this.sounds.click.play();
    }

    async toggleCamera() {
        if (!this.cameraEnabled) {
            try {
                this.cameraStream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: 320,
                        height: 240,
                        facingMode: 'user'
                    }
                });
                
                const video = document.getElementById('camera-feed');
                video.srcObject = this.cameraStream;
                
                const cameraContainer = document.querySelector('.camera-container');
                cameraContainer.classList.add('active');
                
                this.cameraEnabled = true;
                document.getElementById('toggle-camera').classList.add('active');
                
                if (this.soundEnabled) this.sounds.click.play();
                
            } catch (error) {
                console.error('Erro ao acessar câmera:', error);
                alert('Erro ao acessar câmera. Verifique as permissões.');
            }
        } else {
            this.stopCamera();
        }
    }

    stopCamera() {
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach(track => track.stop());
            this.cameraStream = null;
        }
        
        const cameraContainer = document.querySelector('.camera-container');
        cameraContainer.classList.remove('active');
        
        this.cameraEnabled = false;
        document.getElementById('toggle-camera').classList.remove('active');
        
        if (this.soundEnabled) this.sounds.click.play();
    }

    onHandResults(results) {
        const canvas = document.getElementById('hand-detection-canvas');
        const ctx = canvas.getContext('2d');
        
        // Limpar canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                this.drawHandLandmarks(ctx, landmarks);
                this.analyzeGesture(landmarks);
            }
        }
    }

    drawHandLandmarks(ctx, landmarks) {
        // Desenhar pontos de referência
        for (let i = 0; i < landmarks.length; i++) {
            const landmark = landmarks[i];
            const x = landmark.x * ctx.canvas.width;
            const y = landmark.y * ctx.canvas.height;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fillStyle = '#00d4ff';
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Desenhar conexões
        const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4], // Polegar
            [0, 5], [5, 6], [6, 7], [7, 8], // Dedo indicador
            [0, 9], [9, 10], [10, 11], [11, 12], // Dedo médio
            [0, 13], [13, 14], [14, 15], [15, 16], // Dedo anelar
            [0, 17], [17, 18], [18, 19], [19, 20], // Dedo mínimo
            [5, 9], [9, 13], [13, 17] // Conexões entre dedos
        ];
        
        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 2;
        
        connections.forEach(([start, end]) => {
            const startPoint = landmarks[start];
            const endPoint = landmarks[end];
            
            ctx.beginPath();
            ctx.moveTo(startPoint.x * ctx.canvas.width, startPoint.y * ctx.canvas.height);
            ctx.lineTo(endPoint.x * ctx.canvas.width, endPoint.y * ctx.canvas.height);
            ctx.stroke();
        });
    }

    analyzeGesture(landmarks) {
        // Analisar gestos para ativar portais
        const fingerTips = [4, 8, 12, 16, 20];
        const fingerBases = [2, 5, 9, 13, 17];
        
        let extendedFingers = 0;
        
        for (let i = 0; i < fingerTips.length; i++) {
            const tip = landmarks[fingerTips[i]];
            const base = landmarks[fingerBases[i]];
            
            if (tip.y < base.y) {
                extendedFingers++;
            }
        }
        
        // Gestos especiais para portais
        if (extendedFingers === 5) {
            // Mão aberta - ativar todos os portais
            this.activateAllPortals();
        } else if (extendedFingers === 0) {
            // Punho fechado - fechar todos os portais
            this.closeAllPortals();
        } else if (extendedFingers === 2) {
            // Paz e amor - portal aleatório
            this.enterRandomDimension();
        }
    }

    activateAllPortals() {
        // Ativar todos os portais dimensionais
        const dimensionZones = document.querySelectorAll('.dimension-zone');
        dimensionZones.forEach((zone, index) => {
            setTimeout(() => {
                zone.style.transform = 'scale(1.1)';
                zone.style.boxShadow = `0 0 50px ${this.dimensions[zone.getAttribute('data-dimension')].color}`;
            }, index * 100);
        });
    }

    closeAllPortals() {
        // Fechar todos os portais
        const dimensionZones = document.querySelectorAll('.dimension-zone');
        dimensionZones.forEach(zone => {
            zone.style.transform = 'scale(1)';
            zone.style.boxShadow = '';
        });
        
        if (this.currentDimension) {
            this.exitDimension();
        }
    }

    setupEventListeners() {
        // Resize handler
        window.addEventListener('resize', () => {
            this.onResize();
        });
        
        // Scroll handler
        window.addEventListener('scroll', () => {
            this.onScroll();
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.onKeyPress(e);
        });
    }

    onResize() {
        if (this.renderer) {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }
    }

    onScroll() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.nexus');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    }

    onKeyPress(e) {
        switch(e.key) {
            case '1':
                this.soundEnabled = !this.soundEnabled;
                break;
            case '2':
                this.portalsEnabled = !this.portalsEnabled;
                break;
            case '3':
                this.fourDEnabled = !this.fourDEnabled;
                break;
            case 'c':
                this.toggleCamera();
                break;
            case 'p':
                this.activatePortalSystem();
                break;
            case 'r':
                this.enterRandomDimension();
                break;
            case 'Escape':
                if (this.currentDimension) {
                    this.exitDimension();
                }
                break;
        }
    }

    finishInitialization() {
        this.isInitialized = true;
        console.log('🎉 KEYEA Multiverso inicializado com sucesso!');
        
        // Mostrar HUD
        const hudElements = document.querySelectorAll('.hud-element');
        hudElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// Inicializar sistema quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.keyeaMultiverse = new KeyeaMultiverse();
});

// Exportar para uso global
window.KeyeaMultiverse = KeyeaMultiverse; 
window.KeyeaSystem = KeyeaSystem; 