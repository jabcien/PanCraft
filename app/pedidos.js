document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {id: 1, name: 'Baguette', price: 2000},
        {id: 2, name: 'Brioche', price: 1550},
        {id: 3, name: 'Focaccia', price: 1000},
        {id: 4, name: 'Pan de Masa Madre', price: 700},
        {id: 5, name: 'Pumpernickel', price: 3000},
        {id: 6, name: 'Ciabatta', price: 2200},
        {id: 7, name: 'Challah', price: 1800},
        {id: 8, name: 'Pan de Centeno', price: 2600},
        {id: 9, name: 'Concha', price: 2300},
        {id: 10, name: 'Naan', price: 3500}
    ];

    const itemsEl = document.getElementById('items');
    const totalEl = document.getElementById('total');

    // Función para formatear precios con puntos de miles (ej: 2.000)
    function format(n) {
        return n.toLocaleString('es-CO', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    }

    function createItemRow() {
        if (!itemsEl) return;

        const div = document.createElement('div');
        div.className = 'item';

        const sel = document.createElement('select');
        products.forEach(p => {
            const o = document.createElement('option');
            o.value = p.id;
            o.textContent = `${p.name} - $${format(p.price)}`;
            sel.appendChild(o);
        });

        const qty = document.createElement('input');
        qty.type = 'number';
        qty.min = 1;
        qty.value = 1;

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = 'Eliminar';
        remove.className = 'secondary';

        div.appendChild(sel);
        div.appendChild(qty);
        div.appendChild(remove);

        remove.addEventListener('click', () => {
            div.remove();
            updateTotal();
        });
        sel.addEventListener('change', updateTotal);
        qty.addEventListener('input', updateTotal);

        itemsEl.appendChild(div);
        updateTotal();
    }

    function updateTotal() {
        if (!itemsEl || !totalEl) return;
        
        let total = 0;
        itemsEl.querySelectorAll('.item').forEach(row => {
            const pid = Number(row.querySelector('select').value);
            const product = products.find(p => p.id === pid);
            const price = product ? product.price : 0;
            const q = Number(row.querySelector('input').value) || 0;
            total += price * q;
        });
        totalEl.textContent = format(total);
    }

    //los botones de agregar/limpiar
    const btnAdd = document.getElementById('addItem');
    if (btnAdd) btnAdd.addEventListener('click', createItemRow);

    const btnClear = document.getElementById('clearItems');
    if (btnClear) btnClear.addEventListener('click', () => {
        itemsEl.innerHTML = '';
        updateTotal();
    });

    if (itemsEl) createItemRow();

    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', e => {
            e.preventDefault();
            
            const totalTexto = totalEl.textContent.replace(/\./g, '');
            
            const data = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                telefono: document.getElementById('telefono').value,
                direccion: document.getElementById('direccion').value,
                items: Array.from(itemsEl.querySelectorAll('.item')).map(row => {
                    const productId = row.querySelector('select').value;
                    const product = products.find(p => p.id == productId);
                    return {
                        producto: product.name,
                        precio: product.price,
                        cantidad: Number(row.querySelector('input').value) || 1
                    };
                }),
                total: Number(totalTexto)
            };

            console.log('Pedido enviado a Pancraft:', data);
            alert(`¡Gracias ${data.nombre}! Tu pedido por un total de $${totalEl.textContent} ha sido preparado. Pronto nos pondremos en contacto contigo para coordinar la entrega.`);
            
            // Resetear el formulario
            e.target.reset();
            itemsEl.innerHTML = '';
            createItemRow();
            updateTotal();
        });
    }
});