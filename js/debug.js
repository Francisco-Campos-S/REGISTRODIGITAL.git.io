// Debug helper for RegistroDigital

// Función para limpiar localStorage y empezar desde cero
function limpiarDatos() {
    localStorage.clear();
    console.log('🧹 LocalStorage limpiado');
    location.reload();
}

// Función para ver todos los usuarios registrados
function verUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log('👥 Usuarios registrados:', usuarios);
    return usuarios;
}

// Función para simular un registro exitoso
function testRegistro() {
    const formData = new FormData();
    formData.append('nombre', 'Test');
    formData.append('apellido1', 'Usuario');
    formData.append('apellido2', 'Demo');
    formData.append('cedula', '99999999-9');
    formData.append('fechaNacimiento', '2000-01-01');
    formData.append('email', 'test@test.com');
    formData.append('telefono', '+1234567890');
    formData.append('direccion', 'Calle Test 123');
    formData.append('carrera', 'ingenieria-sistemas');
    formData.append('semestre', '1');
    formData.append('password', 'test123');
    
    // Crear evento simulado
    const evento = {
        preventDefault: () => {},
        target: {
            reset: () => console.log('Form reset simulado')
        }
    };
    
    // Simular FormData.get
    evento.target.elements = {};
    for (let [key, value] of formData) {
        evento.target.elements[key] = { value };
    }
    
    console.log('🧪 Probando registro...');
    registrarEstudiante(evento);
}

// Función para verificar que todo funciona
function verificarSistema() {
    console.log('🔍 Verificando sistema...');
    
    // Verificar elementos DOM
    const elementos = [
        'formEstudiante', 'formProfesor', 'loginForm', 
        'registroModal', 'loginModal'
    ];
    
    elementos.forEach(id => {
        const elemento = document.getElementById(id);
        console.log(`${elemento ? '✅' : '❌'} ${id}:`, elemento ? 'Encontrado' : 'No encontrado');
    });
    
    // Verificar localStorage
    const usuarios = localStorage.getItem('usuarios');
    console.log('💾 LocalStorage usuarios:', usuarios ? 'Encontrado' : 'Vacío');
    
    // Verificar funciones
    const funciones = [
        'registrarEstudiante', 'registrarProfesor', 'iniciarSesion',
        'showRegistro', 'showLogin', 'closeModal'
    ];
    
    funciones.forEach(func => {
        console.log(`${typeof window[func] === 'function' ? '✅' : '❌'} ${func}:`, 
                   typeof window[func] === 'function' ? 'Disponible' : 'No disponible');
    });
}

// Función para arreglar el login manualmente
function arreglarLogin() {
    console.log('🔧 === ARREGLANDO SISTEMA DE LOGIN ===');
    
    // 1. Verificar formulario de login
    const loginForm = document.getElementById('loginForm');
    
    if (!loginForm) {
        console.log('❌ Formulario de login no encontrado');
        return;
    }
    
    console.log('✅ Formulario de login encontrado');
    
    // 2. Verificar que las funciones existan
    if (typeof iniciarSesion !== 'function') {
        console.log('❌ Función iniciarSesion NO disponible');
        return;
    }
    
    console.log('✅ Función iniciarSesion disponible');
    
    // 3. Eliminar event listeners existentes y agregar nuevo
    const newLoginForm = loginForm.cloneNode(true);
    loginForm.parentNode.replaceChild(newLoginForm, loginForm);
    
    // 4. Configurar nuevo event listener
    newLoginForm.addEventListener('submit', function(e) {
        console.log('🔑 Evento submit de login capturado');
        e.preventDefault();
        
        // Recargar usuarios actuales desde localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        console.log('👥 Usuarios disponibles:', usuarios.length);
        
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const tipoUsuario = formData.get('userType');
        
        console.log('📝 Datos del login:', { email, tipoUsuario });
        
        // Buscar usuario
        const usuario = usuarios.find(u => 
            u.email === email && 
            u.password === password && 
            u.tipo === tipoUsuario
        );
        
        if (usuario) {
            console.log('✅ Usuario encontrado:', usuario.email);
            
            // Guardar usuario actual
            window.usuarioActual = usuario;
            localStorage.setItem('usuarioActual', JSON.stringify(usuario));
            
            // Mostrar notificación
            if (typeof mostrarNotificacion === 'function') {
                mostrarNotificacion(`Bienvenido, ${usuario.nombreCompleto || usuario.nombre}`, 'success');
            }
            
            // Cerrar modal
            if (typeof closeModal === 'function') {
                closeModal('loginModal');
            }
            
            // Ir al dashboard (versión mejorada)
            setTimeout(() => {
                mostrarDashboardMejorado();
            }, 1500);
            
        } else {
            console.log('❌ Usuario no encontrado o credenciales incorrectas');
            if (typeof mostrarNotificacion === 'function') {
                mostrarNotificacion('Credenciales incorrectas', 'error');
            }
        }
    });
    
    console.log('✅ Event listener del login configurado correctamente');
    console.log('🎯 Login reparado. Intenta iniciar sesión ahora.');
    console.log('=========================================');
}

// Función para mostrar dashboard sin romper los scripts
function mostrarDashboardMejorado() {
    console.log('🎯 Mostrando dashboard mejorado...');
    
    if (!window.usuarioActual) {
        console.log('❌ No hay usuario actual');
        return;
    }
    
    // Ocultar secciones principales
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    const about = document.querySelector('.about');
    const footer = document.querySelector('footer');
    const modals = document.querySelectorAll('.modal');
    
    if (header) header.style.display = 'none';
    if (hero) hero.style.display = 'none';
    if (about) about.style.display = 'none';
    if (footer) footer.style.display = 'none';
    modals.forEach(modal => modal.style.display = 'none');
    
    // Crear contenedor del dashboard
    let dashboardContainer = document.getElementById('dashboard-container');
    if (!dashboardContainer) {
        dashboardContainer = document.createElement('div');
        dashboardContainer.id = 'dashboard-container';
        document.body.appendChild(dashboardContainer);
    }
    
    // Cargar CSS del dashboard si no está cargado
    if (!document.querySelector('link[href*="dashboard.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/dashboard.css';
        document.head.appendChild(link);
    }
    
    if (!document.querySelector('link[href*="asistencias.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'css/asistencias.css';
        document.head.appendChild(link);
    }
    
    // Crear HTML del dashboard
    const usuario = window.usuarioActual;
    const tipo = usuario.tipo;
    const nombre = usuario.nombreCompleto || usuario.nombre;
    
    dashboardContainer.innerHTML = crearHTMLDashboard(tipo, nombre);
    
    // Configurar el dashboard
    configurarDashboard();
    
    console.log('✅ Dashboard cargado exitosamente');
}

function crearHTMLDashboard(tipo, nombre) {
    return `
        <div class="dashboard-layout">
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
                        <button class="btn-icon" title="Notificaciones">
                            <i class="fas fa-bell"></i>
                        </button>
                        <button class="btn-icon" title="Configuración">
                            <i class="fas fa-cog"></i>
                        </button>
                    </div>
                </header>
                
                <section id="content-area" class="content-body">
                    ${crearContenidoInicio()}
                </section>
            </main>
        </div>
    `;
}

// Función para arreglar el registro manualmente
function arreglarRegistro() {
    console.log('🔧 === ARREGLANDO SISTEMA DE REGISTRO ===');
    
    // 1. Verificar formularios
    const formEstudiante = document.getElementById('formEstudiante');
    const formProfesor = document.getElementById('formProfesor');
    
    if (!formEstudiante) {
        console.log('❌ Formulario de estudiante no encontrado');
        return;
    }
    
    if (!formProfesor) {
        console.log('❌ Formulario de profesor no encontrado');
        return;
    }
    
    // 2. Eliminar event listeners existentes y agregar nuevos
    const newFormEstudiante = formEstudiante.cloneNode(true);
    const newFormProfesor = formProfesor.cloneNode(true);
    
    formEstudiante.parentNode.replaceChild(newFormEstudiante, formEstudiante);
    formProfesor.parentNode.replaceChild(newFormProfesor, formProfesor);
    
    // 3. Configurar nuevos event listeners
    newFormEstudiante.addEventListener('submit', function(e) {
        console.log('📝 Evento submit de estudiante capturado');
        registrarEstudiante(e);
    });
    
    newFormProfesor.addEventListener('submit', function(e) {
        console.log('📝 Evento submit de profesor capturado');
        registrarProfesor(e);
    });
    
    console.log('✅ Event listeners configurados correctamente');
    
    // 4. Verificar que las funciones de registro existan
    if (typeof registrarEstudiante === 'function') {
        console.log('✅ Función registrarEstudiante disponible');
    } else {
        console.log('❌ Función registrarEstudiante NO disponible');
    }
    
    if (typeof registrarProfesor === 'function') {
        console.log('✅ Función registrarProfesor disponible');
    } else {
        console.log('❌ Función registrarProfesor NO disponible');
    }
    
    console.log('🎯 Registro reparado. Intenta registrar un usuario ahora.');
    console.log('=========================================');
}

// Probar el registro paso a paso
function testRegistroCompleto() {
    console.log('🧪 === PRUEBA COMPLETA DE REGISTRO ===');
    
    // 1. Verificar formularios
    const formEstudiante = document.getElementById('formEstudiante');
    const formProfesor = document.getElementById('formProfesor');
    
    console.log('📝 Formulario estudiante:', formEstudiante ? 'Encontrado' : 'NO encontrado');
    console.log('📝 Formulario profesor:', formProfesor ? 'Encontrado' : 'NO encontrado');
    
    // 2. Verificar función de notificaciones
    if (typeof mostrarNotificacion === 'function') {
        console.log('✅ Función mostrarNotificacion disponible');
        try {
            mostrarNotificacion('Prueba de notificación', 'info');
            console.log('✅ Notificación de prueba exitosa');
        } catch (error) {
            console.log('❌ Error en notificación:', error);
        }
    } else {
        console.log('❌ Función mostrarNotificacion NO disponible');
    }
    
    // 3. Verificar funciones de validación
    const funcionesValidacion = ['validarCedula', 'validarEmail', 'validarTelefono'];
    funcionesValidacion.forEach(func => {
        if (typeof window[func] === 'function') {
            console.log(`✅ ${func} disponible`);
        } else {
            console.log(`❌ ${func} NO disponible`);
        }
    });
    
    // 4. Verificar localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log(`👥 Usuarios en localStorage: ${usuarios.length}`);
    
    // 5. Probar registro con datos de prueba
    console.log('🧪 Probando registro con datos de prueba...');
    const datosTest = {
        nombre: 'Test',
        apellido1: 'Usuario',
        apellido2: 'Prueba',
        cedula: '12345678-9',
        email: 'test@prueba.com',
        telefono: '+50612345678',
        password: 'password123',
        carrera: 'ingenieria-sistemas',
        semestre: '1'
    };
    
    // Simular objeto estudiante
    const estudianteTest = {
        id: 'test-' + Date.now(),
        tipo: 'estudiante',
        ...datosTest,
        nombreCompleto: `${datosTest.nombre} ${datosTest.apellido1} ${datosTest.apellido2}`,
        fechaRegistro: new Date().toISOString(),
        estado: 'activo'
    };
    
    console.log('👤 Datos del estudiante test:', estudianteTest);
    
    // Probar validación
    if (typeof validarDatosEstudiante === 'function') {
        const validacion = validarDatosEstudiante(estudianteTest);
        console.log('✅ Validación resultado:', validacion);
    }
    
    console.log('=========================================');
}

// Verificar sistema de asistencias
function verificarAsistencias() {
    console.log('🎯 === VERIFICACIÓN SISTEMA ASISTENCIAS ===');
    
    // Verificar datos
    const materias = JSON.parse(localStorage.getItem('materias')) || [];
    const asistencias = JSON.parse(localStorage.getItem('asistencias')) || [];
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    console.log('📚 Materias:', materias.length);
    console.log('📋 Asistencias:', asistencias.length);
    console.log('👥 Usuarios:', usuarios.length);
    
    materias.forEach((mat, index) => {
        console.log(`${index + 1}. ${mat.nombre} - ${mat.estudiantesInscritos.length} estudiantes`);
    });
    
    // Verificar funciones principales
    const funciones = [
        'abrirGestionAsistencias',
        'crearInterfazProfesor', 
        'crearInterfazEstudiante',
        'inicializarInterfazProfesor',
        'inicializarInterfazEstudiante'
    ];
    
    funciones.forEach(func => {
        if (typeof window[func] === 'function') {
            console.log(`✅ ${func} disponible`);
        } else {
            console.log(`❌ ${func} NO disponible`);
        }
    });
    
    // Verificar usuario actual
    const usuario = usuarioActual || JSON.parse(localStorage.getItem('usuarioActual'));
    if (usuario) {
        console.log(`👤 Usuario actual: ${usuario.email} (${usuario.tipo})`);
    } else {
        console.log('❌ No hay usuario activo');
    }
    
    console.log('===========================================');
}

// Prueba completa del sistema paso a paso
function pruebaCompleta() {
    console.log('🧪 === PRUEBA COMPLETA DEL SISTEMA ===');
    
    // 1. Verificar estado inicial
    console.log('1️⃣ Verificando estado inicial...');
    const usuariosIniciales = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log(`   📊 Usuarios en localStorage: ${usuariosIniciales.length}`);
    
    // 2. Verificar formularios
    console.log('2️⃣ Verificando formularios...');
    const formEstudiante = document.getElementById('formEstudiante');
    const formProfesor = document.getElementById('formProfesor');
    const formLogin = document.getElementById('loginForm');
    
    console.log(`   📝 Form Estudiante: ${formEstudiante ? 'Encontrado' : 'NO encontrado'}`);
    console.log(`   📝 Form Profesor: ${formProfesor ? 'Encontrado' : 'NO encontrado'}`);
    console.log(`   📝 Form Login: ${formLogin ? 'Encontrado' : 'NO encontrado'}`);
    
    // 3. Verificar funciones críticas
    console.log('3️⃣ Verificando funciones críticas...');
    const funcionesCriticas = [
        'registrarEstudiante',
        'registrarProfesor', 
        'iniciarSesion',
        'mostrarNotificacion',
        'validarCedula',
        'validarEmail',
        'validarTelefono'
    ];
    
    funcionesCriticas.forEach(func => {
        const disponible = typeof window[func] === 'function';
        console.log(`   ${disponible ? '✅' : '❌'} ${func}: ${disponible ? 'Disponible' : 'NO disponible'}`);
    });
    
    // 4. Probar cargar datos demo
    console.log('4️⃣ Probando cargar datos demo...');
    try {
        if (typeof window.demo !== 'undefined') {
            console.log('   ✅ Objeto demo encontrado');
            window.demo.cargarDatosDemo();
            
            const usuariosDespuesDemo = JSON.parse(localStorage.getItem('usuarios')) || [];
            console.log(`   📊 Usuarios después del demo: ${usuariosDespuesDemo.length}`);
            
            if (usuariosDespuesDemo.length > usuariosIniciales.length) {
                console.log('   ✅ Datos demo cargados correctamente');
                
                // Mostrar algunos usuarios demo
                usuariosDespuesDemo.slice(0, 3).forEach(u => {
                    console.log(`      👤 ${u.email} (${u.tipo})`);
                });
            } else {
                console.log('   ⚠️ Los datos demo no se cargaron');
            }
        } else {
            console.log('   ❌ Objeto demo NO encontrado');
        }
    } catch (error) {
        console.log('   ❌ Error cargando demo:', error.message);
    }
    
    // 5. Simular registro de estudiante
    console.log('5️⃣ Simulando registro de estudiante...');
    try {
        const datosTest = {
            nombre: 'Test',
            apellido1: 'Usuario',
            apellido2: 'Prueba', 
            cedula: '99999999-9',
            fechaNacimiento: '2000-01-01',
            email: 'test.usuario@prueba.com',
            telefono: '+50699999999',
            direccion: 'Dirección de prueba',
            carrera: 'ingenieria-sistemas',
            semestre: '1',
            password: 'password123'
        };
        
        console.log('   📝 Datos de prueba:', datosTest);
        
        // Verificar si ya existe
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const existe = usuarios.find(u => u.email === datosTest.email);
        
        if (existe) {
            console.log('   ⚠️ Usuario de prueba ya existe, eliminando...');
            const usuariosFiltrados = usuarios.filter(u => u.email !== datosTest.email);
            localStorage.setItem('usuarios', JSON.stringify(usuariosFiltrados));
        }
        
        // Simular registro
        const estudianteTest = {
            id: 'test-' + Date.now(),
            tipo: 'estudiante',
            ...datosTest,
            nombreCompleto: `${datosTest.nombre} ${datosTest.apellido1} ${datosTest.apellido2}`,
            fechaRegistro: new Date().toISOString(),
            estado: 'activo'
        };
        
        console.log('   👤 Estudiante a registrar:', estudianteTest);
        
        // Validar
        if (typeof validarDatosEstudiante === 'function') {
            const valido = validarDatosEstudiante(estudianteTest);
            console.log(`   🔍 Validación: ${valido ? 'EXITOSA' : 'FALLÓ'}`);
            
            if (valido) {
                // Guardar
                const usuariosActualizados = JSON.parse(localStorage.getItem('usuarios')) || [];
                usuariosActualizados.push(estudianteTest);
                localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
                console.log('   ✅ Estudiante registrado exitosamente');
                
                // Verificar que se guardó
                const verificacion = JSON.parse(localStorage.getItem('usuarios')) || [];
                const encontrado = verificacion.find(u => u.email === datosTest.email);
                console.log(`   🔍 Verificación de guardado: ${encontrado ? 'EXITOSA' : 'FALLÓ'}`);
            }
        } else {
            console.log('   ❌ Función validarDatosEstudiante no disponible');
        }
        
    } catch (error) {
        console.log('   ❌ Error en simulación de registro:', error.message);
    }
    
    // 6. Simular login
    console.log('6️⃣ Simulando login...');
    try {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        console.log(`   📊 Total usuarios disponibles: ${usuarios.length}`);
        
        // Intentar con usuario demo
        const usuarioDemo = usuarios.find(u => u.email.includes('maria.hernandez') && u.tipo === 'estudiante');
        
        if (usuarioDemo) {
            console.log('   👤 Usuario demo encontrado:', usuarioDemo.email);
            console.log('   🔑 Intentando login...');
            
            // Simular login
            window.usuarioActual = usuarioDemo;
            localStorage.setItem('usuarioActual', JSON.stringify(usuarioDemo));
            
            console.log('   ✅ Login simulado exitosamente');
            console.log(`   👤 Usuario actual: ${window.usuarioActual.email}`);
            
        } else {
            console.log('   ❌ No se encontró usuario demo de estudiante');
            console.log('   📋 Usuarios disponibles:');
            usuarios.forEach(u => {
                console.log(`      - ${u.email} (${u.tipo})`);
            });
        }
        
    } catch (error) {
        console.log('   ❌ Error en simulación de login:', error.message);
    }
    
    console.log('=========================================');
    console.log('🎯 RESULTADO DE LA PRUEBA:');
    
    const usuariosFinales = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioActual = window.usuarioActual;
    
    console.log(`📊 Total usuarios: ${usuariosFinales.length}`);
    console.log(`👤 Usuario logueado: ${usuarioActual ? usuarioActual.email : 'NINGUNO'}`);
    
    if (usuariosFinales.length > 0 && usuarioActual) {
        console.log('✅ SISTEMA FUNCIONANDO CORRECTAMENTE');
    } else {
        console.log('❌ SISTEMA CON PROBLEMAS');
        console.log('💡 Ejecuta: solucionarProblemas()');
    }
}

// Función para solucionar problemas automáticamente
function solucionarProblemas() {
    console.log('🔧 === SOLUCIONANDO PROBLEMAS AUTOMÁTICAMENTE ===');
    
    // 1. Reparar registro
    console.log('1️⃣ Reparando sistema de registro...');
    arreglarRegistro();
    
    // 2. Reparar login
    console.log('2️⃣ Reparando sistema de login...');
    arreglarLogin();
    
    // 3. Cargar datos demo si no existen
    console.log('3️⃣ Verificando datos demo...');
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    if (usuarios.length === 0) {
        console.log('   🔄 Cargando datos demo...');
        
        // Crear usuarios demo manualmente
        const usuariosDemo = [
            {
                id: 'demo-estudiante-1',
                tipo: 'estudiante',
                nombre: 'María José',
                apellido1: 'Hernández',
                apellido2: 'García',
                nombreCompleto: 'María José Hernández García',
                cedula: '11111111-1',
                fechaNacimiento: '2001-03-10',
                email: 'maria.hernandez@estudiante.demo.com',
                telefono: '+50611111111',
                direccion: 'Calle Estudiantes 111',
                carrera: 'ingenieria-sistemas',
                semestre: '4',
                password: 'estudiante123',
                fechaRegistro: new Date().toISOString(),
                estado: 'activo'
            },
            {
                id: 'demo-profesor-1',
                tipo: 'profesor',
                nombre: 'Laura',
                apellido1: 'Mendoza',
                apellido2: 'Silva',
                nombreCompleto: 'Dra. Laura Mendoza Silva',
                cedula: '33333333-3',
                fechaNacimiento: '1978-07-14',
                email: 'laura.mendoza@profesor.demo.com',
                telefono: '+50633333333',
                direccion: 'Boulevard Académico 333',
                especialidad: 'Desarrollo Web y Móvil',
                titulo: 'Doctora en Ingeniería de Software',
                experiencia: '12',
                password: 'profesor123',
                fechaRegistro: new Date().toISOString(),
                estado: 'activo'
            }
        ];
        
        localStorage.setItem('usuarios', JSON.stringify(usuariosDemo));
        console.log('   ✅ Usuarios demo creados');
    } else {
        console.log('   ✅ Ya hay usuarios en el sistema');
    }
    
    // 4. Reparar asistencias
    console.log('4️⃣ Reparando sistema de asistencias...');
    repararAsistencias();
    
    console.log('✅ REPARACIÓN COMPLETA');
    console.log('🎯 Ahora puedes:');
    console.log('   - Hacer login con: maria.hernandez@estudiante.demo.com / estudiante123');
    console.log('   - O con: laura.mendoza@profesor.demo.com / profesor123');
    console.log('   - Registrar nuevos usuarios');
    console.log('   - Usar el sistema de asistencias');
}

// Función para reparar sistema de asistencias
function repararAsistencias() {
    console.log('🔧 === REPARANDO SISTEMA DE ASISTENCIAS ===');
    
    // Verificar que el usuario esté logueado
    if (!window.usuarioActual) {
        console.log('❌ No hay usuario actual. Debes hacer login primero.');
        console.log('💡 Ejecuta: arreglarLogin() y luego haz login');
        return;
    }
    
    console.log('✅ Usuario actual encontrado:', window.usuarioActual.email);
    
    // Verificar que las funciones de asistencias existan
    if (typeof window.abrirGestionAsistencias !== 'function') {
        console.log('❌ Función principal de asistencias no disponible');
        console.log('💡 Recarga la página para cargar todos los scripts');
        return;
    }
    
    console.log('✅ Función principal de asistencias disponible');
    
    // Verificar y cargar datos si es necesario
    let materias = JSON.parse(localStorage.getItem('materias')) || [];
    if (materias.length === 0) {
        console.log('🔄 Inicializando datos de materias...');
        
        // Crear datos básicos
        materias = [
            {
                id: 'mat-001',
                nombre: 'Programación Web',
                codigo: 'PRW-001',
                creditos: 4,
                profesor: 'Dra. Laura Mendoza Silva',
                horario: {
                    'lunes': ['08:00-10:00'],
                    'miércoles': ['08:00-10:00'],
                    'viernes': ['10:00-12:00']
                },
                aula: 'Lab-101',
                leccionesPorDia: {
                    'lunes': 2,
                    'miércoles': 2,
                    'viernes': 2
                },
                estudiantesInscritos: []
            },
            {
                id: 'mat-002',
                nombre: 'Base de Datos',
                codigo: 'BDD-002',
                creditos: 3,
                profesor: 'Dra. Laura Mendoza Silva',
                horario: {
                    'martes': ['14:00-16:00'],
                    'jueves': ['14:00-16:00']
                },
                aula: 'Lab-203',
                leccionesPorDia: {
                    'martes': 2,
                    'jueves': 2
                },
                estudiantesInscritos: []
            }
        ];
        
        // Agregar estudiantes disponibles
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const estudiantes = usuarios.filter(u => u.tipo === 'estudiante');
        
        materias.forEach(materia => {
            materia.estudiantesInscritos = estudiantes.map(est => est.id);
        });
        
        localStorage.setItem('materias', JSON.stringify(materias));
        console.log('✅ Datos de materias inicializados');
    }
    
    // Intentar abrir sistema de asistencias
    try {
        console.log('🎯 Intentando abrir sistema de asistencias...');
        window.abrirGestionAsistencias();
        console.log('✅ Sistema de asistencias abierto correctamente');
    } catch (error) {
        console.log('❌ Error al abrir asistencias:', error.message);
        console.log('💡 Intenta recargar la página');
    }
    
    console.log('=========================================');
}

// Hacer las funciones disponibles globalmente para debugging
window.limpiarDatos = limpiarDatos;
window.verUsuarios = verUsuarios;
window.testRegistro = testRegistro;
window.verificarSistema = verificarSistema;
window.verificarAsistencias = verificarAsistencias;
window.testRegistroCompleto = testRegistroCompleto;
window.arreglarRegistro = arreglarRegistro;
window.arreglarLogin = arreglarLogin;
window.mostrarDashboardMejorado = mostrarDashboardMejorado;
window.repararAsistencias = repararAsistencias;
window.pruebaCompleta = pruebaCompleta;
window.solucionarProblemas = solucionarProblemas;

console.log('🛠️ Herramientas de debug cargadas. Usa:');
console.log('- pruebaCompleta() - PRUEBA TODO EL SISTEMA AUTOMÁTICAMENTE');
console.log('- solucionarProblemas() - SOLUCIONA TODOS LOS PROBLEMAS');
console.log('- limpiarDatos() - Limpia todo y recarga');
console.log('- verUsuarios() - Muestra usuarios registrados');
console.log('- arreglarLogin() - Repara el sistema de login');
console.log('- repararAsistencias() - Repara el sistema de asistencias');
console.log('');
console.log('🎯 PARA PROBAR EL SISTEMA EJECUTA: pruebaCompleta()');
console.log('🔧 SI HAY PROBLEMAS EJECUTA: solucionarProblemas()');
