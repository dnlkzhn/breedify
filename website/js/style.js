const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');

// Функція для відображення зображення
function displayImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Подія для вибору файлу через input
imageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        displayImage(file);
    }
});

// Подія для вставки зображення через Ctrl+V
document.addEventListener('paste', (event) => {
    const items = event.clipboardData.items;
    for (let item of items) {
        if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            displayImage(file);
        }
    }
});