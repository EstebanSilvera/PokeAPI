import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
    const mockHandlePageChange = vi.fn();
    const mockHandleItemsPerPageChange = vi.fn();

    const defaultProps = {
        currentPage: 1,
        totalPages: 5,
        maxVisiblePages: 3,
        handlePageChange: mockHandlePageChange,
        handleItemsPerPageChange: mockHandleItemsPerPageChange,
        itemsPerPage: 20,
        skeletonPoke: false,
    };

    it('renders Pagination component', () => {
        render(<Pagination {...defaultProps} />);

        // Verificar si los botones de las páginas se renderizan
        const pageButtons = screen.getAllByRole('button');
        expect(pageButtons).toHaveLength(5); // Total de botones: 1 anterior, 3 de páginas, 1 siguiente
    });

    it('calls handlePageChange when page button is clicked', () => {
        render(<Pagination {...defaultProps} />);

        // Simular un clic en el botón de la página 2
        const pageButton = screen.getByText('2');
        fireEvent.click(pageButton);

        expect(mockHandlePageChange).toHaveBeenCalledWith(2);
    });

    it('disables previous button on the first page', () => {
        render(<Pagination {...defaultProps} currentPage={1} />);

        const prevButton = screen.getByRole('button', { name: /previous page/i });
        expect(prevButton).toBeDisabled();
    });

    it('disables next button on the last page', () => {
        render(<Pagination {...defaultProps} currentPage={5} />);

        const nextButton = screen.getByRole('button', { name: /next page/i });
        expect(nextButton).toBeDisabled();
    });

    it('calls handleItemsPerPageChange when items per page changes', () => {
        render(<Pagination {...defaultProps} />);

        // Busca el elemento select usando el aria-label
        const select = screen.getByLabelText('Pokemon in list'); // Exact match
        fireEvent.change(select, { target: { value: '30' } });

        // Verifica que la función mock sea llamada con el valor correcto
        expect(mockHandleItemsPerPageChange).toHaveBeenCalledWith(30);
    });

    it('disables page buttons if skeletonPoke is true', () => {
        render(<Pagination {...defaultProps} skeletonPoke={true} />);

        const pageButton = screen.getByText('2');
        expect(pageButton).toBeDisabled();
    });
});