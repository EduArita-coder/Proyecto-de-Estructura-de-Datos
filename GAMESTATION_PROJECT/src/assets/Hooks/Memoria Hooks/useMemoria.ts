import { useState, useEffect } from 'react'

interface Carta {
  id: number
  simbolo: string
  volteada: boolean
  emparejada: boolean
}

const simbolos = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍑']

// Mezcla un arreglo al azar Fisher-Yates.
function mezclar(arreglo: string[]) {
  const copia = [...arreglo]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = copia[i]
    copia[i] = copia[j]
    copia[j] = temp
  }
  return copia
}

function crearMazo(): Carta[] {
  const simbolosDuplicados = mezclar([...simbolos, ...simbolos])
  const mazo: Carta[] = []

  for (let i = 0; i < simbolosDuplicados.length; i++) {
    mazo.push({
      id: i,
      simbolo: simbolosDuplicados[i],
      volteada: false,
      emparejada: false,
    })
  }

  return mazo
}

export const useMemoriaHooks = () => {
  const [cartas, setCartas] = useState<Carta[]>(crearMazo())
  // Guarda los indices de las (maximo 2) cartas volteadas ahora mismo.
  const [seleccionadas, setSeleccionadas] = useState<number[]>([])
  const [movimientos, setMovimientos] = useState(0)
  const [mejorPuntaje, setMejorPuntaje] = useState<number | null>(null)

  const juegoGanado = cartas.every((carta) => carta.emparejada)

  useEffect(() => {
    const guardado = localStorage.getItem('mejorPuntajeMemoria')
    if (guardado) {
      setMejorPuntaje(Number(guardado))
    }
  }, [])

  // Este useEffect se dispara cuando el jugador voltea la 2da carta.
  useEffect(() => {
    if (seleccionadas.length !== 2) return

    const primeraIndex = seleccionadas[0]
    const segundaIndex = seleccionadas[1]
    const primera = cartas[primeraIndex]
    const segunda = cartas[segundaIndex]

    setMovimientos(movimientos + 1)

    if (primera.simbolo === segunda.simbolo) {
      // Coinciden: las marcamos como emparejadas.
      const nuevasCartas = cartas.map((carta, index) => {
        if (index === primeraIndex || index === segundaIndex) {
          return { ...carta, emparejada: true }
        }
        return carta
      })
      setCartas(nuevasCartas)
      setSeleccionadas([])
    } else {
      // No coinciden: esperamos un poco y las volteamos de nuevo.
      setTimeout(() => {
        const nuevasCartas = cartas.map((carta, index) => {
          if (index === primeraIndex || index === segundaIndex) {
            return { ...carta, volteada: false }
          }
          return carta
        })
        setCartas(nuevasCartas)
        setSeleccionadas([])
      }, 800)
    }
  }, [seleccionadas])

  // Cuando el jugador gana, comparamos y guardamos el mejor puntaje.
  useEffect(() => {
    if (juegoGanado) {
      if (mejorPuntaje === null || movimientos < mejorPuntaje) {
        setMejorPuntaje(movimientos)
        localStorage.setItem('mejorPuntajeMemoria', String(movimientos))
      }
    }
  }, [juegoGanado])

  const voltearCarta = (index: number) => {
    const carta = cartas[index]

    if (carta.volteada || carta.emparejada || seleccionadas.length === 2) {
      return
    }

    const nuevasCartas = cartas.map((c, i) => {
      if (i === index) {
        return { ...c, volteada: true }
      }
      return c
    })

    setCartas(nuevasCartas)
    setSeleccionadas([...seleccionadas, index])
  }

  const reiniciar = () => {
    setCartas(crearMazo())
    setSeleccionadas([])
    setMovimientos(0)
  }

  return {
    cartas,
    movimientos,
    mejorPuntaje,
    juegoGanado,
    voltearCarta,
    reiniciar,
  }
}