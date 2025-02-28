import { server } from "./mocks/server";
import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";

// Start API mock before tests
beforeAll(() => server.listen());
// Reset handlers after each test
afterEach(() => server.resetHandlers());
// Close the server after tests
afterAll(() => server.close());
