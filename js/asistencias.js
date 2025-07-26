// Sistema de Asistencias para RegistroDigital

// Estructura de datos para asistencias
let materias = JSON.parse(localStorage.getItem('materias')) || [];
let asistencias = JSON.parse(localStorage.getItem('asistencias')) || [];
let horarios = JSON.parse(localStorage.getItem('horarios')) || [];

// Función principal para abrir la gestión de asistencias
function abrirGestionAsistencias() {
    console.log('Abriendo gestión de asistencias...');
    
    const usuario = usuarioActual;
    if (!usuario) {
        alert('Error: Usuario no identificado');
        return;
    }
    
    // Cargar datos necesarios
    cargarDatosAsistencias();
    
    const contentArea = document.getElementById('content-area');
    if (!contentArea) {
        console.error('No se encontró el contenedor principal');
        return;
    }
    
    if (usuario.tipo === 'profesor') {
        contentArea.innerHTML = crearInterfazProfesor();
        inicializarInterfazProfesor();
    } else {
        contentArea.innerHTML = crearInterfazEstudiante();
        inicializarInterfazEstudiante();
    }
}

// Función para cargar datos de asistencias
function cargarDatosAsistencias() {
    // Si no hay datos, inicializar con datos de ejemplo
    if (materias.length === 0) {
        inicializarDatosAsistencia();
    }
}

// Inicializar datos de ejemplo para materias y horarios
function inicializarDatosAsistencia() {
    if (materias.length === 0) {
        materias = [
            {
                id: 'mat-001',
                nombre: 'Programación Web',
                codigo: 'PRW-001',
                creditos: 4,
                profesor: 'Dra. Laura Mendoza Silva',
                horario: {
                    'lunes': ['08:00-10:00'],
                    'miercoles': ['08:00-10:00'],
                    'viernes': ['10:00-12:00']
                },
                aula: 'Lab-101',
                leccionesPorDia: {
                    'lunes': 2,
                    'miercoles': 2, 
                    'viernes': 2
                },
                estudiantesInscritos: []
            },
            {
                id: 'mat-002',
                nombre: 'Matemáticas Aplicadas',
                codigo: 'MAT-002',
                creditos: 5,
                profesor: 'Dr. Roberto Vega Morales',
                horario: {
                    'martes': ['14:00-16:00'],
                    'jueves': ['14:00-16:00']
                },
                aula: 'A-205',
                leccionesPorDia: {
                    'martes': 2,
                    'jueves': 2
                },
                estudiantesInscritos: []
            },
            {
                id: 'mat-003',
                nombre: 'Base de Datos',
                codigo: 'BDD-001',
                creditos: 3,
                profesor: 'Dra. Laura Mendoza Silva',
                horario: {
                    'lunes': ['14:00-16:00'],
                    'miercoles': ['14:00-16:00']
                },
                aula: 'Lab-203',
                leccionesPorDia: {
                    'lunes': 2,
                    'miercoles': 2
                },
                estudiantesInscritos: []
            }
        ];
        
        // Asignar estudiantes demo a materias
        const estudiantesDemo = usuarios.filter(u => u.tipo === 'estudiante');
        materias.forEach(materia => {
            materia.estudiantesInscritos = estudiantesDemo.map(est => est.id);
        });
        
        localStorage.setItem('materias', JSON.stringify(materias));
    }
}

// Función para crear registro de asistencia diario
function crearRegistroAsistencia(materiaId, fecha, estudianteId, presente, observaciones = '') {
    const registro = {
        id: generarId(),
        materiaId: materiaId,
        estudianteId: estudianteId,
        fecha: fecha,
        presente: presente,
        observaciones: observaciones,
        fechaRegistro: new Date().toISOString()
    };
    
    asistencias.push(registro);
    localStorage.setItem('asistencias', JSON.stringify(asistencias));
    return registro;
}

// Función para obtener asistencias por materia y fecha
function obtenerAsistenciasPorMateriaYFecha(materiaId, fecha) {
    return asistencias.filter(a => a.materiaId === materiaId && a.fecha === fecha);
}

// Función para obtener estadísticas de asistencia de un estudiante
function obtenerEstadisticasAsistencia(estudianteId, materiaId = null) {
    let asistenciasEstudiante = asistencias.filter(a => a.estudianteId === estudianteId);
    
    if (materiaId) {
        asistenciasEstudiante = asistenciasEstudiante.filter(a => a.materiaId === materiaId);
    }
    
    const totalClases = asistenciasEstudiante.length;
    const clasesPresente = asistenciasEstudiante.filter(a => a.presente).length;
    const porcentajeAsistencia = totalClases > 0 ? (clasesPresente / totalClases * 100).toFixed(1) : 0;
    
    return {
        totalClases,
        clasesPresente,
        clasesAusente: totalClases - clasesPresente,
        porcentajeAsistencia
    };
}

// Función para crear el contenido de asistencias (para profesores)
function crearContenidoAsistencias() {
    const materiasProfesor = materias.filter(m => 
        m.profesor === usuarioActual.nombreCompleto || 
        m.profesor.includes(usuarioActual.apellido1)
    );
    
    if (materiasProfesor.length === 0) {
        return `
            <div class="no-data">
                <i class="fas fa-calendar-times"></i>
                <h3>No hay materias asignadas</h3>
                <p>No tienes materias asignadas para gestionar asistencias.</p>
            </div>
        `;
    }
    
    const fechaHoy = new Date().toISOString().split('T')[0];
    const diasSemana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const diaHoy = diasSemana[new Date().getDay()];
    
    return `
        <div class="asistencias-container">
            <div class="asistencias-header">
                <h2>Control de Asistencias</h2>
                <div class="fecha-actual">
                    <i class="fas fa-calendar"></i>
                    <span>${new Date().toLocaleDateString('es-ES', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })}</span>
                </div>
            </div>
            
            <div class="materias-asistencia">
                ${materiasProfesor.map(materia => `
                    <div class="materia-card">
                        <div class="materia-info">
                            <h3>${materia.nombre}</h3>
                            <p><strong>Código:</strong> ${materia.codigo}</p>
                            <p><strong>Aula:</strong> ${materia.aula}</p>
                            ${materia.horario[diaHoy] ? `
                                <div class="horario-hoy">
                                    <i class="fas fa-clock"></i>
                                    <span>Hoy: ${materia.horario[diaHoy].join(', ')}</span>
                                    <span class="lecciones-info">(${materia.leccionesPorDia[diaHoy]} lecciones)</span>
                                </div>
                            ` : '<p class="no-clase-hoy">No hay clases hoy</p>'}
                        </div>
                        
                        ${materia.horario[diaHoy] ? `
                            <div class="asistencia-controls">
                                <button class="btn btn-primary" onclick="abrirAsistencia('${materia.id}', '${fechaHoy}')">
                                    <i class="fas fa-check-square"></i>
                                    Pasar Asistencia
                                </button>
                            </div>
                        ` : ''}
                        
                        <div class="estudiantes-count">
                            <i class="fas fa-users"></i>
                            <span>${materia.estudiantesInscritos.length} estudiantes inscritos</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="asistencia-historial">
                <h3>Historial Reciente</h3>
                <div class="historial-grid">
                    ${crearHistorialAsistencias()}
                </div>
            </div>
        </div>
        
        <!-- Modal para pasar asistencia -->
        <div id="asistenciaModal" class="modal">
            <div class="modal-content modal-large">
                <span class="close" onclick="cerrarModalAsistencia()">&times;</span>
                <div id="asistencia-form-container">
                    <!-- Se llenará dinámicamente -->
                </div>
            </div>
        </div>
    `;
}

// Función para abrir el modal de asistencia
function abrirAsistencia(materiaId, fecha) {
    const materia = materias.find(m => m.id === materiaId);
    if (!materia) return;
    
    const estudiantesInscritos = materia.estudiantesInscritos.map(id => 
        usuarios.find(u => u.id === id)
    ).filter(Boolean);
    
    const asistenciasExistentes = obtenerAsistenciasPorMateriaYFecha(materiaId, fecha);
    
    const diaActual = new Date(fecha).toLocaleDateString('es-ES', { weekday: 'long' });
    const leccionesHoy = materia.leccionesPorDia[diaActual.toLowerCase()] || 0;
    
    const formContent = `
        <div class="asistencia-form">
            <div class="form-header">
                <h2>Asistencia - ${materia.nombre}</h2>
                <div class="materia-details">
                    <p><strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString('es-ES')}</p>
                    <p><strong>Lecciones:</strong> ${leccionesHoy}</p>
                    <p><strong>Aula:</strong> ${materia.aula}</p>
                </div>
            </div>
            
            <div class="estudiantes-lista">
                <div class="lista-header">
                    <div class="select-all">
                        <input type="checkbox" id="selectAll" onchange="toggleTodosPresentes()">
                        <label for="selectAll">Marcar todos presentes</label>
                    </div>
                    <div class="contadores">
                        <span id="contadorPresentes">0</span> presentes | 
                        <span id="contadorAusentes">${estudiantesInscritos.length}</span> ausentes
                    </div>
                </div>
                
                <div class="estudiantes-grid">
                    ${estudiantesInscritos.map(estudiante => {
                        const asistenciaExistente = asistenciasExistentes.find(a => a.estudianteId === estudiante.id);
                        const presente = asistenciaExistente ? asistenciaExistente.presente : false;
                        
                        return `
                            <div class="estudiante-item">
                                <div class="estudiante-info">
                                    <div class="avatar">
                                        <i class="fas fa-user"></i>
                                    </div>
                                    <div class="datos">
                                        <h4>${estudiante.nombreCompleto || estudiante.nombre}</h4>
                                        <p>${estudiante.cedula}</p>
                                        <p>${estudiante.email}</p>
                                    </div>
                                </div>
                                
                                <div class="asistencia-control">
                                    <div class="toggle-asistencia">
                                        <input type="checkbox" 
                                               id="asistencia-${estudiante.id}" 
                                               ${presente ? 'checked' : ''}
                                               onchange="actualizarContadores()">
                                        <label for="asistencia-${estudiante.id}" class="toggle-label">
                                            <span class="presente">Presente</span>
                                            <span class="ausente">Ausente</span>
                                        </label>
                                    </div>
                                    
                                    <div class="observaciones">
                                        <input type="text" 
                                               placeholder="Observaciones (opcional)"
                                               id="obs-${estudiante.id}"
                                               value="${asistenciaExistente ? asistenciaExistente.observaciones : ''}"
                                               class="form-control-small">
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="form-actions">
                <button class="btn btn-secondary" onclick="cerrarModalAsistencia()">
                    Cancelar
                </button>
                <button class="btn btn-primary" onclick="guardarAsistencia('${materiaId}', '${fecha}')">
                    <i class="fas fa-save"></i>
                    Guardar Asistencia
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('asistencia-form-container').innerHTML = formContent;
    document.getElementById('asistenciaModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Actualizar contadores iniciales
    setTimeout(actualizarContadores, 100);
}

// Función para crear historial de asistencias
function crearHistorialAsistencias() {
    const ultimasAsistencias = asistencias
        .sort((a, b) => new Date(b.fechaRegistro) - new Date(a.fechaRegistro))
        .slice(0, 10);
    
    if (ultimasAsistencias.length === 0) {
        return '<p class="no-data-small">No hay registros de asistencia</p>';
    }
    
    const resumen = {};
    ultimasAsistencias.forEach(asistencia => {
        const key = `${asistencia.materiaId}-${asistencia.fecha}`;
        if (!resumen[key]) {
            const materia = materias.find(m => m.id === asistencia.materiaId);
            resumen[key] = {
                materia: materia ? materia.nombre : 'Materia desconocida',
                fecha: asistencia.fecha,
                presentes: 0,
                ausentes: 0,
                total: 0
            };
        }
        resumen[key].total++;
        if (asistencia.presente) {
            resumen[key].presentes++;
        } else {
            resumen[key].ausentes++;
        }
    });
    
    return Object.values(resumen).map(item => `
        <div class="historial-item">
            <div class="historial-info">
                <h4>${item.materia}</h4>
                <p>${new Date(item.fecha).toLocaleDateString('es-ES')}</p>
            </div>
            <div class="historial-stats">
                <span class="presentes">${item.presentes} presentes</span>
                <span class="ausentes">${item.ausentes} ausentes</span>
                <div class="porcentaje">
                    ${item.total > 0 ? Math.round((item.presentes / item.total) * 100) : 0}% asistencia
                </div>
            </div>
        </div>
    `).join('');
}

// Funciones auxiliares para el modal de asistencia
function toggleTodosPresentes() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('input[id^="asistencia-"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
    
    actualizarContadores();
}

function actualizarContadores() {
    const checkboxes = document.querySelectorAll('input[id^="asistencia-"]');
    let presentes = 0;
    let ausentes = 0;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            presentes++;
        } else {
            ausentes++;
        }
    });
    
    document.getElementById('contadorPresentes').textContent = presentes;
    document.getElementById('contadorAusentes').textContent = ausentes;
}

function guardarAsistencia(materiaId, fecha) {
    try {
        const materia = materias.find(m => m.id === materiaId);
        if (!materia) {
            mostrarNotificacion('Error: Materia no encontrada', 'error');
            return;
        }
        
        // Eliminar registros existentes para esta fecha y materia
        asistencias = asistencias.filter(a => !(a.materiaId === materiaId && a.fecha === fecha));
        
        let registrosCreados = 0;
        
        materia.estudiantesInscritos.forEach(estudianteId => {
            const checkbox = document.getElementById(`asistencia-${estudianteId}`);
            const observaciones = document.getElementById(`obs-${estudianteId}`);
            
            if (checkbox) {
                crearRegistroAsistencia(
                    materiaId,
                    fecha,
                    estudianteId,
                    checkbox.checked,
                    observaciones ? observaciones.value.trim() : ''
                );
                registrosCreados++;
            }
        });
        
        mostrarNotificacion(`Asistencia guardada exitosamente (${registrosCreados} estudiantes)`, 'success');
        cerrarModalAsistencia();
        
        // Recargar contenido si estamos en la sección de asistencias
        if (document.querySelector('.asistencias-container')) {
            navegarSeccion('asistencias');
        }
        
    } catch (error) {
        console.error('Error guardando asistencia:', error);
        mostrarNotificacion('Error al guardar la asistencia', 'error');
    }
}

function cerrarModalAsistencia() {
    document.getElementById('asistenciaModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para mostrar asistencias del estudiante
function crearContenidoAsistenciasEstudiante() {
    const materiasEstudiante = materias.filter(m => 
        m.estudiantesInscritos.includes(usuarioActual.id)
    );
    
    if (materiasEstudiante.length === 0) {
        return `
            <div class="no-data">
                <i class="fas fa-calendar-times"></i>
                <h3>No estás inscrito en materias</h3>
                <p>No tienes materias asignadas para ver asistencias.</p>
            </div>
        `;
    }
    
    return `
        <div class="asistencias-estudiante">
            <h2>Mi Asistencia</h2>
            
            <div class="resumen-general">
                <h3>Resumen General</h3>
                <div class="stats-grid">
                    ${materiasEstudiante.map(materia => {
                        const stats = obtenerEstadisticasAsistencia(usuarioActual.id, materia.id);
                        return `
                            <div class="stat-card asistencia-card">
                                <h4>${materia.nombre}</h4>
                                <div class="asistencia-stats">
                                    <div class="porcentaje ${stats.porcentajeAsistencia >= 80 ? 'bueno' : stats.porcentajeAsistencia >= 60 ? 'regular' : 'malo'}">
                                        ${stats.porcentajeAsistencia}%
                                    </div>
                                    <div class="detalles">
                                        <p>${stats.clasesPresente} presentes</p>
                                        <p>${stats.clasesAusente} ausentes</p>
                                        <p>${stats.totalClases} total</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="detalle-asistencias">
                <h3>Detalle por Materia</h3>
                ${materiasEstudiante.map(materia => crearDetalleAsistenciaMateria(materia)).join('')}
            </div>
        </div>
    `;
}

function crearDetalleAsistenciaMateria(materia) {
    const asistenciasMateria = asistencias.filter(a => 
        a.materiaId === materia.id && a.estudianteId === usuarioActual.id
    ).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    return `
        <div class="materia-detalle">
            <h4>${materia.nombre} (${materia.codigo})</h4>
            <div class="horarios-info">
                <p><strong>Horarios:</strong></p>
                ${Object.entries(materia.horario).map(([dia, horas]) => `
                    <span class="horario-item">${dia}: ${horas.join(', ')} (${materia.leccionesPorDia[dia]} lecciones)</span>
                `).join('')}
            </div>
            
            ${asistenciasMateria.length > 0 ? `
                <div class="registros-asistencia">
                    <table class="asistencia-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Observaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${asistenciasMateria.map(asistencia => `
                                <tr class="${asistencia.presente ? 'presente' : 'ausente'}">
                                    <td>${new Date(asistencia.fecha).toLocaleDateString('es-ES')}</td>
                                    <td>
                                        <span class="estado-badge ${asistencia.presente ? 'presente' : 'ausente'}">
                                            <i class="fas fa-${asistencia.presente ? 'check' : 'times'}"></i>
                                            ${asistencia.presente ? 'Presente' : 'Ausente'}
                                        </span>
                                    </td>
                                    <td>${asistencia.observaciones || '-'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : '<p class="no-registros">No hay registros de asistencia</p>'}
        </div>
    `;
}

// Inicializar datos al cargar
document.addEventListener('DOMContentLoaded', function() {
    inicializarDatosAsistencia();
});

// Exportar funciones para uso global
window.abrirAsistencia = abrirAsistencia;
window.cerrarModalAsistencia = cerrarModalAsistencia;
window.toggleTodosPresentes = toggleTodosPresentes;
window.actualizarContadores = actualizarContadores;
window.guardarAsistencia = guardarAsistencia;
