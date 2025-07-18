# 📁 Pasta de Imagens

Esta pasta é destinada para armazenar todas as imagens utilizadas na landing page.

## 📋 Tipos de Imagens Recomendados

### 🖼️ Formatos Suportados
- **PNG**: Para imagens com transparência
- **JPG/JPEG**: Para fotografias e imagens complexas
- **SVG**: Para ícones e gráficos vetoriais
- **WebP**: Para melhor performance (com fallback)

### 📏 Tamanhos Recomendados

#### Hero Section
- **Banner principal**: 1920x1080px (16:9)
- **Imagem de destaque**: 800x600px

#### Seção de Serviços
- **Ícones**: 64x64px ou 128x128px (SVG preferido)
- **Imagens de fundo**: 400x300px

#### Portfólio
- **Thumbnails**: 400x300px
- **Imagens completas**: 800x600px

#### Sobre
- **Foto da equipe**: 600x400px
- **Logos**: 200x100px

## 🎯 Otimização de Imagens

### Antes de Adicionar
1. **Comprima as imagens** usando ferramentas como:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/)

2. **Use nomes descritivos**:
   - ✅ `hero-banner.jpg`
   - ✅ `service-web-development.svg`
   - ❌ `IMG_001.jpg`

3. **Organize em subpastas** se necessário:
   ```
   images/
   ├── hero/
   ├── services/
   ├── portfolio/
   └── about/
   ```

## 🔧 Como Usar no HTML

### Exemplo de Uso
```html
<!-- Imagem simples -->
<img src="src/images/hero-banner.jpg" alt="Banner principal">

<!-- Imagem responsiva -->
<img src="src/images/hero-banner.jpg" 
     srcset="src/images/hero-banner-small.jpg 800w,
             src/images/hero-banner.jpg 1200w"
     sizes="(max-width: 768px) 100vw, 50vw"
     alt="Banner responsivo">

<!-- Imagem com lazy loading -->
<img src="src/images/portfolio-project.jpg" 
     loading="lazy" 
     alt="Projeto do portfólio">
```

## 📱 Imagens Responsivas

### CSS para Background Images
```css
.hero-section {
    background-image: url('../images/hero-banner.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

/* Para diferentes tamanhos de tela */
@media (max-width: 768px) {
    .hero-section {
        background-image: url('../images/hero-banner-mobile.jpg');
    }
}
```

## 🚀 Performance

### Dicas para Melhor Performance
1. **Use WebP** quando possível
2. **Implemente lazy loading**
3. **Forneça múltiplos tamanhos**
4. **Use CDN** para imagens grandes
5. **Otimize SVGs** removendo código desnecessário

### Exemplo de Lazy Loading
```html
<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
     data-src="src/images/actual-image.jpg"
     class="lazy"
     alt="Imagem com lazy loading">
```

```javascript
// JavaScript para lazy loading
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img.lazy");
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});
```

## 📝 Checklist

Antes de adicionar uma imagem:

- [ ] Imagem foi comprimida
- [ ] Nome do arquivo é descritivo
- [ ] Alt text foi adicionado no HTML
- [ ] Tamanho é apropriado para o uso
- [ ] Formato é o mais adequado
- [ ] Imagem está otimizada para web

## 🔗 Recursos Úteis

- [Guia de Otimização de Imagens](https://web.dev/fast/#optimize-your-images)
- [Ferramentas de Compressão](https://developers.google.com/web/tools/lighthouse/audits/image-optimization)
- [Formatos de Imagem Modernos](https://web.dev/modern-image-formats/) 