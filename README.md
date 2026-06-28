# Crediflash

Sitio web estatico para Crediflash, una propuesta de prestamos rapidos y accesibles. El proyecto presenta la empresa, sus servicios, requisitos, un cotizador integrado al formulario de solicitud y datos de contacto.

Proyecto final del Grupo #5 para la asignatura Taller de Programacion II.

## Integrantes

- Edison Mezquita Ramirez
- Jean Carlos Ortiz Perez
- Nasla Chantal Mesa

## Descripcion

Crediflash es una pagina informativa y funcional desarrollada con HTML, CSS y JavaScript puro. El sitio permite que una persona conozca la empresa, revise los requisitos basicos para solicitar un prestamo, calcule una estimacion del monto a pagar y envie una solicitud simulada desde el navegador.

No usa frameworks ni dependencias externas. Todo el comportamiento se ejecuta directamente en el navegador.

## Funcionalidades

- Navegacion por secciones: Nosotros, Cotizar, Requisitos, Solicitud y Contacto.
- Menu responsive para pantallas pequenas.
- Seccion de presentacion de la empresa.
- Tarjetas de servicios principales.
- Listado claro de requisitos para solicitar un prestamo.
- Cotizador de prestamos integrado dentro del formulario de solicitud.
- Seleccion de monto entre RD$100 y RD$20,000.
- Plazos disponibles de 6, 12 y 24 meses.
- Calculo automatico del total estimado y la cuota mensual.
- Formulario con datos del solicitante, motivo del prestamo y comentario adicional.
- Resumen de solicitud recibido al enviar el formulario.
- Diseno adaptable para computadoras, tabletas y celulares.

## Estructura del proyecto

```text
crediflash/
├── README.md
├── index.html
├── styles/
│   └── styles.css
├── js/
│   └── app.js
└── images/
    ├── logo-crediflash.png
    ├── logo-crediflash-header.png
    └── hero-crediflash.png
```

## Archivos principales

- `index.html`: contiene la estructura principal del sitio, las secciones visibles, el formulario y el cotizador.
- `styles/styles.css`: contiene los estilos visuales, el layout responsive, botones, tarjetas, formulario, menu y footer.
- `js/app.js`: contiene la logica del cotizador, el menu movil, el envio del formulario y el resumen de solicitud.
- `images/`: contiene los recursos graficos usados por la pagina.

## Como abrir el proyecto

1. Abre la carpeta del proyecto.
2. Haz doble clic en `index.html`.
3. El sitio se abrira en el navegador.

Tambien puedes levantar un servidor local simple si deseas probarlo desde `localhost`:

```bash
python3 -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

## Flujo de uso

1. El usuario entra a la pagina y lee la informacion de Crediflash.
2. Revisa los servicios y requisitos.
3. Entra al formulario de solicitud.
4. Ajusta el monto del prestamo con el control deslizante o los botones `+` y `-`.
5. Selecciona el plazo a pagar.
6. El sistema calcula automaticamente el total estimado y la cuota mensual.
7. Completa sus datos personales.
8. Envia la solicitud.
9. La pagina muestra un resumen con los datos principales enviados.

## Logica del cotizador

El calculo usa el monto solicitado y el plazo elegido.

Primero se aplica una base segun el monto:

- Menos de RD$5,000: el monto se multiplica por `1.5`.
- Desde RD$5,000 hasta menos de RD$10,000: se multiplica por `1.4`.
- Desde RD$10,000 hasta menos de RD$15,000: se multiplica por `1.3`.
- Desde RD$15,000 en adelante: se multiplica por `1.2`.

Luego se ajusta segun el plazo:

- 6 meses: se multiplica por `1.1`.
- 12 meses: se multiplica por `1.2`.
- 24 meses: se multiplica por `1.3`.

La cuota mensual se calcula dividiendo el total estimado entre la cantidad de meses seleccionada.

## Validaciones y comportamiento

- El monto minimo permitido es RD$100.
- El monto maximo permitido es RD$20,000.
- Los botones de aumento y reduccion cambian el monto en pasos de RD$100.
- Si el usuario intenta salir del rango permitido, se muestra una alerta.
- Los campos principales del formulario son obligatorios.
- Al enviar la solicitud, el formulario se reinicia y el cotizador vuelve a actualizar sus valores visibles.
- El resultado mostrado en pantalla escapa caracteres especiales para evitar insertar HTML no deseado.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript puro

## Secciones del sitio

- `#nosotros`: presentacion de Crediflash.
- `#beneficios`: servicios y ventajas principales.
- `#requisitos`: requisitos para solicitar un prestamo.
- `#cotizador`: cotizador integrado dentro del formulario.
- `#solicitud`: formulario de solicitud.
- `#contacto`: informacion de contacto y aviso legal.

## Contacto mostrado en la pagina

- Telefono: `(809)-231-8956`
- WhatsApp: `(829)-234-5896`
- Correo: `info@crediflash.com`
- Ciudad: Distrito Nacional, Republica Dominicana.

## Notas

Este proyecto es una simulacion academica. La informacion enviada desde el formulario no se guarda en una base de datos ni se envia a un servidor; solo se muestra un resumen en la misma pagina.
