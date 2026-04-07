import * as bip39 from 'bip39';

export function generateSeedPhrase(): string {
  const mnemonic = bip39.generateMnemonic();
  return mnemonic.split(' ').slice(0, 4).join(' ');
}

export function normalizeSeed(seed: string): string {
  return seed.trim().toLowerCase();
}
