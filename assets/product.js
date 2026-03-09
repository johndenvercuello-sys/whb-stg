class Product {
  constructor() {
    this.acc = [];
    this.container = document.querySelector(".m-main-product");
    MinimogTheme.CompareProduct && MinimogTheme.CompareProduct.setCompareButtonsState();
    MinimogTheme.Wishlist && MinimogTheme.Wishlist.setWishlistButtonsState();
    this.addRecentViewedProduct();

    addEventDelegate({
      context: this.container,
      selector: (window.__minimog_review_selector || '') + '.m-product-collapsible .jdgm-widget-actions-wrapper, .m-product-collapsible .spr-summary-actions-newreview',
      handler: (e) => {
      const index = e.target.closest('.m-product-collapsible').dataset.index
      setTimeout(() => {
        this.acc[Number(index)].setContentHeight()
      }, 300)},
      capture: true
    })
  }

  addRecentViewedProduct() {
    const cookies = getCookie('m-recent-viewed-products')
    let products = cookies ? JSON.parse(cookies) : []
    if (products.indexOf(MinimogSettings.productHandle) === -1) {
      products.unshift(MinimogSettings.productHandle)
      products = products.slice(0, 20)
      setCookie('m-recent-viewed-products', JSON.stringify(products));
    }
  }
}

// new Product();
// After `MinimogTheme.Product = new Product();`
document.addEventListener('click', e => {
  const btn = e.target.closest('button[name="plus"], button[name="minus"]');
  if (!btn) return;
  const input = btn
    .closest('m-quantity-input')
    ?.querySelector('input[type="number"]')
    || document.querySelector('form[data-type="add-to-cart-form"] input[type="number"]');
  if (!input) return;

  e.preventDefault();
  e.stopImmediatePropagation();

  let val = parseInt(input.value) || parseInt(input.min) || 1;
  val += btn.name === 'plus' ? 1 : -1;
  val = Math.max(val, parseInt(input.min) || 1);
  if (input.max) val = Math.min(val, parseInt(input.max));
  input.value = val;
  input.dispatchEvent(new Event('change'));
}, true);
