import { SourceDataType, hexJSON, hexU64 } from './hex';

test('parse u64', () => {
  expect(hexU64('0')).toBe('0000000000000000');
  expect(hexU64('1')).toBe('0000000000000001');
  expect(hexU64('18446744073709551615')).toBe('ffffffffffffffff');
});

test('test JSONhexify', () => {
  const parsed = hexJSON(
    `{ 
    "u64": 18446744073709551615, 
    "Hash": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    "String": "String",
    "Uint64": "0x000000000000ffff"
  }`,
    {
      u64: SourceDataType.u64,
      Uint64: SourceDataType.Uint64,
      String: SourceDataType.String,
      Hash: SourceDataType.Hash,
    },
  );

  expect(parsed).toEqual({
    u64: 'ffffffffffffffff',
    Hash: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    String: 'String',
    Uint64: '000000000000ffff',
  });
});
