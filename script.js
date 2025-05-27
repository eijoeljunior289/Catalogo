// Gerenciamento de páginas
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');

        if (pageId === 'home') {
            loadApps();
        }
    }
}

// Carregamento de apps
async function loadApps() {
    const loadingElement = document.getElementById('loading-apps');
    const appsGrid = document.getElementById('apps-grid');

    loadingElement.style.display = 'block';
    appsGrid.innerHTML = '';

    try {
        const response = await fetch('/api/apps'); // Certifique-se de que este endpoint está correto no seu backend
        const apps = await response.json();

        loadingElement.style.display = 'none';

        if (apps.length === 0) {
            appsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.8);">
                    <h3 style="font-size: 1.5rem; margin-bottom: 10px;">Nenhum app cadastrado ainda</h3>
                    <p>Seja o primeiro a cadastrar um aplicativo!</p>
                </div>
            `;
            return;
        }

        apps.forEach(app => {
            const appCard = createAppCard(app);
            appsGrid.appendChild(appCard);
        });
    } catch (error) {
        console.error('Erro ao carregar apps:', error);
        loadingElement.style.display = 'none';
        appsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.8);">
                <h3 style="font-size: 1.5rem; margin-bottom: 10px;">Erro ao carregar aplicativos</h3>
                <p>Tente novamente mais tarde.</p>
            </div>
        `;
    }
}

function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card';

    // Se o seu backend servir os ícones de uma pasta 'uploads' dentro de 'static'
    const iconSrc = app.icon ? `/static/uploads/${app.icon}` : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTYiIGZpbGw9IiM2NjdlZWEiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMlpNMTIgMjJDMTMuMSAyMiAxNCAyMS4xIDE0IDIwQzE0IDE4LjkgMTMuMSAxOCAxMiAxOEMxMC45IDE4IDEwIDE4LjkgMTAgMjBDMTAgMjEuMSAxMC45IDIyIDEyIDIyWk0yMCAxMkMyMS4xIDEyIDIyIDEwLjkgMjIgMTBDMjIgOC45IDIxLjEgOCAyMCA4QzE4LjkgOCAxOCA4LjkgMTggMTBDMTggMTAuOSAxOC45IDEyIDIwIDEyWk00IDEyQzUuMSAxMiA2IDEwLjkgNiAxMEM2IDguOSA1LjEgOCA0IDhDMi45IDggMiA4LjkgMiAxMEMyIDEwLjkgMi45IDEyIDQgMTJaIi8+Cjwvc3ZnPgo8L3N2Zz4K';

    card.innerHTML = `
        <img src="${iconSrc}" alt="${app.name}" class="app-icon" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiByeD0iMTYiIGZpbGw9IiM2NjdlZWEiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZHRoPSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMlpNMTIgMjJDMTMuMSAyMiAxNCAyMS4xIDE0IDIwQzE0IDE4LjkgMTMuMSAxOCAxMiAxOEMxMC45IDE4IDEwIDE4LjkgMTAgMjBDMTAgMjEuMSAxMC45IDIyIDEyIDIyWk0yMCAxMkMyMS4xIDEyIDIyIDEwLjkgMjIgMTBDMjIgOC45IDIxLjEgOCAyMCA4QzE4LjkgOCAxOCA4LjkgMTggMTBDMTggMTAuOSAxOC45IDEyIDIwIDEyWk00IDEyQzUuMSAxMiA2IDEwLjkgNiAxMEM2IDguOSA1LjEgOCA0IDhDMi45IDggMiA4LjkgMiAxMEMyIDEwLjkgMi45IDEyIDQgMTJaIi8+Cjwvc3ZnPgo8L3N2Zz4K'">
        <h3 class="app-name">${app.name}</h3>
        <span class="app-category">${app.category}</span>
        <p class="app-description">${app.description}</p>
        <a href="/download/${app.id}" class="download-btn" target="_blank">Baixar APK</a>
    `;

    return card;
}

// Gerenciamento do formulário
document.getElementById('app-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const loadingElement = document.getElementById('loading-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Reset messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Show loading
    loadingElement.style.display = 'block';
    submitBtn.disabled = true;

    try {
        const formData = new FormData(this);

        const response = await fetch('/api/apps', { // Certifique-se de que este endpoint está correto no seu backend
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        loadingElement.style.display = 'none';
        submitBtn.disabled = false;

        if (response.ok) {
            successMessage.style.display = 'block';
            this.reset();
            document.getElementById('icon-preview').innerHTML = '';
            document.getElementById('file-info').innerHTML = '';

            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });

            // Auto-hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            errorMessage.textContent = result.error || 'Erro ao cadastrar app. Tente novamente.';
            errorMessage.style.display = 'block';
            errorMessage.scrollIntoView({ behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Erro:', error);
        loadingElement.style.display = 'none';
        submitBtn.disabled = false;
        errorMessage.textContent = 'Erro de conexão. Verifique sua internet e tente novamente.';
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth' });
    }
});

// Preview da imagem
document.getElementById('app-icon').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const preview = document.getElementById('icon-preview');
    const label = document.querySelector('label[for="app-icon"]');

    if (file) {
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
            alert('Por favor, selecione apenas arquivos de imagem');
            this.value = '';
            return;
        }

        // Validar tamanho (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('A imagem deve ter no máximo 5MB');
            this.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            preview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="preview-image">`;
            label.textContent = file.name;
        };
        reader.readAsDataURL(file);
    } else {
        preview.innerHTML = '';
        label.textContent = 'Clique para selecionar uma imagem';
    }
});

// Info do arquivo APK
document.getElementById('app-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const fileInfo = document.getElementById('file-info');
    const label = document.querySelector('label[for="app-file"]');

    if (file) {
        // Validar extensão
        if (!file.name.toLowerCase().endsWith('.apk')) {
            alert('Por favor, selecione apenas arquivos .apk');
            this.value = '';
            return;
        }

        // Validar tamanho (max 100MB)
        if (file.size > 100 * 1024 * 1024) {
            alert('O arquivo APK deve ter no máximo 100MB');
            this.value = '';
            return;
        }

        const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
        fileInfo.innerHTML = `
            <div style="margin-top: 10px; padding: 10px; background: #e8f5e8; border-radius: 8px; color: #2d5a2d;">
                <strong>Arquivo:</strong> ${file.name}<br>
                <strong>Tamanho:</strong> ${sizeInMB} MB
            </div>
        `;
        label.textContent = file.name;
    } else {
        fileInfo.innerHTML = '';
        label.textContent = 'Clique para selecionar o arquivo .apk';
    }
});

// Carregar apps na inicialização
document.addEventListener('DOMContentLoaded', function() {
    loadApps();
});
