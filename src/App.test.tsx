import { describe, expect, it } from 'vitest'
import { render, screen } from '@/testUtils'
import App from './App'

describe('Render App', () => {
  it('should render the heading', () => {
    render(<App />)
    expect(screen.getByText(/Star Wars Characters/i)).toBeInTheDocument()
  })

  it('should render the search toolbar', async () => {
    render(<App />)

    expect(screen.getByText(/Filter by name/i)).toBeInTheDocument()
  })
})
