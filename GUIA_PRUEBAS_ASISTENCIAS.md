# 🎯 Guía Rápida - Probar Sistema de Asistencias

## 🚀 Pasos para Probar

### 1. Abrir el Proyecto
- Abre `index.html` en tu navegador
- Presiona F12 para abrir las herramientas de desarrollador (para ver logs)

### 2. Cargar Datos Demo
1. Haz clic en el botón **"🎮 Usar Demo"** (esquina superior derecha)
2. Verás un mensaje confirmando que se cargaron los datos demo
3. En la consola verás logs como: "Datos demo inicializados..."

### 3. Iniciar Sesión como Profesor
1. Haz clic en **"Iniciar Sesión"**
2. Usa estas credenciales:
   - **Email**: `laura.mendoza@profesor.demo.com`
   - **Contraseña**: `profesor123`
3. Haz clic en **"Iniciar Sesión"**

### 4. Acceder a Asistencias
1. Una vez en el dashboard del profesor
2. En el menú lateral izquierdo, haz clic en **"📋 Asistencias"**
3. Deberías ver la interfaz de gestión de asistencias

### 5. Tomar Asistencia
1. Selecciona una materia (ej: "Programación Web")
2. Elige la fecha de hoy
3. Configura el número de lecciones (ej: 2)
4. Marca presente/ausente para cada estudiante
5. Guarda la asistencia

### 6. Probar como Estudiante
1. Cierra sesión (botón en menú lateral)
2. Inicia sesión con:
   - **Email**: `maria.hernandez@estudiante.demo.com`
   - **Contraseña**: `estudiante123`
3. Ve a **"📅 Asistencias"** en el menú
4. Revisa tu historial de asistencias

## 🛠️ Debug y Solución de Problemas

### Comandos de Debug (en la consola)
```javascript
// Verificar que todo funcione
verificarAsistencias()

// Ver usuarios registrados
verUsuarios()

// Limpiar datos y recargar
limpiarDatos()

// Verificar sistema general
verificarSistema()
```

### ⚠️ Si No Funciona
1. **Abre la consola** (F12 → Console)
2. **Busca errores** en rojo
3. **Ejecuta**: `verificarAsistencias()`
4. **Reporta** qué mensajes aparecen

### 🔍 Qué Deberías Ver

**Como Profesor:**
- Lista de materias asignadas
- Botón "Tomar Asistencia"
- Interfaz para marcar presente/ausente
- Estadísticas de asistencia

**Como Estudiante:**
- Historial de asistencias por materia
- Porcentajes de asistencia
- Fechas y lecciones registradas

## 📊 Datos Demo Incluidos

**Materias:**
- Programación Web (PRW-001)
- Matemáticas Aplicadas (MAT-002)
- Base de Datos (BDD-001)
- Desarrollo Móvil (DM-003)

**Usuarios Demo:**
- 1 Profesor: Laura Mendoza
- 2 Estudiantes: María Hernández, José Luis Rodríguez

---

## 🐞 Solución de Problemas Comunes

### No aparece el menú de Asistencias
- Verifica que iniciaste sesión correctamente
- Refresca la página
- Ejecuta `verificarSistema()` en la consola

### No hay estudiantes en la lista
- Ejecuta `verificarAsistencias()` en la consola
- Verifica que los datos demo se cargaron
- Intenta recargar con `limpiarDatos()`

### Error al tomar asistencia
- Verifica la fecha seleccionada
- Asegúrate de que hay estudiantes inscritos
- Revisa la consola para errores específicos

---

**Si sigues teniendo problemas, revisa la consola y reporta los errores específicos que aparezcan.**
