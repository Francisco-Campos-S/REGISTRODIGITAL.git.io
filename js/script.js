// Variables globales
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
let usuarioActual = JSON.parse(localStorage.getItem('usuarioActual')) || null;

// Configuración para GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/REGISTRODIGITAL.git.io' : '';

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
    configurarEventListeners();
    configurarGitHubPages();
});

function inicializarApp() {
    // Recargar usuarios desde localStorage para asegurar sincronización con demo
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verificar si hay usuario logueado
    if (usuarioActual) {
        mostrarDashboard();
    }
    
    // Configurar navegación smooth
    configurarNavegacionSuave();
    
    // Configurar responsive menu
    configurarMenuResponsive();
    
    // Cargar datos de ejemplo si es la primera vez
    cargarDatosEjemplo();
}

// Función utilitaria para recargar usuarios desde localStorage
function recargarUsuarios() {
    usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios;
}

function configurarGitHubPages() {
    // Configurar rutas relativas para GitHub Pages
    if (isGitHubPages) {
        console.log('Ejecutándose en GitHub Pages');
        
        // Ajustar rutas de imágenes y recursos si es necesario
        const links = document.querySelectorAll('link[href]');
        links.forEach(link => {
            if (link.href.startsWith('/') && !link.href.startsWith('//')) {
                link.href = basePath + link.href;
            }
        });
        
        // Mostrar información de GitHub Pages
        mostrarNotificacion('¡Bienvenido a RegistroDigital en GitHub Pages!', 'info');
    }
}

function cargarDatosEjemplo() {
    // Solo cargar datos de ejemplo si no estamos en GitHub Pages y no hay usuarios demo
    if (!isGitHubPages && usuarios.length === 0) {
        const usuariosEjemplo = [
            {
                id: 'local-student-1',
                tipo: 'estudiante',
                nombre: 'Ana',
                apellido1: 'García',
                apellido2: 'Rodríguez',
                nombreCompleto: 'Ana García Rodríguez',
                cedula: '12345678-9',
                fechaNacimiento: '2000-05-15',
                email: 'ana.garcia@demo.com',
                telefono: '+1234567890',
                direccion: 'Calle Demo 123, Ciudad Demo',
                carrera: 'ingenieria-sistemas',
                semestre: '3',
                password: 'demo123',
                fechaRegistro: new Date().toISOString(),
                estado: 'activo'
            },
            {
                id: 'local-teacher-1',
                tipo: 'profesor',
                nombre: 'Carlos',
                apellido1: 'Martínez',
                apellido2: 'López',
                nombreCompleto: 'Dr. Carlos Martínez López',
                cedula: '98765432-1',
                fechaNacimiento: '1975-08-22',
                email: 'carlos.martinez@demo.com',
                telefono: '+1234567891',
                direccion: 'Avenida Demo 456, Ciudad Demo',
                especialidad: 'Ingeniería de Software',
                titulo: 'Doctor en Ciencias de la Computación',
                experiencia: '15',
                password: 'demo123',
                fechaRegistro: new Date().toISOString(),
                estado: 'activo'
            }
        ];
        
        usuarios = usuariosEjemplo;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // Mostrar información sobre los usuarios demo solo en desarrollo local
        setTimeout(() => {
            mostrarNotificacion('Se han cargado usuarios de demostración local. Email: ana.garcia@demo.com / carlos.martinez@demo.com, Contraseña: demo123', 'info', { duration: 8000 });
        }, 2000);
    }
}

function configurarEventListeners() {
    console.log('🔧 Configurando event listeners...');
    
    try {
        // Verificar que los elementos existan antes de agregar listeners
        const formEstudiante = document.getElementById('formEstudiante');
        const formProfesor = document.getElementById('formProfesor');
        const loginForm = document.getElementById('loginForm');
        
        if (formEstudiante) {
            formEstudiante.addEventListener('submit', registrarEstudiante);
            console.log('✅ Event listener agregado a formEstudiante');
        } else {
            console.error('❌ No se encontró formEstudiante');
        }
        
        if (formProfesor) {
            formProfesor.addEventListener('submit', registrarProfesor);
            console.log('✅ Event listener agregado a formProfesor');
        } else {
            console.error('❌ No se encontró formProfesor');
        }
        
        if (loginForm) {
            loginForm.addEventListener('submit', iniciarSesion);
            console.log('✅ Event listener agregado a loginForm');
        } else {
            console.error('❌ No se encontró loginForm');
        }
        
        // Validación en tiempo real
        configurarValidacionTiempoReal();
        
    } catch (error) {
        console.error('❌ Error configurando event listeners:', error);
    }
}

// Funciones de modal
function showRegistro() {
    document.getElementById('registroModal').style.display = 'block';
    document.body.style.overflow = 'auto';
}

function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflowY = 'auto';
    document.body.style.overscrollBehaviorY = 'auto';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
}

// Selección de tipo de usuario
function selectUserType(tipo) {
    // Actualizar botones visuales
    document.getElementById('btnEstudiante').classList.remove('active');
    document.getElementById('btnProfesor').classList.remove('active');
    if (tipo === 'estudiante') {
        document.getElementById('btnEstudiante').classList.add('active');
        document.getElementById('formEstudiante').style.display = 'block';
        document.getElementById('formProfesor').style.display = 'none';
        document.getElementById('btnRegistrarEstudiante').style.display = 'block';
        document.getElementById('btnRegistrarProfesor').style.display = 'none';
    } else {
        document.getElementById('btnProfesor').classList.add('active');
        document.getElementById('formProfesor').style.display = 'block';
        document.getElementById('formEstudiante').style.display = 'none';
        document.getElementById('btnRegistrarEstudiante').style.display = 'none';
        document.getElementById('btnRegistrarProfesor').style.display = 'block';
    }
}

// Registro de estudiante
function registrarEstudiante(e) {
    e.preventDefault();
    console.log('🔄 [TEST] submit registrarEstudiante disparado');
    if (!document.getElementById('formEstudiante').offsetParent) {
        mostrarNotificacion('El formulario de estudiante NO está visible', 'error');
        console.error('❌ [TEST] El formulario de estudiante NO está visible');
    }
    try {
        recargarUsuarios();
        console.log('👥 [TEST] Usuarios actuales:', usuarios.length);
        const formData = new FormData(e.target);
        const nombre = formData.get('nombre')?.trim() || '';
        const apellido1 = formData.get('apellido1')?.trim() || '';
        const apellido2 = formData.get('apellido2')?.trim() || '';
        const nombreCompleto = `${nombre} ${apellido1}${apellido2 ? ' ' + apellido2 : ''}`;
        console.log('📝 [TEST] Datos del formulario:', {
            nombre, apellido1, apellido2, nombreCompleto,
            email: formData.get('email'),
            cedula: formData.get('cedula')
        });
        if (!nombre || !apellido1) {
            mostrarNotificacion('Nombre y primer apellido son obligatorios', 'error');
            return;
        }
        const estudiante = {
            id: generarId(),
            tipo: 'estudiante',
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            nombreCompleto: nombreCompleto,
            cedula: formData.get('cedula')?.trim() || '',
            fechaNacimiento: formData.get('fechaNacimiento') || '',
            email: formData.get('email')?.trim() || '',
            telefono: formData.get('telefono')?.trim() || '',
            direccion: formData.get('direccion')?.trim() || '',
            carrera: formData.get('carrera') || '',
            semestre: formData.get('semestre') || '',
            password: formData.get('password') || '',
            fechaRegistro: new Date().toISOString(),
            estado: 'activo'
        };
        console.log('👤 [TEST] Estudiante a registrar:', estudiante);
        if (!validarDatosEstudiante(estudiante)) {
            console.log('❌ [TEST] Validación falló');
            return;
        }
        if (usuarios.find(u => u.email === estudiante.email || u.cedula === estudiante.cedula)) {
            mostrarNotificacion('Ya existe un usuario con este email o cédula', 'error');
            console.log('❌ [TEST] Usuario ya existe');
            return;
        }
        usuarios.push(estudiante);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log('✅ [TEST] Estudiante registrado exitosamente');
        mostrarNotificacion('Estudiante registrado exitosamente', 'success');
        e.target.reset();
        closeModal('registroModal');
        setTimeout(() => {
            showLogin();
        }, 1500);
    } catch (error) {
        console.error('❌ [TEST] Error en registro:', error);
        mostrarNotificacion('Error al registrar estudiante: ' + error.message, 'error');
    }
}

// Registro de profesor
function registrarProfesor(e) {
    e.preventDefault();
    console.log('🔄 [TEST] submit registrarProfesor disparado');
    if (!document.getElementById('formProfesor').offsetParent) {
        mostrarNotificacion('El formulario de profesor NO está visible', 'error');
        console.error('❌ [TEST] El formulario de profesor NO está visible');
    }
    try {
        recargarUsuarios();
        console.log('👥 [TEST] Usuarios actuales:', usuarios.length);
        const formData = new FormData(e.target);
        const nombre = formData.get('nombre').trim();
        const apellido1 = formData.get('apellido1').trim();
        const apellido2 = formData.get('apellido2') ? formData.get('apellido2').trim() : '';
        const nombreCompleto = `${nombre} ${apellido1}${apellido2 ? ' ' + apellido2 : ''}`;
        const profesor = {
            id: generarId(),
            tipo: 'profesor',
            nombre: nombre,
            apellido1: apellido1,
            apellido2: apellido2,
            nombreCompleto: nombreCompleto,
            cedula: formData.get('cedula'),
            fechaNacimiento: formData.get('fechaNacimiento'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            direccion: formData.get('direccion'),
            especialidad: formData.get('especialidad'),
            titulo: formData.get('titulo'),
            experiencia: formData.get('experiencia'),
            password: formData.get('password'),
            fechaRegistro: new Date().toISOString(),
            estado: 'activo'
        };
        delete profesor.carrera;
        delete profesor.semestre;
        console.log('👤 [TEST] Profesor a registrar:', profesor);
        if (!validarDatosProfesor(profesor)) {
            console.log('❌ [TEST] Validación falló');
            return;
        }
        if (usuarios.find(u => u.email === profesor.email || u.cedula === profesor.cedula)) {
            mostrarNotificacion('Ya existe un usuario con este email o cédula', 'error');
            console.log('❌ [TEST] Usuario ya existe');
            return;
        }
        usuarios.push(profesor);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        console.log('✅ [TEST] Profesor registrado exitosamente');
        mostrarNotificacion('Profesor registrado exitosamente', 'success');
        e.target.reset();
        closeModal('registroModal');
        setTimeout(() => {
            showLogin();
        }, 1500);
    } catch (error) {
        console.error('❌ [TEST] Error en registro:', error);
        mostrarNotificacion('Error al registrar profesor: ' + error.message, 'error');
    }
}

// Iniciar sesión
function iniciarSesion(e) {
    e.preventDefault();
    
    // Recargar usuarios actuales desde localStorage
    recargarUsuarios();
    
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const tipoUsuario = formData.get('userType');
    
    // Buscar usuario
    const usuario = usuarios.find(u => 
        u.email === email && 
        u.password === password && 
        u.tipo === tipoUsuario
    );
    
    if (usuario) {
        usuarioActual = usuario;
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        mostrarNotificacion(`Bienvenido, ${usuario.nombreCompleto || usuario.nombre}`, 'success');
        closeModal('loginModal');
        // Al loguear, ocultar cualquier formulario de registro
        var registroModal = document.getElementById('registroModal');
        if (registroModal) registroModal.style.display = 'none';
        var formEst = document.getElementById('formEstudiante');
        var formProf = document.getElementById('formProfesor');
        if (formEst) formEst.style.display = 'none';
        if (formProf) formProf.style.display = 'none';
        setTimeout(() => {
            mostrarDashboard();
        }, 1500);
    } else {
        mostrarNotificacion('Credenciales incorrectas', 'error');
    }
}

// Validaciones
function validarDatosEstudiante(estudiante) {
    console.log('🔍 Validando datos del estudiante...');
    
    if (!estudiante.nombre || estudiante.nombre.length < 2) {
        console.log('❌ Nombre inválido:', estudiante.nombre);
        mostrarNotificacion('El nombre debe tener al menos 2 caracteres', 'error');
        return false;
    }
    
    if (!estudiante.apellido1 || estudiante.apellido1.length < 2) {
        console.log('❌ Primer apellido inválido:', estudiante.apellido1);
        mostrarNotificacion('El primer apellido debe tener al menos 2 caracteres', 'error');
        return false;
    }
    
    if (!estudiante.cedula || !validarCedula(estudiante.cedula)) {
        console.log('❌ Cédula inválida:', estudiante.cedula);
        mostrarNotificacion('Formato de cédula inválido (Formato: 12345678-9)', 'error');
        return false;
    }
    
    if (!estudiante.email || !validarEmail(estudiante.email)) {
        console.log('❌ Email inválido:', estudiante.email);
        mostrarNotificacion('Formato de email inválido', 'error');
        return false;
    }
    
    if (!estudiante.telefono || !validarTelefono(estudiante.telefono)) {
        console.log('❌ Teléfono inválido:', estudiante.telefono);
        mostrarNotificacion('Formato de teléfono inválido', 'error');
        return false;
    }
    
    if (!estudiante.password || estudiante.password.length < 6) {
        console.log('❌ Contraseña inválida');
        mostrarNotificacion('La contraseña debe tener al menos 6 caracteres', 'error');
        return false;
    }
    
    if (!estudiante.carrera) {
        console.log('❌ Carrera no seleccionada');
        mostrarNotificacion('Debe seleccionar una carrera', 'error');
        return false;
    }
    
    if (!estudiante.semestre) {
        console.log('❌ Semestre no seleccionado');
        mostrarNotificacion('Debe seleccionar un semestre', 'error');
        return false;
    }
    
    console.log('✅ Todos los datos son válidos');
    return true;
}

function validarDatosProfesor(profesor) {
    if (!profesor.nombre || profesor.nombre.length < 2) {
        mostrarNotificacion('El nombre debe tener al menos 2 caracteres', 'error');
        return false;
    }
    
    if (!profesor.apellido1 || profesor.apellido1.length < 2) {
        mostrarNotificacion('El primer apellido debe tener al menos 2 caracteres', 'error');
        return false;
    }
    
    if (!validarCedula(profesor.cedula)) {
        mostrarNotificacion('Formato de cédula inválido (Formato: 12345678-9)', 'error');
        return false;
    }
    
    if (!validarEmail(profesor.email)) {
        mostrarNotificacion('Formato de email inválido', 'error');
        return false;
    }
    
    if (!validarTelefono(profesor.telefono)) {
        mostrarNotificacion('Formato de teléfono inválido', 'error');
        return false;
    }
    
    if (!profesor.password || profesor.password.length < 6) {
        mostrarNotificacion('La contraseña debe tener al menos 6 caracteres', 'error');
        return false;
    }
    
    return true;
}

function validarCedula(cedula) {
    // Validación básica de cédula (formato: 12345678-9)
    const regex = /^\d{8}-\d{1}$/;
    return regex.test(cedula);
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarTelefono(telefono) {
    // Validación básica de teléfono
    const regex = /^[\+]?[0-9\s\-\(\)]{8,15}$/;
    return regex.test(telefono);
}

// Validación en tiempo real
function configurarValidacionTiempoReal() {
    // Validar cédula
    document.querySelectorAll('input[name="cedula"]').forEach(input => {
        input.addEventListener('input', function() {
            const valor = this.value;
            if (valor && !validarCedula(valor)) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
    });
    
    // Validar email
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('input', function() {
            const valor = this.value;
            if (valor && !validarEmail(valor)) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
    });
    
    // Validar contraseña
    document.querySelectorAll('input[type="password"]').forEach(input => {
        input.addEventListener('input', function() {
            const valor = this.value;
            if (valor.length < 6) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        });
    });
}

// Dashboard
function mostrarDashboard() {
    if (!usuarioActual) return;
    
    const dashboard = crearDashboard();
    document.body.innerHTML = dashboard;
    configurarDashboard();
}

function crearDashboard() {
    const tipo = usuarioActual.tipo;
    const nombre = usuarioActual.nombreCompleto || usuarioActual.nombre;
    
    return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dashboard - RegistroDigital</title>
            <link rel="stylesheet" href="css/styles.css">
            <link rel="stylesheet" href="css/dashboard.css">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="dashboard-container">
                <nav class="sidebar">
                    <div class="sidebar-header">
                        <div class="logo">
                            <i class="fas fa-graduation-cap"></i>
                            <span>RegistroDigital</span>
                        </div>
                    </div>
                    <div class="user-info">
                        <div class="user-avatar">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div class="user-details">
                            <h3>${nombre}</h3>
                            <p>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</p>
                        </div>
                    </div>
                    <ul class="sidebar-menu">
                        <li><a href="#" class="menu-link active" data-section="inicio"><i class="fas fa-home"></i> Inicio</a></li>
                        <li><a href="#" class="menu-link" data-section="perfil"><i class="fas fa-user"></i> Mi Perfil</a></li>
                        ${tipo === 'estudiante' ? `
                            <li><a href="#" class="menu-link" data-section="materias"><i class="fas fa-book"></i> Mis Materias</a></li>
                            <li><a href="#" class="menu-link" data-section="horarios"><i class="fas fa-calendar"></i> Horarios</a></li>
                            <li><a href="#" class="menu-link" data-section="asistencias"><i class="fas fa-calendar-check"></i> Asistencias</a></li>
                        ` : ''}
                        ${tipo === 'profesor' ? `
                            <li><a href="#" class="menu-link" data-section="clases"><i class="fas fa-chalkboard"></i> Mis Clases</a></li>
                            <li><a href="#" class="menu-link" data-section="estudiantes"><i class="fas fa-users"></i> Estudiantes</a></li>
                            <li><a href="#" class="menu-link" data-section="asistencias"><i class="fas fa-clipboard-check"></i> Asistencias</a></li>
                        ` : ''}
                        <li><a href="#" class="menu-link" data-section="configuracion"><i class="fas fa-cog"></i> Configuración</a></li>
                        <li><a href="#" onclick="cerrarSesion()"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a></li>
                    </ul>
                </nav>
                
                <main class="main-content">
                    <header class="content-header">
                        <h1 id="page-title">Dashboard</h1>
                        <div class="header-actions">
                            <button class="btn btn-primary" onclick="mostrarNotificaciones()">
                                <i class="fas fa-bell"></i>
                                Notificaciones
                            </button>
                        </div>
                    </header>
                    
                    <div id="content-area" class="content-area">
                        ${crearContenidoInicio()}
                    </div>
                </main>
            </div>
            
            <div id="notificaciones"></div>
            <script src="js/dashboard.js"></script>
        </body>
        </html>
    `;
}

function crearContenidoInicio() {
    const tipo = usuarioActual.tipo;
    let estadisticas;
    
    // Usar estadísticas demo si están disponibles
    if (window.githubDemo) {
        estadisticas = window.githubDemo.getDemoStats();
    } else {
        const totalUsuarios = usuarios.length;
        const totalEstudiantes = usuarios.filter(u => u.tipo === 'estudiante').length;
        const totalProfesores = usuarios.filter(u => u.tipo === 'profesor').length;
        estadisticas = {
            totalUsuarios,
            totalEstudiantes,
            totalProfesores,
            clasesActivas: 15
        };
    }
    
    return `
        <div class="dashboard-overview">
            ${tipo === 'admin' ? `
                <div class="admin-welcome">
                    <h2>🛠️ Panel de Administración</h2>
                    <p>Bienvenido al panel de control principal del sistema</p>
                </div>
            ` : ''}
            
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${estadisticas.totalUsuarios}</h3>
                        <p>Total Usuarios</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${estadisticas.totalEstudiantes}</h3>
                        <p>Estudiantes</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-chalkboard-teacher"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${estadisticas.totalProfesores}</h3>
                        <p>Profesores</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="stat-content">
                        <h3>${estadisticas.clasesActivas}</h3>
                        <p>Clases Activas</p>
                    </div>
                </div>
            </div>
            
            <div class="demo-features">
                <div class="feature-showcase">
                    <h2>🎯 Funcionalidades Disponibles</h2>
                    <div class="features-demo-grid">
                        ${tipo === 'estudiante' ? `
                            <div class="demo-feature-card">
                                <i class="fas fa-book"></i>
                                <h3>Mis Materias</h3>
                                <p>Ve todas las materias en las que estás inscrito</p>
                                <button class="btn btn-sm btn-primary" onclick="navegarSeccion('materias')">Explorar</button>
                            </div>
                            <div class="demo-feature-card">
                                <i class="fas fa-calendar"></i>
                                <h3>Horarios</h3>
                                <p>Consulta tu horario de clases semanal</p>
                                <button class="btn btn-sm btn-primary" onclick="navegarSeccion('horarios')">Ver Horario</button>
                            </div>
                            <div class="demo-feature-card">
                                <i class="fas fa-calendar-check"></i>
                                <h3>Mis Asistencias</h3>
                                <p>Revisa tu historial de asistencias</p>
                                <button class="btn btn-sm btn-primary" onclick="navegarSeccion('asistencias')">Ver Asistencias</button>
                            </div>
                        ` : ''}
                        
                        ${tipo === 'profesor' ? `
                            <div class="demo-feature-card">
                                <i class="fas fa-chalkboard"></i>
                                <h3>Mis Clases</h3>
                                <p>Gestiona todas tus clases y grupos</p>
                                <button class="btn btn-sm btn-primary" onclick="navegarSeccion('clases')">Gestionar</button>
                            </div>
                            <div class="demo-feature-card">
                                <i class="fas fa-users"></i>
                                <h3>Estudiantes</h3>
                                <p>Lista completa de tus estudiantes</p>
                                <button class="btn btn-sm btn-primary" onclick="navegarSeccion('estudiantes')">Ver Lista</button>
                            </div>
                            <div class="demo-feature-card">
                                <i class="fas fa-clipboard-check"></i>
                                <h3>Tomar Asistencia</h3>
                                <p>Registra la asistencia de tus estudiantes</p>
                                <button class="btn btn-sm btn-primary" onclick="navegarSeccion('asistencias')">Tomar Asistencia</button>
                            </div>
                        ` : ''}
                        
                        <div class="demo-feature-card">
                            <i class="fas fa-user-circle"></i>
                            <h3>Mi Perfil</h3>
                            <p>Actualiza tu información personal</p>
                            <button class="btn btn-sm btn-primary" onclick="navegarSeccion('perfil')">Editar Perfil</button>
                        </div>
                        
                        <div class="demo-feature-card">
                            <i class="fas fa-cog"></i>
                            <h3>Configuración</h3>
                            <p>Ajusta las preferencias del sistema</p>
                            <button class="btn btn-sm btn-primary" onclick="navegarSeccion('configuracion')">Configurar</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="recent-activity">
                <h2>📊 Actividad Reciente</h2>
                <div class="activity-list">
                    <div class="activity-item">
                        <i class="fas fa-user-plus"></i>
                        <div class="activity-content">
                            <p><strong>${usuarioActual.nombre}</strong> accedió al sistema</p>
                            <small>Hace unos momentos</small>
                        </div>
                    </div>
                    <div class="activity-item">
                        <i class="fas fa-sign-in-alt"></i>
                        <div class="activity-content">
                            <p>Sesión iniciada como <strong>${usuarioActual.tipo}</strong></p>
                            <small>${new Date(usuarioActual.fechaRegistro).toLocaleDateString()}</small>
                        </div>
                    </div>
                    ${window.githubDemo ? `
                        <div class="activity-item demo-highlight">
                            <i class="fas fa-rocket"></i>
                            <div class="activity-content">
                                <p><strong>Demo de GitHub Pages</strong> - Todas las funcionalidades están disponibles</p>
                                <small>¡Explora libremente!</small>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

function configurarDashboard() {
    // Configurar navegación del dashboard
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const seccion = this.dataset.section;
            if (seccion) {
                navegarSeccion(seccion);
            }
        });
    });
}

function navegarSeccion(seccion) {
    // Actualizar link activo
    document.querySelectorAll('.menu-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-section="${seccion}"]`).classList.add('active');
    
    // Actualizar título
    const titulos = {
        'inicio': 'Dashboard',
        'perfil': 'Mi Perfil',
        'materias': 'Mis Materias',
        'horarios': 'Horarios',
        'clases': 'Mis Clases',
        'estudiantes': 'Estudiantes',
        'asistencias': 'Asistencias',
        'configuracion': 'Configuración'
    };
    
    document.getElementById('page-title').textContent = titulos[seccion] || 'Dashboard';
    
    // Actualizar contenido
    const contentArea = document.getElementById('content-area');
    
    switch(seccion) {
        case 'inicio':
            contentArea.innerHTML = crearContenidoInicio();
            break;
        case 'perfil':
            contentArea.innerHTML = crearContenidoPerfil();
            break;
        case 'materias':
            contentArea.innerHTML = crearContenidoMaterias();
            break;
        case 'horarios':
            contentArea.innerHTML = crearContenidoHorarios();
            break;
        case 'clases':
            contentArea.innerHTML = crearContenidoClases();
            break;
        case 'estudiantes':
            contentArea.innerHTML = crearContenidoEstudiantes();
            break;
        case 'asistencias':
            if (typeof abrirGestionAsistencias === 'function') {
                abrirGestionAsistencias();
            } else {
                contentArea.innerHTML = '<div class="loading">Cargando sistema de asistencias...</div>';
                // Cargar el módulo de asistencias si no está disponible
                if (!document.querySelector('script[src*="asistencias.js"]')) {
                    const script = document.createElement('script');
                    script.src = 'js/asistencias.js';
                    script.onload = () => {
                        if (typeof abrirGestionAsistencias === 'function') {
                            abrirGestionAsistencias();
                        }
                    };
                    document.head.appendChild(script);
                }
            }
            break;
        case 'configuracion':
            contentArea.innerHTML = crearContenidoConfiguracion();
            break;
    }
}

function crearContenidoPerfil() {
    const usuario = usuarioActual;
    const nombreCompleto = usuario.nombreCompleto || usuario.nombre;
    
    return `
        <div class="profile-container">
            <div class="profile-header">
                <div class="profile-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="profile-info">
                    <h2>${nombreCompleto}</h2>
                    <p>${usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1)}</p>
                    <p><i class="fas fa-envelope"></i> ${usuario.email}</p>
                </div>
            </div>
            
            <div class="profile-details">
                <h3>Información Personal</h3>
                <div class="detail-grid">
                    ${usuario.nombre && usuario.apellido1 ? `
                        <div class="detail-item">
                            <label>Nombre:</label>
                            <span>${usuario.nombre}</span>
                        </div>
                        <div class="detail-item">
                            <label>Primer Apellido:</label>
                            <span>${usuario.apellido1}</span>
                        </div>
                        ${usuario.apellido2 ? `
                            <div class="detail-item">
                                <label>Segundo Apellido:</label>
                                <span>${usuario.apellido2}</span>
                            </div>
                        ` : ''}
                    ` : `
                        <div class="detail-item">
                            <label>Nombre Completo:</label>
                            <span>${nombreCompleto}</span>
                        </div>
                    `}
                    <div class="detail-item">
                        <label>Cédula:</label>
                        <span>${usuario.cedula}</span>
                    </div>
                    <div class="detail-item">
                        <label>Fecha de Nacimiento:</label>
                        <span>${new Date(usuario.fechaNacimiento).toLocaleDateString()}</span>
                    </div>
                    <div class="detail-item">
                        <label>Teléfono:</label>
                        <span>${usuario.telefono}</span>
                    </div>
                    <div class="detail-item">
                        <label>Dirección:</label>
                        <span>${usuario.direccion}</span>
                    </div>
                    ${usuario.tipo === 'estudiante' ? `
                        <div class="detail-item">
                            <label>Carrera:</label>
                            <span>${usuario.carrera}</span>
                        </div>
                        <div class="detail-item">
                            <label>Semestre:</label>
                            <span>${usuario.semestre}</span>
                        </div>
                    ` : ''}
                    ${usuario.tipo === 'profesor' ? `
                        <div class="detail-item">
                            <label>Especialidad:</label>
                            <span>${usuario.especialidad}</span>
                        </div>
                        <div class="detail-item">
                            <label>Título:</label>
                            <span>${usuario.titulo}</span>
                        </div>
                        <div class="detail-item">
                            <label>Experiencia:</label>
                            <span>${usuario.experiencia} años</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Funciones auxiliares
function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacion = document.createElement('div');
    notificacion.className = `notification ${tipo}`;
    notificacion.innerHTML = `
        <i class="fas fa-${tipo === 'success' ? 'check-circle' : tipo === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${mensaje}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Crear contenedor si no existe
    let container = document.getElementById('notificaciones');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notificaciones';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
        `;
        document.body.appendChild(container);
    }
    
    container.appendChild(notificacion);
    
    // Auto eliminar después de 5 segundos
    setTimeout(() => {
        if (notificacion.parentElement) {
            notificacion.remove();
        }
    }, 5000);
}

function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    location.reload();
}

function configurarNavegacionSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function configurarMenuResponsive() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Exportar funciones para uso global
window.showRegistro = showRegistro;
window.showLogin = showLogin;
window.closeModal = closeModal;
window.selectUserType = selectUserType;
window.cerrarSesion = cerrarSesion;
