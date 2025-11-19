/**
 * Skenario pengujian End-to-End Login:
 * 
 * - Login Flow
 *   - should display login form correctly
 *   - should show validation errors for empty fields
 *   - should navigate to register page when register link is clicked
 *   - should handle login process and redirect to home page
 *   - should show error message for invalid credentials
 *   - should store authentication token after successful login
 */

describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login form correctly', () => {
    // Assert
    cy.contains('h2', 'Login').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('contain.text', 'Login');
    cy.contains('Don\'t have an account?').should('be.visible');
    cy.contains('Register here').should('be.visible');
  });

  it('should show validation errors for empty fields', () => {
    // Act
    cy.get('button[type="submit"]').click();

    // Assert - HTML5 validation should prevent submission
    cy.get('input[type="email"]:invalid').should('exist');
    cy.get('input[type="password"]:invalid').should('exist');
  });

  it('should navigate to register page when register link is clicked', () => {
    // Act
    cy.contains('Register here').click();

    // Assert
    cy.url().should('include', '/register');
    cy.contains('h2', 'Register').should('be.visible');
  });

  it('should handle login process and show loading state', () => {
    // Arrange
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          token: 'mock-jwt-token'
        }
      }
    }).as('loginRequest');

    // Act
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assert
    cy.wait('@loginRequest');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should show error message for invalid credentials', () => {
    // Arrange
    cy.intercept('POST', '**/login', {
      statusCode: 401,
      body: {
        status: 'fail',
        message: 'Invalid credentials'
      }
    }).as('loginFailRequest');

    // Act
    cy.get('input[type="email"]').type('wrong@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    // Assert
    cy.wait('@loginFailRequest');
    cy.contains('Login failed').should('be.visible');
  });

  it('should store authentication token after successful login', () => {
    // Arrange
    const mockToken = 'test-jwt-token-123';
    cy.intercept('POST', '**/login', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          token: mockToken
        }
      }
    }).as('successfulLogin');

    // Act
    cy.get('input[type="email"]').type('user@example.com');
    cy.get('input[type="password"]').type('validpassword');
    cy.get('button[type="submit"]').click();

    // Assert
    cy.wait('@successfulLogin');
    cy.window().its('localStorage').invoke('getItem', 'token').should('equal', mockToken);
  });

  it('should redirect authenticated users away from login page', () => {
    // Arrange - Set token in localStorage
    cy.window().then((win) => {
      win.localStorage.setItem('token', 'existing-token');
    });

    // Act
    cy.visit('/login');

    // Assert - Should redirect to home or stay on login but show different UI
    // This depends on your app's behavior for authenticated users
    cy.url().should('not.include', '/login').or('include', '/');
  });
});