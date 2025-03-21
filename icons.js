// PWA ikonları için Base64 kodlu veri URL'leri

// Sayfa yüklendiğinde ikonları oluştur
document.addEventListener('DOMContentLoaded', function() {
    createIcons();
});

// İkon dosyalarını oluştur
function createIcons() {
    // Canvas oluştur
    const canvas192 = document.createElement('canvas');
    canvas192.width = 192;
    canvas192.height = 192;
    const ctx192 = canvas192.getContext('2d');
    
    const canvas512 = document.createElement('canvas');
    canvas512.width = 512;
    canvas512.height = 512;
    const ctx512 = canvas512.getContext('2d');
    
    // İkonları çiz
    drawIcon(ctx192, 192);
    drawIcon(ctx512, 512);
    
    // İkonları PNG olarak kaydet
    const icon192 = canvas192.toDataURL('image/png');
    const icon512 = canvas512.toDataURL('image/png');
    
    // İkonları localStorage'a kaydet
    localStorage.setItem('icon-192x192', icon192);
    localStorage.setItem('icon-512x512', icon512);
    
    // Favicon oluştur
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/png';
    favicon.href = icon192;
    document.head.appendChild(favicon);
    
    // Service Worker'a ikonları bildir
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'ICONS_READY',
            icons: {
                '192': icon192,
                '512': icon512
            }
        });
    }
}

// İkon çizim fonksiyonu
function drawIcon(ctx, size) {
    const padding = size * 0.1;
    const innerSize = size - (padding * 2);
    
    // Arka plan
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, size, size);
    
    // Dış çerçeve (neon yeşil)
    ctx.strokeStyle = '#39ff14';
    ctx.lineWidth = size * 0.03;
    ctx.shadowBlur = size * 0.05;
    ctx.shadowColor = '#39ff14';
    ctx.strokeRect(padding, padding, innerSize, innerSize);
    
    // Orta çizgi
    ctx.beginPath();
    ctx.moveTo(padding, size / 2);
    ctx.lineTo(size - padding, size / 2);
    ctx.stroke();
    
    // Logo metni
    ctx.shadowBlur = size * 0.08;
    ctx.fillStyle = '#39ff14';
    ctx.font = `bold ${size * 0.2}px Orbitron, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('BM', size / 2, size / 2 - (size * 0.05));
    
    // Alt metin
    ctx.font = `${size * 0.1}px Orbitron, sans-serif`;
    ctx.fillText('BEYMETAL', size / 2, size / 2 + (size * 0.15));
}
