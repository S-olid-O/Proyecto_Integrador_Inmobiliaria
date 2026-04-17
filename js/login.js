import { registrarUsuarioCompleto } from './auth.js';

const roleButtons = document.querySelectorAll('.role-btn');
const roleInput = document.getElementById('user-role');

if(roleButtons && roleInput) {
    roleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            roleButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            roleInput.value = this.getAttribute('data-role');
        });
    });
}

const regForm = document.getElementById('register-form');
if(regForm) {
    regForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!roleInput.value) {
            alert("Por favor selecciona si eres Comprador o Vendedor en los botones de arriba.");
            return;
        }

        const email = document.getElementById('reg-email').value;
        const pass = document.getElementById('reg-pass').value;
        const nombre = document.getElementById('reg-name').value;
        const cedula = document.getElementById('reg-id').value;
        const fecha = document.getElementById('reg-birth').value;
        const rol = roleInput.value;

        try {
            await registrarUsuarioCompleto(email, pass, { nombre, cedula, fecha, rol });
            window.location.href = 'home.html';
        } catch (err) {
            console.error(err);
            alert("Error al registrar: " + err.message);
        }
    });
}
