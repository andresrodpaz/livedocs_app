describe('LIVEBLOCKS_SECRET_KEY env', () => {
  it('debe estar definida y no ser vacía', () => {
    const key = process.env.LIVEBLOCKS_SECRET_KEY;
    expect(key).toBeDefined();
    expect(key).toBeTruthy(); // cubre '', null o undefined
  });

  it('debe tener el prefijo sk_dev_', () => {
    const key = process.env.LIVEBLOCKS_SECRET_KEY;
    expect(key).toMatch(/^sk_dev_/);
  });
});
