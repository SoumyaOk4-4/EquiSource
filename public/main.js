function rentItem(itemName) {
  window.location.href = `/rent-form?itemName=${encodeURIComponent(itemName)}`;
}

  