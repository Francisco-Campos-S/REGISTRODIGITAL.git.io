# 🧪 Guía de Prueba del Sistema

## 🎯 Instrucciones Simples para Probar

### 1. Abrir el Proyecto
1. Abre `index.html` en tu navegador
2. Presiona **F12** para abrir la consola

### 2. Ejecutar Prueba Automática
En la consola, copia y pega este comando:

```javascript
pruebaCompleta()
```

Esto probará **automáticamente**:
- ✅ Carga de formularios
- ✅ Funciones de registro y login
- ✅ Datos demo
- ✅ Validaciones
- ✅ Guardado en localStorage
- ✅ Sistema completo

### 3. Si Hay Problemas
Si la prueba muestra errores, ejecuta:

```javascript
solucionarProblemas()
```

Esto **reparará automáticamente**:
- 🔧 Sistema de registro
- 🔧 Sistema de login
- 🔧 Datos demo
- 🔧 Sistema de asistencias

### 4. Probar Manualmente

#### **Opción A: Usar Datos Demo**
1. Haz clic en **"🎮 Usar Demo"** (botón arriba derecha)
2. Ve a **"Iniciar Sesión"**
3. Usa estas credenciales:
   - **Email**: `maria.hernandez@estudiante.demo.com`
   - **Contraseña**: `estudiante123`
   - **Tipo**: Estudiante

#### **Opción B: Registrar Usuario Nuevo**
1. Haz clic en **"Registro"**
2. Selecciona **"Estudiante"**
3. Llena todos los campos:
   - **Nombre**: Ana
   - **Primer Apellido**: García
   - **Cédula**: 12345678-9
   - **Email**: ana.garcia@test.com
   - **Teléfono**: +50612345678
   - **Contraseña**: password123
   - **Carrera**: Ingeniería en Sistemas
   - **Semestre**: 1er Semestre
4. Haz clic en **"Registrar Estudiante"**

### 5. Verificar Resultados

#### **En la Consola verás:**
```
✅ SISTEMA FUNCIONANDO CORRECTAMENTE
📊 Total usuarios: X
👤 Usuario logueado: email@usuario.com
```

#### **En la Interfaz verás:**
- Notificaciones de éxito/error
- Dashboard del usuario (si login es exitoso)
- Formularios que responden correctamente

### 6. Probar Sistema de Asistencias

Una vez logueado:
1. Ve a **"Asistencias"** en el menú lateral
2. Si hay error, ejecuta en consola: `repararAsistencias()`

## 🔍 Comandos de Debug Útiles

```javascript
// Prueba completa automática
pruebaCompleta()

// Solución automática de problemas
solucionarProblemas()

// Ver usuarios registrados
verUsuarios()

// Verificar estado actual
console.log('Usuarios:', JSON.parse(localStorage.getItem('usuarios')))
console.log('Usuario actual:', window.usuarioActual)

// Limpiar todo y empezar de nuevo
limpiarDatos()
```

## ❌ Problemas Comunes y Soluciones

### "No pasa nada al registrar"
```javascript
solucionarProblemas()
```

### "No pasa nada al hacer login"
```javascript
solucionarProblemas()
```

### "Error en asistencias"
```javascript
repararAsistencias()
```

### "Todo está roto"
```javascript
limpiarDatos()
// Esperar a que recargue, luego:
solucionarProblemas()
```

## 📊 Resultados Esperados

### **Si Todo Funciona:**
- ✅ `pruebaCompleta()` muestra "SISTEMA FUNCIONANDO CORRECTAMENTE"
- ✅ Puedes registrar usuarios nuevos
- ✅ Puedes hacer login con demo o usuarios nuevos
- ✅ El dashboard aparece después del login
- ✅ El sistema de asistencias funciona

### **Si Hay Problemas:**
- ❌ `pruebaCompleta()` muestra "SISTEMA CON PROBLEMAS"
- ❌ Los formularios no responden
- ❌ Login/registro no funciona
- ❌ Aparecen errores en la consola

**En este caso, ejecutar `solucionarProblemas()` debería arreglar todo.**

---

## 🎯 TL;DR (Muy Rápido)

1. Abre proyecto en navegador
2. Presiona F12
3. Ejecuta: `pruebaCompleta()`
4. Si hay errores: `solucionarProblemas()`
5. Prueba login/registro manualmente

**¡Eso es todo!** 🚀
