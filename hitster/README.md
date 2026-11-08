# Hitparty

Juego tipo Hitster desde el teléfono: suena una canción (vista previa de 30 s), tú adivinas el año.

- **Modos:** Línea de tiempo (coloca la canción en orden; gana quien llena su línea) y Adivina el año (puntos: exacto 3, ±2 años 2, ±5 años 1, +1 bonus por título y artista).
- **Filtros:** rango de años, décadas, idioma, género, no repetir canciones ya jugadas.
- **Jugadores:** hasta 8, con nombre.
- **Mis canciones:** agrega las tuyas (título, artista, año, idioma, género).
- **Audio:** iTunes Search API (sin clave ni cuenta). Requiere internet.
- PWA instalable; los datos viven solo en el teléfono.

Catálogo base en `songs.js` (una línea por canción: `título|artista|año|idioma|género`).
