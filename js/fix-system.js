// SOLUCIÓN DIRECTA Y ROBUSTA PARA EL SISTEMA DE REGISTRO Y LOGIN

// 1. FORZAR RECONFIGURACIÓN COMPLETA DEL SISTEMA
function forzarConfiguracionCompleta() {
    console.log('🔧 === FORZANDO CONFIGURACIÓN COMPLETA ===');
    
    // Esperar a que DOM esté completamente cargado
    if (document.readyState !== 'complete') {
        console.log('⏳ Esperando a que termine de cargar...');
        window.addEventListener('load', forzarConfiguracionCompleta);
        return;
    }
    
    // 1. Cargar usuarios demo si no existen
    cargarUsuariosDemo();
    
    // 2. Configurar formularios con event listeners directos
    configurarFormulariosDirectos();
    
    // 3. Configurar botones de modal
    configurarBotonesModales();
    
    // 4. Mostrar estado del sistema
    mostrarEstadoSistema();
    
    console.log('✅ Configuración completa finalizada');
}

// 2. CARGAR USUARIOS DEMO GARANTIZADO (SIN AUTO-INSCRIPCIÓN)
function cargarUsuariosDemo() {
    console.log('👥 Cargando usuarios demo...');
    
    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log(`📊 Usuarios existentes: ${usuariosExistentes.length}`);
    
    // Crear usuarios demo si no existen - SOLO USUARIOS, NO MATERIAS
    const usuariosDemo = [
        {
            id: 'demo-est-001',
            tipo: 'estudiante',
            nombre: 'María José',
            apellido1: 'Hernández',
            apellido2: 'García',
            nombreCompleto: 'María José Hernández García',
            cedula: '11111111-1',
            fechaNacimiento: '2001-03-15',
            email: 'maria.hernandez@estudiante.demo.com',
            telefono: '+50611111111',
            direccion: 'San José, Costa Rica',
            carrera: 'ingenieria-sistemas',
            semestre: '4',
            password: 'estudiante123',
            fechaRegistro: new Date().toISOString(),
            estado: 'activo'
        },
        {
            id: 'demo-prof-001',
            tipo: 'profesor',
            nombre: 'Laura',
            apellido1: 'Mendoza',
            apellido2: 'Silva',
            nombreCompleto: 'Dra. Laura Mendoza Silva',
            cedula: '22222222-2',
            fechaNacimiento: '1980-08-20',
            email: 'laura.mendoza@profesor.demo.com',
            telefono: '+50622222222',
            direccion: 'Cartago, Costa Rica',
            especialidad: 'Ingeniería de Software',
            titulo: 'Doctora en Ciencias de la Computación',
            experiencia: '15',
            password: 'profesor123',
            fechaRegistro: new Date().toISOString(),
            estado: 'activo'
        },
        {
            id: 'demo-admin-001',
            tipo: 'administrador',
            nombre: 'Ana',
            apellido1: 'Rodríguez',
            apellido2: 'López',
            nombreCompleto: 'Ana Rodríguez López',
            cedula: '33333333-3',
            fechaNacimiento: '1985-12-10',
            email: 'admin@sistema.com',
            telefono: '+50633333333',
            direccion: 'San José, Costa Rica',
            password: 'admin123',
            fechaRegistro: new Date().toISOString(),
            estado: 'activo',
            permisos: ['gestionar_usuarios', 'gestionar_materias', 'ver_reportes']
        }
    ];
    
    // Verificar si ya existen y agregarlos si no
    let usuariosActualizados = [...usuariosExistentes];
    let agregados = 0;
    
    usuariosDemo.forEach(demo => {
        const existe = usuariosActualizados.find(u => u.email === demo.email);
        if (!existe) {
            usuariosActualizados.push(demo);
            agregados++;
            console.log(`   ✅ Usuario demo agregado: ${demo.email} (${demo.tipo})`);
        }
    });
    
    if (agregados > 0) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
        console.log(`✅ ${agregados} usuarios demo agregados`);
    } else {
        console.log('✅ Usuarios demo ya existían');
    }
    
    // Actualizar variable global
    window.usuarios = usuariosActualizados;
    
    console.log(`👥 Total usuarios: ${usuariosActualizados.length}`);
    
    // IMPORTANTE: NO crear materias automáticamente
    // Las materias deben ser creadas por los profesores
    console.log('ℹ️ Materias deben ser creadas manualmente por cada profesor');
}

// 3. CONFIGURAR FORMULARIOS CON EVENT LISTENERS DIRECTOS
function configurarFormulariosDirectos() {
    console.log('📝 Configurando formularios directamente...');
    
    // FORMULARIO DE ESTUDIANTE
    const formEstudiante = document.getElementById('formEstudiante');
    if (formEstudiante) {
        // Remover listeners existentes
        const nuevoFormEst = formEstudiante.cloneNode(true);
        formEstudiante.parentNode.replaceChild(nuevoFormEst, formEstudiante);
        
        // Agregar nuevo listener
        nuevoFormEst.onsubmit = function(e) {
            e.preventDefault();
            console.log('📝 FORMULARIO ESTUDIANTE ENVIADO');
            procesarRegistroEstudiante(e);
        };
        
        console.log('✅ Formulario estudiante configurado');
    } else {
        console.error('❌ Formulario estudiante no encontrado');
    }
    
    // FORMULARIO DE PROFESOR
    const formProfesor = document.getElementById('formProfesor');
    if (formProfesor) {
        // Remover listeners existentes
        const nuevoFormProf = formProfesor.cloneNode(true);
        formProfesor.parentNode.replaceChild(nuevoFormProf, formProfesor);
        
        // Agregar nuevo listener
        nuevoFormProf.onsubmit = function(e) {
            e.preventDefault();
            console.log('📝 FORMULARIO PROFESOR ENVIADO');
            procesarRegistroProfesor(e);
        };
        
        console.log('✅ Formulario profesor configurado');
    } else {
        console.error('❌ Formulario profesor no encontrado');
    }
    
    // FORMULARIO DE LOGIN
    const formLogin = document.getElementById('loginForm');
    if (formLogin) {
        // Remover listeners existentes
        const nuevoFormLogin = formLogin.cloneNode(true);
        formLogin.parentNode.replaceChild(nuevoFormLogin, formLogin);
        
        // Agregar nuevo listener
        nuevoFormLogin.onsubmit = function(e) {
            e.preventDefault();
            console.log('🔑 FORMULARIO LOGIN ENVIADO');
            procesarLogin(e);
        };
        
        console.log('✅ Formulario login configurado');
    } else {
        console.error('❌ Formulario login no encontrado');
    }
}

// 4. PROCESAR REGISTRO DE ESTUDIANTE (MEJORADO)
function procesarRegistroEstudiante(e) {
    console.log('👤 === PROCESANDO REGISTRO DE ESTUDIANTE ===');
    
    try {
        const formData = new FormData(e.target);
        
        // Obtener datos del formulario
        const datos = {
            nombre: formData.get('nombre')?.trim() || '',
            apellido1: formData.get('apellido1')?.trim() || '',
            apellido2: formData.get('apellido2')?.trim() || '',
            cedula: formData.get('cedula')?.trim() || '',
            fechaNacimiento: formData.get('fechaNacimiento') || '',
            email: formData.get('email')?.trim() || '',
            telefono: formData.get('telefono')?.trim() || '',
            direccion: formData.get('direccion')?.trim() || '',
            carrera: formData.get('carrera') || '',
            semestre: formData.get('semestre') || '',
            password: formData.get('password') || ''
        };
        
        console.log('📋 Datos recibidos:', datos);
        
        // Validaciones básicas MEJORADAS
        if (!datos.nombre || !datos.apellido1 || !datos.email || !datos.password) {
            mostrarMensaje('❌ Nombre, primer apellido, email y contraseña son obligatorios', 'error');
            return false;
        }
        
        if (datos.password.length < 6) {
            mostrarMensaje('❌ La contraseña debe tener al menos 6 caracteres', 'error');
            return false;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(datos.email)) {
            mostrarMensaje('❌ El formato del email no es válido', 'error');
            return false;
        }
        
        // Verificar si el email ya existe (RECARGAR USUARIOS ACTUALES)
        const usuariosActuales = JSON.parse(localStorage.getItem('usuarios')) || [];
        const emailExiste = usuariosActuales.find(u => u.email.toLowerCase() === datos.email.toLowerCase());
        
        if (emailExiste) {
            mostrarMensaje(`❌ El email ${datos.email} ya está registrado`, 'error');
            return false;
        }
        
        // Crear estudiante - SOLO USUARIO, SIN INSCRIPCIONES AUTOMÁTICAS
        const estudiante = {
            id: 'est_' + Date.now(),
            tipo: 'estudiante',
            ...datos,
            nombreCompleto: `${datos.nombre} ${datos.apellido1}${datos.apellido2 ? ' ' + datos.apellido2 : ''}`,
            fechaRegistro: new Date().toISOString(),
            estado: 'activo'
            // NO inscribir automáticamente a materias
        };
        
        console.log('👤 Estudiante creado:', estudiante);
        
        // Guardar SOLO el usuario en localStorage
        usuariosActuales.push(estudiante);
        localStorage.setItem('usuarios', JSON.stringify(usuariosActuales));
        window.usuarios = usuariosActuales;
        
        console.log('💾 Usuario guardado en localStorage');
        console.log('ℹ️ IMPORTANTE: Estudiante debe inscribirse a materias después');
        
        // Mostrar éxito con instrucciones
        mostrarMensaje('✅ Estudiante registrado. Debe inscribirse a materias después del login.', 'success');
        
        // Limpiar formulario
        e.target.reset();
        
        // Cerrar modal después de un momento
        setTimeout(() => {
            cerrarModal('registroModal');
        }, 2000);
        
        return true;
        
    } catch (error) {
        console.error('❌ Error procesando registro:', error);
        mostrarMensaje('❌ Error al registrar. Verifica todos los campos.', 'error');
        return false;
    }
}

// 5. PROCESAR REGISTRO DE PROFESOR (MEJORADO)
function procesarRegistroProfesor(e) {
    console.log('👨‍🏫 === PROCESANDO REGISTRO DE PROFESOR ===');
    
    try {
        const formData = new FormData(e.target);
        
        // Obtener datos del formulario
        const datos = {
            nombre: formData.get('nombre')?.trim() || '',
            apellido1: formData.get('apellido1')?.trim() || '',
            apellido2: formData.get('apellido2')?.trim() || '',
            cedula: formData.get('cedula')?.trim() || '',
            fechaNacimiento: formData.get('fechaNacimiento') || '',
            email: formData.get('email')?.trim() || '',
            telefono: formData.get('telefono')?.trim() || '',
            direccion: formData.get('direccion')?.trim() || '',
            especialidad: formData.get('especialidad')?.trim() || '',
            titulo: formData.get('titulo')?.trim() || '',
            experiencia: formData.get('experiencia') || '',
            password: formData.get('password') || ''
        };
        
        console.log('📋 Datos recibidos:', datos);
        
        // Validaciones básicas MEJORADAS
        if (!datos.nombre || !datos.apellido1 || !datos.email || !datos.password) {
            mostrarMensaje('❌ Nombre, primer apellido, email y contraseña son obligatorios', 'error');
            return false;
        }
        
        if (datos.password.length < 6) {
            mostrarMensaje('❌ La contraseña debe tener al menos 6 caracteres', 'error');
            return false;
        }
        
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(datos.email)) {
            mostrarMensaje('❌ El formato del email no es válido', 'error');
            return false;
        }
        
        // Verificar si el email ya existe (RECARGAR USUARIOS ACTUALES)
        const usuariosActuales = JSON.parse(localStorage.getItem('usuarios')) || [];
        const emailExiste = usuariosActuales.find(u => u.email.toLowerCase() === datos.email.toLowerCase());
        
        if (emailExiste) {
            mostrarMensaje(`❌ El email ${datos.email} ya está registrado`, 'error');
            return false;
        }
        
        // Crear profesor - SIN MATERIAS NI ESTUDIANTES AUTOMÁTICOS
        const profesor = {
            id: 'prof_' + Date.now(),
            tipo: 'profesor',
            ...datos,
            nombreCompleto: `${datos.titulo ? datos.titulo + ' ' : ''}${datos.nombre} ${datos.apellido1}${datos.apellido2 ? ' ' + datos.apellido2 : ''}`,
            fechaRegistro: new Date().toISOString(),
            estado: 'activo'
            // NO agregar materias ni estudiantes automáticamente
            // El profesor debe crear sus materias después del login
        };
        
        console.log('👨‍🏫 Profesor creado:', profesor);
        
        // Guardar SOLO el usuario en localStorage
        usuariosActuales.push(profesor);
        localStorage.setItem('usuarios', JSON.stringify(usuariosActuales));
        window.usuarios = usuariosActuales;
        
        console.log('💾 Usuario guardado en localStorage');
        console.log('ℹ️ IMPORTANTE: Profesor debe crear sus materias después del login');
        
        // Mostrar éxito con instrucciones claras
        mostrarMensaje('✅ Profesor registrado. Debe crear materias e inscribir estudiantes después del login.', 'success');
        
        // Limpiar formulario
        e.target.reset();
        
        // Cerrar modal después de un momento
        setTimeout(() => {
            cerrarModal('registroModal');
        }, 3000); // Más tiempo para leer el mensaje
        
        return true;
        
    } catch (error) {
        console.error('❌ Error procesando registro:', error);
        mostrarMensaje('❌ Error al registrar. Verifica todos los campos.', 'error');
        return false;
    }
}

// 6. PROCESAR LOGIN (MEJORADO)
function procesarLogin(e) {
    console.log('🔑 === PROCESANDO LOGIN ===');
    
    try {
        const formData = new FormData(e.target);
        
        const datos = {
            email: formData.get('email')?.trim() || '',
            password: formData.get('password') || '',
            userType: formData.get('userType') || ''
        };
        
        console.log('📋 Datos de login:', { email: datos.email, userType: datos.userType });
        
        // Validaciones básicas
        if (!datos.email || !datos.password || !datos.userType) {
            mostrarMensaje('❌ Todos los campos son obligatorios', 'error');
            return false;
        }
        
        // Obtener usuarios ACTUALES (recargar desde localStorage)
        const usuariosActuales = JSON.parse(localStorage.getItem('usuarios')) || [];
        console.log(`👥 Buscando entre ${usuariosActuales.length} usuarios registrados`);
        
        // Buscar usuario (case insensitive para email)
        const usuario = usuariosActuales.find(u => 
            u.email.toLowerCase() === datos.email.toLowerCase() && 
            u.password === datos.password && 
            u.tipo === datos.userType
        );
        
        if (usuario) {
            console.log('✅ Usuario encontrado:', usuario.email);
            
            // Verificar que el usuario esté activo
            if (usuario.estado !== 'activo') {
                mostrarMensaje('❌ La cuenta está inactiva. Contacta al administrador.', 'error');
                return false;
            }
            
            // Guardar sesión
            window.usuarioActual = usuario;
            localStorage.setItem('usuarioActual', JSON.stringify(usuario));
            
            // Mostrar éxito
            const tipoCapitalizado = usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1);
            mostrarMensaje(`✅ Bienvenido, ${usuario.nombreCompleto} (${tipoCapitalizado})`, 'success');
            
            // Cerrar modal y mostrar dashboard
            setTimeout(() => {
                cerrarModal('loginModal');
                setTimeout(() => {
                    mostrarDashboardMejorado(usuario);
                }, 1000);
            }, 1500);
            
            return true;
            
        } else {
            console.log('❌ Usuario no encontrado o credenciales incorrectas');
            console.log('📋 Usuarios disponibles para debug:');
            usuariosActuales.forEach(u => {
                console.log(`   - ${u.email} (${u.tipo}) - Estado: ${u.estado}`);
            });
            
            mostrarMensaje('❌ Email, contraseña o tipo de usuario incorrectos', 'error');
            return false;
        }
        
    } catch (error) {
        console.error('❌ Error procesando login:', error);
        mostrarMensaje('❌ Error al iniciar sesión. Intenta de nuevo.', 'error');
        return false;
    }
}

// 7. MOSTRAR MENSAJE (SIMPLE Y DIRECTO)
function mostrarMensaje(mensaje, tipo) {
    console.log(`📢 ${mensaje}`);
    
    // Crear o usar notificación existente
    let notificacion = document.getElementById('notificacion-fix');
    
    if (!notificacion) {
        notificacion = document.createElement('div');
        notificacion.id = 'notificacion-fix';
        notificacion.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            max-width: 300px;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(notificacion);
    }
    
    // Configurar estilos según el tipo
    if (tipo === 'success') {
        notificacion.style.backgroundColor = '#28a745';
    } else if (tipo === 'error') {
        notificacion.style.backgroundColor = '#dc3545';
    } else {
        notificacion.style.backgroundColor = '#007bff';
    }
    
    notificacion.textContent = mensaje;
    notificacion.style.display = 'block';
    
    // Ocultar después de 3 segundos
    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 3000);
}

// 8. CERRAR MODAL
function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        console.log(`✅ Modal ${modalId} cerrado`);
    }
}

// 9. DASHBOARD MEJORADO SEGÚN TIPO DE USUARIO
function mostrarDashboardMejorado(usuario) {
    console.log('🎯 === MOSTRANDO DASHBOARD MEJORADO ===');
    console.log(`👤 Usuario: ${usuario.email} (${usuario.tipo})`);
    
    // Ocultar contenido principal
    const elementsToHide = ['.header', '.hero', '.about', 'footer', '.modal'];
    elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => el.style.display = 'none');
    });
    
    // Crear dashboard específico
    let dashboard = document.getElementById('dashboard-mejorado');
    if (!dashboard) {
        dashboard = document.createElement('div');
        dashboard.id = 'dashboard-mejorado';
        dashboard.style.cssText = `
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            min-height: 100vh;
            background: #f8f9fa;
        `;
        document.body.appendChild(dashboard);
    }
    
    // Contenido específico según tipo de usuario
    let contenidoEspecifico = '';
    
    if (usuario.tipo === 'estudiante') {
        contenidoEspecifico = `
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
                <h3 style="color: #007bff; margin: 0 0 15px 0;">📚 Panel de Estudiante</h3>
                <p><strong>Carrera:</strong> ${usuario.carrera || 'No especificada'}</p>
                <p><strong>Semestre:</strong> ${usuario.semestre || 'No especificado'}</p>
                <div style="margin-top: 15px;">
                    <h4>Próximas funciones:</h4>
                    <ul>
                        <li>📋 Ver materias disponibles</li>
                        <li>✏️ Inscribirse a materias</li>
                        <li>📊 Ver calificaciones</li>
                        <li>📅 Ver horarios de clase</li>
                        <li>📈 Seguimiento de asistencia</li>
                    </ul>
                </div>
            </div>
        `;
    } else if (usuario.tipo === 'profesor') {
        contenidoEspecifico = `
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
                <h3 style="color: #28a745; margin: 0 0 15px 0;">👨‍🏫 Panel de Profesor</h3>
                <p><strong>Especialidad:</strong> ${usuario.especialidad || 'No especificada'}</p>
                <p><strong>Título:</strong> ${usuario.titulo || 'No especificado'}</p>
                <p><strong>Experiencia:</strong> ${usuario.experiencia || 'No especificada'} años</p>
                <div style="margin-top: 15px;">
                    <h4>Próximas funciones:</h4>
                    <ul>
                        <li>📚 Crear y gestionar materias</li>
                        <li>👥 Inscribir estudiantes a materias</li>
                        <li>📊 Registrar calificaciones</li>
                        <li>📅 Gestionar horarios</li>
                        <li>📈 Control de asistencias</li>
                        <li>📝 Generar reportes</li>
                    </ul>
                </div>
            </div>
        `;
    } else if (usuario.tipo === 'administrador') {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const totalEstudiantes = usuarios.filter(u => u.tipo === 'estudiante').length;
        const totalProfesores = usuarios.filter(u => u.tipo === 'profesor').length;
        
        contenidoEspecifico = `
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
                <h3 style="color: #dc3545; margin: 0 0 15px 0;">⚙️ Panel de Administrador</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                    <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; text-align: center;">
                        <h4 style="margin: 0; color: #1565c0;">👥 Usuarios</h4>
                        <p style="margin: 5px 0; font-size: 24px; font-weight: bold;">${usuarios.length}</p>
                    </div>
                    <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; text-align: center;">
                        <h4 style="margin: 0; color: #2e7d32;">👨‍🏫 Profesores</h4>
                        <p style="margin: 5px 0; font-size: 24px; font-weight: bold;">${totalProfesores}</p>
                    </div>
                    <div style="background: #fff3e0; padding: 15px; border-radius: 8px; text-align: center;">
                        <h4 style="margin: 0; color: #ef6c00;">🎓 Estudiantes</h4>
                        <p style="margin: 5px 0; font-size: 24px; font-weight: bold;">${totalEstudiantes}</p>
                    </div>
                </div>
                <div style="margin-top: 15px;">
                    <h4>Funciones de administrador:</h4>
                    <ul>
                        <li>👥 Gestionar usuarios (crear, editar, eliminar)</li>
                        <li>📚 Supervisar materias y asignaciones</li>
                        <li>📊 Ver reportes del sistema</li>
                        <li>⚙️ Configurar sistema</li>
                        <li>🔒 Gestionar permisos</li>
                    </ul>
                </div>
            </div>
        `;
    }
    
    dashboard.innerHTML = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 20px; text-align: center;">
            <h1 style="margin: 0 0 10px 0; font-size: 2.5em;">✅ Sistema Funcionando Correctamente</h1>
            <h2 style="margin: 0; opacity: 0.9;">Bienvenido, ${usuario.nombreCompleto}</h2>
            <p style="margin: 10px 0 0 0; opacity: 0.8;">
                <strong>Email:</strong> ${usuario.email} | 
                <strong>Tipo:</strong> ${usuario.tipo.charAt(0).toUpperCase() + usuario.tipo.slice(1)} |
                <strong>Estado:</strong> ${usuario.estado.charAt(0).toUpperCase() + usuario.estado.slice(1)}
            </p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            ${contenidoEspecifico}
            
            <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="color: #17a2b8; margin: 0 0 15px 0;">� Sistema</h3>
                <div style="margin-bottom: 15px;">
                    <p><strong>✅ Registro:</strong> Funcionando</p>
                    <p><strong>✅ Login:</strong> Funcionando</p>
                    <p><strong>✅ Validaciones:</strong> Activas</p>
                    <p><strong>✅ Base de datos:</strong> LocalStorage</p>
                </div>
                
                <h4 style="margin: 15px 0 10px 0;">Credenciales Demo:</h4>
                <div style="font-size: 0.9em; background: #f8f9fa; padding: 10px; border-radius: 5px;">
                    <p style="margin: 5px 0;"><strong>Estudiante:</strong><br>
                    📧 maria.hernandez@estudiante.demo.com<br>
                    🔒 estudiante123</p>
                    
                    <p style="margin: 5px 0;"><strong>Profesor:</strong><br>
                    📧 laura.mendoza@profesor.demo.com<br>
                    🔒 profesor123</p>
                    
                    <p style="margin: 5px 0;"><strong>Admin:</strong><br>
                    📧 admin@sistema.com<br>
                    🔒 admin123</p>
                </div>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <button onclick="cerrarSesionMejorado()" style="background: #dc3545; color: white; border: none; padding: 12px 25px; border-radius: 5px; cursor: pointer; margin-right: 15px; font-size: 16px;">
                🚪 Cerrar Sesión
            </button>
            <button onclick="volverAlInicio()" style="background: #6c757d; color: white; border: none; padding: 12px 25px; border-radius: 5px; cursor: pointer; font-size: 16px;">
                🏠 Volver al Inicio
            </button>
        </div>
    `;
    
    console.log('✅ Dashboard mejorado mostrado');
}

// 10. FUNCIONES AUXILIARES MEJORADAS
function cerrarSesionMejorado() {
    console.log('🚪 Cerrando sesión...');
    
    // Limpiar datos de sesión
    window.usuarioActual = null;
    localStorage.removeItem('usuarioActual');
    
    // Mostrar mensaje
    mostrarMensaje('✅ Sesión cerrada correctamente', 'success');
    
    // Recargar página después de un momento
    setTimeout(() => {
        location.reload();
    }, 1500);
}

function volverAlInicio() {
    console.log('🏠 Volviendo al inicio...');
    location.reload();
}

// 11. FUNCIÓN PARA MOSTRAR ESTADÍSTICAS DEL SISTEMA
function mostrarEstadisticasSistema() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const materias = JSON.parse(localStorage.getItem('materias')) || [];
    const asistencias = JSON.parse(localStorage.getItem('asistencias')) || [];
    
    const stats = {
        usuarios: {
            total: usuarios.length,
            estudiantes: usuarios.filter(u => u.tipo === 'estudiante').length,
            profesores: usuarios.filter(u => u.tipo === 'profesor').length,
            administradores: usuarios.filter(u => u.tipo === 'administrador').length
        },
        materias: materias.length,
        asistencias: asistencias.length
    };
    
    console.log('📊 Estadísticas del sistema:', stats);
    return stats;
}

// 11. CONFIGURAR BOTONES DE MODAL
function configurarBotonesModales() {
    // Botones para abrir modales
    const btnRegistro = document.getElementById('btnRegistro');
    const btnLogin = document.getElementById('btnLogin');
    
    if (btnRegistro) {
        btnRegistro.onclick = () => abrirModal('registroModal');
    }
    
    if (btnLogin) {
        btnLogin.onclick = () => abrirModal('loginModal');
    }
    
    // Botones para cerrar modales
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(btn => {
        btn.onclick = (e) => {
            const modal = e.target.closest('.modal');
            if (modal) cerrarModal(modal.id);
        };
    });
    
    console.log('✅ Botones de modal configurados');
}

function abrirModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        console.log(`✅ Modal ${modalId} abierto`);
    }
}

// 12. MOSTRAR ESTADO DEL SISTEMA
function mostrarEstadoSistema() {
    console.log('📊 === ESTADO DEL SISTEMA ===');
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    console.log(`👥 Total usuarios: ${usuarios.length}`);
    
    usuarios.forEach((u, i) => {
        console.log(`   ${i + 1}. ${u.email} (${u.tipo})`);
    });
    
    const formularios = ['formEstudiante', 'formProfesor', 'loginForm'];
    formularios.forEach(id => {
        const form = document.getElementById(id);
        console.log(`📝 ${id}: ${form ? 'Encontrado' : 'NO encontrado'}`);
    });
    
    console.log('================================');
}

// 13. AUTO-INICIALIZACIÓN
console.log('🚀 Sistema de reparación cargado');
console.log('💡 Ejecuta: forzarConfiguracionCompleta()');

// Hacer funciones disponibles globalmente
window.forzarConfiguracionCompleta = forzarConfiguracionCompleta;
window.cargarUsuariosDemo = cargarUsuariosDemo;
window.mostrarEstadoSistema = mostrarEstadoSistema;
window.procesarRegistroEstudiante = procesarRegistroEstudiante;
window.procesarRegistroProfesor = procesarRegistroProfesor;
window.procesarLogin = procesarLogin;
window.cerrarSesionMejorado = cerrarSesionMejorado;
window.mostrarDashboardMejorado = mostrarDashboardMejorado;
window.mostrarEstadisticasSistema = mostrarEstadisticasSistema;
window.volverAlInicio = volverAlInicio;

// Ejecutar automáticamente cuando esté listo
if (document.readyState === 'complete') {
    setTimeout(forzarConfiguracionCompleta, 1000);
} else {
    window.addEventListener('load', () => {
        setTimeout(forzarConfiguracionCompleta, 1000);
    });
}

console.log('🎯 === SISTEMA FIX CARGADO ===');
console.log('✅ Registro separado por tipos de usuario');
console.log('✅ NO inscripción automática a materias');
console.log('✅ Validaciones mejoradas');
console.log('✅ Dashboard específico por tipo de usuario');
console.log('✅ Sistema de administrador incluido');
console.log('');
console.log('👥 Usuarios demo disponibles:');
console.log('   📧 maria.hernandez@estudiante.demo.com / estudiante123 (Estudiante)');
console.log('   📧 laura.mendoza@profesor.demo.com / profesor123 (Profesor)');
console.log('   📧 admin@sistema.com / admin123 (Administrador)');
console.log('');
console.log('🔧 Para debugging: mostrarEstadisticasSistema()');
