// Inicializar los iconos de Feather
document.addEventListener('DOMContentLoaded', () => {
    feather.replace();
    initializeApp();
});

function initializeApp() {
    // Datos iniciales
    let debtors = [
        { id: "1", name: "Carlos", amount: 500, isOwedByMe: false },
        { id: "2", name: "María", amount: 300, isOwedByMe: true },
        { id: "3", name: "Juan", amount: 150, isOwedByMe: false }
    ];

    // Referencias a elementos del DOM
    const totalOwedElement = document.getElementById('total-owed');
    const totalOwedToMeElement = document.getElementById('total-owed-to-me');
    const owedAvatarsElement = document.getElementById('owed-avatars');
    const owedToMeAvatarsElement = document.getElementById('owed-to-me-avatars');
    const debtorsListElement = document.getElementById('debtors-list');
    const creditorsListElement = document.getElementById('creditors-list');
    const addButton = document.getElementById('add-button');
    const modal = document.getElementById('add-modal');
    const closeModalButton = document.getElementById('close-modal');
    const saveDebtButton = document.getElementById('save-debt');
    const nameInput = document.getElementById('name');
    const amountInput = document.getElementById('amount');
    const isOwedByMeCheckbox = document.getElementById('is-owed-by-me');

    // Renderizar datos iniciales
    renderData();

    // Event listeners
    addButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    saveDebtButton.addEventListener('click', saveDebt);

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    function renderData() {
        // Calcular totales
        const totalOwed = debtors
            .filter(debtor => debtor.isOwedByMe)
            .reduce((sum, debtor) => sum + debtor.amount, 0);
        
        const totalOwedToMe = debtors
            .filter(debtor => !debtor.isOwedByMe)
            .reduce((sum, debtor) => sum + debtor.amount, 0);
        
        // Actualizar totales en la UI
        totalOwedElement.textContent = `$${totalOwed}`;
        totalOwedToMeElement.textContent = `$${totalOwedToMe}`;
        
        // Renderizar avatares
        renderAvatars(owedAvatarsElement, debtors.filter(d => d.isOwedByMe));
        renderAvatars(owedToMeAvatarsElement, debtors.filter(d => !d.isOwedByMe));
        
        // Renderizar listas
        renderDebtList(debtorsListElement, debtors.filter(d => !d.isOwedByMe), false);
        renderDebtList(creditorsListElement, debtors.filter(d => d.isOwedByMe), true);
    }

    function renderAvatars(container, debtorsList) {
        container.innerHTML = '';
        debtorsList.slice(0, 3).forEach(debtor => {
            const avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.textContent = debtor.name.charAt(0);
            container.appendChild(avatar);
        });
    }

    function renderDebtList(container, debtorsList, isCreditor) {
        container.innerHTML = '';
        debtorsList.forEach(debtor => {
            const debtItem = document.createElement('div');
            debtItem.className = 'debt-item glass-effect';
            debtItem.innerHTML = `
                <div class="debt-content">
                    <div class="person-info">
                        <div class="avatar">${debtor.name.charAt(0)}</div>
                        <span>${debtor.name}</span>
                    </div>
                    <div class="debt-amount">
                        <span class="${isCreditor ? 'amount-owing' : 'amount-owed'}">$${debtor.amount}</span>
                        <button class="icon-button glass-effect">
                            <i data-feather="arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(debtItem);
            feather.replace();
        });
    }

    function openModal() {
        modal.classList.add('active');
        nameInput.value = '';
        amountInput.value = '';
        isOwedByMeCheckbox.checked = false;
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    function saveDebt() {
        const name = nameInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const isOwedByMe = isOwedByMeCheckbox.checked;

        if (name === '' || isNaN(amount) || amount <= 0) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        const newDebt = {
            id: Date.now().toString(),
            name,
            amount,
            isOwedByMe
        };

        debtors.push(newDebt);
        renderData();
        closeModal();
    }
}