// MAISON Theme JS

// Mobile Menu
const mobileBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-menu-close');

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
  if (mobileClose) mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
}

// Product thumbnails
document.querySelectorAll('.thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    const mainImg = document.getElementById('main-product-image');
    if (mainImg) mainImg.src = thumb.dataset.src;
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });
});

// Option buttons
document.querySelectorAll('.option-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.option-values');
    group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// Add to cart from product grid
document.querySelectorAll('.add-btn[data-product-id]').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = btn.dataset.productId;
    if (!id) return;
    btn.textContent = 'Adding...';
    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, quantity: 1 })
      });
      if (res.ok) {
        btn.textContent = 'Added ✓';
        const cartRes = await fetch('/cart.js');
        const cart = await cartRes.json();
        const countEl = document.querySelector('.cart-count');
        if (countEl) {
          countEl.textContent = cart.item_count;
        } else {
          const cartIcon = document.querySelector('.cart-icon');
          if (cartIcon) {
            const span = document.createElement('span');
            span.className = 'cart-count';
            span.textContent = cart.item_count;
            cartIcon.appendChild(span);
          }
        }
        setTimeout(() => { btn.textContent = 'Add to Cart'; }, 2000);
      }
    } catch (err) {
      btn.textContent = 'Add to Cart';
    }
  });
});
