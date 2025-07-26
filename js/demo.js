// Configuración específica para GitHub Pages Demo
class GitHubPagesDemo {
    constructor() {
        this.isDemo = true;
        this.demoUsers = this.createDemoUsers();
        this.demoData = this.createDemoData();
        this.init();
    }
    
    init() {
        this.addDemoButton();
        this.addDemoInfo();
        this.setupDemoFeatures();
    }
    
    createDemoUsers() {
        return [
            {
                id: 'demo-admin',
                tipo: 'admin',
                nombre: 'Administrador Demo',
                cedula: '00000000-0',
                email: 'admin@demo.com',
                password: 'admin123',
                telefono: '+0000000000',
                fechaRegistro: new Date().toISOString(),
                estado: 'activo'
            },
            {
                id: 'demo-student-1',
                tipo: 'estudiante',
                nombre: 'María José Hernández',
                cedula: '11111111-1',
                fechaNacimiento: '2001-03-10',
                email: 'maria.hernandez@estudiante.demo.com',
                telefono: '+1111111111',
                direccion: 'Calle Estudiantes 111, Campus Norte',
                carrera: 'ingenieria-sistemas',
                semestre: '4',
                password: 'estudiante123',
                fechaRegistro: new Date(Date.now() - 86400000).toISOString(),
                estado: 'activo'
            },
            {
                id: 'demo-student-2',
                tipo: 'estudiante',
                nombre: 'José Luis Ramírez',
                cedula: '22222222-2',
                fechaNacimiento: '1999-11-25',
                email: 'jose.ramirez@estudiante.demo.com',
                telefono: '+2222222222',
                direccion: 'Avenida Universitaria 222, Campus Sur',
                carrera: 'medicina',
                semestre: '6',
                password: 'estudiante123',
                fechaRegistro: new Date(Date.now() - 172800000).toISOString(),
                estado: 'activo'
            },
            {
                id: 'demo-teacher-1',
                tipo: 'profesor',
                nombre: 'Dra. Laura Mendoza Silva',
                cedula: '33333333-3',
                fechaNacimiento: '1978-07-14',
                email: 'laura.mendoza@profesor.demo.com',
                telefono: '+3333333333',
                direccion: 'Boulevard Académico 333, Zona Docente',
                especialidad: 'Desarrollo Web y Móvil',
                titulo: 'Doctora en Ingeniería de Software',
                experiencia: '12',
                password: 'profesor123',
                fechaRegistro: new Date(Date.now() - 259200000).toISOString(),
                estado: 'activo'
            },
            {
                id: 'demo-teacher-2',
                tipo: 'profesor',
                nombre: 'Dr. Roberto Vega Morales',
                cedula: '44444444-4',
                fechaNacimiento: '1972-12-08',
                email: 'roberto.vega@profesor.demo.com',
                telefono: '+4444444444',
                direccion: 'Plaza Educativa 444, Centro Académico',
                especialidad: 'Matemáticas Aplicadas',
                titulo: 'Doctor en Matemáticas',
                experiencia: '18',
                password: 'profesor123',
                fechaRegistro: new Date(Date.now() - 345600000).toISOString(),
                estado: 'activo'
            }
        ];
    }
    
    createDemoData() {
        return {
            materias: [
                {
                    id: 'mat-001',
                    nombre: 'Programación Web',
                    codigo: 'PRW-001',
                    creditos: 4,
                    profesor: 'Dra. Laura Mendoza Silva',
                    horario: 'Lun-Mie 10:00-12:00',
                    aula: 'Lab-101',
                    estudiantes: 28
                },
                {
                    id: 'mat-002',
                    nombre: 'Cálculo Diferencial',
                    codigo: 'MAT-101',
                    creditos: 5,
                    profesor: 'Dr. Roberto Vega Morales',
                    horario: 'Mar-Jue 8:00-10:00',
                    aula: 'A-205',
                    estudiantes: 35
                },
                {
                    id: 'mat-003',
                    nombre: 'Base de Datos',
                    codigo: 'BDD-001',
                    creditos: 3,
                    profesor: 'Dra. Laura Mendoza Silva',
                    horario: 'Vie 14:00-17:00',
                    aula: 'Lab-203',
                    estudiantes: 22
                }
            ],
            estadisticas: {
                totalUsuarios: 45,
                totalEstudiantes: 38,
                totalProfesores: 6,
                totalAdmin: 1,
                clasesActivas: 12,
                materiasDisponibles: 24
            }
        };
    }
    
    addDemoButton() {
        const heroButtons = document.querySelector('.hero-buttons');
        if (heroButtons) {
            const demoButton = document.createElement('button');
            demoButton.className = 'btn btn-secondary';
            demoButton.innerHTML = `
                <i class="fas fa-play"></i>
                Demo Rápido
            `;
            demoButton.onclick = () => this.startQuickDemo();
            heroButtons.appendChild(demoButton);
        }
    }
    
    addDemoInfo() {
        const hero = document.querySelector('.hero-content');
        if (hero) {
            const demoInfo = document.createElement('div');
            demoInfo.className = 'demo-info';
            demoInfo.innerHTML = `
                <div class="demo-banner">
                    <i class="fas fa-info-circle"></i>
                    <span>Versión Demo - GitHub Pages</span>
                </div>
                <div class="demo-credentials">
                    <h4>Credenciales de Prueba:</h4>
                    <div class="credentials-grid">
                        <div class="credential-item">
                            <strong>Estudiante:</strong><br>
                            Email: maria.hernandez@estudiante.demo.com<br>
                            Contraseña: estudiante123
                        </div>
                        <div class="credential-item">
                            <strong>Profesor:</strong><br>
                            Email: laura.mendoza@profesor.demo.com<br>
                            Contraseña: profesor123
                        </div>
                        <div class="credential-item">
                            <strong>Admin:</strong><br>
                            Email: admin@demo.com<br>
                            Contraseña: admin123
                        </div>
                    </div>
                </div>
            `;
            hero.appendChild(demoInfo);
        }
    }
    
    setupDemoFeatures() {
        // Cargar usuarios demo si no existen
        const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuariosExistentes.length === 0) {
            localStorage.setItem('usuarios', JSON.stringify(this.demoUsers));
        }
        
        // Cargar datos demo
        localStorage.setItem('demoData', JSON.stringify(this.demoData));
    }
    
    startQuickDemo() {
        // Login automático como estudiante demo
        const studentDemo = this.demoUsers.find(u => u.tipo === 'estudiante');
        localStorage.setItem('usuarioActual', JSON.stringify(studentDemo));
        
        mostrarNotificacion('Iniciando demo como estudiante...', 'info');
        
        setTimeout(() => {
            mostrarDashboard();
        }, 1500);
    }
    
    getDemoStats() {
        return this.demoData.estadisticas;
    }
    
    getDemoMaterias() {
        return this.demoData.materias;
    }
}

// Inicializar demo para GitHub Pages
if (window.location.hostname.includes('github.io')) {
    document.addEventListener('DOMContentLoaded', function() {
        window.githubDemo = new GitHubPagesDemo();
    });
}

// Estilos para el demo
const demoStyles = `
<style>
.demo-info {
    margin-top: 2rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
}

.demo-banner {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #fff;
    font-weight: 600;
    margin-bottom: 1rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 25px;
    display: inline-flex;
}

.demo-credentials {
    color: white;
}

.demo-credentials h4 {
    margin-bottom: 1rem;
    color: #fff;
}

.credentials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.credential-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 10px;
    font-size: 0.9rem;
    line-height: 1.4;
}

.credential-item strong {
    color: #FFD700;
}

@media (max-width: 768px) {
    .credentials-grid {
        grid-template-columns: 1fr;
    }
    
    .demo-info {
        margin-top: 1rem;
        padding: 1rem;
    }
}
</style>
`;

// Agregar estilos del demo
document.head.insertAdjacentHTML('beforeend', demoStyles);
