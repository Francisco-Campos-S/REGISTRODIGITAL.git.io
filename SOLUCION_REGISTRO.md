# 🔧 Solución de Problemas - Sistema de Registro

## ❌ Problema: "El registro no funciona"

### 🔍 Diagnóstico Paso a Paso

#### 1. Abrir Herramientas de Desarrollador
1. Presiona **F12** en tu navegador
2. Ve a la pestaña **"Console"**
3. Deberías ver mensajes como: "🛠️ Herramientas de debug cargadas..."

#### 2. Ejecutar Diagnóstico Completo
En la consola, ejecuta:
```javascript
testRegistroCompleto()
```

Esto verificará:
- ✅ Si los formularios existen
- ✅ Si las funciones de validación están disponibles  
- ✅ Si las notificaciones funcionan
- ✅ Si localStorage funciona

#### 3. Si el Diagnóstico Falla
Ejecuta en la consola:
```javascript
arreglarRegistro()
```

Esto:
- 🔧 Reconfigura los event listeners
- 🔧 Repara las conexiones entre formularios y funciones
- 🔧 Verifica que todo esté conectado correctamente

### 🎯 Pasos para Probar el Registro

#### **Opción 1: Usar Demo (Recomendado)**
1. Haz clic en **"🎮 Usar Demo"** (esquina superior derecha)
2. Ve a **"Iniciar Sesión"**
3. Usa las credenciales demo:
   - **Estudiante**: `maria.hernandez@estudiante.demo.com` / `estudiante123`
   - **Profesor**: `laura.mendoza@profesor.demo.com` / `profesor123`

#### **Opción 2: Registro Manual**
1. Haz clic en **"Registro"** en el menú
2. Selecciona **"Estudiante"** o **"Profesor"**
3. Llena TODOS los campos obligatorios:
   - **Nombre**: Mínimo 2 caracteres
   - **Primer Apellido**: Mínimo 2 caracteres
   - **Cédula**: Formato: 12345678-9
   - **Email**: Formato válido
   - **Teléfono**: Formato válido
   - **Contraseña**: Mínimo 6 caracteres
   - **Carrera/Especialidad**: Seleccionar opción
   - **Semestre**: Seleccionar opción
4. Haz clic en **"Registrar"**

### 🐞 Errores Comunes y Soluciones

#### ❌ "No pasa nada al hacer clic en Registrar"
**Solución:**
```javascript
arreglarRegistro()
```

#### ❌ "Error de validación de cédula"
**Formato correcto:** `12345678-9`
- 8 dígitos, guión, 1 dígito verificador

#### ❌ "Error de validación de teléfono"
**Formatos válidos:**
- `+50612345678`
- `50612345678`
- `12345678`

#### ❌ "Error de validación de email"
**Formato correcto:** `usuario@dominio.com`

#### ❌ "Usuario ya existe"
**Solución:**
- Usa un email diferente
- O ejecuta `limpiarDatos()` para empezar de nuevo

### 🛠️ Comandos de Debug Útiles

```javascript
// Ver todos los usuarios registrados
verUsuarios()

// Limpiar todo y empezar de nuevo
limpiarDatos()

// Verificar que todo funcione
verificarSistema()

// Reparar el sistema de registro
arreglarRegistro()

// Prueba completa del registro
testRegistroCompleto()
```

### 📝 Datos de Prueba Válidos

**Para Estudiante:**
```
Nombre: Juan
Primer Apellido: Pérez
Segundo Apellido: López
Cédula: 12345678-9
Email: juan.perez@test.com
Teléfono: +50612345678
Contraseña: password123
Carrera: Ingeniería en Sistemas
Semestre: 1er Semestre
```

**Para Profesor:**
```
Nombre: Ana
Primer Apellido: García
Segundo Apellido: Rodríguez
Cédula: 98765432-1
Email: ana.garcia@test.com
Teléfono: +50687654321
Contraseña: password123
Especialidad: Programación Web
Experiencia: 5
```

### 🚨 Si Nada Funciona

1. **Refresca la página** (F5)
2. **Ejecuta en la consola:**
   ```javascript
   limpiarDatos()
   ```
3. **Espera a que recargue**
4. **Ejecuta:**
   ```javascript
   arreglarRegistro()
   ```
5. **Intenta registrar de nuevo**

### 📞 Reportar Problema

Si el problema persiste, ejecuta en la consola:
```javascript
verificarSistema()
testRegistroCompleto()
```

Y reporta todos los mensajes que aparezcan en rojo (errores).

---

**💡 Tip:** El botón "🎮 Usar Demo" es la forma más rápida de probar el sistema sin tener que registrar usuarios manualmente.
