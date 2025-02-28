import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetPokemonByIdQuery } from "../../services/query";

const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: pokemon,
    error,
    isLoading,
  } = useGetPokemonByIdQuery(Number(id));

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error || !pokemon)
    return <p className="text-center text-red-500">Pokémon not found!</p>;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>

      <img
        src={imageUrl}
        alt={pokemon.name}
        className="w-40 h-40 mx-auto my-4"
      />

      <p>
        <strong>ID:</strong> #id
      </p>
      <p>
        <strong>Height:</strong> 1.92 m
      </p>
      <p>
        <strong>Weight:</strong> 15 kg
      </p>

      <Link to="/" className="block mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back
        </button>
      </Link>
    </div>
  );
};

export default PokemonDetails;
