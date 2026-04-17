import { obtenerUsuarios, eliminarUsuario } from './auth.js';

const cargarUsuarios = async () => {
    const tableBody = document.getElementById('users-table-body');
    tableBody.innerHTML = '<tr><td colspan="6" class="loading"><i class="fas fa-spinner fa-spin"></i> Cargando usuarios...</td></tr>';
    try {
        const usuarios = await obtenerUsuarios();
        if (usuarios.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="loading">No hay usuarios registrados</td></tr>';
            return;
        }
        tableBody.innerHTML = ''; 
        usuarios.forEach(user => {
            const row = document.createElement('tr');
            
            let roleClass = 'default';
            let roleText = user.rol || 'No especificado';
            if(roleText.toLowerCase() === 'comprador') roleClass = 'comprador';
            else if(roleText.toLowerCase() === 'vendedor') roleClass = 'vendedor';

            row.innerHTML = `
                <td><strong>${user.cedula || 'N/A'}</strong></td>
                <td><span style="font-weight:600; color:#0f172a;">${user.nombre || 'N/A'}</span></td>
                <td><span style="color:#64748b; font-size:0.9rem;">${user.email || 'N/A'}</span></td>
                <td>${user.fechaNacimiento || 'N/A'}</td>
                <td><span class="badge ${roleClass}">${roleText}</span></td>
                <td style="text-align: center;">
                    <button class="btn-delete" data-id="${user.id}" title="Eliminar usuario">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        tableBody.innerHTML = '<tr><td colspan="6" class="loading" style="color: #e53e3e;"><i class="fas fa-exclamation-triangle"></i> Error al cargar usuarios. Verifica los permisos de Firebase.</td></tr>';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    cargarUsuarios();
    
    document.getElementById('users-table-body').addEventListener('click', async (e) => {
        const btnDelete = e.target.closest('.btn-delete');
        if (btnDelete) {
            const userId = btnDelete.getAttribute('data-id');
            if (confirm('¿Estás seguro de que deseas eliminar permanentemente a este usuario de la base de datos?')) {
                try {
                    await eliminarUsuario(userId);
                    // Recargar la tabla
                    cargarUsuarios();
                } catch (error) {
                    console.error("Error al eliminar usuario:", error);
                    alert("No se pudo eliminar el usuario. Revisa los permisos de Firebase.");
                }
            }
        }
    });
});
