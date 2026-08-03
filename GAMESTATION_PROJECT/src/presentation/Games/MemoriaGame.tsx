import { Link } from "react-router"
import { useMemoriaHooks } from "../../assets/Hooks/Memoria Hooks/useMemoria"

const MemoriaGame = () => {
  const { cartas, movimientos, mejorPuntaje, juegoGanado, voltearCarta, reiniciar} 
    = useMemoriaHooks()
    
  return (
    <div className="max-w-md mx-auto px-4 py-10 text-center text-white">
      <Link to="/games" className="inline-block mb-4 text-blue-300 underline">
        ← Volver a Juegos
      </Link>
 
      <h1 className="text-3xl font-bold mb-4">Memoria</h1>
 
      <p>Movimientos: {movimientos}</p>
      <p className="mb-4">
        Mejor puntaje guardado:{' '}
        {mejorPuntaje === null ? 'Aún no hay récord' : mejorPuntaje + ' movimientos'}
      </p>
 
      {juegoGanado && (
        <p className="text-green-400 font-bold text-xl mb-4">Ganaste</p>
      )}
 
      <div className="grid grid-cols-4 gap-2 mb-6">
        {cartas.map((carta, index) => (
          <button
            key={carta.id}
            onClick={() => voltearCarta(index)}
            className="aspect-square text-2xl bg-gray-800 border-2 border-blue-400 rounded-lg"
          >
            {carta.volteada || carta.emparejada ? carta.simbolo : '❓'}
          </button>
        ))}
      </div>
 
      <button
        onClick={reiniciar}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Nueva partida
      </button>
    </div>
  )
}

export default MemoriaGame