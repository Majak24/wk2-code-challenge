// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const itemInput = document.getElementById('item-input');
    const addBtn = document.getElementById('add-btn');
    const shoppingList = document.getElementById('shopping-list');
    const markPurchasedBtn = document.getElementById('mark-purchased-btn');
    const clearListBtn = document.getElementById('clear-list-btn');

    // Array to store shopping list items
    let items = [];

    // Function to render the shopping list in the DOM
    function renderList() {
        // Clear the current list
        shoppingList.innerHTML = '';
        
        // Iterate through each item in the items array
        items.forEach((item, index) => {
            // Create a new list item element
            const li = document.createElement('li');
            
            // Set the text content of the list item
            li.textContent = item.name;
            
            // If the item is purchased, add the 'purchased' class
            if (item.purchased) {
                li.classList.add('purchased');
            }
            
            // Store the item's index as a data attribute
            li.dataset.index = index;
            
            // Append the list item to the shopping list
            shoppingList.appendChild(li);
        });
    }

    // Function to add a new item to the shopping list
    function addItem() {
        // Get the trimmed value from the input field
        const itemName = itemInput.value.trim();
        
        // If the input is not empty
        if (itemName) {
            // Add the new item to the items array
            items.push({ name: itemName, purchased: false });
            
            // Clear the input field
            itemInput.value = '';
            
            // Re-render the list
            renderList();
        }
    }

    // Function to toggle the purchased state of an item
    function togglePurchased(index) {
        // Flip the purchased state of the item
        items[index].purchased = !items[index].purchased;
        
        // Re-render the list
        renderList();
    }

    // Function to mark all items as purchased
    function markAllPurchased() {
        // Set purchased to true for all items
        items.forEach(item => item.purchased = true);
        
        // Re-render the list
        renderList();
    }

    // Function to clear all items from the list
    function clearList() {
        // Reset the items array to an empty array
        items = [];
        
        // Re-render the list
        renderList();
    }

    // Event listener for the Add button
    addBtn.addEventListener('click', addItem);

    // Event listener for the Enter key in the input field
    itemInput.addEventListener('keypress', (e) => {
        // If the pressed key is Enter
        if (e.key === 'Enter') {
            addItem();
        }
    });

    // Event listener for clicks on the shopping list
    shoppingList.addEventListener('click', (e) => {
        // If the clicked element is a list item
        if (e.target.tagName === 'LI') {
            // Toggle the purchased state of the clicked item
            togglePurchased(e.target.dataset.index);
        }
    });

    // Event listener for the Mark Purchased button
    markPurchasedBtn.addEventListener('click', markAllPurchased);

    // Event listener for the Clear List button
    clearListBtn.addEventListener('click', clearList);

    // Initial render of the list
    renderList();
});