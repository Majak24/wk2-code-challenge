document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addBtn = document.getElementById('add-btn');
    const shoppingList = document.getElementById('shopping-list');
    const markPurchasedBtn = document.getElementById('mark-purchased-btn');
    const clearListBtn = document.getElementById('clear-list-btn');

    let items = [];

    function renderList() {
        shoppingList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.name;
            if (item.purchased) {
                li.classList.add('purchased');
            }
            li.dataset.index = index;
            shoppingList.appendChild(li);
        });
    }

    function addItem() {
        const itemName = itemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, purchased: false });
            itemInput.value = '';
            renderList();
        }
    }

    function togglePurchased(index) {
        items[index].purchased = !items[index].purchased;
        renderList();
    }

    function markAllPurchased() {
        items.forEach(item => item.purchased = true);
        renderList();
    }

    function clearList() {
        items = [];
        renderList();
    }

    addBtn.addEventListener('click', addItem);

    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    shoppingList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            togglePurchased(e.target.dataset.index);
        }
    });

    markPurchasedBtn.addEventListener('click', markAllPurchased);

    clearListBtn.addEventListener('click', clearList);

    renderList();
});