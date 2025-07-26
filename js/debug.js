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

// Hacer las funciones disponibles globalmente para debugging
window.limpiarDatos = limpiarDatos;
window.verUsuarios = verUsuarios;
window.testRegistro = testRegistro;
window.verificarSistema = verificarSistema;

console.log('🛠️ Herramientas de debug cargadas. Usa:');
console.log('- limpiarDatos() - Limpia todo y recarga');
console.log('- verUsuarios() - Muestra usuarios registrados');
console.log('- testRegistro() - Prueba el registro');
console.log('- verificarSistema() - Verifica que todo funcione');
