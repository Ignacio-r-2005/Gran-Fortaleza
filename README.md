# 🏋️ Gran Fortaleza — Sistema de Gestión de Gimnasio y Suite de Automatización

Sistema web para la gestión integral de socios, clases y reservas de turnos de un gimnasio (`gimnasio_gran_fortaleza`), desarrollado bajo arquitectura **MVC** con implementación de **Patrones de Diseño** y una **suite de pruebas automatizadas con Jest** para validar las reglas de negocio y el flujo de reservas.

---

## 🤖 ¿Qué proceso automatiza?

Este proyecto automatiza la **verificación funcional, validación de reglas de negocio y pruebas de regresión (QA)** del sistema de gestión sin intervención manual ni dependencia de la base de datos en tiempo de prueba:

* **Validación de Socios y Membresías (`socio.test.js`):** Comprueba automáticamente el registro de socios (campos obligatorios, formato de email) y el comportamiento dinámico de membresías **VIP** (prioridad de 48h) y **Descuentos** acumulables mediante el patrón *Decorator*.
* **Control de Turnos y Cupos (`turno.test.js`):** Automatiza escenarios de éxito (*camino feliz*) y error (*camino triste*) en reservas: asignación de lugares, cálculo de cupos disponibles, cancelaciones, bloqueo por turno lleno y prevención de reservas duplicadas por un mismo socio.
* **Validación de Clases y Patrones (`clase.test.js`, `singleton.test.js`):** Verifica la integridad de las clases del gimnasio y garantiza la instancia única del patrón *Singleton*.

---

## 🛠️ Tecnologías y Arquitectura

* **Backend:** Node.js & Express (`app.js`)
* **Motor de Vistas:** EJS (`vista/views/index.ejs`)
* **Base de Datos:** MySQL (`mysql2` — base `gimnasio_gran_fortaleza` con tablas `socios`, `clases`, `turnos` y `reservas`)
* **Testing Automatizado:** Jest (`/tests`)
* **Patrones de Diseño Aplicados (`/patrones`):**
  * **Singleton:** Gestión de instancia única.
  * **Decorator:** Extensión dinámica de beneficios de socios (`SocioVIP`, `SocioConDescuento`).
  * **Mediator:** Coordinación desacoplada entre componentes del sistema.

---

## 📂 Estructura del Proyecto

```text
Gran-Fortaleza/
├── controlador/        # Controladores MVC (SocioController.js, TurnoController.js)
├── modelo/             # Lógica de negocio y entidades (Clase.js, Socio.js, Turno.js)
├── patrones/           # Implementación de patrones (Decorator.js, Mediator.js, Singleton.js)
├── vista/
│   ├── public/         # Archivos estáticos (CSS, JS cliente)
│   └── views/          # Vistas EJS (index.ejs)
├── tests/              # Suite de pruebas automatizadas (Jest)
│   ├── clase.test.js
│   ├── singleton.test.js
│   ├── socio.test.js
│   └── turno.test.js
├── app.js              # Punto de entrada y rutas del servidor Express
└── package.json        # Dependencias y scripts de ejecución
```

---

## 🔌 Endpoints Principales

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/` | Renderiza la interfaz principal (`index.ejs`) |
| `GET` / `POST` | `/turnos`, `/turnos/reservar`, `/turnos/cancelar` | Consulta, reserva y cancelación de turnos |
| `GET` | `/clases` | Listado de clases disponibles |
| `GET` / `POST` / `PUT` / `DELETE` | `/socios` | CRUD completo de socios del gimnasio |
| `GET` / `DELETE` | `/reservas` | Gestión de reservas activas |

---

## 🚀 Cómo instalarlo y ejecutarlo

### 1. Clonar el repositorio e instalar dependencias
```bash
git clone https://github.com/Ignacio-r-2005/Gran-Fortaleza.git
cd Gran-Fortaleza
npm install
```

### 2. Configurar la base de datos MySQL
1. Iniciá **Apache** y **MySQL** desde XAMPP (o tu gestor local).
2. Importá el archivo `schema.sql` en phpMyAdmin o por consola para crear la base `gimnasio_gran_fortaleza` y sus 4 tablas (`clases`, `socios`, `turnos`, `reservas`).

### 3. Levantar la aplicación web
```bash
npm start
```
*(Disponible en `http://localhost:3000`)*

### 4. Ejecutar la suite de pruebas automatizadas
```bash
npm test
```

---

## Autor

**Miguel Ignacio Róvere Prino** · Estudiante de Desarrollo de Software  
GitHub: [@Ignacio-r-2005](https://github.com/Ignacio-r-2005)