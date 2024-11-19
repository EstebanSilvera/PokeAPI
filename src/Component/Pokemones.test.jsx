import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Pokemones from './Pokemones';
import { describe, it, expect, vi } from 'vitest';

describe('Pokemones Component', () => {
    it('renders header and search bar', () => {
        render(<Pokemones />);

        // Verificar el logo
        const logo = screen.getByAltText('pokemon');
        expect(logo).toBeInTheDocument();

        // Verificar el input de búsqueda
        const searchInput = screen.getByPlaceholderText('Search pokemon');
        expect(searchInput).toBeInTheDocument();
    });
});


globalThis.fetch = vi.fn(() =>
    Promise.resolve({
        json: () =>
            Promise.resolve({
                results: [
                    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                ],
            }),
    })
);

it('fetches and displays the correct pokemon', async () => {
    // Mocks del fetch
    globalThis.fetch = vi.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    results: [
                        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                    ],
                }),
        })
    );

    render(<Pokemones />);

    // Esperar a que se cargue el Pokémon
    waitFor(() => screen.getByText(/bulbasaur/i));

    // Verificar que la función fetch fue llamada
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
});

it('fetches and displays pokemons', async () => {
    render(<Pokemones />);

    // Esperar a que los pokemones se carguen
    waitFor(() => {
        const pokemonName = screen.getByText(/bulbasaur/i);
        expect(pokemonName).toBeInTheDocument();
    });
});

it('filters pokemons by search input', async () => {
    render(<Pokemones />);

    // Esperar a que se carguen los pokemones
    waitFor(() => screen.getByText(/bulbasaur/i));

    // Escribir en el campo de búsqueda
    const searchInput = screen.getByPlaceholderText('Search pokemon');
    fireEvent.change(searchInput, { target: { value: 'ivy' } });

    // Verificar el filtro
    expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument();
});


it('opens modal with pokemon details', async () => {
    render(<Pokemones />);

    // Esperar a que los pokemones se carguen
    waitFor(() => screen.getByText(/bulbasaur/i));  // Esperamos que "bulbasaur" aparezca en el listado

    // Hacer clic en un Pokémon
    const pokemonCard = screen.getByText(/1/i);
    fireEvent.click(pokemonCard);

    waitFor(() => screen.getByText(/Click for more information/i)); 

    expect(screen.getByText(/1/i)).toBeInTheDocument();
});