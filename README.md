# RegistroDigital - Sistema de Registro Académico

Un sistema completo de registro académico inspirado en RegistraProfe, desarrollado con tecnologías web modernas para la gestión de estudiantes y profesores en instituciones educativas.

## 🌐 **Demo en Vivo**

**[Ver Demo en GitHub Pages](https://francisco-campos-s.github.io/REGISTRODIGITAL.git.io/)**

### 🔑 Credenciales de Prueba

#### Estudiante
- **Email:** `maria.hernandez@estudiante.demo.com`
- **Contraseña:** `estudiante123`

#### Profesor  
- **Email:** `laura.mendoza@profesor.demo.com`
- **Contraseña:** `profesor123`

#### Administrador
- **Email:** `admin@demo.com`
- **Contraseña:** `admin123`

## 🚀 Características

### ✨ Funcionalidades Principales
- **Registro de Usuarios**: Sistema completo para estudiantes y profesores
- **Dashboard Interactivo**: Panel de control personalizado por tipo de usuario
- **Gestión de Materias**: Inscripción y administración de asignaturas
- **Control de Horarios**: Visualización y gestión de horarios académicos
- **Sistema de Notificaciones**: Alertas y mensajes en tiempo real
- **Diseño Responsive**: Compatible con dispositivos móviles y desktop

### 👥 Tipos de Usuario
- **Estudiantes**: Registro, consulta de materias, horarios
- **Profesores**: Gestión de clases, estudiantes, evaluaciones
- **Administradores**: Control total del sistema

### 🛡️ Seguridad
- Validación de datos en frontend y backend
- Autenticación segura con hash de contraseñas
- Protección contra inyección SQL
- Tokens JWT para sesiones seguras

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Diseño moderno con Flexbox y Grid
- **JavaScript**: Interactividad y validaciones
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía (Poppins)

### Backend (Opcional)
- **PHP 7.4+**: Lógica del servidor
- **MySQL 8.0+**: Base de datos relacional
- **PDO**: Abstracción de base de datos
- **JWT**: Autenticación basada en tokens

## 📦 Estructura del Proyecto

```
REGISTRODIGITAL/
├── index.html                 # Página principal
├── css/
│   ├── styles.css            # Estilos principales
│   └── dashboard.css         # Estilos del dashboard
├── js/
│   ├── script.js             # JavaScript principal
│   └── dashboard.js          # JavaScript del dashboard
├── php/
│   └── api.php               # API REST backend
├── database/
│   └── schema.sql            # Estructura de base de datos
└── README.md                 # Este archivo
```

## 🚀 Instalación y Configuración

### 🌐 Despliegue en GitHub Pages

#### Pasos para Desplegar:

1. **Fork o Clonar el Repositorio**
   ```bash
   git clone https://github.com/Francisco-Campos-S/Generador_Carnets_CTP.git.io.git
   cd Generador_Carnets_CTP.git.io
   ```

2. **Configurar GitHub Pages**
   - Ve a Settings → Pages en tu repositorio
   - Selecciona "Deploy from a branch"
   - Elige "main" o "master" branch
   - Folder: "/ (root)"
   - Click "Save"

3. **Personalizar la URL**
   - Actualiza `_config.yml` con tu información:
   ```yaml
   url: "https://tu-usuario.github.io"
   baseurl: "/tu-repositorio"
   ```

4. **Verificar Despliegue**
   - El sitio estará disponible en: `https://tu-usuario.github.io/tu-repositorio`
   - GitHub enviará un email cuando esté listo

#### Funcionalidades Específicas para GitHub Pages:

- ✅ **Datos de Demo Precargados**: Usuarios y datos de ejemplo automáticos
- ✅ **Detección Automática**: El sistema detecta si está en GitHub Pages
- ✅ **Rutas Optimizadas**: URLs ajustadas automáticamente
- ✅ **Demo Rápido**: Botón para acceso inmediato al sistema
- ✅ **Credenciales Visibles**: Información de acceso mostrada en pantalla

### Opción 1: Solo Frontend (LocalStorage) - Recomendado para GitHub Pages

1. **Clonar o descargar el proyecto**
   ```bash
   git clone <url-del-repositorio>
   cd REGISTRODIGITAL
   ```

2. **Abrir en navegador**
   - Simplemente abre `index.html` en tu navegador web
   - No requiere servidor web (funciona con LocalStorage)

### Opción 2: Frontend + Backend (Base de Datos)

#### Requisitos Previos
- **XAMPP, WAMP o LAMP** (Apache + PHP + MySQL)
- **PHP 7.4 o superior**
- **MySQL 8.0 o superior**

#### Configuración

1. **Configurar servidor web**
   ```bash
   # Copiar proyecto a directorio del servidor
   cp -r REGISTRODIGITAL /var/www/html/
   # o en Windows con XAMPP:
   # Copiar a C:\xampp\htdocs\
   ```

2. **Crear base de datos**
   ```sql
   -- Acceder a MySQL
   mysql -u root -p
   
   -- Ejecutar script de base de datos
   source database/schema.sql
   ```

3. **Configurar conexión**
   ```php
   // Editar php/api.php
   $host = 'localhost';
   $dbname = 'registro_digital';
   $username = 'tu_usuario';
   $password = 'tu_password';
   ```

4. **Acceder al sistema**
   ```
   http://localhost/REGISTRODIGITAL/
   ```

## 🎯 Uso del Sistema

### Registro de Usuario

1. **Acceder a la página principal**
2. **Hacer clic en "Registrarse"**
3. **Seleccionar tipo de usuario** (Estudiante o Profesor)
4. **Completar el formulario** con la información requerida
5. **Enviar el formulario**

### Iniciar Sesión

1. **Hacer clic en "Iniciar Sesión"**
2. **Ingresar credenciales**:
   - Email
   - Contraseña
   - Tipo de usuario
3. **Acceder al dashboard**

### Navegación del Dashboard

#### Para Estudiantes
- **Inicio**: Estadísticas y actividad reciente
- **Mi Perfil**: Información personal
- **Mis Materias**: Materias inscritas
- **Horarios**: Programación de clases
- **Configuración**: Ajustes de cuenta

#### Para Profesores
- **Inicio**: Estadísticas y actividad reciente
- **Mi Perfil**: Información personal
- **Mis Clases**: Clases asignadas
- **Estudiantes**: Lista de estudiantes
- **Configuración**: Ajustes de cuenta

## 🔧 Personalización

### Modificar Estilos

```css
/* Cambiar colores principales en css/styles.css */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
}
```

### Agregar Nuevas Carreras

```javascript
// En js/script.js, modificar el array de carreras
const carreras = [
    { value: 'nueva-carrera', text: 'Nueva Carrera' },
    // ... más carreras
];
```

### Configurar Validaciones

```javascript
// En js/script.js, modificar las funciones de validación
function validarCedula(cedula) {
    // Implementar validación específica para tu país
    const regex = /^\d{8}-\d{1}$/; // Formato actual
    return regex.test(cedula);
}
```

## 📊 Base de Datos

### Tablas Principales

- **usuarios**: Información de estudiantes, profesores y administradores
- **materias**: Catálogo de asignaturas
- **inscripciones**: Relación estudiante-materia
- **asignaciones**: Relación profesor-materia
- **evaluaciones**: Exámenes y tareas
- **calificaciones**: Notas de los estudiantes

### Vistas Útiles

- **vista_estudiantes**: Estudiantes con información de carrera
- **vista_profesores_materias**: Profesores con sus materias asignadas
- **vista_inscripciones_completa**: Inscripciones con información detallada

## 🔄 API REST (Backend)

### Endpoints Disponibles

```
POST /api/registro        # Registrar usuario
POST /api/login          # Iniciar sesión
GET  /api/usuarios       # Obtener usuarios
GET  /api/usuario/{id}   # Obtener usuario específico
PUT  /api/usuario/{id}   # Actualizar usuario
DELETE /api/usuario/{id} # Eliminar usuario
```

### Ejemplo de Uso

```javascript
// Registrar estudiante
fetch('/api/registro', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        password: 'password123',
        tipo: 'estudiante',
        carrera: 'ingenieria-sistemas',
        semestre: 3
    })
})
.then(response => response.json())
.then(data => console.log(data));
```

## 🚀 Mejoras Futuras

### Funcionalidades Planificadas
- [ ] Sistema de calificaciones
- [ ] Generación de reportes PDF
- [ ] Notificaciones por email
- [ ] Chat en tiempo real
- [ ] Integración con calendario
- [ ] Aplicación móvil
- [ ] Sistema de pagos
- [ ] Módulo de biblioteca

### Optimizaciones Técnicas
- [ ] Cache de datos
- [ ] Optimización de consultas
- [ ] Compresión de assets
- [ ] PWA (Progressive Web App)
- [ ] Tests automatizados

## 🛠️ Desarrollo

### Configurar Entorno de Desarrollo

```bash
# Instalar dependencias (si usas Node.js para desarrollo)
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

### Estándares de Código

- **HTML**: Semántico y accesible
- **CSS**: BEM methodology para clases
- **JavaScript**: ES6+ features
- **PHP**: PSR-12 coding standards

## 🤝 Contribución

1. **Fork del proyecto**
2. **Crear rama de feature** (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit de cambios** (`git commit -am 'Agregar nueva funcionalidad'`)
4. **Push a la rama** (`git push origin feature/nueva-funcionalidad`)
5. **Crear Pull Request**

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador Principal**: Tu Nombre
- **Diseño UI/UX**: Colaborador
- **Backend**: Colaborador

## 📞 Soporte

¿Tienes preguntas o necesitas ayuda?

- **Email**: soporte@registrodigital.com
- **Issues**: [GitHub Issues](link-to-issues)
- **Documentación**: [Wiki del proyecto](link-to-wiki)

## 🎉 Agradecimientos

- Inspirado en [RegistraProfe](https://registraprofe.com/)
- Iconos por [Font Awesome](https://fontawesome.com/)
- Fuentes por [Google Fonts](https://fonts.google.com/)

---

**¡Gracias por usar RegistroDigital!** 🚀

Para más información, visita nuestra [documentación completa](link-to-docs) o contacta al equipo de desarrollo.
