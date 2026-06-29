# Crediflash

Sitio web estático para Crediflash, una propuesta de préstamos rápidos y accesibles. El proyecto presenta la empresa, sus servicios, requisitos, un cotizador integrado al formulario de solicitud y datos de contacto.

Proyecto final del Grupo #5 para la asignatura Taller de Programación II.

## Integrantes

- Edison Mezquita Ramírez
- Jean Carlos Ortiz Pérez
- Nasla Chantal Mesa

## Descripción

Crediflash es una página informativa y funcional desarrollada con HTML, CSS y JavaScript puro. El sitio permite que una persona conozca la empresa, revise los requisitos básicos para solicitar un préstamo, calcule una estimación del monto a pagar y envíe una solicitud simulada desde el navegador.

No usa frameworks ni dependencias externas. Todo el comportamiento se ejecuta directamente en el navegador mediante scripts cargados desde `index.html`.

## Funcionalidades

- Navegación por secciones: Nosotros, Cotizar, Requisitos, Solicitud y Contacto.
- Menú responsive para pantallas pequeñas.
- Sección de presentación de la empresa.
- Tarjetas de servicios principales.
- Listado claro de requisitos para solicitar un préstamo.
- Cotizador de préstamos integrado dentro del formulario de solicitud.
- Selección de monto entre RD$100 y RD$20,000.
- Plazos disponibles de 6, 12 y 24 meses.
- Cálculo automático del total estimado y la cuota mensual.
- Formulario con datos del solicitante, motivo del préstamo y comentario adicional.
- Resumen de solicitud recibido al enviar el formulario.
- Diseño adaptable para computadoras, tabletas y celulares.

## Estructura del proyecto

```text
crediflash/
├── README.md
├── index.html
├── styles/
│   ├── styles.css
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── responsive.css
│   └── sections/
│       ├── header.css
│       ├── hero.css
│       ├── features.css
│       ├── requirements.css
│       ├── application.css
│       └── footer.css
├── js/
│   ├── config.js
│   ├── utils.js
│   ├── calculator.js
│   ├── form.js
│   ├── navigation.js
│   └── app.js
└── images/
    ├── logo-crediflash.png
    ├── logo-crediflash-header.png
    └── hero-crediflash.png
```

## Archivos principales

- `index.html`: contiene la estructura principal del sitio, las secciones visibles, el formulario y el cotizador.
- `styles/styles.css`: importa todos los archivos CSS por orden.
- `styles/base.css`: contiene variables, reset básico y estilos globales.
- `styles/layout.css`: contiene reglas compartidas de layout, encabezados de sección y utilidades visuales.
- `styles/components.css`: contiene botones, tarjetas, controles e inputs reutilizables.
- `styles/sections/`: contiene los estilos específicos de cada sección del sitio.
- `styles/responsive.css`: contiene los ajustes para tabletas y celulares.
- `js/config.js`: contiene los valores configurables del cotizador.
- `js/utils.js`: contiene utilidades reutilizables como formato de moneda y escape de HTML.
- `js/calculator.js`: contiene la lógica del cotizador.
- `js/form.js`: contiene el manejo del formulario y el resumen de solicitud.
- `js/navigation.js`: contiene el comportamiento del menú móvil.
- `js/app.js`: inicializa la página conectando los scripts anteriores con el DOM.
- `images/`: contiene los recursos gráficos usados por la página.

## Organización del código

### CSS

El archivo `styles/styles.css` funciona como punto de entrada de estilos. Desde ahí se importan los demás archivos CSS en este orden:

1. `base.css`: variables, reglas globales y estilos base.
2. `layout.css`: contenedores, espaciados generales, títulos de sección y utilidades compartidas.
3. `components.css`: botones, tarjetas, controles de formulario e inputs reutilizables.
4. `sections/header.css`: estilos del encabezado y la navegación.
5. `sections/hero.css`: estilos de la sección principal.
6. `sections/features.css`: estilos de las tarjetas de servicios.
7. `sections/requirements.css`: estilos de la lista de requisitos.
8. `sections/application.css`: estilos del cotizador, formulario y resultado.
9. `sections/footer.css`: estilos del pie de página.
10. `responsive.css`: ajustes para tabletas y celulares.

### JavaScript

Los archivos JavaScript se cargan al final de `index.html` como scripts normales, sin módulos ni funciones anónimas envolventes. El orden de carga es importante porque cada archivo puede usar funciones o constantes definidas en archivos anteriores:

1. `config.js`: define `MIN_AMOUNT`, `MAX_AMOUNT` y `STEP_AMOUNT`.
2. `utils.js`: define `formatMoney()` y `escapeHtml()`.
3. `calculator.js`: define `calculateTotalToPay()` e `initCalculator()`.
4. `form.js`: define `initLoanForm()`.
5. `navigation.js`: define `initNavigation()`.
6. `app.js`: obtiene los elementos del DOM e inicializa el cotizador, el formulario y la navegación.

## Cómo abrir el proyecto

1. Abre la carpeta del proyecto.
2. Haz doble clic en `index.html`.
3. El sitio se abrirá en el navegador.

También puedes levantar un servidor local simple si deseas probarlo desde `localhost`:

```bash
python3 -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## Flujo de uso

1. El usuario entra a la página y lee la información de Crediflash.
2. Revisa los servicios y requisitos.
3. Entra al formulario de solicitud.
4. Ajusta el monto del préstamo con el control deslizante o los botones `+` y `-`.
5. Selecciona el plazo a pagar.
6. El sistema calcula automáticamente el interés estimado, el total estimado y la cuota mensual.
7. Completa sus datos personales.
8. Envía la solicitud.
9. La página muestra un resumen con los datos principales enviados y una amortización estimada.

## Lógica del cotizador

El cálculo usa el monto solicitado y el plazo elegido.

Primero se aplica una base según el monto:

- Menos de RD$5,000: el monto se multiplica por `1.5`.
- Desde RD$5,000 hasta menos de RD$10,000: se multiplica por `1.4`.
- Desde RD$10,000 hasta menos de RD$15,000: se multiplica por `1.3`.
- Desde RD$15,000 en adelante: se multiplica por `1.2`.

Luego se ajusta según el plazo:

- 6 meses: se multiplica por `1.1`.
- 12 meses: se multiplica por `1.2`.
- 24 meses: se multiplica por `1.3`.

El interés estimado se calcula restando el monto solicitado al total estimado. La cuota mensual se calcula dividiendo el total estimado entre la cantidad de meses seleccionada.

Al enviar la solicitud, el resumen muestra una amortización estimada con capital, interés, pago y balance por cada cuota.

## Validaciones y comportamiento

- El monto mínimo permitido es RD$100.
- El monto máximo permitido es RD$20,000.
- Los botones de aumento y reducción cambian el monto en pasos de RD$100.
- Si el usuario intenta salir del rango permitido, se muestra una alerta.
- Los campos principales del formulario son obligatorios.
- Al enviar la solicitud, el formulario se reinicia y el cotizador vuelve a actualizar sus valores visibles.
- El resultado mostrado en pantalla escapa caracteres especiales para evitar insertar HTML no deseado.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript puro

## Secciones del sitio

- `#nosotros`: presentación de Crediflash.
- `#beneficios`: servicios y ventajas principales.
- `#requisitos`: requisitos para solicitar un préstamo.
- `#cotizador`: cotizador integrado dentro del formulario.
- `#solicitud`: formulario de solicitud.
- `#contacto`: información de contacto y aviso legal.

## Contacto mostrado en la página

- Teléfono: `(809)-231-8956`
- WhatsApp: `(829)-234-5896`
- Correo: `info@crediflash.com`
- Ciudad: Distrito Nacional, República Dominicana.

## Notas

Este proyecto es una simulación académica. La información enviada desde el formulario no se guarda en una base de datos ni se envía a un servidor; solo se muestra un resumen en la misma página.
