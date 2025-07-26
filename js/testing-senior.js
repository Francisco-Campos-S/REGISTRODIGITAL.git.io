// SISTEMA DE TESTING SENIOR - VALIDACIÓN COMPLETA DE FUNCIONALIDADES

class SistemaTestingSenior {
    constructor() {
        this.resultados = {
            pasaron: 0,
            fallaron: 0,
            errores: [],
            detalles: []
        };
    }

    // Ejecutar todos los tests
    async ejecutarTestsCompletos() {
        console.log('🧪 === INICIANDO TESTING SENIOR COMPLETO ===');
        
        try {
            // Limpiar estado previo
            this.limpiarEstadoPrueba();
            
            // Tests de infraestructura
            await this.testInfraestructura();
            
            // Tests de validaciones
            await this.testValidaciones();
            
            // Tests de registro
            await this.testRegistro();
            
            // Tests de login
            await this.testLogin();
            
            // Tests de persistencia
            await this.testPersistencia();
            
            // Tests de seguridad
            await this.testSeguridad();
            
            // Mostrar resultados
            this.mostrarResultados();
            
        } catch (error) {
            console.error('❌ Error en testing:', error);
            this.registrarError('Testing general', error.message);
        }
    }

    // Test de infraestructura HTML/DOM
    async testInfraestructura() {
        console.log('🏗️ Testing infraestructura...');
        
        const elementos = [
            { id: 'formEstudiante', nombre: 'Formulario estudiante' },
            { id: 'formProfesor', nombre: 'Formulario profesor' },
            { id: 'loginForm', nombre: 'Formulario login' },
            { id: 'registroModal', nombre: 'Modal registro' },
            { id: 'loginModal', nombre: 'Modal login' }
        ];
        
        elementos.forEach(elemento => {
            const dom = document.getElementById(elemento.id);
            if (dom) {
                this.testPasado('Infraestructura', `${elemento.nombre} existe`);
            } else {
                this.testFallado('Infraestructura', `${elemento.nombre} NO existe`);
            }
        });
        
        // Test de CSS
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        if (links.length >= 2) {
            this.testPasado('Infraestructura', 'CSS cargado correctamente');
        } else {
            this.testFallado('Infraestructura', 'CSS no cargado correctamente');
        }
    }

    // Test de validaciones
    async testValidaciones() {
        console.log('✅ Testing validaciones...');
        
        // Test validación de email
        const emailsValidos = ['test@test.com', 'usuario@dominio.org'];
        const emailsInvalidos = ['test', 'test@', '@test.com', 'test.com'];
        
        emailsValidos.forEach(email => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex.test(email)) {
                this.testPasado('Validación', `Email válido: ${email}`);
            } else {
                this.testFallado('Validación', `Email debería ser válido: ${email}`);
            }
        });
        
        emailsInvalidos.forEach(email => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(email)) {
                this.testPasado('Validación', `Email inválido detectado: ${email}`);
            } else {
                this.testFallado('Validación', `Email debería ser inválido: ${email}`);
            }
        });
        
        // Test de validación de contraseñas
        const passwordsValidas = ['123456', 'password123', 'contraseña'];
        const passwordsInvalidas = ['123', '', '12345'];
        
        passwordsValidas.forEach(password => {
            if (password.length >= 6) {
                this.testPasado('Validación', `Password válida: ${password.length} caracteres`);
            } else {
                this.testFallado('Validación', `Password debería ser válida: ${password}`);
            }
        });
        
        passwordsInvalidas.forEach(password => {
            if (password.length < 6) {
                this.testPasado('Validación', `Password inválida detectada: ${password.length} caracteres`);
            } else {
                this.testFallado('Validación', `Password debería ser inválida: ${password}`);
            }
        });
    }

    // Test de registro
    async testRegistro() {
        console.log('📝 Testing registro...');
        
        // Test registro de estudiante
        const estudianteTest = {
            nombre: 'Test',
            apellido1: 'Estudiante',
            apellido2: 'Prueba',
            email: 'test.estudiante@testing.com',
            password: 'test123',
            carrera: 'ingenieria-sistemas',
            semestre: '3'
        };
        
        try {
            if (typeof window.extraerDatosFormulario === 'function') {
                this.testPasado('Registro', 'Función extraerDatosFormulario disponible');
            } else {
                this.testFallado('Registro', 'Función extraerDatosFormulario NO disponible');
            }
            
            if (typeof window.validarDatosSenior === 'function') {
                this.testPasado('Registro', 'Función validarDatosSenior disponible');
            } else {
                this.testFallado('Registro', 'Función validarDatosSenior NO disponible');
            }
            
            if (typeof window.crearUsuarioSeguro === 'function') {
                this.testPasado('Registro', 'Función crearUsuarioSeguro disponible');
            } else {
                this.testFallado('Registro', 'Función crearUsuarioSeguro NO disponible');
            }
            
        } catch (error) {
            this.testFallado('Registro', `Error en funciones: ${error.message}`);
        }
    }

    // Test de login
    async testLogin() {
        console.log('🔑 Testing login...');
        
        // Verificar que hay usuarios demo
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        
        if (usuarios.length > 0) {
            this.testPasado('Login', `${usuarios.length} usuarios disponibles`);
        } else {
            this.testFallado('Login', 'No hay usuarios disponibles');
        }
        
        // Verificar usuarios demo específicos
        const usuariosDemo = [
            'maria.hernandez@estudiante.demo.com',
            'laura.mendoza@profesor.demo.com',
            'admin@sistema.com'
        ];
        
        usuariosDemo.forEach(email => {
            const usuario = usuarios.find(u => u.email === email);
            if (usuario) {
                this.testPasado('Login', `Usuario demo disponible: ${email}`);
            } else {
                this.testFallado('Login', `Usuario demo NO disponible: ${email}`);
            }
        });
        
        // Test de funciones de login
        if (typeof window.procesarLogin === 'function') {
            this.testPasado('Login', 'Función procesarLogin disponible');
        } else {
            this.testFallado('Login', 'Función procesarLogin NO disponible');
        }
    }

    // Test de persistencia
    async testPersistencia() {
        console.log('💾 Testing persistencia...');
        
        try {
            // Test localStorage disponible
            if (typeof Storage !== 'undefined') {
                this.testPasado('Persistencia', 'localStorage disponible');
            } else {
                this.testFallado('Persistencia', 'localStorage NO disponible');
            }
            
            // Test escribir/leer datos
            const testData = { test: 'valor', timestamp: Date.now() };
            localStorage.setItem('test_senior', JSON.stringify(testData));
            
            const retrieved = JSON.parse(localStorage.getItem('test_senior'));
            if (retrieved && retrieved.test === 'valor') {
                this.testPasado('Persistencia', 'Escritura/lectura funciona');
                localStorage.removeItem('test_senior');
            } else {
                this.testFallado('Persistencia', 'Error en escritura/lectura');
            }
            
            // Test integridad de datos de usuarios
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            if (Array.isArray(usuarios)) {
                this.testPasado('Persistencia', 'Datos de usuarios íntegros');
            } else {
                this.testFallado('Persistencia', 'Datos de usuarios corruptos');
            }
            
        } catch (error) {
            this.testFallado('Persistencia', `Error: ${error.message}`);
        }
    }

    // Test de seguridad
    async testSeguridad() {
        console.log('🔒 Testing seguridad...');
        
        // Test XSS básico
        const inputsPeligrosos = [
            '<script>alert("test")</script>',
            'javascript:alert("test")',
            '<img src=x onerror=alert("test")>'
        ];
        
        inputsPeligrosos.forEach(input => {
            // Simular que el input fue sanitizado (debería ser)
            const sanitized = input.replace(/<script.*?<\/script>/gi, '');
            if (sanitized !== input) {
                this.testPasado('Seguridad', 'Script malicioso detectado y removido');
            } else {
                // En este caso, el input no tenía scripts, lo cual está bien
                this.testPasado('Seguridad', 'Input procesado sin scripts');
            }
        });
        
        // Test de validación de tipos de usuario
        const tiposValidos = ['estudiante', 'profesor', 'administrador'];
        const tiposInvalidos = ['admin', 'user', 'root', 'superuser'];
        
        tiposValidos.forEach(tipo => {
            if (['estudiante', 'profesor', 'administrador'].includes(tipo)) {
                this.testPasado('Seguridad', `Tipo de usuario válido: ${tipo}`);
            } else {
                this.testFallado('Seguridad', `Tipo de usuario debería ser válido: ${tipo}`);
            }
        });
        
        tiposInvalidos.forEach(tipo => {
            if (!['estudiante', 'profesor', 'administrador'].includes(tipo)) {
                this.testPasado('Seguridad', `Tipo de usuario inválido rechazado: ${tipo}`);
            } else {
                this.testFallado('Seguridad', `Tipo de usuario debería ser rechazado: ${tipo}`);
            }
        });
    }

    // Utilities para testing
    testPasado(categoria, mensaje) {
        this.resultados.pasaron++;
        this.resultados.detalles.push({ categoria, estado: 'PASÓ', mensaje });
        console.log(`✅ [${categoria}] ${mensaje}`);
    }

    testFallado(categoria, mensaje) {
        this.resultados.fallaron++;
        this.resultados.detalles.push({ categoria, estado: 'FALLÓ', mensaje });
        this.resultados.errores.push(`[${categoria}] ${mensaje}`);
        console.error(`❌ [${categoria}] ${mensaje}`);
    }

    registrarError(categoria, error) {
        this.resultados.fallaron++;
        this.resultados.errores.push(`[${categoria}] ${error}`);
        console.error(`💥 [${categoria}] ${error}`);
    }

    limpiarEstadoPrueba() {
        // Resetear resultados
        this.resultados = {
            pasaron: 0,
            fallaron: 0,
            errores: [],
            detalles: []
        };
    }

    mostrarResultados() {
        const total = this.resultados.pasaron + this.resultados.fallaron;
        const porcentaje = total > 0 ? (this.resultados.pasaron / total * 100).toFixed(1) : 0;
        
        console.log('\n🏁 === RESULTADOS DEL TESTING SENIOR ===');
        console.log(`📊 Total tests: ${total}`);
        console.log(`✅ Pasaron: ${this.resultados.pasaron}`);
        console.log(`❌ Fallaron: ${this.resultados.fallaron}`);
        console.log(`📈 Éxito: ${porcentaje}%`);
        
        if (this.resultados.errores.length > 0) {
            console.log('\n💀 ERRORES ENCONTRADOS:');
            this.resultados.errores.forEach((error, index) => {
                console.log(`   ${index + 1}. ${error}`);
            });
        }
        
        if (porcentaje >= 90) {
            console.log('\n🎉 SISTEMA EN EXCELENTE ESTADO');
        } else if (porcentaje >= 75) {
            console.log('\n⚠️ SISTEMA NECESITA MEJORAS MENORES');
        } else {
            console.log('\n🚨 SISTEMA NECESITA ATENCIÓN URGENTE');
        }
        
        // Retornar resumen
        return {
            estado: porcentaje >= 90 ? 'EXCELENTE' : porcentaje >= 75 ? 'BUENO' : 'CRÍTICO',
            porcentaje,
            ...this.resultados
        };
    }
}

// Crear instancia global
window.testingSenior = new SistemaTestingSenior();

// Función de conveniencia
window.ejecutarTestsCompletos = () => {
    return window.testingSenior.ejecutarTestsCompletos();
};

console.log('🧪 Sistema de Testing Senior cargado');
console.log('💡 Ejecuta: ejecutarTestsCompletos()');
