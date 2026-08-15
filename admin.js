// ===== АДМИН-ПАНЕЛЬ =====

// Загружаем товары из localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

// Сохраняем товары
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// ===== ОТОБРАЖЕНИЕ ТОВАРОВ В АДМИНКЕ =====
function renderAdminProducts() {
    const container = document.getElementById('admin-products');
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = `
            <div style="text-align:center;padding:40px 20px;color:#6b4f3a;background:#fffcf8;border-radius:16px;">
                <p style="font-size:18px;">📦 Товаров пока нет</p>
                <p style="font-size:14px;opacity:0.7;">Добавьте первый товар через форму выше</p>
            </div>
        `;
        return;
    }

    container.innerHTML = products.map((product, index) => `
        <div class="admin-product-card">
            <img src="${product.mainImage || 'images/placeholder.jpg'}" alt="${product.name}" onerror="this.src='images/placeholder.jpg'">
            <div class="admin-product-info">
                <h3>${product.name}</h3>
                <p><strong>Артикул:</strong> ${product.article || '—'}</p>
                <p><strong>Цена:</strong> ${product.price} ₽</p>
                <p><strong>Категория:</strong> ${product.category || 'Не указана'}</p>
                <p><strong>В наличии:</strong> ${product.inStock ? '✅ Да' : '❌ Нет'}</p>
                <div class="admin-actions">
                    <button onclick="editProduct(${index})" class="btn-edit">✏️ Редактировать</button>
                    <button onclick="deleteProduct(${index})" class="btn-delete">🗑️ Удалить</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== ДОБАВЛЕНИЕ ТОВАРА =====
document.getElementById('add-product-form')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const newProduct = {
        id: Date.now(),
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        article: document.getElementById('article').value || '',
        category: document.getElementById('category').value,
        specs: document.getElementById('specs').value || '',
        description: document.getElementById('description').value || '',
        mainImage: document.getElementById('mainImage').value || '',
        extraImages: document.getElementById('extraImages').value || '',
        inStock: document.getElementById('inStock').checked
    };

    products.push(newProduct);
    saveProducts();
    renderAdminProducts();

    // Очищаем форму
    this.reset();
    document.getElementById('mainImage-preview').src = 'images/placeholder.jpg';
    alert('✅ Товар добавлен!');
});

// ===== УДАЛЕНИЕ ТОВАРА =====
function deleteProduct(index) {
    if (confirm('Удалить товар?')) {
        products.splice(index, 1);
        saveProducts();
        renderAdminProducts();
    }
}

// ===== РЕДАКТИРОВАНИЕ ТОВАРА =====
function editProduct(index) {
    const product = products[index];

    document.getElementById('edit-index').value = index;
    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-price').value = product.price;
    document.getElementById('edit-article').value = product.article || '';
    document.getElementById('edit-category').value = product.category || '';
    document.getElementById('edit-specs').value = product.specs || '';
    document.getElementById('edit-description').value = product.description || '';
    document.getElementById('edit-mainImage').value = product.mainImage || '';
    document.getElementById('edit-extraImages').value = product.extraImages || '';
    document.getElementById('edit-inStock').checked = product.inStock;
    document.getElementById('edit-mainImage-preview').src = product.mainImage || 'images/placeholder.jpg';

    document.getElementById('edit-form').style.display = 'block';
    document.getElementById('edit-form').scrollIntoView({ behavior: 'smooth' });
}

// ===== СОХРАНЕНИЕ РЕДАКТИРОВАНИЯ =====
document.getElementById('edit-form-inner')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const index = parseInt(document.getElementById('edit-index').value);

    products[index] = {
        ...products[index],
        name: document.getElementById('edit-name').value,
        price: document.getElementById('edit-price').value,
        article: document.getElementById('edit-article').value || '',
        category: document.getElementById('edit-category').value || '',
        specs: document.getElementById('edit-specs').value || '',
        description: document.getElementById('edit-description').value || '',
        mainImage: document.getElementById('edit-mainImage').value || '',
        extraImages: document.getElementById('edit-extraImages').value || '',
        inStock: document.getElementById('edit-inStock').checked
    };

    saveProducts();
    renderAdminProducts();
    document.getElementById('edit-form').style.display = 'none';
    alert('✅ Изменения сохранены!');
});

// ===== ОТМЕНА РЕДАКТИРОВАНИЯ =====
document.getElementById('cancel-edit')?.addEventListener('click', function() {
    document.getElementById('edit-form').style.display = 'none';
});

// ===== ПРЕВЬЮ ФОТО =====
document.getElementById('mainImage')?.addEventListener('input', function() {
    document.getElementById('mainImage-preview').src = this.value || 'images/placeholder.jpg';
});
document.getElementById('edit-mainImage')?.addEventListener('input', function() {
    document.getElementById('edit-mainImage-preview').src = this.value || 'images/placeholder.jpg';
});

// ===== ИНИЦИАЛИЗАЦИЯ =====
saveProducts();
renderAdminProducts();

// ============================================================
// ===== УПРАВЛЕНИЕ КАРТОЧКАМИ "НАШИ РАБОТЫ" НА ГЛАВНОЙ =====
// ============================================================

let worksData = JSON.parse(localStorage.getItem('worksData')) || [
    { id: 1, image: 'bed.jpg', title: 'Двуспальные кровати', description: 'Лаконичная классика для вашей спальни' },
    { id: 2, image: 'chess.jpg', title: 'Шахматы', description: 'Искусство и стратегия в одном наборе' },
    { id: 3, image: 'table.jpg', title: 'Журнальные столики', description: 'Столик, который станет центром интерьера' }
];

if (!localStorage.getItem('worksData')) {
    localStorage.setItem('worksData', JSON.stringify(worksData));
}

function saveWorksData() {
    localStorage.setItem('worksData', JSON.stringify(worksData));
}

function renderWorksAdmin() {
    const container = document.getElementById('works-admin-container');
    if (!container) return;

    container.innerHTML = worksData.map((item, index) => `
        <div class="work-admin-card">
            <h4 style="margin-bottom:8px;font-family:'Playfair Display',serif;color:#2c1810;">Карточка ${index + 1}</h4>
            <div class="form-group">
                <label>Ссылка на фото</label>
                <input type="text" class="work-image-${index}" value="${item.image}" placeholder="images/bed.jpg" />
                <img src="${item.image}" style="max-width:100px;display:block;margin-top:6px;border-radius:6px;" onerror="this.src='images/placeholder.jpg'" />
            </div>
            <div class="form-group">
                <label>Заголовок</label>
                <input type="text" class="work-title-${index}" value="${item.title}" placeholder="Двуспальные кровати" />
            </div>
            <div class="form-group">
                <label>Краткое описание</label>
                <input type="text" class="work-desc-${index}" value="${item.description}" placeholder="Лаконичная классика для вашей спальни" />
            </div>
        </div>
    `).join('');
}

document.getElementById('save-works-btn')?.addEventListener('click', function() {
    const newWorks = [];
    for (let i = 0; i < 3; i++) {
        const image = document.querySelector(`.work-image-${i}`)?.value || '';
        const title = document.querySelector(`.work-title-${i}`)?.value || '';
        const description = document.querySelector(`.work-desc-${i}`)?.value || '';
        newWorks.push({ id: i + 1, image, title, description });
    }
    worksData = newWorks;
    saveWorksData();
    alert('✅ Изменения сохранены!');
    renderWorksAdmin();
});

renderWorksAdmin();