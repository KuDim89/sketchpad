import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IPhotosResponse } from '../api/IPhotosResponse';
import { App } from "./index";
import { mockPhotosResponse } from "./photosResponse.mock";

jest.mock('../api/fetchPhotos', () => ({
  fetchPhotos: (): Promise<IPhotosResponse> => Promise.resolve(mockPhotosResponse),
}));

describe('App component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('should render the App component', () => {
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  test('should renders photos when user searches', async () => {
    const searchInput = screen.getByPlaceholderText('Search...');
    const searchQuery = 'nature';

    userEvent.type(searchInput, searchQuery + '{enter}');

    await waitFor(() => {
      expect(screen.getAllByRole('img')).toHaveLength(1);
      expect(screen.getByAltText(mockPhotosResponse.photos[0].alt)).toBeInTheDocument();
    });
  });
})

