# 🚀 Guía de Despliegue en GitHub Pages

Esta guía te ayudará a desplegar RegistroDigital en GitHub Pages paso a paso.

## 📋 Prerrequisitos

- Cuenta de GitHub
- Repositorio público (para GitHub Pages gratuito)
- Conocimientos básicos de Git

## 🔧 Pasos de Configuración

### 1. Preparar el Repositorio

```bash
# Clonar o crear repositorio
git clone https://github.com/Francisco-Campos-S/Generador_Carnets_CTP.git.io.git
cd Generador_Carnets_CTP.git.io

# O crear nuevo repositorio
git init
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
```

### 2. Estructura de Archivos

Asegúrate de que tu repositorio tenga esta estructura:

```
tu-repositorio/
├── index.html                 # Página principal (REQUERIDO)
├── _config.yml                # Configuración Jekyll
├── .github/workflows/
│   └── pages.yml              # Actions para despliegue automático
├── css/
│   ├── styles.css
│   └── dashboard.css
├── js/
│   ├── config.js
│   ├── demo.js
│   ├── script.js
│   └── dashboard.js
├── php/                       # Opcional (no funciona en GitHub Pages)
├── database/                  # Opcional (referencia)
├── README.md
└── .gitignore
```

### 3. Configurar GitHub Pages

#### Opción A: Desde la Interfaz Web

1. **Ve a tu repositorio en GitHub**
2. **Click en "Settings" (Configuración)**
3. **Scroll down hasta "Pages"**
4. **En "Source", selecciona:**
   - Build and deployment: "Deploy from a branch"
   - Branch: "main" o "master"
   - Folder: "/ (root)"
5. **Click "Save"**

#### Opción B: Usando GitHub Actions (Recomendado)

1. **El archivo `.github/workflows/pages.yml` ya está incluido**
2. **Configura permisos en Settings → Actions → General:**
   - Workflow permissions: "Read and write permissions"
   - Allow GitHub Actions to create and approve pull requests: ✓

### 4. Personalizar la Configuración

#### Editar `_config.yml`:

```yaml
title: "Tu Sistema de Registro"
description: "Tu descripción personalizada"
baseurl: "/tu-repositorio"  # Nombre de tu repositorio
url: "https://tu-usuario.github.io"  # Tu URL de GitHub Pages
github_username: tu-usuario
```

#### Editar rutas en `js/demo.js` (si es necesario):

```javascript
const basePath = isGitHubPages ? '/tu-repositorio' : '';
```

### 5. Subir los Archivos

```bash
# Agregar todos los archivos
git add .

# Confirmar cambios
git commit -m "Initial deployment for GitHub Pages"

# Subir al repositorio
git push origin main
```

### 6. Verificar el Despliegue

1. **Ve a Settings → Pages**
2. **Verifica que aparezca:** "Your site is published at https://tu-usuario.github.io/tu-repositorio"
3. **El despliegue puede tomar 5-10 minutos**

## ✅ Verificación Post-Despliegue

### Checklist de Funcionamiento:

- [ ] La página principal carga correctamente
- [ ] Los estilos CSS se aplican
- [ ] Los scripts JavaScript funcionan
- [ ] Los formularios de registro funcionan
- [ ] El sistema de login funciona
- [ ] El dashboard se muestra correctamente
- [ ] Las notificaciones aparecen
- [ ] Los usuarios demo están precargados

### URLs de Prueba:

```
# Página principal
https://tu-usuario.github.io/tu-repositorio/

# Assets (deben cargar sin errores 404)
https://tu-usuario.github.io/tu-repositorio/css/styles.css
https://tu-usuario.github.io/tu-repositorio/js/script.js
```

## 🔧 Solución de Problemas

### Error 404 en Assets

**Problema:** Los archivos CSS/JS no cargan
**Solución:** Verificar rutas en `index.html`:

```html
<!-- Correcto para GitHub Pages -->
<link rel="stylesheet" href="css/styles.css">
<script src="js/script.js"></script>

<!-- Incorrecto -->
<link rel="stylesheet" href="/css/styles.css">
```

### Página en Blanco

**Problema:** La página carga pero está en blanco
**Solución:** 
1. Abrir DevTools (F12)
2. Verificar errores en Console
3. Revisar que `index.html` esté en la raíz

### Funcionalidades No Funcionan

**Problema:** El JavaScript no ejecuta
**Solución:**
1. Verificar que todos los archivos JS carguen
2. Revisar errores en Console
3. Verificar que los archivos estén en la rama correcta

### Demo No Se Carga

**Problema:** Los usuarios demo no aparecen
**Solución:**
1. Verificar que `demo.js` cargue antes que `script.js`
2. Comprobar localStorage en DevTools
3. Refrescar la página (Ctrl+F5)

## 🚀 Optimizaciones Adicionales

### 1. Dominio Personalizado (Opcional)

1. **Crear archivo `CNAME` en la raíz:**
```
tu-dominio.com
```

2. **Configurar DNS de tu dominio:**
```
Tipo: CNAME
Nombre: www
Valor: tu-usuario.github.io
```

### 2. SSL/HTTPS

GitHub Pages proporciona SSL automáticamente para dominios `.github.io`

### 3. Cache y Performance

Los archivos se cachean automáticamente por el CDN de GitHub

## 📈 Monitoreo

### GitHub Actions

- Ve a "Actions" en tu repositorio para ver el estado de despliegues
- Los fallos se notifican por email

### Analytics (Opcional)

Agregar Google Analytics en `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🆘 Soporte

Si tienes problemas:

1. **Verifica la documentación oficial:** [GitHub Pages Docs](https://docs.github.com/pages)
2. **Revisa los logs en Actions**
3. **Crea un Issue en el repositorio**

---

¡Tu RegistroDigital estará funcionando en GitHub Pages! 🎉
