function setupAutofill(inputSelectors) {
    const firstInput = document.querySelector(inputSelectors[0]);
    
    if (firstInput) {
        firstInput.addEventListener('click', (e) => {
            if (e.detail === 3) { // Triple click
                autofillForm(inputSelectors);
            }
        });
    }
}

function autofillForm(selectors) {
    const dummyData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        subject: 'General Inquiry',
        message: 'This is a sample message for testing purposes.',
        address: '123 Main Street',
        city: 'New York',
        postal: '10001'
    };

    selectors.forEach(selector => {
        const input = document.querySelector(selector);
        if (input) {
            const fieldName = selector.replace('#', '');
            input.value = dummyData[fieldName] || '';
        }
    });
} 