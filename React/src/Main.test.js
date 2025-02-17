import { render, screen } from '@testing-library/react';
import Main from './Main.js';

//test("Jest is working!", ()=>{});

test("Main component renders without crashing", () => {
    const { container } = render(<Main />);
    expect(container).toBeInTheDocument();
  });
  
  test("Main component contains the correct text", () => {
    render(<Main />);
    const textElement = screen.getByText(/Climate Bind is an open-source, free-to-use peer-to-peer insurance web application offering insurance cover for damage to residential buildings caused by severe weather events./i);
    expect(textElement).toBeInTheDocument();
  });