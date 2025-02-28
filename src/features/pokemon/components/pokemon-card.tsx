import React from "react";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  name: string;
  url: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {

  const id = url.split("/").filter(Boolean).pop();
  console.log(id, "pokemon")

// Random img for Pokemon
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-all duration-300 w-full">
      <div className="flex justify-center">
        <img
          src={imageUrl}
          alt={name}
          className="w-32 h-32 object-contain"
          loading="lazy"
        />
      </div>

      <h3 className="text-xl font-bold text-gray-700 text-center capitalize mt-2">
        {name}
      </h3>

      <p className="text-gray-500 text-center"># {id}</p>

      <div className="mt-3 text-center">
        <Link to ={`pokemon/${id}`}>
        <button className="bg-blue-500 text-white py-1 px-4 rounded-lg text-sm hover:bg-blue-600 transition">
          View Details
        </button>
        </Link>
      </div>
    </div>
  );
};

export default PokemonCard;
