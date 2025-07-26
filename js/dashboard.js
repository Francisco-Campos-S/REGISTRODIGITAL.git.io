// Dashboard específico JavaScript
document.addEventListener('DOMContentLoaded', function() {
    inicializarDashboard();
});

function inicializarDashboard() {
    // Configurar menu responsive para dashboard
    configurarMenuDashboard();
    
    // Configurar actualizaciones en tiempo real
    configurarActualizacionesTiempoReal();
    
    // Configurar gráficos si es necesario
    configurarGraficos();
}

function configurarMenuDashboard() {
    // Crear botón de menú para móviles
    const header = document.querySelector('.content-header');
    if (header && window.innerWidth <= 768) {
        const menuBtn = document.createElement('button');
        menuBtn.className = 'mobile-menu-btn';
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        menuBtn.onclick = toggleMobileMenu;
        header.insertBefore(menuBtn, header.firstChild);
    }
}

function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

function configurarActualizacionesTiempoReal() {
    // Actualizar estadísticas cada 30 segundos
    setInterval(actualizarEstadisticas, 30000);
}

function actualizarEstadisticas() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const totalUsuarios = usuarios.length;
    const totalEstudiantes = usuarios.filter(u => u.tipo === 'estudiante').length;
    const totalProfesores = usuarios.filter(u => u.tipo === 'profesor').length;
    
    // Actualizar números en las tarjetas
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length >= 3) {
        statCards[0].querySelector('h3').textContent = totalUsuarios;
        statCards[1].querySelector('h3').textContent = totalEstudiantes;
        statCards[2].querySelector('h3').textContent = totalProfesores;
    }
}

function configurarGraficos() {
    // Placeholder para futuras implementaciones de gráficos
    console.log('Configurando gráficos...');
}

// Funciones para contenido específico del dashboard
function crearContenidoMaterias() {
    const materias = [
        { nombre: 'Matemáticas I', profesor: 'Dr. García', horario: 'Lun-Mie-Vie 8:00-10:00', creditos: 4 },
        { nombre: 'Programación I', profesor: 'Ing. López', horario: 'Mar-Jue 10:00-12:00', creditos: 3 },
        { nombre: 'Física I', profesor: 'Dr. Martínez', horario: 'Lun-Mie 14:00-16:00', creditos: 4 },
        { nombre: 'Química General', profesor: 'Dra. Rodríguez', horario: 'Mar-Jue 16:00-18:00', creditos: 3 }
    ];
    
    return `
        <div class="materias-container">
            <div class="materias-header">
                <h2>Mis Materias</h2>
                <button class="btn btn-primary" onclick="inscribirMateria()">
                    <i class="fas fa-plus"></i>
                    Inscribir Materia
                </button>
            </div>
            
            <div class="materias-grid">
                ${materias.map(materia => `
                    <div class="materia-card">
                        <div class="materia-header">
                            <h3>${materia.nombre}</h3>
                            <span class="creditos">${materia.creditos} créditos</span>
                        </div>
                        <div class="materia-info">
                            <p><i class="fas fa-user"></i> ${materia.profesor}</p>
                            <p><i class="fas fa-clock"></i> ${materia.horario}</p>
                        </div>
                        <div class="materia-actions">
                            <button class="btn btn-secondary btn-sm">Ver Detalles</button>
                            <button class="btn btn-primary btn-sm">Entrar a Clase</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function crearContenidoHorarios() {
    const horarios = [
        { dia: 'Lunes', materias: [
            { nombre: 'Matemáticas I', hora: '8:00-10:00', aula: 'A-101' },
            { nombre: 'Física I', hora: '14:00-16:00', aula: 'B-205' }
        ]},
        { dia: 'Martes', materias: [
            { nombre: 'Programación I', hora: '10:00-12:00', aula: 'Lab-1' },
            { nombre: 'Química General', hora: '16:00-18:00', aula: 'Lab-3' }
        ]},
        { dia: 'Miércoles', materias: [
            { nombre: 'Matemáticas I', hora: '8:00-10:00', aula: 'A-101' },
            { nombre: 'Física I', hora: '14:00-16:00', aula: 'B-205' }
        ]},
        { dia: 'Jueves', materias: [
            { nombre: 'Programación I', hora: '10:00-12:00', aula: 'Lab-1' },
            { nombre: 'Química General', hora: '16:00-18:00', aula: 'Lab-3' }
        ]},
        { dia: 'Viernes', materias: [
            { nombre: 'Matemáticas I', hora: '8:00-10:00', aula: 'A-101' }
        ]}
    ];
    
    return `
        <div class="horarios-container">
            <div class="horarios-header">
                <h2>Mi Horario de Clases</h2>
                <div class="horario-actions">
                    <button class="btn btn-secondary" onclick="exportarHorario()">
                        <i class="fas fa-download"></i>
                        Exportar
                    </button>
                    <button class="btn btn-primary" onclick="imprimirHorario()">
                        <i class="fas fa-print"></i>
                        Imprimir
                    </button>
                </div>
            </div>
            
            <div class="horario-grid">
                ${horarios.map(dia => `
                    <div class="dia-card">
                        <div class="dia-header">
                            <h3>${dia.dia}</h3>
                        </div>
                        <div class="materias-dia">
                            ${dia.materias.map(materia => `
                                <div class="materia-horario">
                                    <div class="materia-time">${materia.hora}</div>
                                    <div class="materia-details">
                                        <strong>${materia.nombre}</strong>
                                        <small>Aula: ${materia.aula}</small>
                                    </div>
                                </div>
                            `).join('')}
                            ${dia.materias.length === 0 ? '<p class="no-clases">Sin clases</p>' : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function crearContenidoClases() {
    const clases = [
        { nombre: 'Programación I - Grupo A', estudiantes: 25, horario: 'Mar-Jue 10:00-12:00', aula: 'Lab-1' },
        { nombre: 'Programación I - Grupo B', estudiantes: 23, horario: 'Lun-Mie 14:00-16:00', aula: 'Lab-2' },
        { nombre: 'Algoritmos y Estructuras', estudiantes: 18, horario: 'Vie 8:00-12:00', aula: 'Lab-1' }
    ];
    
    return `
        <div class="clases-container">
            <div class="clases-header">
                <h2>Mis Clases</h2>
                <button class="btn btn-primary" onclick="crearNuevaClase()">
                    <i class="fas fa-plus"></i>
                    Nueva Clase
                </button>
            </div>
            
            <div class="clases-grid">
                ${clases.map((clase, index) => `
                    <div class="clase-card">
                        <div class="clase-header">
                            <h3>${clase.nombre}</h3>
                            <span class="estudiantes-count">${clase.estudiantes} estudiantes</span>
                        </div>
                        <div class="clase-info">
                            <p><i class="fas fa-clock"></i> ${clase.horario}</p>
                            <p><i class="fas fa-map-marker-alt"></i> ${clase.aula}</p>
                        </div>
                        <div class="clase-actions">
                            <button class="btn btn-secondary btn-sm" onclick="verEstudiantesClase(${index})">
                                <i class="fas fa-users"></i>
                                Estudiantes
                            </button>
                            <button class="btn btn-primary btn-sm" onclick="gestionarClase(${index})">
                                <i class="fas fa-cog"></i>
                                Gestionar
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function crearContenidoEstudiantes() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const estudiantes = usuarios.filter(u => u.tipo === 'estudiante');
    
    return `
        <div class="estudiantes-container">
            <div class="estudiantes-header">
                <h2>Lista de Estudiantes</h2>
                <div class="search-container">
                    <input type="text" placeholder="Buscar estudiante..." class="search-input" onkeyup="filtrarEstudiantes(this.value)">
                    <i class="fas fa-search"></i>
                </div>
            </div>
            
            <div class="estudiantes-table">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cédula</th>
                            <th>Email</th>
                            <th>Carrera</th>
                            <th>Semestre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="estudiantes-tbody">
                        ${estudiantes.map(estudiante => `
                            <tr>
                                <td>${estudiante.nombre}</td>
                                <td>${estudiante.cedula}</td>
                                <td>${estudiante.email}</td>
                                <td>${estudiante.carrera}</td>
                                <td>${estudiante.semestre}</td>
                                <td>
                                    <button class="btn btn-sm btn-secondary" onclick="verPerfilEstudiante('${estudiante.id}')">
                                        <i class="fas fa-eye"></i>
                                        Ver
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function crearContenidoConfiguracion() {
    return `
        <div class="configuracion-container">
            <div class="configuracion-header">
                <h2>Configuración</h2>
            </div>
            
            <div class="configuracion-sections">
                <div class="config-section">
                    <h3>Información Personal</h3>
                    <form id="configPerfilForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="configNombre">Nombre Completo</label>
                                <input type="text" id="configNombre" value="${usuarioActual.nombre}">
                            </div>
                            <div class="form-group">
                                <label for="configEmail">Email</label>
                                <input type="email" id="configEmail" value="${usuarioActual.email}">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="configTelefono">Teléfono</label>
                                <input type="tel" id="configTelefono" value="${usuarioActual.telefono}">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i>
                            Guardar Cambios
                        </button>
                    </form>
                </div>
                
                <div class="config-section">
                    <h3>Seguridad</h3>
                    <form id="configPasswordForm">
                        <div class="form-group">
                            <label for="passwordActual">Contraseña Actual</label>
                            <input type="password" id="passwordActual" required>
                        </div>
                        <div class="form-group">
                            <label for="passwordNueva">Nueva Contraseña</label>
                            <input type="password" id="passwordNueva" required>
                        </div>
                        <div class="form-group">
                            <label for="passwordConfirmar">Confirmar Nueva Contraseña</label>
                            <input type="password" id="passwordConfirmar" required>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-key"></i>
                            Cambiar Contraseña
                        </button>
                    </form>
                </div>
                
                <div class="config-section">
                    <h3>Preferencias</h3>
                    <div class="preference-item">
                        <label class="switch">
                            <input type="checkbox" id="notificaciones">
                            <span class="slider"></span>
                        </label>
                        <span>Recibir notificaciones por email</span>
                    </div>
                    <div class="preference-item">
                        <label class="switch">
                            <input type="checkbox" id="modoOscuro">
                            <span class="slider"></span>
                        </label>
                        <span>Modo oscuro</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Funciones de interacción
function inscribirMateria() {
    mostrarNotificacion('Función de inscripción en desarrollo', 'info');
}

function exportarHorario() {
    mostrarNotificacion('Exportando horario...', 'info');
}

function imprimirHorario() {
    window.print();
}

function crearNuevaClase() {
    mostrarNotificacion('Función de crear clase en desarrollo', 'info');
}

function verEstudiantesClase(index) {
    mostrarNotificacion('Mostrando estudiantes de la clase', 'info');
}

function gestionarClase(index) {
    mostrarNotificacion('Función de gestión en desarrollo', 'info');
}

function filtrarEstudiantes(texto) {
    const filas = document.querySelectorAll('#estudiantes-tbody tr');
    filas.forEach(fila => {
        const contenido = fila.textContent.toLowerCase();
        if (contenido.includes(texto.toLowerCase())) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}

function verPerfilEstudiante(id) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const estudiante = usuarios.find(u => u.id === id);
    if (estudiante) {
        alert(`Perfil de ${estudiante.nombre}\nCarrera: ${estudiante.carrera}\nSemestre: ${estudiante.semestre}`);
    }
}

// Event listeners para configuración
document.addEventListener('DOMContentLoaded', function() {
    // Configurar formularios cuando se cargue el contenido
    setTimeout(() => {
        const configPerfilForm = document.getElementById('configPerfilForm');
        const configPasswordForm = document.getElementById('configPasswordForm');
        
        if (configPerfilForm) {
            configPerfilForm.addEventListener('submit', function(e) {
                e.preventDefault();
                actualizarPerfil();
            });
        }
        
        if (configPasswordForm) {
            configPasswordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                cambiarPassword();
            });
        }
    }, 1000);
});

function actualizarPerfil() {
    const nombre = document.getElementById('configNombre').value;
    const email = document.getElementById('configEmail').value;
    const telefono = document.getElementById('configTelefono').value;
    
    // Actualizar usuario actual
    usuarioActual.nombre = nombre;
    usuarioActual.email = email;
    usuarioActual.telefono = telefono;
    
    // Actualizar en localStorage
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
    
    // Actualizar en la lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.id === usuarioActual.id);
    if (index !== -1) {
        usuarios[index] = usuarioActual;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    
    mostrarNotificacion('Perfil actualizado exitosamente', 'success');
}

function cambiarPassword() {
    const passwordActual = document.getElementById('passwordActual').value;
    const passwordNueva = document.getElementById('passwordNueva').value;
    const passwordConfirmar = document.getElementById('passwordConfirmar').value;
    
    if (passwordActual !== usuarioActual.password) {
        mostrarNotificacion('La contraseña actual es incorrecta', 'error');
        return;
    }
    
    if (passwordNueva !== passwordConfirmar) {
        mostrarNotificacion('Las contraseñas no coinciden', 'error');
        return;
    }
    
    if (passwordNueva.length < 6) {
        mostrarNotificacion('La nueva contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }
    
    // Actualizar contraseña
    usuarioActual.password = passwordNueva;
    
    // Actualizar en localStorage
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
    
    // Actualizar en la lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.id === usuarioActual.id);
    if (index !== -1) {
        usuarios[index] = usuarioActual;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    
    mostrarNotificacion('Contraseña cambiada exitosamente', 'success');
    document.getElementById('configPasswordForm').reset();
}

// Exportar funciones para uso global
if (typeof window !== 'undefined') {
    window.crearContenidoMaterias = crearContenidoMaterias;
    window.crearContenidoHorarios = crearContenidoHorarios;
    window.crearContenidoClases = crearContenidoClases;
    window.crearContenidoEstudiantes = crearContenidoEstudiantes;
    window.crearContenidoConfiguracion = crearContenidoConfiguracion;
    window.inscribirMateria = inscribirMateria;
    window.exportarHorario = exportarHorario;
    window.imprimirHorario = imprimirHorario;
    window.crearNuevaClase = crearNuevaClase;
    window.verEstudiantesClase = verEstudiantesClase;
    window.gestionarClase = gestionarClase;
    window.filtrarEstudiantes = filtrarEstudiantes;
    window.verPerfilEstudiante = verPerfilEstudiante;
}
