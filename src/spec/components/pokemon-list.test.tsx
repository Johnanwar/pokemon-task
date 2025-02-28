import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { store } from "../../store";
import PokemonList from "../../features/pokemon/components/pokemon-list";
import {  useGetPokemonQuery } from "../../features/services/query";

vi.mock("../../features/services/query", async (importOriginal) => {
    const actual = (await importOriginal()) as typeof import("../../features/services/query"); 
    return {
      ...actual,
      pokemonApi: actual.pokemonApi, 
      useGetPokemonQuery: vi.fn(),
    };
  });
  

describe("PokemonList Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    (useGetPokemonQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useGetPokemonQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: true,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Error loading Pokémon.")).toBeInTheDocument();
  });

  it("renders Pokémon list correctly", async () => {
    (useGetPokemonQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: {
        results: [
          { name: "test 1", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "test 2", url: "https://pokeapi.co/api/v2/pokemon/2/" },
        ],
        next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
      },
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findByText("test 1")).toBeInTheDocument();
    expect(await screen.findByText("test 2")).toBeInTheDocument();
  });
  it("triggers infinite scroll to load more Pokémon", async () => {
    (useGetPokemonQuery   as unknown as ReturnType<typeof vi.fn>)
      .mockReturnValueOnce({
        data: {
          results: [
            { name: "test 1", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          ],
          next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
        },
        isLoading: false,
        error: null,
      })
      .mockReturnValueOnce({
        data: {
          results: [
            { name: "test 1", url: "https://pokeapi.co/api/v2/pokemon/1/" },
            { name: "test 2", url: "https://pokeapi.co/api/v2/pokemon/4/" },
          ],
          next: null,
        },
        isLoading: false,
        error: null,
      });
  
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>
    );
  
    const initialPokemon = await screen.findByText("test 1");
    expect(initialPokemon).toBeInTheDocument();
  
    // trigger a scroll event
    window.dispatchEvent(new Event("scroll"));
  
    await waitFor(() => {
      expect(screen.getByText("test 2")).toBeInTheDocument();
    });
  });
  

  it("shows 'No more Pokemon message when all are loaded", async () => {
    (useGetPokemonQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: {
        results: [
          { name: "test 1", url: "https://pokeapi.co/api/v2/pokemon/1/" },
        ],
        next: null,
      },
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonList />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("No more Pokémon to show.")).toBeInTheDocument();
    });
  });
});
