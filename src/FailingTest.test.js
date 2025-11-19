// Test yang sengaja dibuat gagal untuk screenshot CI error
test('intentional failing test for CI error screenshot', () => {
  expect(true).toBe(false);
});

test('another failing test', () => {
  expect(2 + 2).toBe(5);
});

test('undefined error test', () => {
  const obj = undefined;
  expect(obj.property).toBeDefined();
});