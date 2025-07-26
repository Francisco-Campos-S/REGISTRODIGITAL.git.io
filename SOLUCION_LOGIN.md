# 🔑 Solución de Problemas - Sistema de Login

## ❌ Problema: "Al iniciar sesión no hace nada"

### 🔍 Diagnóstico Rápido

#### 1. Abrir Herramientas de Desarrollador
1. Presiona **F12** en tu navegador
2. Ve a la pestaña **"Console"**
3. Busca mensajes de error en rojo

#### 2. Ejecutar Reparación Automática
En la consola, ejecuta:
```javascript
arreglarLogin()
```

Esto:
- 🔧 Reconfigura el event listener del formulario de login
- 🔧 Verifica que todas las funciones estén disponibles
- 🔧 Usa un dashboard mejorado que no rompe los scripts

### 🎯 Pasos para Probar el Login

#### **Opción 1: Usar Credenciales Demo**

**Como Estudiante:**
- Email: `maria.hernandez@estudiante.demo.com`
- Contraseña: `estudiante123`
- Tipo: Estudiante

**Como Profesor:**
- Email: `laura.mendoza@profesor.demo.com`
- Contraseña: `profesor123`
- Tipo: Profesor

#### **Opción 2: Cargar Datos Demo Primero**
1. Haz clic en **"🎮 Usar Demo"** (esquina superior derecha)
2. Luego intenta hacer login con las credenciales de arriba

### 🛠️ Soluciones por Problema Específico

#### ❌ "No pasa nada al hacer clic en Iniciar Sesión"
```javascript
arreglarLogin()
```

#### ❌ "Credenciales incorrectas" (pero sabes que están bien)
```javascript
// Ver qué usuarios están disponibles
verUsuarios()

// Limpiar datos y recargar demo
limpiarDatos()
```

#### ❌ "La página se rompe después del login"
```javascript
// Usar dashboard mejorado
mostrarDashboardMejorado()
```

#### ❌ "El dashboard no aparece"
```javascript
// Verificar usuario actual
console.log(window.usuarioActual)

// Si no hay usuario, hacer login manual
window.usuarioActual = {
    email: "maria.hernandez@estudiante.demo.com",
    tipo: "estudiante",
    nombre: "María José",
    nombreCompleto: "María José Hernández García"
}
mostrarDashboardMejorado()
```

### 🔧 Comandos de Debug Útiles

```javascript
// Reparar sistema de login
arreglarLogin()

// Reparar sistema de asistencias
repararAsistencias()

// Ver usuarios registrados
verUsuarios()

// Verificar sistema completo
verificarSistema()

// Mostrar dashboard manualmente
mostrarDashboardMejorado()

// Limpiar todo y empezar de nuevo
limpiarDatos()
```

### ❌ Problema Específico: "crearInterfazEstudiante is not defined"

Si al ir a Asistencias aparece este error:

```javascript
// Ejecutar en la consola:
repararAsistencias()
```

Esto:
- ✅ Verifica que el usuario esté logueado
- ✅ Inicializa datos de materias si es necesario
- ✅ Repara el sistema de asistencias
- ✅ Abre la interfaz correctamente

### 📝 Login Manual de Emergencia

Si nada funciona, puedes hacer login manualmente:

```javascript
// Establecer usuario actual
window.usuarioActual = {
    email: "maria.hernandez@estudiante.demo.com",
    tipo: "estudiante", 
    nombre: "María José",
    nombreCompleto: "María José Hernández García"
}

// Mostrar dashboard
mostrarDashboardMejorado()
```

### 🔍 Verificar Estado del Sistema

Para ver exactamente qué está pasando:

```javascript
// 1. Ver si hay usuarios cargados
const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
console.log('Usuarios disponibles:', usuarios.length)

// 2. Ver detalles de los usuarios
usuarios.forEach(u => console.log(`${u.email} - ${u.tipo}`))

// 3. Verificar formulario de login
const form = document.getElementById('loginForm')
console.log('Formulario de login:', form ? 'Encontrado' : 'NO encontrado')

// 4. Verificar funciones necesarias
console.log('iniciarSesion:', typeof iniciarSesion)
console.log('mostrarNotificacion:', typeof mostrarNotificacion)
console.log('closeModal:', typeof closeModal)
```

### 🚨 Solución de Emergencia

Si absolutamente nada funciona:

1. **Refresca la página** (F5)
2. **Ejecuta en orden:**
   ```javascript
   limpiarDatos()
   // Espera a que recargue, luego:
   arreglarLogin()
   // Intenta login de nuevo
   ```

### 🎮 Flujo Completo Recomendado

1. **Abrir proyecto** en navegador
2. **Presionar F12** para abrir consola
3. **Ejecutar:** `arreglarLogin()`
4. **Hacer clic en:** "🎮 Usar Demo"
5. **Ir a:** "Iniciar Sesión"
6. **Usar credenciales demo** de estudiante o profesor
7. **Si no funciona:** ejecutar `verUsuarios()` para ver qué usuarios hay

### 📊 Datos Demo Garantizados

Después de hacer clic en "🎮 Usar Demo", estos usuarios estarán disponibles:

- **maria.hernandez@estudiante.demo.com** / estudiante123 (Estudiante)
- **jose.rodriguez@estudiante.demo.com** / estudiante123 (Estudiante)  
- **laura.mendoza@profesor.demo.com** / profesor123 (Profesor)
- **roberto.vega@profesor.demo.com** / profesor123 (Profesor)

---

**💡 Tip:** La función `arreglarLogin()` resuelve el 90% de los problemas de login. Úsala siempre primero.
