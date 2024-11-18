import { useEffect, useState } from 'react'
import InfoPokemones from './InfoPokemones';

const Pokemones = () => {

    //variables para el consumo de la API y el paginado
    const [poke, setPoke] = useState([]);
    const [skeletonPoke, setSkeletonPoke] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const totalItems = 1025;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxVisiblePages = 5

    //consumir la api y paginado
    useEffect(() => {
        const fetchPokemons = async () => {
            setSkeletonPoke(true);
            try {
                // Cálculo del offset para la paginación
                const offset = (currentPage - 1) * itemsPerPage;
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
                );
                const data = await response.json();

                // Obtener detalles de cada Pokémon
                const pokemonDetails = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        return res.json();
                    })
                );

                setPoke(pokemonDetails);
            } catch (error) {
                console.error("Error fetching Pokémon:", error);
            } finally {
                setSkeletonPoke(false);
            }
        };

        fetchPokemons();
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const getVisiblePages = () => {
        const startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    //modal para mostrar la informacion del pokemon soleccionado
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const informationPokemon = (information) => {
        setIsOpen(true)
        setSelectedPokemon(information)
        console.log(information)
    }

    const closeModal = () => {
        setIsOpen(false);
        setSelectedPokemon(null);
    };


    //buscador de pokemones con filtro
    const [search, setSearch] = useState("");

    let pokeFilter = []
    if (!search) {
        pokeFilter = poke
    } else {
        pokeFilter = poke.filter((response) => response.name.toLowerCase().includes(search.toLowerCase()))
    }

    console.log(poke)

    return (
        <div className='w-full' style={{ background: "linear-gradient( transparent -50% , #ABEBC6)" }}>

            <section className='pt-5 max-w-md mx-auto'>
                <label className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search pokemon" required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </section>

            <div className='flex flex-wrap justify-around pb-20'>
                {
                    !skeletonPoke
                        ?
                        // Information 
                        pokeFilter.length !== 0

                            ?

                            pokeFilter.map((pokemones, index) => (
                                <>
                                    <section key={index} onClick={() => informationPokemon(pokemones)} className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 m-2">
                                        <img className="object-cover object-center" src={pokemones.sprites.other.home.front_default} alt="avatar" />

                                        <div className="bg-gray-900 text-center">
                                            <h1 className="mx-3 text-lg font-semibold text-white">{pokemones.name.toUpperCase()}</h1>
                                        </div>

                                    </section>
                                </>
                            ))
                            :
                            <div className='flex justify-center items-center h-[80vh]'>
                                <h2 className="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
                                    <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
                                        This pokemon is not on this list
                                    </span>
                                </h2>
                            </div>
                        :
                        // skeleton
                        <section className="bg-transparent">
                            <div className="px-6 py-10 mx-auto animate-pulse">
                                <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

                                <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

                                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                                    <div className="w-full ">
                                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    </div>

                                    <div className="w-full ">
                                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    </div>

                                    <div className="w-full ">
                                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    </div>

                                    <div className="w-full ">
                                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    </div>

                                    <div className="w-full ">
                                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    </div>

                                    <div className="w-full ">
                                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    </div>

                                    <div className="w-full ">
                                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    </div>

                                    <div className="w-full ">
                                        <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

                                        <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                                        <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                                    </div>
                                </div>
                            </div>
                        </section>

                }

            </div>

            {/* Paginado fixed */}
            <div className='fixed z-50 backdrop-blur-sm bottom-0 left-0 w-full p-4 '>
                <div className="flex justify-center items-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || skeletonPoke}
                        className={currentPage === 1 ?
                            `flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md cursor-not-allowed dark:bg-gray-800 dark:text-gray-600`
                            :
                            `flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md dark:bg-gray-800 dark:text-gray-600`
                        }>
                        Previous
                    </button>

                    {getVisiblePages().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            disabled={page === currentPage || skeletonPoke}
                            style={{
                                margin: "5px",
                                padding: "5px 10px",
                                backgroundColor: page === currentPage ? "blue" : "lightgray",
                                color: "white",
                                border: "none",
                                cursor: page === currentPage ? "not-allowed" : "pointer",
                            }}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`flex items-center px-4 py-2 mx-1 text-gray-500 bg-white rounded-md dark:bg-gray-800 dark:text-gray-600`}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Mostrar informacion de los poquemones en el componente InfoPokemones */}
            <InfoPokemones
                isOpen={isOpen}
                onClose={closeModal}
                pokemon={selectedPokemon}
            />

        </div>
    )
}


export default Pokemones