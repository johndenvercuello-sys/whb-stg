document.addEventListener('DOMContentLoaded', () => {
  // Find all quantity input components
  document.querySelectorAll('m-quantity-input').forEach(quantityComp => {
    const input = quantityComp.querySelector('input[type="number"]');
    const btnMinus = quantityComp.querySelector('button[name="minus"]');
    const btnPlus = quantityComp.querySelector('button[name="plus"]');

    if (!input || !btnMinus || !btnPlus) return;

    const min = parseInt(input.min) || 1;
    const max = input.max ? parseInt(input.max) : null;
    const step = 1;

    // Helper to update input value with boundary checks
    function updateValue(change) {
      let current = parseInt(input.value) || min;
      let newValue = current + change * step;

      if (newValue < min) newValue = min;
      if (max !== null && newValue > max) newValue = max;

      input.value = newValue;
      input.dispatchEvent(new Event('change'));
    }

    btnMinus.addEventListener('click', () => updateValue(-1));
    btnPlus.addEventListener('click', () => updateValue(1));
  });
});
