import { render, cleanup, fireEvent } from '@testing-library/react'
import EditableTimebox from '../../components/EditableTimebox'

describe('<EditableTimebox />', () => {
  afterEach(cleanup)
  it('shows edit button', () => {
    const { getByText } = render(<EditableTimebox />)
    expect(() => {
      getByText('Edytuj')
    }).not.toThrow()
  })
  it('allows for editing timebox', () => {
    const { getByText } = render(<EditableTimebox />)
    fireEvent.click(getByText('Edytuj'))
    fireEvent.click(getByText(/zmiany/))
    expect(() => {
      getByText('Edytuj')
    }).not.toThrow()
  })
  it('renders the updated title', () => {
    const { getByText, getByLabelText } = render(<EditableTimebox />)
    fireEvent.click(getByText('Edytuj'))
    const input = getByLabelText('Co robisz?')
    fireEvent.change(input, { target: { value: 'Zmiana testowa' } })
    fireEvent.click(getByText(/zmiany/))
    expect(() => {
      getByText('Zmiana testowa')
    }).not.toThrow()
  })
})
