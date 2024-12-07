import { render, screen } from "@testing-library/react";
import HelloWorld from "./HelloWorld";

describe("testing my first react component", () => {
  test("testing helloworld component", () => {
    render(<HelloWorld text={"Lucky"} />);
    expect(screen.getByText("Hello Lucky")).toBeInTheDocument();
  });
});
