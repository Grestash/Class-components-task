import {render, screen} from "@testing-library/react"
import App from "../App"
import '@testing-library/jest-dom'

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})

test("renders header title", () => {
    render(<App />);
    const title = screen.getByText(/Rick and Morty Character Search/i);
    expect(title).toBeInTheDocument();
  });