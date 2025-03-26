import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom' // Import jest-dom matchers
import userEvent from '@testing-library/user-event'
import { TaskProvider } from '@/features/tasks/task'
import Tasks from '@/components/sections/Tasks'

test('Show text after charge page', () => {
  render(
    <TaskProvider>
      <Tasks />
    </TaskProvider>
  )
  expect(
    screen.getByText(/Add the tasks you are going to focus on./i)
  ).toBeInTheDocument()
})

test('Insert new task and update task input', () => {
  render(
    <TaskProvider>
      <Tasks />
    </TaskProvider>
  )

  // Busqueda del input para ingresar la tarea y el boton
  const input = screen.getByPlaceholderText('Your task...') as HTMLInputElement
  const button = screen.getByTestId('addTask')

  // Simulamos la nueva tarea
  userEvent.type(input, 'Hacer la merienda.')

  // Simulamos el click para agregar la tarea
  fireEvent.click(button)

  // Verificacion si se ingreso la tarea
  expect(input.value).toBe('')
})
