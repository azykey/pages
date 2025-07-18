// KEYEA - Sistema de Controle Holográfico Avançado
// Tecnologia de IA e Detecção de Gestos em Tempo Real

class KeyeaSystem {
    constructor() {
        this.isInitialized = false;
        this.soundEnabled = true;
        this.particlesEnabled = true;
        this.threeDEnabled = true;
        this.cameraEnabled = false;
        this.gestureControlActive = false;
        
        // Sistemas
        this.particles = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.hands = null;
        this.cameraStream = null;
        
        // Estados de gestos
        this.currentGesture = null;
        this.gestureHistory = [];
        this.handLandmarks = [];
        
        // Áudio
        this.sounds = {};
        
        this.init();
    }

    async init() {
        console.log('🚀 Inicializando KEYEA - Sistema Holográfico');
        
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
            'Carregando sistema de IA...',
            'Inicializando detecção de gestos...',
            'Configurando partículas holográficas...',
            'Ativando renderização 3D...',
            'Sistema pronto!'
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
        
        // Inicializar MediaPipe para detecção de mãos
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
            gesture: new Howl({
                src: ['#gesture-sound'],
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
        
        if (this.threeDEnabled && this.particles) {
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
            // Configurar MediaPipe Hands
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
            // Verificar se TensorFlow.js está disponível
            if (typeof tf !== 'undefined') {
                console.log('✅ TensorFlow.js carregado');
                
                // Carregar modelo de reconhecimento de gestos
                // Aqui você pode carregar um modelo personalizado
                console.log('🧠 IA inicializada');
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
            if (e.target.matches('button, a, .nav-link, .control-btn')) {
                cursor.style.transform = 'scale(1.5)';
                follower.style.transform = 'scale(1.5)';
                if (this.soundEnabled) this.sounds.hover.play();
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('button, a, .nav-link, .control-btn')) {
                cursor.style.transform = 'scale(1)';
                follower.style.transform = 'scale(1)';
            }
        });
    }

    initGSAPAnimations() {
        // Animações de entrada
        gsap.from('.hero-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out',
            delay: 0.5
        });
        
        gsap.from('.hero-description', {
            duration: 1.5,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            delay: 1
        });
        
        gsap.from('.hero-buttons', {
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
            const target = parseInt(stat.getAttribute('data-target'));
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
                xVal: target
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
        
        // Controle de partículas
        const toggleParticles = document.getElementById('toggle-particles');
        toggleParticles.addEventListener('click', () => {
            this.particlesEnabled = !this.particlesEnabled;
            toggleParticles.classList.toggle('active', this.particlesEnabled);
            const particlesContainer = document.getElementById('particles-js');
            particlesContainer.style.opacity = this.particlesEnabled ? '1' : '0';
            if (this.soundEnabled) this.sounds.click.play();
        });
        
        // Controle 3D
        const toggle3D = document.getElementById('toggle-3d');
        toggle3D.addEventListener('click', () => {
            this.threeDEnabled = !this.threeDEnabled;
            toggle3D.classList.toggle('active', this.threeDEnabled);
            const canvas = document.getElementById('bg-canvas');
            canvas.style.opacity = this.threeDEnabled ? '1' : '0';
            if (this.soundEnabled) this.sounds.click.play();
        });
        
        // Controle de câmera
        const toggleCamera = document.getElementById('toggle-camera');
        toggleCamera.addEventListener('click', () => {
            this.toggleCamera();
        });
        
        // Botões de gestos
        const startGestureControl = document.getElementById('start-gesture-control');
        startGestureControl.addEventListener('click', () => {
            this.activateGestureControl();
        });
        
        const calibrateCamera = document.getElementById('calibrate-camera');
        calibrateCamera.addEventListener('click', () => {
            this.calibrateCamera();
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
        const parallax = document.querySelector('.hero');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    }

    onKeyPress(e) {
        switch(e.key) {
            case '1':
                this.toggleSound();
                break;
            case '2':
                this.toggleParticles();
                break;
            case '3':
                this.toggle3D();
                break;
            case 'c':
                this.toggleCamera();
                break;
            case 'g':
                this.activateGestureControl();
                break;
        }
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
                
                // Iniciar detecção de mãos
                this.startHandDetection();
                
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
        this.gestureControlActive = false;
        document.getElementById('toggle-camera').classList.remove('active');
        
        if (this.soundEnabled) this.sounds.click.play();
    }

    startHandDetection() {
        if (this.hands && this.cameraEnabled) {
            const video = document.getElementById('camera-feed');
            const canvas = document.getElementById('hand-detection-canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            const processFrame = async () => {
                if (this.cameraEnabled) {
                    await this.hands.send({ image: video });
                    requestAnimationFrame(processFrame);
                }
            };
            
            processFrame();
        }
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
        // Analisar posição dos dedos para identificar gestos
        const fingerTips = [4, 8, 12, 16, 20]; // Pontas dos dedos
        const fingerBases = [2, 5, 9, 13, 17]; // Bases dos dedos
        
        let extendedFingers = 0;
        let gesture = null;
        
        // Verificar dedos estendidos
        for (let i = 0; i < fingerTips.length; i++) {
            const tip = landmarks[fingerTips[i]];
            const base = landmarks[fingerBases[i]];
            
            if (tip.y < base.y) {
                extendedFingers++;
            }
        }
        
        // Identificar gestos
        if (extendedFingers === 5) {
            gesture = 'open_hand'; // Mão aberta - atrai partículas
        } else if (extendedFingers === 0) {
            gesture = 'closed_fist'; // Punho fechado - repulsa partículas
        } else if (extendedFingers === 2 && landmarks[8].y < landmarks[6].y && landmarks[12].y < landmarks[10].y) {
            gesture = 'peace'; // Paz e amor - explosão
        } else if (extendedFingers === 1 && landmarks[8].y < landmarks[6].y) {
            gesture = 'pointing'; // Dedo apontando - direciona
        }
        
        if (gesture && gesture !== this.currentGesture) {
            this.currentGesture = gesture;
            this.executeGesture(gesture, landmarks);
        }
    }

    executeGesture(gesture, landmarks) {
        console.log('Gesto detectado:', gesture);
        
        // Atualizar HUD
        this.updateGestureHUD(gesture);
        
        // Executar ação baseada no gesto
        switch (gesture) {
            case 'open_hand':
                this.attractParticles(landmarks);
                break;
            case 'closed_fist':
                this.repulseParticles(landmarks);
                break;
            case 'peace':
                this.explodeParticles(landmarks);
                break;
            case 'pointing':
                this.directParticles(landmarks);
                break;
        }
        
        // Tocar som
        if (this.soundEnabled) this.sounds.gesture.play();
    }

    updateGestureHUD(gesture) {
        const gestureText = document.querySelector('.gesture-text');
        const gestureNames = {
            'open_hand': 'Mão Aberta - Atração',
            'closed_fist': 'Punho Fechado - Repulsão',
            'peace': 'Paz e Amor - Explosão',
            'pointing': 'Dedo Apontando - Direção'
        };
        
        gestureText.textContent = gestureNames[gesture] || 'Gesto Detectado';
        
        // Atualizar indicador de gesto
        const indicator = document.querySelector('.gesture-indicator');
        indicator.classList.add('active');
        
        setTimeout(() => {
            indicator.classList.remove('active');
        }, 2000);
    }

    attractParticles(landmarks) {
        // Implementar atração de partículas
        if (this.particles) {
            const center = landmarks[9]; // Centro da palma
            const targetX = (center.x - 0.5) * 10;
            const targetY = (center.y - 0.5) * 10;
            
            // Animar partículas para o centro da mão
            gsap.to(this.particles.position, {
                x: targetX,
                y: targetY,
                duration: 1,
                ease: 'power2.out'
            });
        }
    }

    repulseParticles(landmarks) {
        // Implementar repulsão de partículas
        if (this.particles) {
            const center = landmarks[9];
            const targetX = (center.x - 0.5) * -10;
            const targetY = (center.y - 0.5) * -10;
            
            gsap.to(this.particles.position, {
                x: targetX,
                y: targetY,
                duration: 1,
                ease: 'power2.out'
            });
        }
    }

    explodeParticles(landmarks) {
        // Implementar explosão de partículas
        if (this.particles) {
            // Animar partículas para fora
            gsap.to(this.particles.scale, {
                x: 2,
                y: 2,
                z: 2,
                duration: 0.5,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        }
    }

    directParticles(landmarks) {
        // Implementar direcionamento de partículas
        const tip = landmarks[8]; // Ponta do dedo indicador
        const direction = {
            x: (tip.x - 0.5) * 2,
            y: (tip.y - 0.5) * 2
        };
        
        if (this.particles) {
            gsap.to(this.particles.rotation, {
                x: direction.y,
                y: direction.x,
                duration: 1,
                ease: 'power2.out'
            });
        }
    }

    activateGestureControl() {
        if (!this.cameraEnabled) {
            this.toggleCamera();
        }
        
        this.gestureControlActive = true;
        
        // Atualizar interface
        const button = document.getElementById('start-gesture-control');
        button.querySelector('.btn-text').textContent = 'Controle Ativo';
        button.style.background = '#00ff88';
        
        if (this.soundEnabled) this.sounds.click.play();
    }

    calibrateCamera() {
        if (this.cameraEnabled) {
            // Implementar calibração da câmera
            const gestureText = document.querySelector('.gesture-text');
            gestureText.textContent = 'Calibrando...';
            
            setTimeout(() => {
                gestureText.textContent = 'Calibração Concluída!';
                setTimeout(() => {
                    gestureText.textContent = 'Aguardando gestos...';
                }, 2000);
            }, 3000);
            
            if (this.soundEnabled) this.sounds.click.play();
        } else {
            alert('Ative a câmera primeiro!');
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
        switch (demoType) {
            case 'attract':
                this.demoAttract();
                break;
            case 'repulse':
                this.demoRepulse();
                break;
            case 'explosion':
                this.demoExplosion();
                break;
            case 'spiral':
                this.demoSpiral();
                break;
        }
        
        if (this.soundEnabled) this.sounds.click.play();
    }

    demoAttract() {
        if (this.particles) {
            gsap.to(this.particles.position, {
                x: 0,
                y: 0,
                z: 0,
                duration: 2,
                ease: 'power2.out'
            });
        }
    }

    demoRepulse() {
        if (this.particles) {
            gsap.to(this.particles.position, {
                x: 5,
                y: 5,
                z: 5,
                duration: 2,
                ease: 'power2.out'
            });
        }
    }

    demoExplosion() {
        if (this.particles) {
            gsap.to(this.particles.scale, {
                x: 3,
                y: 3,
                z: 3,
                duration: 0.5,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
        }
    }

    demoSpiral() {
        if (this.particles) {
            gsap.to(this.particles.rotation, {
                x: Math.PI * 4,
                y: Math.PI * 4,
                duration: 3,
                ease: 'power2.out'
            });
        }
    }

    finishInitialization() {
        this.isInitialized = true;
        console.log('🎉 KEYEA inicializado com sucesso!');
        
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
    window.keyeaSystem = new KeyeaSystem();
});

// Exportar para uso global
window.KeyeaSystem = KeyeaSystem; 