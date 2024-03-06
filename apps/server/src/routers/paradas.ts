import { TRPCError } from '@trpc/server'
import got from 'got'
import { z } from 'zod'
import Constants from '../Constants.js'
import stops from '../data/paradas.json' assert { type: 'json' }
import { publicProcedure, router } from '../trpc.js'
import getRouteColor from '../utils/getRouteColor.js'

const InputSchema = z.object({
  id: z.number().int().min(1).max(999)
})

const OutputSchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  lines: z.array(z.object({
    destination: z.string(),
    arrival_time: z.string(),
    number: z.string(),
    color: z.string().optional()
  }))
})

const APIResponseSchema = z.object({
  nombre: z.string(),
  lineas: z.array(z.object({
    destino: z.string(),
    llegada: z.string(),
    numero: z.string()
  }))
})

export const paradasRouter = router({
  get: publicProcedure
    .input(InputSchema)
    .output(OutputSchema)
    .mutation(async ({ input }) => {
      const response = await got.get(
        `${Constants.API_URL}/parada/${input.id}`,
        {
          headers: { accept: 'application/json' },
          retry: { limit: 3 },
          responseType: 'json'
        }
      )

      if (response.statusCode === 404) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }
      if (response.statusCode !== 200) {
        throw new TRPCError({ code: 'BAD_REQUEST' })
      }

      try {
        const outputData = APIResponseSchema.parse(response.body)
        const stopDataFromJSON = stops.find(({ id }) => parseInt(id) === input.id)
        const stopProcessedData: z.infer<typeof OutputSchema> = {
          id: input.id,
          name: outputData.nombre,
          latitude: stopDataFromJSON?.latitude != null ? parseFloat(stopDataFromJSON?.latitude) : undefined,
          longitude: stopDataFromJSON?.longitude != null ? parseFloat(stopDataFromJSON?.longitude) : undefined,
          lines: outputData.lineas.map(({ destino, llegada, numero }) => ({
            color: getRouteColor(numero),
            arrival_time: llegada,
            destination: destino,
            number: numero
          }))

        }
        return stopProcessedData
      } catch (err) {
        console.error(err)
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' })
      }
    })
})
