<?php
// Configuración de base de datos
$host = 'localhost';
$dbname = 'registro_digital';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("SET NAMES utf8");
} catch(PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Headers para CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Obtener método HTTP y ruta
$method = $_SERVER['REQUEST_METHOD'];
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);
$segments = explode('/', trim($path, '/'));

// Routing básico
switch ($method) {
    case 'POST':
        if ($segments[0] == 'api' && $segments[1] == 'registro') {
            registrarUsuario();
        } elseif ($segments[0] == 'api' && $segments[1] == 'login') {
            iniciarSesion();
        } elseif ($segments[0] == 'api' && $segments[1] == 'asistencia') {
            registrarAsistencia();
        }
        break;
    
    case 'GET':
        if ($segments[0] == 'api' && $segments[1] == 'usuarios') {
            obtenerUsuarios();
        } elseif ($segments[0] == 'api' && $segments[1] == 'usuario' && isset($segments[2])) {
            obtenerUsuario($segments[2]);
        } elseif ($segments[0] == 'api' && $segments[1] == 'asistencia' && isset($segments[2])) {
            obtenerAsistencia($segments[2]);
        }
        break;
    
    case 'PUT':
        if ($segments[0] == 'api' && $segments[1] == 'usuario' && isset($segments[2])) {
            actualizarUsuario($segments[2]);
        } elseif ($segments[0] == 'api' && $segments[1] == 'asistencia' && isset($segments[2])) {
            actualizarAsistencia($segments[2]);
        }
        break;
    
    case 'DELETE':
        if ($segments[0] == 'api' && $segments[1] == 'usuario' && isset($segments[2])) {
            eliminarUsuario($segments[2]);
        } elseif ($segments[0] == 'api' && $segments[1] == 'asistencia' && isset($segments[2])) {
            eliminarAsistencia($segments[2]);
        }
        break;
    
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Método no permitido']);
}

// Funciones de API

function registrarUsuario() {
    global $pdo;
    $input = json_decode(file_get_contents('php://input'), true);
    // Validar datos requeridos y tipo
    $tiposValidos = ['estudiante', 'profesor', 'admin'];
    $camposRequeridos = ['nombre', 'cedula', 'email', 'password', 'tipo'];
    foreach ($camposRequeridos as $campo) {
        if (!isset($input[$campo]) || empty($input[$campo])) {
            http_response_code(400);
            echo json_encode(['error' => "El campo $campo es requerido"]);
            return;
        }
    }
    if (!in_array($input['tipo'], $tiposValidos)) {
        http_response_code(400);
        echo json_encode(['error' => 'Tipo de usuario inválido']);
        return;
    }
    // Validación y SQL por tipo de usuario
    // Verificar si el usuario ya existe
    $stmt = $pdo->prepare("SELECT id FROM usuarios WHERE email = ? OR cedula = ?");
    $stmt->execute([$input['email'], $input['cedula']]);
    if ($stmt->rowCount() > 0) {
        http_response_code(409);
        echo json_encode(['error' => 'Usuario ya existe con este email o cédula']);
        return;
    }
    $passwordHash = password_hash($input['password'], PASSWORD_DEFAULT);
    try {
        if ($input['tipo'] == 'estudiante') {
            // Validación extra para estudiante
            if (empty($input['carrera']) || empty($input['semestre'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Carrera y semestre son requeridos para estudiantes']);
                return;
            }
            $sql = "INSERT INTO usuarios (nombre, cedula, email, password, tipo, telefono, direccion, fecha_nacimiento, fecha_registro, estado, carrera, semestre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $valores = [
                $input['nombre'], $input['cedula'], $input['email'], $passwordHash, $input['tipo'],
                $input['telefono'] ?? null, $input['direccion'] ?? null, $input['fechaNacimiento'] ?? null,
                date('Y-m-d H:i:s'), 'activo', $input['carrera'], $input['semestre']
            ];
        } elseif ($input['tipo'] == 'profesor') {
            // Validación extra para profesor
            if (empty($input['especialidad']) || empty($input['titulo'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Especialidad y título son requeridos para profesores']);
                return;
            }
            $sql = "INSERT INTO usuarios (nombre, cedula, email, password, tipo, telefono, direccion, fecha_nacimiento, fecha_registro, estado, especialidad, titulo, experiencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $valores = [
                $input['nombre'], $input['cedula'], $input['email'], $passwordHash, $input['tipo'],
                $input['telefono'] ?? null, $input['direccion'] ?? null, $input['fechaNacimiento'] ?? null,
                date('Y-m-d H:i:s'), 'activo', $input['especialidad'], $input['titulo'], $input['experiencia'] ?? null
            ];
        } else {
            // Admin u otro tipo
            $sql = "INSERT INTO usuarios (nombre, cedula, email, password, tipo, telefono, direccion, fecha_nacimiento, fecha_registro, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $valores = [
                $input['nombre'], $input['cedula'], $input['email'], $passwordHash, $input['tipo'],
                $input['telefono'] ?? null, $input['direccion'] ?? null, $input['fechaNacimiento'] ?? null,
                date('Y-m-d H:i:s'), 'activo'
            ];
        }
        $stmt = $pdo->prepare($sql);
        $stmt->execute($valores);
        $userId = $pdo->lastInsertId();
        echo json_encode([
            'success' => true,
            'message' => 'Usuario registrado exitosamente',
            'user_id' => $userId
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al registrar usuario: ' . $e->getMessage()]);
    }
}

function iniciarSesion() {
    global $pdo;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($input['email']) || !isset($input['password']) || !isset($input['tipo'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email, password y tipo son requeridos']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE email = ? AND tipo = ? AND estado = 'activo'");
        $stmt->execute([$input['email'], $input['tipo']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($input['password'], $user['password'])) {
            // Generar token JWT (simplificado)
            $token = generateJWT($user['id']);
            
            // Actualizar último login
            $stmt = $pdo->prepare("UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?");
            $stmt->execute([$user['id']]);
            
            // Remover password del response
            unset($user['password']);
            
            echo json_encode([
                'success' => true,
                'message' => 'Login exitoso',
                'user' => $user,
                'token' => $token
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Credenciales inválidas']);
        }
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error en login: ' . $e->getMessage()]);
    }
}

function obtenerUsuarios() {
    global $pdo;
    
    // Verificar token de autorización (simplificado)
    $headers = getallheaders();
    if (!isset($headers['Authorization'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Token de autorización requerido']);
        return;
    }
    
    try {
        $stmt = $pdo->query("SELECT id, nombre, cedula, email, tipo, telefono, fecha_registro, estado FROM usuarios WHERE estado = 'activo'");
        $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'users' => $usuarios
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al obtener usuarios: ' . $e->getMessage()]);
    }
}

function obtenerUsuario($id) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ? AND estado = 'activo'");
        $stmt->execute([$id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user) {
            unset($user['password']);
            echo json_encode([
                'success' => true,
                'user' => $user
            ]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al obtener usuario: ' . $e->getMessage()]);
    }
}

function actualizarUsuario($id) {
    global $pdo;
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    try {
        // Construir query dinámicamente basado en campos proporcionados
        $campos = [];
        $valores = [];
        
        $camposPermitidos = ['nombre', 'email', 'telefono', 'direccion'];
        
        foreach ($camposPermitidos as $campo) {
            if (isset($input[$campo])) {
                $campos[] = "$campo = ?";
                $valores[] = $input[$campo];
            }
        }
        
        if (empty($campos)) {
            http_response_code(400);
            echo json_encode(['error' => 'No hay campos para actualizar']);
            return;
        }
        
        $valores[] = $id;
        
        $sql = "UPDATE usuarios SET " . implode(', ', $campos) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($valores);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => true,
                'message' => 'Usuario actualizado exitosamente'
            ]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al actualizar usuario: ' . $e->getMessage()]);
    }
}

function eliminarUsuario($id) {
    global $pdo;
    
    try {
        // Soft delete - cambiar estado en lugar de eliminar
        $stmt = $pdo->prepare("UPDATE usuarios SET estado = 'inactivo' WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode([
                'success' => true,
                'message' => 'Usuario eliminado exitosamente'
            ]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al eliminar usuario: ' . $e->getMessage()]);
    }
}

// Funciones de asistencia (implementación futura, separadas por claridad senior)
function registrarAsistencia() {
    http_response_code(501);
    echo json_encode(['error' => 'Funcionalidad de asistencia no implementada aún']);
}
function obtenerAsistencia($id) {
    http_response_code(501);
    echo json_encode(['error' => 'Funcionalidad de consulta de asistencia no implementada aún']);
}
function actualizarAsistencia($id) {
    http_response_code(501);
    echo json_encode(['error' => 'Funcionalidad de actualización de asistencia no implementada aún']);
}
function eliminarAsistencia($id) {
    http_response_code(501);
    echo json_encode(['error' => 'Funcionalidad de eliminación de asistencia no implementada aún']);
}

// Función auxiliar para generar JWT (versión simplificada)
function generateJWT($userId) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode([
        'user_id' => $userId,
        'exp' => time() + (24 * 60 * 60) // 24 horas
    ]);
    
    $headerEncoded = base64url_encode($header);
    $payloadEncoded = base64url_encode($payload);
    
    $signature = hash_hmac('sha256', $headerEncoded . "." . $payloadEncoded, 'tu_clave_secreta', true);
    $signatureEncoded = base64url_encode($signature);
    
    return $headerEncoded . "." . $payloadEncoded . "." . $signatureEncoded;
}

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

// Función para crear las tablas de la base de datos
function crearTablas() {
    global $pdo;
    
    $sql = "
    CREATE TABLE IF NOT EXISTS usuarios (
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
        
        INDEX idx_email (email),
        INDEX idx_cedula (cedula),
        INDEX idx_tipo (tipo)
    );
    
    CREATE TABLE IF NOT EXISTS materias (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        codigo VARCHAR(20) UNIQUE NOT NULL,
        creditos INT NOT NULL,
        descripcion TEXT,
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS inscripciones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        estudiante_id INT NOT NULL,
        materia_id INT NOT NULL,
        fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        estado ENUM('activo', 'retirado', 'aprobado', 'reprobado') DEFAULT 'activo',
        
        FOREIGN KEY (estudiante_id) REFERENCES usuarios(id),
        FOREIGN KEY (materia_id) REFERENCES materias(id),
        UNIQUE KEY unique_inscripcion (estudiante_id, materia_id)
    );
    
    CREATE TABLE IF NOT EXISTS asignaciones (
        id INT AUTO_INCREMENT PRIMARY KEY,
        profesor_id INT NOT NULL,
        materia_id INT NOT NULL,
        horario VARCHAR(255),
        aula VARCHAR(100),
        fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
        FOREIGN KEY (profesor_id) REFERENCES usuarios(id),
        FOREIGN KEY (materia_id) REFERENCES materias(id)
    );
    ";
    
    try {
        $pdo->exec($sql);
        echo "Tablas creadas exitosamente\n";
    } catch (PDOException $e) {
        echo "Error al crear tablas: " . $e->getMessage() . "\n";
    }
}

// Descomentar la siguiente línea para crear las tablas
// crearTablas();
?>
