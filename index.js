import * as Crypto from 'crypto';
const secret = 'XgSnfa2#zNYu#bmaB1r#PvGOgD!xSPRF';
const enkrypt = (value) => {
  const iv = Buffer.from('%Y!zy^GxCe$T09GR');
  const cipher = Crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(secret),
    Buffer.from(iv)
  );
  let enkrypted = cipher.update(value);
  enkrypted = Buffer.concat([enkrypted, cipher.final()]);
  return `${iv.toString('hex')}:${enkrypted.toString('hex')}`;
};

const dekrypt = (value) => {
  const [iv, enkrypted] = value.split(':');
  const ivBuffer = Buffer.from(iv, 'hex');
  const decipher = Crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(secret),
    ivBuffer
  );
  let content = decipher.update(Buffer.from(enkrypted, 'hex'));
  content = Buffer.concat([content, decipher.final()]);
  return content.toString();
};

const kry = enkrypt('Testando');
console.log(kry);
console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
const dkry = dekrypt(kry);
console.log(dkry);
