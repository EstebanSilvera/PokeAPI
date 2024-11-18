const InfoPokemones = ({ isOpen, onClose, pokemon }) => {

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-10 overflow-y-auto backdrop-blur-lg"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                <div
                    className="relative inline-block py-20 px-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-2xl dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                >
                    <h3
                        className="flex justify-center text-2xl font-medium leading-6 text-gray-800 dark:text-white"
                        id="modal-title"
                    >
                        Información del Pokémon
                    </h3>

                    <hr className="mt-6" />

                    <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-2xl shadow-blue-500/50 dark:bg-gray-800">
                        <div className="flex justify-center -mt-16 md:justify-end">
                            <img className="object-cover h-20 imgBack" alt="Testimonial avatar" src={pokemon?.sprites.other.showdown.front_default} />
                        </div>

                        <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">{pokemon?.name}</h2>

                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">Your name is {pokemon?.name}, have a height of {pokemon?.height} and weight of {pokemon?.weight}. These are some of their abilities and types</p>


                        <div className="flex justify-around items-start mt-4">
                            {/* Columna de Habilidades */}
                            <div className="w-1/2">
                                <h2 className="text-center text-lg font-bold mb-4 text-gray-800 dark:text-gray-200 border-b-2 pb-2 border-gray-300 dark:border-gray-600">
                                    Abilities
                                </h2>
                                <ul className="list-disc list-inside space-y-2">
                                    {pokemon.abilities.map((info, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700 dark:text-gray-300 capitalize"
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
                                <ul className="list-disc list-inside space-y-2">
                                    {pokemon.types.map((info, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700 dark:text-gray-300 capitalize"
                                        >
                                            {info.type.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                onClick={onClose}
                            >
                                Cerrar
                            </button>
                        </div>

                    </div>

                    <div className="mt-6 flex justify-end">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoPokemones