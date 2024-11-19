import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InfoPokemones from './InfoPokemones';

// Define los colores de tipo Pokémon en un mock directamente en vi.mock
vi.mock('../Share/ColorTypes', () => ({
    pokemonTypeColors: {
        electric: '#F7D02C',
    },
}));

const mockPokemon = {
    name: 'Pikachu',
    height: 40,
    weight: 60,
    sprites: {
        other: {
            showdown: {
                front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
            },
        },
    },
    abilities: [
        { ability: { name: 'static' } },
        { ability: { name: 'lightning-rod' } },
    ],
    types: [
        { type: { name: 'electric' } },
    ],
};

describe('InfoPokemones Component', () => {
    it('does not render the modal when isOpen is false', () => {
        render(<InfoPokemones isOpen={false} onClose={() => {}} pokemon={mockPokemon} />);
        const modal = screen.queryByText(/information of pokémon/i);
        expect(modal).not.toBeInTheDocument();
    });

    it('renders the modal with Pokémon information when isOpen is true', () => {
        render(<InfoPokemones isOpen={true} onClose={() => {}} pokemon={mockPokemon} />);
        expect(screen.getByText(/information of pokémon/i)).toBeInTheDocument();
        expect(screen.getByText(/your name is pikachu/i)).toBeInTheDocument();
        expect(screen.getByText(/static/i)).toBeInTheDocument();
        expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument();
        expect(screen.getByText(/electric/i)).toBeInTheDocument();
    });

    it('renders the Pokémon sprite with the correct src attribute', () => {
        render(<InfoPokemones isOpen={true} onClose={() => {}} pokemon={mockPokemon} />);
        const sprite = screen.getByAltText(/testimonial avatar/i);
        expect(sprite).toBeInTheDocument();
        expect(sprite).toHaveAttribute('src', mockPokemon.sprites.other.showdown.front_default);
    });

    it('calls onClose when the exit button is clicked', () => {
        const mockOnClose = vi.fn();
        render(<InfoPokemones isOpen={true} onClose={mockOnClose} pokemon={mockPokemon} />);
        const exitButton = screen.getByText(/exit/i);
        fireEvent.click(exitButton);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('applies the correct background color based on Pokémon type', () => {
        render(<InfoPokemones isOpen={true} onClose={() => {}} pokemon={mockPokemon} />);
        const exitButton = screen.getByText(/exit/i);
        expect(exitButton).toHaveStyle('background: #F7D02C');
    });
});