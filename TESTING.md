# 🧪 Guía de Testing - Sistema de Inscripciones SUNAFIL

Guía completa para probar todos los endpoints del API.

---

## 📋 Tabla de Contenidos

- [Herramientas de Testing](#herramientas-de-testing)
- [Setup Inicial](#setup-inicial)
- [Testing con cURL](#testing-con-curl)
- [Testing con Postman](#testing-con-postman)
- [Testing con Thunder Client](#testing-con-thunder-client)
- [Testing desde el Navegador](#testing-desde-el-navegador)
- [Scripts de Testing Automatizado](#scripts-de-testing-automatizado)
- [Casos de Prueba](#casos-de-prueba)
- [Testing de Validaciones](#testing-de-validaciones)

---

## 🛠️ Herramientas de Testing

### Opciones disponibles:

| Herramienta | Tipo | Dificultad | Recomendado para |
|-------------|------|------------|------------------|
| **cURL** | CLI | ⭐⭐⭐ | Testing rápido, scripts |
| **Postman** | GUI | ⭐⭐ | Testing completo, documentación |
| **Thunder Client** | VS Code Extension | ⭐ | Desarrolladores en VS Code |
| **Navegador** | Web | ⭐ | Solo GET requests |
| **JavaScript (fetch)** | Código | ⭐⭐ | Testing desde consola del navegador |

---

## ⚙️ Setup Inicial

### 1. Iniciar el servidor

```bash
npm run dev
```

Verifica que esté corriendo en: `http://localhost:3000`

### 2. Verificar salud del servidor

```bash
curl http://localhost:3000/health
```

**Respuesta esperada:**

```json
{
  "success": true,
  "status": "OK",
  "timestamp": "2024-12-03T15:30:00.000Z"
}
```

Si ves esto, ¡estás listo para testing! ✅

---

## 💻 Testing con cURL

cURL es una herramienta de línea de comandos incluida en Windows 10+, macOS y Linux.

### Test 1: Información de la API

```bash
curl http://localhost:3000/
```

### Test 2: Health Check

```bash
curl http://localhost:3000/health
```

### Test 3: Configuración Activa

```bash
curl http://localhost:3000/api/configuracion/activa
```

### Test 4: Obtener Departamentos

```bash
curl http://localhost:3000/api/ubigeo/departamentos
```

### Test 5: Obtener Provincias (Lima = 15)

```bash
curl http://localhost:3000/api/ubigeo/provincias/15
```

### Test 6: Obtener Distritos (Provincia Lima = 1501)

```bash
curl http://localhost:3000/api/ubigeo/distritos/1501
```

### Test 7: Obtener Ocupaciones

```bash
curl http://localhost:3000/api/ocupaciones
```

### Test 8: Contar Inscripciones

```bash
curl "http://localhost:3000/api/inscripciones/count?idCurso=1"
```

**Nota:** Las comillas son necesarias cuando hay parámetros de query.

### Test 9: Obtener Grupo de WhatsApp

```bash
curl "http://localhost:3000/api/whatsapp/grupo-activo?idCurso=1"
```

### Test 10: Crear Inscripción (POST)

```bash
curl -X POST http://localhost:3000/api/inscripciones \
  -H "Content-Type: application/json" \
  -d '{
    "n_codcur": 1,
    "v_nombres": "MARIA ELENA",
    "v_apepaterno": "RODRIGUEZ",
    "v_apematerno": "LOPEZ",
    "v_tipodoc": "DNI",
    "v_nrodoc": "87654321",
    "d_fechanac": "1995-03-20",
    "n_codocu": 2,
    "v_departamento": "LIMA",
    "v_provincia": "LIMA",
    "v_distrito": "MIRAFLORES",
    "v_email": "maria.rodriguez@gmail.com",
    "n_numtelf": "998877665",
    "v_autoriza": "S"
  }'
```

**Windows PowerShell:** Si usas PowerShell, usa esta sintaxis:

```powershell
curl -Method POST http://localhost:3000/api/inscripciones `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{
    "n_codcur": 1,
    "v_nombres": "MARIA ELENA",
    ...
  }'
```

---

## 📬 Testing con Postman

Postman es una herramienta GUI potente para testing de APIs.

### Instalación

1. Descarga Postman: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. Instala y crea una cuenta (gratis)

### Crear Colección

1. Crea una nueva **Collection** llamada "SUNAFIL - Inscripciones API"
2. Agrega las siguientes requests:

#### Request 1: Health Check

- **Method:** GET
- **URL:** `http://localhost:3000/health`
- **Headers:** (ninguno necesario)

#### Request 2: Departamentos

- **Method:** GET
- **URL:** `http://localhost:3000/api/ubigeo/departamentos`

#### Request 3: Provincias

- **Method:** GET
- **URL:** `http://localhost:3000/api/ubigeo/provincias/{{idDepartamento}}`
- **Variables:**
  - `idDepartamento` = `15` (puedes cambiar)

#### Request 4: Crear Inscripción

- **Method:** POST
- **URL:** `http://localhost:3000/api/inscripciones`
- **Headers:**
  - `Content-Type`: `application/json`
- **Body (raw JSON):**

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
  "v_distrito": "SAN ISIDRO",
  "v_email": "juan.perez@gmail.com",
  "n_numtelf": "987654321",
  "v_autoriza": "S"
}
```

### Usar Variables en Postman

Crea variables de entorno:

1. Clic en el icono de engranaje (Settings)
2. **Environments** → **Add**
3. Nombre: `Local`
4. Variables:
   - `base_url` = `http://localhost:3000`
   - `idDepartamento` = `15`
   - `idProvincia` = `1501`
   - `idCurso` = `1`

Luego usa: `{{base_url}}/api/ubigeo/departamentos`

---

## ⚡ Testing con Thunder Client (VS Code)

Thunder Client es una extensión de VS Code, perfecta si ya estás programando en VS Code.

### Instalación

1. Abre VS Code
2. Ve a Extensions (`Ctrl+Shift+X`)
3. Busca "Thunder Client"
4. Instala

### Crear Requests

1. Haz clic en el icono de rayo en la barra lateral
2. Crea una nueva **Collection**: "SUNAFIL API"
3. Agrega requests igual que en Postman

**Ventajas:**
- No necesitas salir de VS Code
- Más ligero que Postman
- Guarda las requests en tu proyecto

---

## 🌐 Testing desde el Navegador

### Testing de GET requests

Simplemente abre estas URLs en tu navegador:

```
http://localhost:3000/
http://localhost:3000/health
http://localhost:3000/api/configuracion/activa
http://localhost:3000/api/ubigeo/departamentos
http://localhost:3000/api/ubigeo/provincias/15
http://localhost:3000/api/ubigeo/distritos/1501
http://localhost:3000/api/ocupaciones
http://localhost:3000/api/inscripciones/count?idCurso=1
http://localhost:3000/api/whatsapp/grupo-activo?idCurso=1
```

### Testing de POST desde la consola del navegador

1. Abre cualquier página en tu navegador
2. Presiona `F12` para abrir DevTools
3. Ve a la pestaña **Console**
4. Pega este código:

```javascript
// Crear inscripción
fetch('http://localhost:3000/api/inscripciones', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    n_codcur: 1,
    v_nombres: "CARLOS ALBERTO",
    v_apepaterno: "MENDOZA",
    v_apematerno: "SILVA",
    v_tipodoc: "DNI",
    v_nrodoc: "45678901",
    d_fechanac: "1992-08-10",
    n_codocu: 2,
    v_departamento: "LIMA",
    v_provincia: "LIMA",
    v_distrito: "SURCO",
    v_email: "carlos.mendoza@gmail.com",
    n_numtelf: "976543210",
    v_autoriza: "S"
  })
})
.then(res => res.json())
.then(data => console.log('✅ Resultado:', data))
.catch(error => console.error('❌ Error:', error));
```

---

## 🤖 Scripts de Testing Automatizado

### Crear un script de testing

Crea un archivo `test-api.js`:

```javascript
const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 INICIANDO TESTS DEL API\n');
  
  // Test 1: Health Check
  console.log('Test 1: Health Check');
  try {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    console.log(data.success ? '✅ PASS' : '❌ FAIL');
  } catch (error) {
    console.log('❌ FAIL:', error.message);
  }
  
  // Test 2: Departamentos
  console.log('\nTest 2: Obtener Departamentos');
  try {
    const res = await fetch(`${BASE_URL}/api/ubigeo/departamentos`);
    const data = await res.json();
    console.log(data.success && data.data.length === 25 ? '✅ PASS (25 departamentos)' : '❌ FAIL');
  } catch (error) {
    console.log('❌ FAIL:', error.message);
  }
  
  // Test 3: Provincias
  console.log('\nTest 3: Obtener Provincias de Lima');
  try {
    const res = await fetch(`${BASE_URL}/api/ubigeo/provincias/15`);
    const data = await res.json();
    console.log(data.success && data.data.length > 0 ? '✅ PASS' : '❌ FAIL');
  } catch (error) {
    console.log('❌ FAIL:', error.message);
  }
  
  // Test 4: Crear Inscripción
  console.log('\nTest 4: Crear Inscripción');
  try {
    const res = await fetch(`${BASE_URL}/api/inscripciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        n_codcur: 1,
        v_nombres: "TEST USER",
        v_apepaterno: "TESTING",
        v_apematerno: "SCRIPT",
        v_tipodoc: "DNI",
        v_nrodoc: Math.floor(10000000 + Math.random() * 90000000).toString(),
        d_fechanac: "1990-01-15",
        n_codocu: 2,
        v_departamento: "LIMA",
        v_provincia: "LIMA",
        v_distrito: "MIRAFLORES",
        v_email: `test${Date.now()}@gmail.com`,
        n_numtelf: "9" + Math.floor(10000000 + Math.random() * 90000000).toString(),
        v_autoriza: "S"
      })
    });
    const data = await res.json();
    console.log(data.success ? '✅ PASS' : '❌ FAIL:', data.error);
  } catch (error) {
    console.log('❌ FAIL:', error.message);
  }
  
  console.log('\n✅ Tests completados');
}

testAPI();
```

Ejecuta con Node.js:

```bash
node test-api.js
```

---

## 📋 Casos de Prueba

### Casos de Prueba Exitosos

#### CP-01: Inscripción válida con DNI

**Datos:**
```json
{
  "v_tipodoc": "DNI",
  "v_nrodoc": "12345678",
  "v_email": "test@gmail.com",
  ...
}
```

**Resultado esperado:** Status 201, inscripción creada

---

#### CP-02: Inscripción válida con CE

**Datos:**
```json
{
  "v_tipodoc": "CE",
  "v_nrodoc": "ABC123456789",
  ...
}
```

**Resultado esperado:** Status 201, inscripción creada

---

#### CP-03: Cascada de ubigeos

**Flujo:**
1. GET /departamentos → Seleccionar Lima (15)
2. GET /provincias/15 → Seleccionar Lima (1501)
3. GET /distritos/1501 → Seleccionar Miraflores (150140)

**Resultado esperado:** Cada paso devuelve datos correctos

---

### Casos de Prueba de Error

#### CP-04: DNI con menos de 8 dígitos

**Datos:**
```json
{
  "v_tipodoc": "DNI",
  "v_nrodoc": "1234567"  // ❌ Solo 7 dígitos
}
```

**Resultado esperado:** Status 400, error de validación

---

#### CP-05: Email sin @gmail.com

**Datos:**
```json
{
  "v_email": "test@hotmail.com"  // ❌ No es @gmail.com
}
```

**Resultado esperado:** Status 400, error de validación

---

#### CP-06: Teléfono inválido

**Datos:**
```json
{
  "n_numtelf": "876543210"  // ❌ No empieza con 9
}
```

**Resultado esperado:** Status 400, error de validación

---

#### CP-07: Menor de edad

**Datos:**
```json
{
  "d_fechanac": "2010-01-01"  // ❌ Tiene solo 14 años
}
```

**Resultado esperado:** Status 400, error de validación

---

#### CP-08: DNI duplicado en el mismo curso

**Flujo:**
1. POST inscripción con DNI "12345678" → Status 201
2. POST inscripción con DNI "12345678" → Status 409

**Resultado esperado:** Segunda inscripción rechazada

---

#### CP-09: Fuera del periodo de inscripción

**Precondición:** Configurar fechas pasadas en BD

**Resultado esperado:** Status 400, "Fuera del periodo de inscripción"

---

## ✅ Testing de Validaciones

### Script para probar todas las validaciones

```javascript
const tests = [
  {
    name: "DNI con 7 dígitos (inválido)",
    data: { v_tipodoc: "DNI", v_nrodoc: "1234567" },
    expectedStatus: 400
  },
  {
    name: "Email sin @gmail.com (inválido)",
    data: { v_email: "test@hotmail.com" },
    expectedStatus: 400
  },
  {
    name: "Teléfono sin 9 inicial (inválido)",
    data: { n_numtelf: "876543210" },
    expectedStatus: 400
  },
  {
    name: "Menor de edad (inválido)",
    data: { d_fechanac: "2010-01-01" },
    expectedStatus: 400
  },
  {
    name: "Nombres con números (inválido)",
    data: { v_nombres: "JUAN123" },
    expectedStatus: 400
  }
];

async function runValidationTests() {
  for (const test of tests) {
    console.log(`\nTest: ${test.name}`);
    
    const payload = {
      n_codcur: 1,
      v_nombres: "JUAN",
      v_apepaterno: "PEREZ",
      v_apematerno: "LOPEZ",
      v_tipodoc: "DNI",
      v_nrodoc: "12345678",
      d_fechanac: "1990-05-15",
      n_codocu: 2,
      v_departamento: "LIMA",
      v_provincia: "LIMA",
      v_distrito: "MIRAFLORES",
      v_email: "juan@gmail.com",
      n_numtelf: "987654321",
      v_autoriza: "S",
      ...test.data  // Sobreescribe con datos del test
    };
    
    const res = await fetch('http://localhost:3000/api/inscripciones', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (res.status === test.expectedStatus) {
      console.log('✅ PASS');
    } else {
      console.log('❌ FAIL: Expected', test.expectedStatus, 'got', res.status);
    }
  }
}

runValidationTests();
```

---

## 📊 Matriz de Testing

| Endpoint | Método | Parámetros | Status OK | Status Error |
|----------|--------|------------|-----------|--------------|
| `/health` | GET | - | 200 | - |
| `/api/configuracion/activa` | GET | - | 200 | - |
| `/api/ubigeo/departamentos` | GET | - | 200 | 500 |
| `/api/ubigeo/provincias/:id` | GET | idDepartamento | 200 | 500 |
| `/api/ubigeo/distritos/:id` | GET | idProvincia | 200 | 500 |
| `/api/ocupaciones` | GET | - | 200 | 500 |
| `/api/inscripciones` | POST | body | 201 | 400, 409 |
| `/api/inscripciones/count` | GET | idCurso | 200 | 400 |
| `/api/whatsapp/grupo-activo` | GET | idCurso | 200 | 400, 404 |

---

## 🎯 Checklist de Testing Completo

Antes de considerar el API listo para producción:

- [ ] ✅ Todos los endpoints GET responden correctamente
- [ ] ✅ El POST de inscripciones crea registros en la BD
- [ ] ✅ Las validaciones rechazan datos inválidos
- [ ] ✅ No se permiten DNI duplicados en el mismo curso
- [ ] ✅ La verificación de periodo funciona
- [ ] ✅ Los grupos de WhatsApp se asignan correctamente
- [ ] ✅ CORS permite peticiones del frontend
- [ ] ✅ Los errores devuelven mensajes claros
- [ ] ✅ El servidor maneja errores sin crashear
- [ ] ✅ Los logs muestran información útil

---

## 🚀 Próximos Pasos

1. **Testing Automatizado:** Implementar tests con Jest o Mocha
2. **CI/CD:** Integrar tests en GitHub Actions
3. **Load Testing:** Probar con herramientas como k6 o Apache JMeter
4. **Monitoring:** Implementar Sentry para tracking de errores

---

**¿Encontraste un bug?** Documenta:
1. Endpoint afectado
2. Datos enviados
3. Respuesta recibida
4. Respuesta esperada

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0
