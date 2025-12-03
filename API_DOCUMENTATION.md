# 📖 Documentación de API - Sistema de Inscripciones SUNAFIL

Documentación completa de todos los endpoints disponibles en el API REST.

---

## 📋 Tabla de Contenidos

- [Información General](#información-general)
- [Autenticación](#autenticación)
- [Respuestas Estándar](#respuestas-estándar)
- [Endpoints](#endpoints)
  - [Información del Sistema](#información-del-sistema)
  - [Configuración](#configuración)
  - [Ubigeos](#ubigeos)
  - [Inscripciones](#inscripciones)
  - [WhatsApp](#whatsapp)
- [Códigos de Estado](#códigos-de-estado)
- [Manejo de Errores](#manejo-de-errores)

---

## 🌐 Información General

### Base URL

```
Desarrollo:  http://localhost:3000
Producción:  https://tu-dominio.com
```

### Content-Type

Todas las peticiones y respuestas usan JSON:

```
Content-Type: application/json
```

---

## 🔐 Autenticación

**Nota:** Esta versión del API no requiere autenticación. Todos los endpoints son públicos.

Para futuras versiones con autenticación, se usará:

```
Authorization: Bearer <token>
```

---

## 📦 Respuestas Estándar

### Respuesta Exitosa

```json
{
  "success": true,
  "data": { /* datos solicitados */ },
  "message": "Mensaje opcional"
}
```

### Respuesta de Error

```json
{
  "success": false,
  "error": "Descripción del error",
  "details": [ /* detalles opcionales */ ]
}
```

---

## 🚀 Endpoints

---

## Información del Sistema

### 1. Información General de la API

Obtiene información básica sobre el API y lista de endpoints disponibles.

**Endpoint:** `GET /`

**Parámetros:** Ninguno

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "message": "API de Inscripciones SUNAFIL - Sistema funcionando correctamente",
  "version": "1.0.0",
  "endpoints": {
    "configuracion": "/api/configuracion/activa",
    "ocupaciones": "/api/ocupaciones",
    "departamentos": "/api/ubigeo/departamentos",
    "provincias": "/api/ubigeo/provincias/:idDepartamento",
    "distritos": "/api/ubigeo/distritos/:idProvincia",
    "inscripciones": "POST /api/inscripciones",
    "contarInscripciones": "/api/inscripciones/count",
    "grupoWhatsApp": "/api/whatsapp/grupo-activo"
  }
}
```

**Ejemplo:**

```bash
curl http://localhost:3000/
```

---

### 2. Health Check

Verifica que el servidor esté funcionando correctamente.

**Endpoint:** `GET /health`

**Parámetros:** Ninguno

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2024-12-03T15:30:00.000Z"
}
```

**Ejemplo:**

```bash
curl http://localhost:3000/health
```

---

## Configuración

### 3. Obtener Configuración Activa

Obtiene la configuración activa del sistema y verifica si estamos dentro del periodo de inscripción.

**Endpoint:** `GET /api/configuracion/activa`

**Parámetros:** Ninguno

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "data": {
    "configuracion": {
      "n_codcon": 1,
      "v_descripcion": "Curso Virtual - Beneficios Sociales",
      "d_feciniins": "2025-12-01",
      "d_fecfinins": "2025-12-31",
      "d_fecinieva": "2026-01-01",
      "d_fecfineva": "2026-01-15",
      "v_flagact": "S"
    },
    "dentroDePeriodo": true,
    "mensaje": "Periodo de inscripción activo"
  }
}
```

**Ejemplo:**

```bash
curl http://localhost:3000/api/configuracion/activa
```

**Casos especiales:**

- Si no hay configuración activa:
  ```json
  {
    "success": true,
    "data": {
      "dentroDePeriodo": false,
      "configuracion": null,
      "mensaje": "No hay una configuración activa"
    }
  }
  ```

- Si estamos fuera del periodo:
  ```json
  {
    "success": true,
    "data": {
      "dentroDePeriodo": false,
      "configuracion": { ... },
      "mensaje": "Las inscripciones estuvieron disponibles desde 01/12/2025 hasta 31/12/2025"
    }
  }
  ```

---

## Ubigeos

### 4. Obtener Departamentos

Obtiene la lista completa de los 25 departamentos de Perú.

**Endpoint:** `GET /api/ubigeo/departamentos`

**Parámetros:** Ninguno

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "data": [
    {
      "id_departamento": "01",
      "nombre_departamento": "AMAZONAS"
    },
    {
      "id_departamento": "02",
      "nombre_departamento": "ANCASH"
    },
    {
      "id_departamento": "15",
      "nombre_departamento": "LIMA"
    },
    // ... 22 departamentos más
  ]
}
```

**Ejemplo:**

```bash
curl http://localhost:3000/api/ubigeo/departamentos
```

---

### 5. Obtener Provincias por Departamento

Obtiene las provincias de un departamento específico.

**Endpoint:** `GET /api/ubigeo/provincias/:idDepartamento`

**Parámetros de ruta:**

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| idDepartamento | string | Código del departamento (2 dígitos) | "15" (Lima) |

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "data": [
    {
      "id_provincia": "1501",
      "id_departamento": "15",
      "nombre_provincia": "LIMA"
    },
    {
      "id_provincia": "1502",
      "id_departamento": "15",
      "nombre_provincia": "BARRANCA"
    },
    // ... más provincias
  ]
}
```

**Ejemplos:**

```bash
# Provincias de Lima
curl http://localhost:3000/api/ubigeo/provincias/15

# Provincias de Cusco
curl http://localhost:3000/api/ubigeo/provincias/08

# Provincias de Arequipa
curl http://localhost:3000/api/ubigeo/provincias/04
```

---

### 6. Obtener Distritos por Provincia

Obtiene los distritos de una provincia específica.

**Endpoint:** `GET /api/ubigeo/distritos/:idProvincia`

**Parámetros de ruta:**

| Parámetro | Tipo | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| idProvincia | string | Código de la provincia (4 dígitos) | "1501" (Lima) |

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "data": [
    {
      "id_distrito": "150101",
      "id_provincia": "1501",
      "nombre_distrito": "LIMA"
    },
    {
      "id_distrito": "150102",
      "id_provincia": "1501",
      "nombre_distrito": "ANCÓN"
    },
    {
      "id_distrito": "150140",
      "id_provincia": "1501",
      "nombre_distrito": "MIRAFLORES"
    },
    // ... más distritos (43 en Lima)
  ]
}
```

**Ejemplos:**

```bash
# Distritos de provincia Lima
curl http://localhost:3000/api/ubigeo/distritos/1501

# Distritos de provincia Cusco
curl http://localhost:3000/api/ubigeo/distritos/0801
```

---

## Inscripciones

### 7. Obtener Ocupaciones

Obtiene la lista de ocupaciones disponibles.

**Endpoint:** `GET /api/ocupaciones`

**Parámetros:** Ninguno

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "data": [
    {
      "n_codocu": 1,
      "v_ocupacion": "Empleador"
    },
    {
      "n_codocu": 2,
      "v_ocupacion": "Trabajador"
    },
    {
      "n_codocu": 3,
      "v_ocupacion": "Miembro del Comité de Seguridad y Salud en el Trabajo"
    },
    {
      "n_codocu": 4,
      "v_ocupacion": "Supervisor de Seguridad y Salud en el Trabajo"
    },
    {
      "n_codocu": 5,
      "v_ocupacion": "Otros"
    }
  ]
}
```

**Ejemplo:**

```bash
curl http://localhost:3000/api/ocupaciones
```

---

### 8. Crear Inscripción

Registra una nueva inscripción al curso.

**Endpoint:** `POST /api/inscripciones`

**Headers requeridos:**

```
Content-Type: application/json
```

**Body (JSON):**

```json
{
  "n_codcur": 1,
  "v_nombres": "JUAN CARLOS",
  "v_apepaterno": "PEREZ",
  "v_apematerno": "GONZALEZ",
  "v_tipodoc": "DNI",
  "v_nrodoc": "12345678",
  "d_fechanac": "1990-05-15",
  "n_codocu": 2,
  "v_departamento": "LIMA",
  "v_provincia": "LIMA",
  "v_distrito": "MIRAFLORES",
  "v_email": "juan.perez@gmail.com",
  "n_numtelf": "987654321",
  "v_autoriza": "S"
}
```

**Descripción de campos:**

| Campo | Tipo | Obligatorio | Validación | Ejemplo |
|-------|------|-------------|------------|---------|
| n_codcur | number | Sí | Curso existente | 1 |
| v_nombres | string | Sí | Solo letras y espacios | "JUAN CARLOS" |
| v_apepaterno | string | Sí | Solo letras y espacios | "PEREZ" |
| v_apematerno | string | Sí | Solo letras y espacios | "GONZALEZ" |
| v_tipodoc | string | Sí | DNI, CE o PTP | "DNI" |
| v_nrodoc | string | Sí | DNI: 8 dígitos / CE-PTP: 8-20 alfanuméricos | "12345678" |
| d_fechanac | string | Sí | Formato YYYY-MM-DD, mayor de 18 años | "1990-05-15" |
| n_codocu | number | Sí | Ocupación existente | 2 |
| v_departamento | string | Sí | Departamento válido | "LIMA" |
| v_provincia | string | Sí | Provincia válida | "LIMA" |
| v_distrito | string | Sí | Distrito válido | "MIRAFLORES" |
| v_email | string | Sí | Email válido, solo @gmail.com | "juan@gmail.com" |
| n_numtelf | string | Sí | 9 dígitos, empieza con 9 | "987654321" |
| v_autoriza | string | Sí | S o N | "S" |

**Respuesta exitosa (201):**

```json
{
  "success": true,
  "data": {
    "n_codins": 1,
    "n_codcur": 1,
    "v_nombres": "JUAN CARLOS",
    "v_apepaterno": "PEREZ",
    "v_apematerno": "GONZALEZ",
    "v_tipodoc": "DNI",
    "v_nrodoc": "12345678",
    "d_fechanac": "1990-05-15",
    "n_codocu": 2,
    "v_departamento": "LIMA",
    "v_provincia": "LIMA",
    "v_distrito": "MIRAFLORES",
    "v_email": "juan.perez@gmail.com",
    "n_numtelf": "987654321",
    "v_autoriza": "S",
    "created_at": "2024-12-03T15:30:00.000Z"
  },
  "message": "Inscripción registrada exitosamente"
}
```

**Errores posibles:**

```json
// 400 - Fuera del periodo de inscripción
{
  "success": false,
  "error": "Las inscripciones estuvieron disponibles desde 01/12/2024 hasta 31/12/2024"
}

// 400 - Error de validación
{
  "success": false,
  "error": "Error de validación",
  "details": [
    {
      "type": "field",
      "msg": "El DNI debe tener 8 dígitos numéricos",
      "path": "v_nrodoc",
      "location": "body"
    }
  ]
}

// 409 - Documento duplicado
{
  "success": false,
  "error": "Ya existe una inscripción con este documento en este curso"
}
```

**Ejemplo con cURL:**

```bash
curl -X POST http://localhost:3000/api/inscripciones \
  -H "Content-Type: application/json" \
  -d '{
    "n_codcur": 1,
    "v_nombres": "JUAN CARLOS",
    "v_apepaterno": "PEREZ",
    "v_apematerno": "GONZALEZ",
    "v_tipodoc": "DNI",
    "v_nrodoc": "12345678",
    "d_fechanac": "1990-05-15",
    "n_codocu": 2,
    "v_departamento": "LIMA",
    "v_provincia": "LIMA",
    "v_distrito": "MIRAFLORES",
    "v_email": "juan.perez@gmail.com",
    "n_numtelf": "987654321",
    "v_autoriza": "S"
  }'
```

---

### 9. Contar Inscripciones

Obtiene el total de inscripciones registradas en un curso.

**Endpoint:** `GET /api/inscripciones/count`

**Parámetros de query:**

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| idCurso | number | Sí | ID del curso a consultar |

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "data": {
    "total": 1523
  }
}
```

**Errores posibles:**

```json
// 400 - Parámetro faltante
{
  "success": false,
  "error": "El parámetro idCurso es obligatorio"
}
```

**Ejemplos:**

```bash
# Contar inscritos del curso 1
curl "http://localhost:3000/api/inscripciones/count?idCurso=1"
```

---

## WhatsApp

### 10. Obtener Grupo de WhatsApp Activo

Obtiene el grupo de WhatsApp correspondiente según el número total de inscritos.

**Endpoint:** `GET /api/whatsapp/grupo-activo`

**Parámetros de query:**

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| idCurso | number | Sí | ID del curso |

**Lógica de asignación:**

| Total de Inscritos | Grupo Asignado |
|-------------------|----------------|
| 1 - 1500 | Grupo WhatsApp 1 |
| 1501 - 3000 | Grupo WhatsApp 2 |
| 3001 - 4500 | Grupo WhatsApp 3 |
| 4501+ | Grupo WhatsApp 4 |

**Respuesta exitosa (200):**

```json
{
  "success": true,
  "data": {
    "nombreGrupo": "Grupo WhatsApp 1",
    "link": "https://chat.whatsapp.com/1dgvYM8Mk1x5iJe3q0vd"
  }
}
```

**Errores posibles:**

```json
// 400 - Parámetro faltante
{
  "success": false,
  "error": "El parámetro idCurso es obligatorio"
}

// 404 - Sin grupos configurados
{
  "success": false,
  "error": "No se encontró un grupo de WhatsApp configurado"
}
```

**Ejemplos:**

```bash
# Obtener grupo activo del curso 1
curl "http://localhost:3000/api/whatsapp/grupo-activo?idCurso=1"
```

---

## 📊 Códigos de Estado

| Código | Descripción |
|--------|-------------|
| 200 | OK - Petición exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Error en los datos enviados |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto (ej: duplicado) |
| 500 | Internal Server Error - Error del servidor |

---

## ⚠️ Manejo de Errores

### Estructura de Error Estándar

```json
{
  "success": false,
  "error": "Mensaje descriptivo del error"
}
```

### Errores de Validación

```json
{
  "success": false,
  "error": "Error de validación",
  "details": [
    {
      "type": "field",
      "msg": "El DNI debe tener 8 dígitos numéricos",
      "path": "v_nrodoc",
      "location": "body"
    },
    {
      "type": "field",
      "msg": "El email debe ser del dominio @gmail.com",
      "path": "v_email",
      "location": "body"
    }
  ]
}
```

---

## 🔄 Flujo de Inscripción Completo

### Paso a paso desde el frontend:

```
1. GET /api/configuracion/activa
   ↓ Verificar dentroDePeriodo = true
   
2. GET /api/ubigeo/departamentos
   ↓ Usuario selecciona departamento
   
3. GET /api/ubigeo/provincias/:idDepartamento
   ↓ Usuario selecciona provincia
   
4. GET /api/ubigeo/distritos/:idProvincia
   ↓ Usuario selecciona distrito
   
5. GET /api/ocupaciones
   ↓ Usuario selecciona ocupación
   
6. Usuario completa el formulario
   ↓
   
7. POST /api/inscripciones
   ↓ Validaciones + Guardar en BD
   
8. GET /api/whatsapp/grupo-activo?idCurso=1
   ↓ Mostrar link de WhatsApp correspondiente
```

---

## 📝 Notas Importantes

1. **Todos los endpoints devuelven JSON**
2. **Las fechas están en formato ISO 8601** (YYYY-MM-DD)
3. **Los códigos de ubigeo siguen el estándar INEI/UBIGEO**
4. **Solo se permiten emails @gmail.com**
5. **No se puede inscribir el mismo DNI dos veces en el mismo curso**
6. **El grupo de WhatsApp se asigna dinámicamente según el total de inscritos**

---

## 🧪 Testing

Para probar los endpoints, puedes usar:

- **cURL** (línea de comandos)
- **Postman** (GUI)
- **Thunder Client** (extensión VS Code)
- **Navegador** (solo GET requests)

Ver más ejemplos en: [TESTING.md](./TESTING.md)

---

**Última actualización:** Diciembre 2024  
**Versión API:** 1.0.0
