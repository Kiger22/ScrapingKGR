# Proyecto de Scraping de Bicicletas

Este proyecto realiza scraping de un sitio web de bicicletas, extrayendo información relevante de cada bicicleta, como el título, el precio y la URL de la imagen. Los datos se guardan en un archivo para análisis o referencia futura.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Consideraciones](#consideraciones)

## Requisitos

- Node.js (versión 12 o superior)
- Puppeteer

## Instalación

1 Clona este repositorio:

```bash
  git clone https://github.com/tuusuario/nombre-repositorio.git
  cd nombre-repositorio
```

2 Instala las dependencias necesarias:

```bash
   npm install
```

## Uso

Para ejecutar el script de scraping:

```bash
   node index.js
```

El script navegará por el sitio web, recolectará los datos de cada bicicleta y guardará la información en un archivo.

### Ejemplo de  estructura de datos

Cada bicicleta extraída se guardara con el siguiente formato

```json
  {
    "title": "Nombre de la Bicicleta",
    "price": "Precio de la Bicicleta",
    "img": "URL de la Imagen de la Bicicleta"
  }
```

## Estructura del proyecto

```bash
|-- index.js          # Script principal 
|-- fileHandler.js    # Funciones para el manejo de archivos
|-- pageScraper.js    # Funciones donde se ejecuta el scraper
|-- package.json      # Dependencias y configuraciones del proyecto
|-- README.md         # Documentación del proyecto
|-- bike.json         # Archivo donde se guarda la información extraída 
```

### Descripción del Código

El archivo fileHandler.js contiene el código del scraping, donde:

Se utiliza Puppeteer para navegar por el sitio web.
Se seleccionan los productos utilizando selectores específicos.
Se extraen datos de cada bicicleta (título, precio e imagen).
Se ejecuta un bucle recursivo para cargar más bicicletas si hay un botón de "Cargar más" disponible.

### Lógica de Carga de Datos

El script verifica si existe un enlace de "Cargar más". Si es así, hace clic en él y espera a que se carguen los nuevos productos, continuando el proceso hasta que ya no haya más bicicletas disponibles.

## Consideraciones

- Cambios en la Estructura del Sitio Web: Este script depende de la estructura HTML del sitio. Si el sitio cambia, los selectores podrían necesitar actualización.

- Tiempo de Espera: Dependiendo de la conexión, puedes ajustar el tiempo de espera (page.waitForSelector) para mejorar el rendimiento o evitar errores.

- Legalidad y Respeto a los Términos de Uso: Asegúrate de que el scraping esté permitido en el sitio web objetivo y respeta los términos de uso.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar el proyecto, por favor realiza un fork del repositorio, haz tus cambios y envía un pull request.

## Licencia

Este proyecto está bajo la Licencia  - mira el archivo [LICENSE.md](LICENSE.md) para detalles

## Expresiones de Gratitud

- Rock the Code  
- Gracias por las contribuciones, feedback y correcciones.

---

**⌨️ por [kiger22](https://github.com/Kiger22)**