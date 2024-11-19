
const Pagination = ({
    currentPage,
    totalPages,
    maxVisiblePages,
    handlePageChange,
    handleItemsPerPageChange,
    itemsPerPage,
    skeletonPoke,
}) => {

    const getVisiblePages = () => {
        const startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div>

            <div className='fixed z-50 backdrop-blur-sm bottom-0 left-0 w-full p-4'>
                <div className="flex justify-center items-center px-14">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || skeletonPoke}
                        aria-label="previous page"
                        className={`flex items-center px-2 py-2 mx-1 rounded-md bg-white dark:bg-gray-800
                                    ${currentPage === 1
                                ? "cursor-not-allowed  text-gray-200 dark:text-gray-600"
                                : "text-gray-500  dark:text-gray-200"
                            }`
                        }>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>

                    {getVisiblePages().map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            disabled={page === currentPage || skeletonPoke}
                            className={`mx-1 px-4 py-2 text-white rounded-md transition duration-300
                            ${page === currentPage ? 'bg-blue-500 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-400 cursor-pointer'}
                            `}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || skeletonPoke}
                        aria-label="next page"
                        className={`flex items-center px-2 py-2 mx-1 text-gray-500 bg-white rounded-md dark:bg-gray-800 dark:text-white`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>

                    <div className="mx-4">
                        <label className="absolute top-[0.2vh] text-sm font-medium text-gray-900 dark:text-white bg-gray-500 px-2 rounded-lg border border-white">
                            Pokemon in list
                        </label>
                        <select
                            id="itemsPerPage"
                            aria-label="Pokemon in list"
                            value={itemsPerPage} // Cambiará dinámicamente según el valor actual
                            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                            className="bg-gray-500 border border-white text-white text-md rounded-lg block p-2 md:px-20 px-14"
                        >
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    
                </div>

            </div>

        </div >
    )
}

export default Pagination