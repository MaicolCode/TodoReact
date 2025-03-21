const API_KEY = import.meta.env.VITE_API_KEY

if (!API_KEY) {
  throw new Error('La API_KEY no está definida. Verifica tu archivo .env.')
}

async function AIFetch(
  completeTasks: { content: string }[],
  incompleteTasks: { content: string }[]
) {
  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free', // Modelo de Together AI
      messages: [
        {
          role: 'system',
          content:
            'Eres un asistente que resume listas de tareas de manera clara y concisa.'
        },
        {
          role: 'user',
          content: `Tareas completadas:\n${
            completeTasks.length > 0
              ? completeTasks.map((t) => `- ${t.content}`).join('\n')
              : 'No hay tareas completas.'
          }`
        },
        {
          role: 'user',
          content: `Tareas pendientes:\n${
            incompleteTasks.length > 0
              ? incompleteTasks.map((t) => `- ${t.content}`).join('\n')
              : 'No hay tareas pendientes.'
          }`
        },
        {
          role: 'user',
          content:
            'Genera un resumen de mi progreso y lo que me falta por hacer, no listes nuevamente las tareas, no pongas subtitulos, menciona los puntos en los que puedo mejorar y si es posible puedes generar un emote.'
        }
      ],
      temperature: 0.7
    })
  })

  return response
}

export default AIFetch
