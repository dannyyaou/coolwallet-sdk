import * as bitcoin from 'bitcoinjs-lib';

export function hash160(buf: Buffer): Buffer {
  return bitcoin.crypto.hash160(buf);
}

export function doubleSha256(buf: Buffer): Buffer {
  return bitcoin.crypto.hash256(buf);
}
