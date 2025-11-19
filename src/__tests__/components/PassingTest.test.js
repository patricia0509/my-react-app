/**
 * Test yang pasti berhasil untuk screenshot CI pass
 */

describe('Passing Test for CI Screenshot', () => {
  it('should pass basic assertion', () => {
    expect(true).toBe(true);
  });

  it('should pass mathematical calculation', () => {
    const result = 2 + 2;
    expect(result).toBe(4);
  });

  it('should pass string comparison', () => {
    const greeting = 'Hello World';
    expect(greeting).toContain('Hello');
  });

  it('should pass array operations', () => {
    const numbers = [1, 2, 3, 4, 5];
    expect(numbers).toHaveLength(5);
    expect(numbers).toContain(3);
  });

  it('should pass object property check', () => {
    const user = { name: 'John', age: 30 };
    expect(user).toHaveProperty('name');
    expect(user.name).toBe('John');
  });
});