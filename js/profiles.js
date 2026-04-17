import { iniciarSesion } from './auth.js';

const loginForm = document.getElementById('login-form');
if(loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;

        try {
            await iniciarSesion(email, pass);
            window.location.href = 'home.html';
        } catch (err) {
            console.error(err);
            alert("Error al iniciar sesión: Correo o contraseña incorrectos.");
        }
    });
}
