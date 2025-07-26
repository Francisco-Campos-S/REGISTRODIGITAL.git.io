// Configuración global del sistema
const CONFIG = {
    // Información del sistema
    APP_NAME: 'RegistroDigital',
    VERSION: '1.0.0',
    AUTHOR: 'Tu Nombre',
    
    // Configuración de validación
    VALIDATION: {
        MIN_PASSWORD_LENGTH: 6,
        MAX_PASSWORD_LENGTH: 50,
        MIN_NAME_LENGTH: 3,
        MAX_NAME_LENGTH: 100,
        CEDULA_PATTERN: /^\d{8}-\d{1}$/,
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        PHONE_PATTERN: /^[\+]?[0-9\s\-\(\)]{8,15}$/
    },
    
    // Configuración de la interfaz
    UI: {
        NOTIFICATION_DURATION: 5000,
        ANIMATION_DURATION: 300,
        MODAL_ANIMATION: 400,
        AUTO_SAVE_INTERVAL: 30000
    },
    
    // Configuración de datos
    DATA: {
        LOCAL_STORAGE_KEY: 'registroDigital',
        SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 horas
        MAX_LOGIN_ATTEMPTS: 5,
        LOCKOUT_DURATION: 15 * 60 * 1000 // 15 minutos
    },
    
    // Configuración de carreras disponibles
    CARRERAS: [
        { value: 'ingenieria-sistemas', label: 'Ingeniería en Sistemas' },
        { value: 'medicina', label: 'Medicina' },
        { value: 'derecho', label: 'Derecho' },
        { value: 'administracion', label: 'Administración de Empresas' },
        { value: 'psicologia', label: 'Psicología' },
        { value: 'ingenieria-civil', label: 'Ingeniería Civil' },
        { value: 'arquitectura', label: 'Arquitectura' },
        { value: 'contaduria', label: 'Contaduría Pública' },
        { value: 'marketing', label: 'Marketing y Publicidad' },
        { value: 'enfermeria', label: 'Enfermería' }
    ],
    
    // Configuración de semestres
    SEMESTRES: [
        { value: 1, label: '1er Semestre' },
        { value: 2, label: '2do Semestre' },
        { value: 3, label: '3er Semestre' },
        { value: 4, label: '4to Semestre' },
        { value: 5, label: '5to Semestre' },
        { value: 6, label: '6to Semestre' },
        { value: 7, label: '7mo Semestre' },
        { value: 8, label: '8vo Semestre' },
        { value: 9, label: '9no Semestre' },
        { value: 10, label: '10mo Semestre' }
    ],
    
    // Configuración de materias ejemplo
    MATERIAS_EJEMPLO: [
        {
            id: 1,
            nombre: 'Matemáticas I',
            codigo: 'MAT-001',
            creditos: 4,
            profesor: 'Dr. Carlos García',
            horario: 'Lun-Mie-Vie 8:00-10:00',
            aula: 'A-101',
            descripcion: 'Fundamentos de álgebra y cálculo diferencial'
        },
        {
            id: 2,
            nombre: 'Programación I',
            codigo: 'PRG-001',
            creditos: 3,
            profesor: 'Ing. María López',
            horario: 'Mar-Jue 10:00-12:00',
            aula: 'Lab-1',
            descripcion: 'Introducción a la programación con lenguajes estructurados'
        },
        {
            id: 3,
            nombre: 'Física I',
            codigo: 'FIS-001',
            creditos: 4,
            profesor: 'Dr. Pedro Martínez',
            horario: 'Lun-Mie 14:00-16:00',
            aula: 'B-205',
            descripcion: 'Mecánica clásica y termodinámica'
        },
        {
            id: 4,
            nombre: 'Química General',
            codigo: 'QUI-001',
            creditos: 3,
            profesor: 'Dra. Ana Rodríguez',
            horario: 'Mar-Jue 16:00-18:00',
            aula: 'Lab-3',
            descripcion: 'Fundamentos de química inorgánica y orgánica'
        }
    ],
    
    // Configuración de horarios
    HORARIOS: {
        DIAS_SEMANA: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'],
        HORAS_DISPONIBLES: [
            '07:00-09:00', '08:00-10:00', '09:00-11:00', '10:00-12:00',
            '11:00-13:00', '12:00-14:00', '13:00-15:00', '14:00-16:00',
            '15:00-17:00', '16:00-18:00', '17:00-19:00', '18:00-20:00'
        ]
    },
    
    // Configuración de notificaciones
    NOTIFICATIONS: {
        TYPES: {
            SUCCESS: 'success',
            ERROR: 'error',
            WARNING: 'warning',
            INFO: 'info'
        },
        POSITIONS: {
            TOP_RIGHT: 'top-right',
            TOP_LEFT: 'top-left',
            BOTTOM_RIGHT: 'bottom-right',
            BOTTOM_LEFT: 'bottom-left'
        }
    },
    
    // Configuración de tema
    THEME: {
        COLORS: {
            PRIMARY: '#667eea',
            SECONDARY: '#764ba2',
            SUCCESS: '#27ae60',
            ERROR: '#e74c3c',
            WARNING: '#f39c12',
            INFO: '#3498db',
            LIGHT: '#f8f9fa',
            DARK: '#2c3e50'
        },
        GRADIENTS: {
            PRIMARY: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            SECONDARY: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            SUCCESS: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
        }
    },
    
    // Configuración de seguridad
    SECURITY: {
        SALT_ROUNDS: 10,
        TOKEN_EXPIRY: 24 * 60 * 60, // 24 horas en segundos
        ALLOWED_FILE_TYPES: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
        MAX_FILE_SIZE: 5 * 1024 * 1024 // 5MB
    },
    
    // Mensajes del sistema
    MESSAGES: {
        REQUIRED_FIELD: 'Este campo es obligatorio',
        INVALID_EMAIL: 'Formato de email inválido',
        INVALID_PHONE: 'Formato de teléfono inválido',
        PASSWORD_TOO_SHORT: 'La contraseña debe tener al menos 6 caracteres',
        PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
        USER_EXISTS: 'Ya existe un usuario con este email o cédula',
        LOGIN_SUCCESS: 'Bienvenido al sistema',
        LOGIN_ERROR: 'Credenciales incorrectas',
        REGISTRATION_SUCCESS: 'Usuario registrado exitosamente',
        UPDATE_SUCCESS: 'Información actualizada correctamente',
        DELETE_SUCCESS: 'Elemento eliminado correctamente',
        GENERIC_ERROR: 'Ha ocurrido un error. Intenta nuevamente.'
    },
    
    // URLs de API (para uso con backend)
    API_URLS: {
        BASE: '/api',
        REGISTER: '/api/registro',
        LOGIN: '/api/login',
        USERS: '/api/usuarios',
        USER: '/api/usuario',
        MATERIAS: '/api/materias',
        INSCRIPCIONES: '/api/inscripciones'
    }
};

// Utilidades globales
const UTILS = {
    // Generar ID único
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    // Formatear fecha
    formatDate(date, format = 'dd/mm/yyyy') {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        switch (format) {
            case 'dd/mm/yyyy':
                return `${day}/${month}/${year}`;
            case 'mm/dd/yyyy':
                return `${month}/${day}/${year}`;
            case 'yyyy-mm-dd':
                return `${year}-${month}-${day}`;
            default:
                return d.toLocaleDateString();
        }
    },
    
    // Capitalizar primera letra
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    // Sanitizar string
    sanitize(str) {
        return str.replace(/[<>\"']/g, '');
    },
    
    // Validar email
    isValidEmail(email) {
        return CONFIG.VALIDATION.EMAIL_PATTERN.test(email);
    },
    
    // Validar teléfono
    isValidPhone(phone) {
        return CONFIG.VALIDATION.PHONE_PATTERN.test(phone);
    },
    
    // Validar cédula
    isValidCedula(cedula) {
        return CONFIG.VALIDATION.CEDULA_PATTERN.test(cedula);
    },
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Storage helpers
    storage: {
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (e) {
                console.error('Error saving to localStorage:', e);
                return false;
            }
        },
        
        get(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (e) {
                console.error('Error reading from localStorage:', e);
                return null;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                console.error('Error removing from localStorage:', e);
                return false;
            }
        },
        
        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (e) {
                console.error('Error clearing localStorage:', e);
                return false;
            }
        }
    }
};

// Clase para manejo de eventos
class EventManager {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}

// Instancia global del manejador de eventos
const eventManager = new EventManager();

// Clase para manejo de notificaciones mejorado
class NotificationManager {
    constructor() {
        this.container = null;
        this.notifications = [];
        this.createContainer();
    }
    
    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'notification-container';
        this.container.className = 'notification-container';
        document.body.appendChild(this.container);
    }
    
    show(message, type = 'info', options = {}) {
        const notification = {
            id: UTILS.generateId(),
            message,
            type,
            duration: options.duration || CONFIG.UI.NOTIFICATION_DURATION,
            persistent: options.persistent || false,
            actions: options.actions || []
        };
        
        const element = this.createElement(notification);
        this.container.appendChild(element);
        this.notifications.push(notification);
        
        // Animación de entrada
        requestAnimationFrame(() => {
            element.classList.add('show');
        });
        
        // Auto eliminar si no es persistente
        if (!notification.persistent) {
            setTimeout(() => {
                this.remove(notification.id);
            }, notification.duration);
        }
        
        return notification.id;
    }
    
    createElement(notification) {
        const element = document.createElement('div');
        element.className = `notification notification-${notification.type}`;
        element.dataset.id = notification.id;
        
        element.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getIcon(notification.type)}"></i>
                <span class="notification-message">${notification.message}</span>
            </div>
            <button class="notification-close" onclick="notificationManager.remove('${notification.id}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        return element;
    }
    
    getIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
    
    remove(id) {
        const element = this.container.querySelector(`[data-id="${id}"]`);
        if (element) {
            element.classList.add('hide');
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            }, CONFIG.UI.ANIMATION_DURATION);
        }
        
        this.notifications = this.notifications.filter(n => n.id !== id);
    }
    
    clear() {
        this.notifications.forEach(notification => {
            this.remove(notification.id);
        });
    }
}

// Instancia global del manejador de notificaciones
const notificationManager = new NotificationManager();

// Sobrescribir la función mostrarNotificacion para usar el nuevo sistema
function mostrarNotificacion(mensaje, tipo = 'info', opciones = {}) {
    return notificationManager.show(mensaje, tipo, opciones);
}

// Event listeners globales
document.addEventListener('DOMContentLoaded', function() {
    // Configurar tema inicial
    applyTheme();
    
    // Configurar manejadores de teclado
    setupKeyboardShortcuts();
    
    // Configurar auto-guardado
    setupAutoSave();
});

function applyTheme() {
    const root = document.documentElement;
    Object.entries(CONFIG.THEME.COLORS).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key.toLowerCase()}`, value);
    });
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + S para guardar
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            eventManager.emit('save-request');
        }
        
        // Escape para cerrar modales
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    closeModal(modal.id);
                }
            });
        }
    });
}

function setupAutoSave() {
    setInterval(() => {
        eventManager.emit('auto-save');
    }, CONFIG.UI.AUTO_SAVE_INTERVAL);
}

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
    window.UTILS = UTILS;
    window.EventManager = EventManager;
    window.NotificationManager = NotificationManager;
    window.eventManager = eventManager;
    window.notificationManager = notificationManager;
}
