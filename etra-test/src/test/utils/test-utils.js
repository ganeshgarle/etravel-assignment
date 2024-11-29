import { cleanup, render as defaultRender } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Custom render function for testing
function customRender(ui, options = {}) {
  return defaultRender(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });
}

// Export everything from @testing-library/react
export * from "@testing-library/react";

// Export userEvent as default from @testing-library/user-event
export { userEvent };

// Override default render export with customRender
export { customRender as render };
