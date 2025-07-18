# 🚀 Como Fazer Upload da Landing Page no GitHub

Este guia te ajudará a colocar sua landing page no GitHub e fazer o deploy no GitHub Pages.

## 📋 Pré-requisitos

1. **Conta no GitHub**: [github.com](https://github.com)
2. **Git instalado**: [git-scm.com](https://git-scm.com/)
3. **Editor de código**: VS Code, Sublime Text, etc.

## 🎯 Passo a Passo

### 1. Criar um Novo Repositório no GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique no botão **"New"** ou **"+"** no canto superior direito
3. Escolha **"New repository"**
4. Preencha os dados:
   - **Repository name**: `landing-page` (ou o nome que preferir)
   - **Description**: `Landing page moderna e responsiva`
   - **Visibility**: Public (recomendado)
   - **Initialize this repository with**: Deixe desmarcado
5. Clique em **"Create repository"**

### 2. Configurar o Git Localmente

Abra o terminal/PowerShell na pasta do projeto e execute:

```bash
# Inicializar o repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Primeira versão da landing page"

# Adicionar o repositório remoto (substitua SEU_USUARIO pelo seu nome de usuário)
git remote add origin https://github.com/SEU_USUARIO/landing-page.git

# Enviar para o GitHub
git branch -M main
git push -u origin main
```

### 3. Ativar o GitHub Pages

1. No seu repositório no GitHub, vá em **Settings**
2. Role para baixo até encontrar **"Pages"** no menu lateral
3. Em **"Source"**, selecione **"Deploy from a branch"**
4. Em **"Branch"**, selecione **"main"** e **"/ (root)"**
5. Clique em **"Save"**

### 4. Configurar o Deploy Automático (Opcional)

O projeto já inclui um workflow do GitHub Actions. Para ativá-lo:

1. Vá em **Settings** > **Actions** > **General**
2. Em **"Workflow permissions"**, selecione **"Read and write permissions"**
3. Clique em **"Save"**

Agora, sempre que você fizer um push para a branch main, o site será atualizado automaticamente.

## 🔧 Personalização

### Alterar o Nome da Empresa

1. Abra o arquivo `index.html`
2. Substitua "TechSolutions" pelo nome da sua empresa
3. Atualize as informações de contato

### Alterar as Cores

1. Abra o arquivo `src/css/style.css`
2. Procure pelas variáveis de cor no início do arquivo
3. Altere as cores conforme sua identidade visual

### Adicionar Imagens

1. Coloque suas imagens na pasta `src/images/`
2. Atualize os caminhos no HTML
3. Veja o arquivo `src/images/README.md` para mais detalhes

## 📱 Testando

### Localmente
```bash
# Abrir o arquivo diretamente
start index.html

# Ou usar um servidor local
python -m http.server 8000
# Depois acesse: http://localhost:8000
```

### No GitHub Pages
- Aguarde alguns minutos após o push
- Acesse: `https://SEU_USUARIO.github.io/landing-page`

## 🔄 Atualizações

Para fazer alterações:

```bash
# Fazer as alterações nos arquivos
# Depois execute:

git add .
git commit -m "Descrição das alterações"
git push origin main
```

## 🎨 Personalizações Avançadas

### Adicionar Analytics

No arquivo `index.html`, antes do `</head>`, adicione:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Adicionar Meta Tags para Redes Sociais

No arquivo `index.html`, dentro do `<head>`:

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://SEU_USUARIO.github.io/landing-page/">
<meta property="og:title" content="TechSolutions - Soluções Tecnológicas">
<meta property="og:description" content="Transforme seu negócio com nossas soluções tecnológicas inovadoras.">
<meta property="og:image" content="https://SEU_USUARIO.github.io/landing-page/src/images/og-image.jpg">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://SEU_USUARIO.github.io/landing-page/">
<meta property="twitter:title" content="TechSolutions - Soluções Tecnológicas">
<meta property="twitter:description" content="Transforme seu negócio com nossas soluções tecnológicas inovadoras.">
<meta property="twitter:image" content="https://SEU_USUARIO.github.io/landing-page/src/images/og-image.jpg">
```

## 🚨 Solução de Problemas

### Site não aparece
- Verifique se o GitHub Pages está ativado
- Aguarde alguns minutos (pode demorar até 10 minutos)
- Verifique se não há erros no console do navegador

### Imagens não carregam
- Verifique se os caminhos estão corretos
- Certifique-se de que as imagens estão na pasta `src/images/`
- Use caminhos relativos: `src/images/nome-da-imagem.jpg`

### Menu mobile não funciona
- Verifique se o arquivo `src/js/script.js` está sendo carregado
- Abra o console do navegador (F12) e veja se há erros

### Formulário não funciona
- O formulário atual é apenas demonstrativo
- Para funcionamento real, você precisará de um backend
- Considere usar serviços como Formspree, Netlify Forms ou similar

## 📞 Suporte

Se você tiver problemas:

1. Verifique se todos os arquivos estão no lugar correto
2. Consulte a documentação do [GitHub Pages](https://pages.github.com/)
3. Abra uma issue no repositório
4. Entre em contato: contato@techsolutions.com

## 🎉 Próximos Passos

Depois que sua landing page estiver online:

1. **Compartilhe o link** com clientes e prospects
2. **Monitore o desempenho** com Google Analytics
3. **Teste em diferentes dispositivos** e navegadores
4. **Otimize para SEO** adicionando mais meta tags
5. **Adicione mais conteúdo** conforme necessário

---

**Boa sorte com sua landing page! 🚀** 