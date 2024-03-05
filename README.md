# Tu Parada

## Setup

Requisitos:

* Gestor de paquetes PNPN, https://pnpm.io/
* NodeJS versión 20

Instalación: `pnpm install`

Después debes de entrar tanto a `apps/server` como a `apps/client` y ejecutar `pnpm run dev` en ambos lo que levantará el servidor de desarrollo.

## TODOs

### Esencial

- [x] Obtener el nombre de paradas de la API Oficial en vez de los datos de Google Transit ya que están más actualizados
- [ ] Implementar sistema de caché para que la web recargué (vuelva a consultar próximas guaguas) cada 30 segundos / 1 minuto
- [ ] Cachear los datos en el servidor 10 segundos o más? Implementar ratelimit en el servidor?
- [ ] Implementar funcionalidad de paradas guardadas / favoritas, en la app se usa el término de favoritas pero yo creo que es más apropiado guardado
- [ ] Estilar listado de guaguas llegando
- [ ] Estilar mejor página principal, elegir un esquema de colores adecuado

### Nice to have
- [ ] Implementar búsqueda de paradas cercanas con lat y log de paradas
- [ ] Implementar resolvedor de acrónimos para la búsqueda? (ctra => carretera)
- [ ] Implementar funcionalidad de búsqueda de paradas recientes (sección aparte o en el dropdown de búsqueda?)
