export function envStr(key: string, defaults: string): string {
  return process.env[key] ?? defaults;
}

export function envNum(key: string, defaults: number): number {
  const value = Number(process.env[key]);
  return Number.isNaN(value) ? defaults : value;
}
