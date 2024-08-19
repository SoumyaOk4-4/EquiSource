function rentItem(itemName) {
    const name = prompt("Enter your name:");
    const phoneNumber = prompt("Enter your phone number:");
  
    if (name && phoneNumber) {
      fetch('/rent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phoneNumber, itemName })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = '/thank-you';
        } else {
          alert('There was an error. Please try again.');
        }
      });
    } else {
      alert('Please provide both name and phone number.');
    }
  }
  