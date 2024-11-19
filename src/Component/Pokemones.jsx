import { useEffect, useState } from 'react'
import InfoPokemones from './InfoPokemones';
import ErrorServer from '../Messages/ErrorServer';
import Skeleton from '../Share/Skeleton';
import Pagination from '../Share/Pagination';
import { pokemonTypeColors } from '../Share/ColorTypes';

const Pokemones = () => {

    //variables para el consumo de la API y el paginado
    const [poke, setPoke] = useState([]);
    const [skeletonPoke, setSkeletonPoke] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const totalItems = 1118; //segun google
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxVisiblePages = 3
    const [isOpenError, setIsOpenError] = useState(false);
    const [messageError, setMessageError] = useState("");

    //consumir la api y paginado
    useEffect(() => {
        const fetchPokemons = async () => {
            setSkeletonPoke(true);
            try {
                // calculo del offset para la paginación
                const offset = (currentPage - 1) * itemsPerPage;
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
                );
                const data = await response.json();

                // obtener detalles de cada Pokemon
                const pokemonDetails = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        return res.json();
                    })
                );

                setPoke(pokemonDetails);
            } catch (error) {
                setIsOpenError(true)
                setMessageError(error.message)
                // console.error("Error fetching Pokemon:", error);
            } finally {
                setSkeletonPoke(false);
            }
        };

        fetchPokemons();
    }, [currentPage, itemsPerPage]);

    //funcion para el cambio de paginado
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reinicia la página actual al cambiar los ítems por página
    };

    //modal para mostrar la informacion del pokemon soleccionado
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const informationPokemon = (information) => {
        setIsOpen(true)
        setSelectedPokemon(information)
    }

    const closeModal = () => {
        setIsOpen(false);
        setSelectedPokemon(null);
    };

    //buscador de pokemones con filtro
    const [search, setSearch] = useState("");
    const [filteredPoke, setFilteredPoke] = useState([]);

    useEffect(() => {
        const filtered = !search
            ? poke
            : poke.filter((poke) => poke.name.toLowerCase().includes(search.toLowerCase()));

        setFilteredPoke(filtered); // Usa un nuevo estado para almacenar el resultado.
    }, [search, poke]);

    console.log(poke)

    return (
        <div style={{ background: "linear-gradient( transparent -50% , #ABEBC6)" }}>

            <div className='lg:flex justify-between items-center'>

                <img className='w-72 h-30 lg:ml-6 mx-auto' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1200px-International_Pok%C3%A9mon_logo.svg.png" alt="pokemon" />

                <div className='pt-5 w-full px-6'>
                    <label className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search pokemon" required />
                    </div>
                </div>

                <div className="relative flex gap-14 justify-center items-center mr-10">
                    {Array(6)
                        .fill(null)
                        .map((_, index) => (
                            <div key={index}>
                                <img className='absolute w-8 h-8  animate-spin remove-bg' src="https://e7.pngegg.com/pngimages/906/501/png-clipart-pokeball-pokeball-thumbnail.png" alt="pokeball" />
                            </div>

                        ))}
                </div>

            </div>


            <PokemonList
                pokeFilter={filteredPoke}
                skeletonPoke={skeletonPoke}
                informationPokemon={informationPokemon}
                isOpenError={isOpenError}
                setIsOpenError={setIsOpenError}
                messageError={messageError}
            />


            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                maxVisiblePages={maxVisiblePages}
                handlePageChange={handlePageChange}
                handleItemsPerPageChange={handleItemsPerPageChange}
                itemsPerPage={itemsPerPage}
                skeletonPoke={skeletonPoke}
            />

            {/* Mostrar informacion de los poquemones en el componente InfoPokemones */}
            <InfoPokemones
                isOpen={isOpen}
                onClose={closeModal}
                pokemon={selectedPokemon}
            />

        </div>
    )
}

// mostrar las lista de pokemones, errores, skeleton y vacio
const PokemonList = ({ pokeFilter, skeletonPoke, informationPokemon, isOpenError, setIsOpenError, messageError }) => {

    if (isOpenError) {
        return (
            <ErrorServer
                isOpen={isOpenError}
                onClose={() => setIsOpenError(false)}
                message={messageError}
            />
        );
    }

    if (pokeFilter.length === 0) {
        return (
            <div className="flex justify-center items-center h-[92.2vh]">
                <h2 className="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
                    <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
                        No Pokémon available!
                    </span>
                </h2>
            </div>
        );
    }

    return skeletonPoke ? (
        <Skeleton />

    ) : (
        <div className="flex flex-wrap justify-around pb-20">
            {
                pokeFilter.map((pokemones, index) => {
                    // Obtener el color correspondiente al primer tipo del Pokémon
                    const backgroundColor = pokemones.types && pokemones.types[0]?.type?.name
                        ? pokemonTypeColors[pokemones.types[0].type.name.toLowerCase()]
                        : "#A8A77A";

                    return (
                        <section key={index}>
                            <div
                                onClick={() => informationPokemon(pokemones)}
                                className="w-full max-w-sm overflow-hidden m-2 my-2 transition-transform transform hover:scale-105"
                            >
                                <div className="flex flex-col items-center justify-center w-full ">

                                    <div className="relative bottom-48 w-full h-[12vh] bg-center bg-cover z-0"></div>
                                    
                                    <div className='rounded-3xl h-72 z-0'
                                        style={{
                                            background: `linear-gradient(to bottom, #333333, ${backgroundColor})`,
                                            boxShadow: ` 0 15px 12px -6px ${backgroundColor}`
                                        }}>
                                        <img className='remove-bg top-10 relative size-60 rounded-full right-20 text-white' src="https://icon2.cleanpng.com/20240315/ls/transparent-paint-splatter-pokemon-ball-with-pikachu-text-in-1710835851133.webp" alt="fondo pokeball" />
                                        <img
                                            className="relative bottom-96 w-full h-96 bg-center bg-cover z-10 flipInX"
                                            src={pokemones.sprites?.other?.home?.front_default}
                                            alt="avatar"
                                        />

                                    </div>

                                    <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800 z-10 zoom-in">
                                        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
                                            ⚪ {pokemones.name?.toUpperCase()} ⚪
                                        </h3>

                                        <div className="text-center py-2 bg-gray-200 dark:bg-gray-700">
                                            <span className="font-bold text-gray-800 dark:text-gray-200">
                                                Click for more information
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })
            }
        </div>
    );
};


export default Pokemones