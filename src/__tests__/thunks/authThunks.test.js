/**
 * Skenario pengujian auth thunks:
 * 
 * - loginUser thunk
 *   - should dispatch correct actions when login is successful
 *   - should dispatch correct actions when login fails
 *   - should store token in localStorage when login is successful
 * 
 * - registerUser thunk
 *   - should dispatch correct actions when registration is successful
 *   - should dispatch correct actions when registration fails
 */

import { configureStore } from '@reduxjs/toolkit';
import authSlice, { loginUser, registerUser } from '../../store/authSlice';

// Mock API
jest.mock('../../services/api', () => ({
  login: jest.fn(),
  register: jest.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('auth thunks', () => {
  let store;
  const api = require('../../services/api').default;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlice,
      },
    });
    jest.clearAllMocks();
  });

  describe('loginUser thunk', () => {
    it('should dispatch correct actions when login is successful', async () => {
      // Arrange
      const mockResponse = {
        status: 'success',
        data: { token: 'mock-token' },
      };
      api.login.mockResolvedValue(mockResponse);

      const credentials = { email: 'test@example.com', password: 'password' };

      // Act
      await store.dispatch(loginUser(credentials));

      // Assert
      const state = store.getState().auth;
      expect(state.token).toBe('mock-token');
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'mock-token');
    });

    it('should dispatch correct actions when login fails', async () => {
      // Arrange
      const mockResponse = {
        status: 'fail',
        message: 'Invalid credentials',
      };
      api.login.mockResolvedValue(mockResponse);

      const credentials = { email: 'test@example.com', password: 'wrong' };

      // Act
      try {
        await store.dispatch(loginUser(credentials)).unwrap();
      } catch (error) {
        // Expected to throw
      }

      // Assert
      const state = store.getState().auth;
      expect(state.token).toBe(null);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Invalid credentials');
    });

    it('should store token in localStorage when login is successful', async () => {
      // Arrange
      const mockResponse = {
        status: 'success',
        data: { token: 'test-token-123' },
      };
      api.login.mockResolvedValue(mockResponse);

      const credentials = { email: 'user@test.com', password: 'password123' };

      // Act
      await store.dispatch(loginUser(credentials));

      // Assert
      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'test-token-123');
    });
  });

  describe('registerUser thunk', () => {
    it('should dispatch correct actions when registration is successful', async () => {
      // Arrange
      const mockResponse = {
        status: 'success',
        data: { user: { id: 'user-1', name: 'Test User' } },
      };
      api.register.mockResolvedValue(mockResponse);

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      // Act
      await store.dispatch(registerUser(userData));

      // Assert
      const state = store.getState().auth;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should dispatch correct actions when registration fails', async () => {
      // Arrange
      const mockResponse = {
        status: 'fail',
        message: 'Email already exists',
      };
      api.register.mockResolvedValue(mockResponse);

      const userData = {
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123',
      };

      // Act
      try {
        await store.dispatch(registerUser(userData)).unwrap();
      } catch (error) {
        // Expected to throw
      }

      // Assert
      const state = store.getState().auth;
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Email already exists');
    });
  });
});