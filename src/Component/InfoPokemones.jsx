import { pokemonTypeColors } from "../Share/ColorTypes";

const InfoPokemones = ({ isOpen, onClose, pokemon }) => {

    if (!isOpen) return null;

    const backgroundColor = pokemonTypeColors[pokemon.types[0]?.type.name.toLowerCase()] || "#A8A77A";

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-lg"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center ">
                <div
                    className="relative inline-block py-10 px-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-2xl dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                >
                    <h3
                        className="flex justify-center text-2xl font-medium leading-6 text-gray-800 dark:text-white"
                        id="modal-title"
                    >
                        Information of Pokémon
                    </h3>

                    <hr className="mt-6" />

                    <div className="w-full  px-8 py-4 mt-16 bg-white rounded-2xl shadow-2xl dark:bg-gray-800"
                        style={{
                            boxShadow: ` 0 25px 50px -12px ${backgroundColor}`
                        }}>

                        <div className="flex justify-center -mt-16 md:justify-end">
                            <img style={{
                                filter: `drop-shadow(0 0 5px ${backgroundColor})`
                            }} className="object-cover h-20 lg:mr-10 imgBack bounceIn" alt="Testimonial avatar" src={pokemon?.sprites.other.showdown.front_default} />
                        </div>

                        <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">{pokemon?.name.toUpperCase()}</h2>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">Your name is {pokemon?.name}, have a height of {pokemon?.height / 10}M and weight of {pokemon?.weight / 10}KG. These are some of their abilities and types. </p>


                        <div className="flex justify-around items-start mt-4">
                            {/* Columna de Habilidades */}
                            <div className="w-1/2">
                                <h2 className="text-center text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 border-b-2 pb-2 border-gray-300 dark:border-gray-600">
                                    Abilities
                                </h2>
                                <ul className="space-y-2 text-center">
                                    {pokemon.abilities.map((info, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700 dark:text-gray-300 font-bold capitalize"
                                        >
                                            {info.ability.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Línea Divisoria */}
                            <div className="h-auto w-px bg-gray-300 dark:bg-gray-600 mx-4"></div>

                            {/* Columna de Tipos */}
                            <div className="w-1/2 ">
                                <h2 className="text-center text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 border-b-2 pb-2 border-gray-300 dark:border-gray-600">
                                    Types
                                </h2>
                                <ul className="space-y-2 text-center">
                                    {pokemon.types.map((info, index) => (
                                        <li
                                            key={index}
                                            className="text-white capitalize font-bold rounded-md"
                                            style={{
                                                background: pokemonTypeColors[pokemon.types[index]?.type.name.toLowerCase()]
                                            }}
                                        >
                                            {info.type.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div className="flex justify-center mt-4 ">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
                            onClick={onClose}
                            style={{
                                background: pokemonTypeColors[pokemon.types[0]?.type.name.toLowerCase()]
                            }}
                        >
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPokemones