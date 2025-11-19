/**
 * Test yang sengaja dibuat gagal untuk screenshot CI error
 */

describe('Failing Test for CI Screenshot', () => {
  it('should intentionally fail to demonstrate CI error', () => {
    // Test yang sengaja gagal
    expect(true).toBe(false);
  });

  it('should also fail with wrong calculation', () => {
    const result = 2 + 2;
    expect(result).toBe(5); // Sengaja salah
  });

  it('should fail with undefined variable', () => {
    const undefinedVar = undefined;
    expect(undefinedVar.someProperty).toBeDefined(); // Akan error
  });
});