# Hitparty

Juego tipo Hitster desde el teléfono: suena una canción (vista previa de 30 s), tú adivinas el año.

- **Modos:** Línea de tiempo (coloca la canción en orden; gana quien llena su línea) y Adivina el año (puntos: exacto 3, ±2 años 2, ±5 años 1, +1 bonus por título y artista).
- **Filtros:** rango de años, décadas, idioma, género, no repetir canciones ya jugadas.
- **Jugadores:** hasta 8, con nombre.
- **Mis canciones:** agrega las tuyas (título, artista, año, idioma, género).
- **Audio:** iTunes Search API (sin clave ni cuenta). Requiere internet.
- PWA instalable; los datos viven solo en el teléfono.

Catálogo base en `songs.js` (una línea por canción: `título|artista|año|idioma|género`).

## Spotify (opcional)
1. Crea una app en https://developer.spotify.com/dashboard y copia su **Client ID** (32 caracteres).
2. Registra como *Redirect URI* la URL exacta donde publiques `hitster/` (se muestra en la app).
3. En modo desarrollo, agrega tu cuenta en *User Management* de esa app.
4. En la app: pega el Client ID → **Conectar con Spotify** → elige playlists → **Importar**.

Audio completo (30 s desde el segundo 30) con Premium: usa el reproductor web (Android/escritorio) o la app de Spotify abierta en el teléfono (iPhone). Sin conexión a Spotify se usan las vistas previas de iTunes. El año sale de la fecha del álbum, que en reediciones puede diferir del original.
