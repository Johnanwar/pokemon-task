import React, { useState } from "react";
import PokemonCard from "./pokemon-card";
import { useGetPokemonQuery } from "../../../services/query";
import InfiniteScroll from "react-infinite-scroll-component";


const PokemonList: React.FC = () => {
const LIMIT = 20; // Number of Pokemon per page

  const [offset, setOffset] = useState(0);
  const { data, error, isLoading } = useGetPokemonQuery({ offset, limit: LIMIT });

  // Load more Pokemon when scroll
  const fetchMoreData = () => {
    if (data?.next) {
      setOffset((prevOffset) => prevOffset + LIMIT);
    }
  };

  if (isLoading && offset === 0) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading Pokémon.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Pokémon List
      </h1>

      <InfiniteScroll
        dataLength={data?.results?.length || 0} 
        next={fetchMoreData} 
        hasMore={!!data?.next} 
        loader={<p className="text-center text-lg">Loading more Pokémon...</p>}
        endMessage={<p className="text-center text-gray-500">No more Pokémon to show.</p>}
      >
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
          {data?.results.map((item, index) => (
            <li key={index} className="flex justify-center">
              <PokemonCard url={item?.url} name={item?.name} />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};

export default PokemonList;
