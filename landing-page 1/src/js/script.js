// Configurações globais
let scene, camera, renderer, controls;
let particles = [];
let mouse = { x: 0, y: 0 };
let is3DEnabled = true;
let isSoundEnabled = true;
let isParticlesEnabled = true;
let currentDemo = 'particles';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeLoading();
    initializeCursor();
    initializeParticles();
    initialize3DScene();
    initializeAudio();
    initializeEventListeners();
    initializeAnimations();
    initializeDemo();
});

// Loading Screen
function initializeLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    startExperience();
                }, 500);
            }, 500);
        }
        loadingProgress.style.width = progress + '%';
        
        if (progress < 30) loadingText.textContent = 'Carregando módulos...';
        else if (progress < 60) loadingText.textContent = 'Inicializando sistemas...';
        else if (progress < 90) loadingText.textContent = 'Conectando à rede...';
        else loadingText.textContent = 'Sistemas online!';
    }, 100);
}

// Cursor personalizado
function initializeCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });
    
    // Efeitos de hover
    document.querySelectorAll('a, button, .experience-card').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
            playSound('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
        });
    });
}

// Sistema de partículas
function initializeParticles() {
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
                value: ['#00ffff', '#ff00ff', '#ffff00']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
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

// Cena 3D com Three.js
function initialize3DScene() {
    const canvas = document.getElementById('bg-canvas');
    
    // Scene
    scene = new THREE.Scene();
    
    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    
    // Geometrias 3D
    create3DObjects();
    
    // Animação
    animate3D();
    
    // Resize
    window.addEventListener('resize', onWindowResize);
}

function create3DObjects() {
    // Geometria complexa
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    // Partículas 3D
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xff00ff,
        size: 0.05,
        transparent: true,
        opacity: 0.8
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    
    // Luzes
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Animar objetos
    function animate() {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        particleSystem.rotation.y += 0.005;
        
        requestAnimationFrame(animate);
    }
    animate();
}

function animate3D() {
    requestAnimationFrame(animate3D);
    
    if (is3DEnabled) {
        controls.update();
        renderer.render(scene, camera);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Sistema de áudio
function initializeAudio() {
    // Sons de hover e click
    const hoverSound = new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'],
        volume: 0.3
    });
    
    const clickSound = new Howl({
        src: ['data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'],
        volume: 0.5
    });
    
    window.hoverSound = hoverSound;
    window.clickSound = clickSound;
}

function playSound(type) {
    if (!isSoundEnabled) return;
    
    if (type === 'hover' && window.hoverSound) {
        window.hoverSound.play();
    } else if (type === 'click' && window.clickSound) {
        window.clickSound.play();
    }
}

// Event Listeners
function initializeEventListeners() {
    // Controles
    document.getElementById('toggle-sound').addEventListener('click', toggleSound);
    document.getElementById('toggle-3d').addEventListener('click', toggle3D);
    document.getElementById('toggle-particles').addEventListener('click', toggleParticles);
    
    // Botões principais
    document.getElementById('start-experience').addEventListener('click', startExperience);
    document.getElementById('explore-3d').addEventListener('click', explore3D);
    
    // Cards interativos
    document.querySelectorAll('.interaction-btn').forEach(btn => {
        btn.addEventListener('click', handleInteraction);
    });
    
    // Demo controls
    document.querySelectorAll('.demo-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const demo = e.target.dataset.demo;
            switchDemo(demo);
        });
    });
    
    // Formulário
    document.getElementById('contact-form').addEventListener('submit', handleFormSubmit);
    
    // Scroll effects
    window.addEventListener('scroll', handleScroll);
    
    // Mouse effects
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', () => playSound('click'));
}

// Controles
function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    const btn = document.getElementById('toggle-sound');
    btn.innerHTML = isSoundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
    btn.style.background = isSoundEnabled ? '#00ffff' : '#ff0000';
}

function toggle3D() {
    is3DEnabled = !is3DEnabled;
    const btn = document.getElementById('toggle-3d');
    btn.style.background = is3DEnabled ? '#00ffff' : '#ff0000';
    
    if (is3DEnabled) {
        document.getElementById('bg-canvas').style.opacity = '1';
    } else {
        document.getElementById('bg-canvas').style.opacity = '0';
    }
}

function toggleParticles() {
    isParticlesEnabled = !isParticlesEnabled;
    const btn = document.getElementById('toggle-particles');
    btn.style.background = isParticlesEnabled ? '#00ffff' : '#ff0000';
    
    const particlesContainer = document.getElementById('particles-js');
    particlesContainer.style.opacity = isParticlesEnabled ? '1' : '0';
}

// Experiência principal
function startExperience() {
    // Animações de entrada
    gsap.from('.hero-title', { duration: 1, y: 100, opacity: 0, ease: 'power3.out' });
    gsap.from('.hero-description', { duration: 1, y: 50, opacity: 0, delay: 0.3, ease: 'power3.out' });
    gsap.from('.hero-buttons', { duration: 1, y: 50, opacity: 0, delay: 0.6, ease: 'power3.out' });
    gsap.from('.floating-element', { duration: 1, scale: 0, opacity: 0, delay: 0.9, stagger: 0.2, ease: 'back.out' });
    
    // Efeitos especiais
    createParticleExplosion();
}

function explore3D() {
    // Animação para a cena 3D
    gsap.to(camera.position, { duration: 2, z: 2, ease: 'power2.out' });
    gsap.to(controls.target, { duration: 2, y: 1, ease: 'power2.out' });
}

// Interações
function handleInteraction(e) {
    const action = e.currentTarget.dataset.action;
    
    switch(action) {
        case 'vr-demo':
            startVRDemo();
            break;
        case 'ai-chat':
            startAIChat();
            break;
        case 'quantum-sim':
            startQuantumSim();
            break;
    }
}

function startVRDemo() {
    // Simulação de VR
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, #000 0%, #1a1a2e 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #00ffff;
        font-family: 'Orbitron', monospace;
        font-size: 2rem;
    `;
    overlay.innerHTML = '<div>VR Experience Loading...</div>';
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.remove();
    }, 3000);
}

function startAIChat() {
    // Simulação de chat IA
    const messages = [
        "Olá! Sou a IA do NEXUS. Como posso ajudá-lo hoje?",
        "Estou processando sua solicitação...",
        "Análise completa. Recomendação: Continue explorando!",
        "Sistemas otimizados. Experiência aprimorada."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < messages.length) {
            showNotification(messages[i], 'ai');
            i++;
        } else {
            clearInterval(interval);
        }
    }, 2000);
}

function startQuantumSim() {
    // Simulação quântica
    createQuantumEffect();
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'ai' ? 'linear-gradient(45deg, #00ffff, #ff00ff)' : '#00ffff'};
        color: #000;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Efeitos especiais
function createParticleExplosion() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #00ffff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
        `;
        
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        document.body.appendChild(particle);
        
        gsap.to(particle, {
            duration: 2,
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            opacity: 0,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
}

function createQuantumEffect() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9998;
        pointer-events: none;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            size: Math.random() * 3 + 1
        });
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.fillStyle = '#00ffff';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    setTimeout(() => {
        canvas.remove();
    }, 5000);
}

// Demo interativo
function initializeDemo() {
    const canvas = document.getElementById('demo-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    let animationId;
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        switch(currentDemo) {
            case 'particles':
                animateParticles(ctx);
                break;
            case 'waves':
                animateWaves(ctx);
                break;
            case 'gravity':
                animateGravity(ctx);
                break;
            case 'magnetic':
                animateMagnetic(ctx);
                break;
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

function switchDemo(demo) {
    currentDemo = demo;
    
    // Update buttons
    document.querySelectorAll('.demo-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-demo="${demo}"]`).classList.add('active');
    
    // Reset canvas
    const canvas = document.getElementById('demo-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Animações do demo
function animateParticles(ctx) {
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * ctx.canvas.width,
            y: Math.random() * ctx.canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 3 + 1
        });
    }
    
    particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > ctx.canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > ctx.canvas.height) particle.vy *= -1;
        
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function animateWaves(ctx) {
    const time = Date.now() * 0.001;
    const amplitude = 50;
    const frequency = 0.02;
    
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let x = 0; x < ctx.canvas.width; x++) {
        const y = ctx.canvas.height / 2 + Math.sin(x * frequency + time) * amplitude;
        if (x === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    
    ctx.stroke();
}

function animateGravity(ctx) {
    const balls = [];
    const ballCount = 10;
    
    for (let i = 0; i < ballCount; i++) {
        balls.push({
            x: Math.random() * ctx.canvas.width,
            y: 0,
            vy: 0,
            size: Math.random() * 10 + 5
        });
    }
    
    balls.forEach(ball => {
        ball.vy += 0.5; // gravity
        ball.y += ball.vy;
        
        if (ball.y > ctx.canvas.height - ball.size) {
            ball.y = ctx.canvas.height - ball.size;
            ball.vy *= -0.8; // bounce
        }
        
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

function animateMagnetic(ctx) {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const particles = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * ctx.canvas.width,
            y: Math.random() * ctx.canvas.height,
            size: Math.random() * 3 + 1
        });
    }
    
    particles.forEach(particle => {
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            particle.x += (dx / distance) * 2;
            particle.y += (dy / distance) * 2;
        }
        
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// Scroll effects
function handleScroll() {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    // Parallax effect
    document.querySelectorAll('.floating-element').forEach(element => {
        const speed = element.dataset.speed || 1;
        element.style.transform = `translateY(${parallax * speed}px)`;
    });
    
    // Scroll animations
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const elementVisible = 150;
        
        if (scrolled > elementTop - window.innerHeight + elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Mouse effects
function handleMouseMove(e) {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const deltaX = (clientX - centerX) / centerX;
    const deltaY = (clientY - centerY) / centerY;
    
    // Tilt effect on cards
    document.querySelectorAll('.experience-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const cardDeltaX = (clientX - cardCenterX) / (rect.width / 2);
        const cardDeltaY = (clientY - cardCenterY) / (rect.height / 2);
        
        card.style.transform = `perspective(1000px) rotateY(${cardDeltaX * 10}deg) rotateX(${-cardDeltaY * 10}deg)`;
    });
}

// Form handling
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Simular envio
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        e.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Animações GSAP
function initializeAnimations() {
    // ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Animações de entrada
    gsap.from('.experience-card', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.experience',
            start: 'top 80%'
        }
    });
    
    gsap.from('.innovation-content', {
        duration: 1.5,
        x: -100,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.innovation',
            start: 'top 80%'
        }
    });
    
    // Contador animado
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseFloat(stat.dataset.target);
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(stat, {
                    duration: 2,
                    innerHTML: target,
                    ease: 'power2.out',
                    snap: { innerHTML: 1 }
                });
            }
        });
    });
}

// Console log especial
console.log(`
%cNEXUS - O Futuro da Tecnologia
%c
%c🚀 Uma experiência revolucionária que redefine os limites do possível
%c✨ Tecnologia de ponta, efeitos 3D imersivos e interações únicas
%c🎮 Use os controles para personalizar sua experiência
%c
%cDesenvolvido com Three.js, GSAP, Particles.js e muito mais!
`,
'color: #00ffff; font-size: 24px; font-weight: bold; font-family: "Orbitron", monospace;',
'',
'color: #ff00ff; font-size: 14px; font-weight: bold;',
'color: #ffff00; font-size: 14px;',
'color: #00ffff; font-size: 14px;',
'',
'color: #888; font-size: 12px;'
); 