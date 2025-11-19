/**
 * Skenario pengujian authSlice:
 * 
 * - authSlice reducer
 *   - should return initial state when given unknown action
 *   - should handle logout action correctly
 *   - should handle loginUser.pending action correctly
 *   - should handle loginUser.fulfilled action correctly
 *   - should handle loginUser.rejected action correctly
 *   - should handle registerUser.pending action correctly
 *   - should handle registerUser.fulfilled action correctly
 *   - should handle registerUser.rejected action correctly
 */

import authSlice, { logout, clearError, loginUser, registerUser } from '../../store/authSlice';

describe('authSlice reducer', () => {
  const initialState = {
    token: null,
    isLoading: false,
    error: null,
  };

  it('should return initial state when given unknown action', () => {
    const action = { type: 'UNKNOWN' };
    const nextState = authSlice(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should handle logout action correctly', () => {
    const previousState = {
      token: 'sample-token',
      isLoading: false,
      error: null,
    };

    const action = logout();
    const nextState = authSlice(previousState, action);

    expect(nextState).toEqual({
      token: null,
      isLoading: false,
      error: null,
    });
  });

  it('should handle clearError action correctly', () => {
    const previousState = {
      token: null,
      isLoading: false,
      error: 'Some error',
    };

    const action = clearError();
    const nextState = authSlice(previousState, action);

    expect(nextState).toEqual({
      token: null,
      isLoading: false,
      error: null,
    });
  });

  it('should handle loginUser.pending action correctly', () => {
    const action = { type: loginUser.pending.type };
    const nextState = authSlice(initialState, action);

    expect(nextState).toEqual({
      token: null,
      isLoading: true,
      error: null,
    });
  });

  it('should handle loginUser.fulfilled action correctly', () => {
    const previousState = {
      token: null,
      isLoading: true,
      error: null,
    };

    const action = {
      type: loginUser.fulfilled.type,
      payload: 'new-token',
    };

    const nextState = authSlice(previousState, action);

    expect(nextState).toEqual({
      token: 'new-token',
      isLoading: false,
      error: null,
    });
  });

  it('should handle loginUser.rejected action correctly', () => {
    const previousState = {
      token: null,
      isLoading: true,
      error: null,
    };

    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Login failed' },
    };

    const nextState = authSlice(previousState, action);

    expect(nextState).toEqual({
      token: null,
      isLoading: false,
      error: 'Login failed',
    });
  });

  it('should handle registerUser.pending action correctly', () => {
    const action = { type: registerUser.pending.type };
    const nextState = authSlice(initialState, action);

    expect(nextState).toEqual({
      token: null,
      isLoading: true,
      error: null,
    });
  });

  it('should handle registerUser.fulfilled action correctly', () => {
    const previousState = {
      token: null,
      isLoading: true,
      error: null,
    };

    const action = {
      type: registerUser.fulfilled.type,
      payload: { id: 'user-1', name: 'Test User' },
    };

    const nextState = authSlice(previousState, action);

    expect(nextState).toEqual({
      token: null,
      isLoading: false,
      error: null,
    });
  });

  it('should handle registerUser.rejected action correctly', () => {
    const previousState = {
      token: null,
      isLoading: true,
      error: null,
    };

    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Registration failed' },
    };

    const nextState = authSlice(previousState, action);

    expect(nextState).toEqual({
      token: null,
      isLoading: false,
      error: 'Registration failed',
    });
  });
});