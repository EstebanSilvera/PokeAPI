import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorServer from './ErrorServer';

describe('ErrorServer Component', () => {
    it('does not render the modal when isOpen is false', () => {
        render(<ErrorServer isOpen={false} onClose={() => {}} message="Server error" />);
        const modal = screen.queryByText(/server error/i);
        expect(modal).not.toBeInTheDocument();
    });

    it('renders the modal with the correct message when isOpen is true', () => {
        render(<ErrorServer isOpen={true} onClose={() => {}} message="Server error occurred!" />);
        const modalMessage = screen.getByText(/server error occurred!/i);
        expect(modalMessage).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', () => {
        const mockOnClose = vi.fn();
        render(<ErrorServer isOpen={true} onClose={mockOnClose} message="Error!" />);
        
        const closeButton = screen.getByRole('button', { name: /close modal/i });
        fireEvent.click(closeButton);
        
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when the "Yes, I\'m sure" button is clicked', () => {
        const mockOnClose = vi.fn();
        render(<ErrorServer isOpen={true} onClose={mockOnClose} message="Error!" />);
        
        const confirmButton = screen.getByText(/yes, i'm sure/i);
        fireEvent.click(confirmButton);
        
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when the "No, cancel" button is clicked', () => {
        const mockOnClose = vi.fn();
        render(<ErrorServer isOpen={true} onClose={mockOnClose} message="Error!" />);
        
        const cancelButton = screen.getByText(/no, cancel/i);
        fireEvent.click(cancelButton);
        
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});