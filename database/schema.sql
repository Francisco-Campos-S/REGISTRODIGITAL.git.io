-- Crear base de datos
CREATE DATABASE IF NOT EXISTS registro_digital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE registro_digital;

-- Tabla de usuarios (estudiantes, profesores, administradores)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    tipo ENUM('estudiante', 'profesor', 'admin') NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_nacimiento DATE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_login TIMESTAMP NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    
    -- Campos específicos para estudiantes
    carrera VARCHAR(255),
    semestre INT,
    
    -- Campos específicos para profesores
    especialidad VARCHAR(255),
    titulo VARCHAR(255),
    experiencia INT,
    
    -- Índices para optimizar consultas
    INDEX idx_email (email),
    INDEX idx_cedula (cedula),
    INDEX idx_tipo (tipo),
    INDEX idx_estado (estado)
) ENGINE=InnoDB;

-- Tabla de materias/asignaturas
CREATE TABLE materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    creditos INT NOT NULL,
    descripcion TEXT,
    prerrequisitos TEXT,
    programa TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo',
    
    INDEX idx_codigo (codigo),
    INDEX idx_creditos (creditos)
) ENGINE=InnoDB;

-- Tabla de carreras
CREATE TABLE carreras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    descripcion TEXT,
    duracion_semestres INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
) ENGINE=InnoDB;

-- Tabla de inscripciones de estudiantes en materias
CREATE TABLE inscripciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id INT NOT NULL,
    materia_id INT NOT NULL,
    periodo VARCHAR(20) NOT NULL, -- Ej: "2024-1", "2024-2"
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('inscrito', 'retirado', 'aprobado', 'reprobado') DEFAULT 'inscrito',
    nota_final DECIMAL(3,2) NULL,
    
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE,
    UNIQUE KEY unique_inscripcion (estudiante_id, materia_id, periodo),
    INDEX idx_periodo (periodo),
    INDEX idx_estado_inscripcion (estado)
) ENGINE=InnoDB;

-- Tabla de asignaciones de profesores a materias
CREATE TABLE asignaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profesor_id INT NOT NULL,
    materia_id INT NOT NULL,
    periodo VARCHAR(20) NOT NULL,
    grupo VARCHAR(10) DEFAULT 'A',
    horario JSON, -- Formato: {"lunes": ["08:00-10:00"], "miercoles": ["14:00-16:00"]}
    aula VARCHAR(100),
    capacidad_maxima INT DEFAULT 30,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (profesor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE,
    UNIQUE KEY unique_asignacion (profesor_id, materia_id, periodo, grupo),
    INDEX idx_periodo_asignacion (periodo)
) ENGINE=InnoDB;

-- Tabla de asistencia
CREATE TABLE asistencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id INT NOT NULL,
    asignacion_id INT NOT NULL,
    fecha DATE NOT NULL,
    presente BOOLEAN NOT NULL DEFAULT FALSE,
    observaciones TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (asignacion_id) REFERENCES asignaciones(id) ON DELETE CASCADE,
    UNIQUE KEY unique_asistencia (estudiante_id, asignacion_id, fecha),
    INDEX idx_fecha_asistencia (fecha)
) ENGINE=InnoDB;

-- Tabla de evaluaciones
CREATE TABLE evaluaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asignacion_id INT NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    tipo ENUM('parcial', 'final', 'quiz', 'proyecto', 'tarea') NOT NULL,
    fecha_evaluacion DATE NOT NULL,
    valor_porcentaje DECIMAL(5,2) NOT NULL, -- Porcentaje sobre la nota final
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (asignacion_id) REFERENCES asignaciones(id) ON DELETE CASCADE,
    INDEX idx_fecha_evaluacion (fecha_evaluacion),
    INDEX idx_tipo_evaluacion (tipo)
) ENGINE=InnoDB;

-- Tabla de calificaciones
CREATE TABLE calificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id INT NOT NULL,
    evaluacion_id INT NOT NULL,
    nota DECIMAL(3,2) NOT NULL,
    observaciones TEXT,
    fecha_calificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (estudiante_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (evaluacion_id) REFERENCES evaluaciones(id) ON DELETE CASCADE,
    UNIQUE KEY unique_calificacion (estudiante_id, evaluacion_id),
    INDEX idx_nota (nota)
) ENGINE=InnoDB;

-- Tabla de notificaciones
CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    tipo ENUM('info', 'warning', 'error', 'success') DEFAULT 'info',
    leida BOOLEAN DEFAULT FALSE,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_lectura TIMESTAMP NULL,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    INDEX idx_leida (leida),
    INDEX idx_fecha_envio (fecha_envio)
) ENGINE=InnoDB;

-- Tabla de logs del sistema
CREATE TABLE logs_sistema (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    accion VARCHAR(255) NOT NULL,
    tabla_afectada VARCHAR(100),
    registro_id INT,
    datos_anteriores JSON,
    datos_nuevos JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    INDEX idx_accion (accion),
    INDEX idx_timestamp (timestamp),
    INDEX idx_tabla (tabla_afectada)
) ENGINE=InnoDB;

-- Insertar datos de ejemplo

-- Insertar carreras de ejemplo
INSERT INTO carreras (nombre, codigo, descripcion, duracion_semestres) VALUES
('Ingeniería en Sistemas', 'ING-SIS', 'Carrera enfocada en el desarrollo de software y sistemas computacionales', 8),
('Medicina', 'MED', 'Carrera de ciencias de la salud para formar médicos', 12),
('Derecho', 'DER', 'Carrera de ciencias jurídicas', 10),
('Administración de Empresas', 'ADM-EMP', 'Carrera enfocada en la gestión empresarial', 8),
('Psicología', 'PSI', 'Carrera de ciencias humanas y comportamiento', 8);

-- Insertar materias de ejemplo
INSERT INTO materias (nombre, codigo, creditos, descripcion) VALUES
('Matemáticas I', 'MAT-001', 4, 'Fundamentos de álgebra y cálculo diferencial'),
('Programación I', 'PRG-001', 3, 'Introducción a la programación con lenguajes estructurados'),
('Física I', 'FIS-001', 4, 'Mecánica clásica y termodinámica'),
('Química General', 'QUI-001', 3, 'Fundamentos de química inorgánica y orgánica'),
('Inglés I', 'ING-001', 2, 'Nivel básico de inglés técnico'),
('Algoritmos y Estructuras de Datos', 'PRG-002', 4, 'Diseño de algoritmos y estructuras de datos'),
('Base de Datos I', 'BDD-001', 3, 'Fundamentos de bases de datos relacionales'),
('Redes de Computadores', 'RED-001', 3, 'Fundamentos de redes y protocolos de comunicación');

-- Insertar usuario administrador por defecto
INSERT INTO usuarios (nombre, cedula, email, password, tipo, telefono, estado) VALUES
('Administrador Sistema', '12345678-9', 'admin@registrodigital.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', '+1234567890', 'activo');

-- Insertar algunos profesores de ejemplo
INSERT INTO usuarios (nombre, cedula, email, password, tipo, telefono, direccion, fecha_nacimiento, especialidad, titulo, experiencia, estado) VALUES
('Dr. Carlos García', '98765432-1', 'garcia@universidad.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'profesor', '+1234567891', 'Calle Principal 123', '1975-05-15', 'Matemáticas', 'Doctor en Matemáticas', 15, 'activo'),
('Ing. María López', '87654321-2', 'lopez@universidad.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'profesor', '+1234567892', 'Avenida Central 456', '1980-08-22', 'Ingeniería de Software', 'Magister en Ingeniería', 10, 'activo'),
('Dr. Pedro Martínez', '76543210-3', 'martinez@universidad.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'profesor', '+1234567893', 'Boulevard Norte 789', '1978-12-10', 'Física', 'Doctor en Física', 12, 'activo');

-- Insertar algunos estudiantes de ejemplo
INSERT INTO usuarios (nombre, cedula, email, password, tipo, telefono, direccion, fecha_nacimiento, carrera, semestre, estado) VALUES
('Ana Rodríguez', '11111111-1', 'ana@estudiante.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'estudiante', '+1234567894', 'Calle Estudiantil 111', '2000-03-15', 'ingenieria-sistemas', 3, 'activo'),
('Juan Pérez', '22222222-2', 'juan@estudiante.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'estudiante', '+1234567895', 'Avenida Universitaria 222', '1999-07-20', 'ingenieria-sistemas', 4, 'activo'),
('Laura Silva', '33333333-3', 'laura@estudiante.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'estudiante', '+1234567896', 'Plaza Central 333', '2001-11-05', 'medicina', 2, 'activo');

-- Crear vistas útiles para reportes

-- Vista de estudiantes con su información de carrera
CREATE VIEW vista_estudiantes AS
SELECT 
    u.id,
    u.nombre,
    u.cedula,
    u.email,
    u.telefono,
    u.carrera,
    u.semestre,
    u.fecha_registro,
    u.estado
FROM usuarios u
WHERE u.tipo = 'estudiante';

-- Vista de profesores con sus materias asignadas
CREATE VIEW vista_profesores_materias AS
SELECT 
    u.id as profesor_id,
    u.nombre as profesor_nombre,
    u.especialidad,
    m.id as materia_id,
    m.nombre as materia_nombre,
    m.codigo as materia_codigo,
    a.grupo,
    a.aula,
    a.periodo
FROM usuarios u
JOIN asignaciones a ON u.id = a.profesor_id
JOIN materias m ON a.materia_id = m.id
WHERE u.tipo = 'profesor' AND u.estado = 'activo';

-- Vista de inscripciones con información completa
CREATE VIEW vista_inscripciones_completa AS
SELECT 
    i.id as inscripcion_id,
    e.nombre as estudiante_nombre,
    e.cedula as estudiante_cedula,
    m.nombre as materia_nombre,
    m.codigo as materia_codigo,
    m.creditos,
    i.periodo,
    i.estado as estado_inscripcion,
    i.nota_final,
    i.fecha_inscripcion
FROM inscripciones i
JOIN usuarios e ON i.estudiante_id = e.id
JOIN materias m ON i.materia_id = m.id;

-- Crear procedimientos almacenados útiles

DELIMITER //

-- Procedimiento para inscribir estudiante en materia
CREATE PROCEDURE InscribirEstudiante(
    IN p_estudiante_id INT,
    IN p_materia_id INT,
    IN p_periodo VARCHAR(20)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    -- Verificar que el estudiante existe y está activo
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE id = p_estudiante_id AND tipo = 'estudiante' AND estado = 'activo') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Estudiante no encontrado o inactivo';
    END IF;
    
    -- Verificar que la materia existe y está activa
    IF NOT EXISTS (SELECT 1 FROM materias WHERE id = p_materia_id AND estado = 'activo') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Materia no encontrada o inactiva';
    END IF;
    
    -- Verificar que no esté ya inscrito
    IF EXISTS (SELECT 1 FROM inscripciones WHERE estudiante_id = p_estudiante_id AND materia_id = p_materia_id AND periodo = p_periodo) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Estudiante ya inscrito en esta materia para este periodo';
    END IF;
    
    -- Realizar la inscripción
    INSERT INTO inscripciones (estudiante_id, materia_id, periodo) VALUES (p_estudiante_id, p_materia_id, p_periodo);
    
    COMMIT;
END //

-- Procedimiento para calcular promedio de estudiante
CREATE PROCEDURE CalcularPromedio(
    IN p_estudiante_id INT,
    IN p_periodo VARCHAR(20),
    OUT p_promedio DECIMAL(3,2)
)
BEGIN
    SELECT AVG(nota_final) INTO p_promedio
    FROM inscripciones 
    WHERE estudiante_id = p_estudiante_id 
    AND periodo = p_periodo 
    AND estado = 'aprobado' 
    AND nota_final IS NOT NULL;
END //

DELIMITER ;

-- Crear triggers para auditoría

DELIMITER //

-- Trigger para log de cambios en usuarios
CREATE TRIGGER usuarios_audit_insert AFTER INSERT ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO logs_sistema (usuario_id, accion, tabla_afectada, registro_id, datos_nuevos)
    VALUES (NEW.id, 'INSERT', 'usuarios', NEW.id, JSON_OBJECT(
        'nombre', NEW.nombre,
        'email', NEW.email,
        'tipo', NEW.tipo
    ));
END //

CREATE TRIGGER usuarios_audit_update AFTER UPDATE ON usuarios
FOR EACH ROW
BEGIN
    INSERT INTO logs_sistema (usuario_id, accion, tabla_afectada, registro_id, datos_anteriores, datos_nuevos)
    VALUES (NEW.id, 'UPDATE', 'usuarios', NEW.id, 
        JSON_OBJECT('nombre', OLD.nombre, 'email', OLD.email, 'estado', OLD.estado),
        JSON_OBJECT('nombre', NEW.nombre, 'email', NEW.email, 'estado', NEW.estado)
    );
END //

DELIMITER ;
