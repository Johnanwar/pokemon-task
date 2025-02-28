import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store";
import PokemonCard from "../../features/pokemon/components/pokemon-card";
import { beforeEach, describe, expect, it } from "vitest";

describe("PokemonCard Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonCard name="test" url="https://pokeapi.co/api/v2/pokemon/1/" />
        </MemoryRouter>
      </Provider>
    );
  });

  it("should display the Pokemon name", async () => {
    await waitFor(() => {
      expect(screen.getByText("test")).toBeInTheDocument();
    });
  });

  it("should display the Pokemon image", async () => {
    const img = screen.getByRole("img", { name: /test/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    );
  });

  it("should contain a View Details button", async () => {
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /view details/i })).toBeInTheDocument();
    });
  });

  it("should have the correct link to the Pokemon details page", async () => {
    const link = screen.getByRole("link", { name: /view details/i });
    expect(link).toHaveAttribute("href", "/pokemon/1");
  });
});
