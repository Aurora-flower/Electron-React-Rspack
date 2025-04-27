export function uuid() {
  return '' + (new Date().getTime() + Math.random());
}

export function getUUID(): string {
  const buffer = new Uint8Array(16);
  let timestamp = Date.now();

  for (let i = 7; i >= 0; i--) {
    buffer[i] = timestamp % 256;
    timestamp = Math.floor(timestamp / 256);
  }

  const randomPart = new Uint8Array(8);
  for (let i = 0; i < 8; i++) {
    randomPart[i] = Math.floor(Math.random() * 256);
  }
  buffer.set(randomPart, 8);

  let binary = '';
  for (let i = 0; i < buffer.length; i++) {
    binary += String.fromCharCode(buffer[i]);
  }

  return btoa(binary)
    .replace(/\+/g, 'm')
    .replace(/\//g, 'X')
    .replace(/=+$/, '')
    .substring(0, 22);
}

export function IdGenerater(this: any, category: string) {
  const NonUuidMark = '.';
  this.id = 0 | (Math.random() * 998);
  this.prefix = category ? category + NonUuidMark : '';
}

IdGenerater.prototype.getNewId = function () {
  return this.prefix + ++this.id;
};

// console.log((IdGenerater as any).getNewId());

// Tip: fspathToUuid
// var imgPath = Path.resolve(Path.dirname(fspath), json.imagePath);
// var textureUUID = fspathToUuid(imgPath);

// fcmR3XADNLgJ1ByKhqcC5Z -> fc991dd7-0033-4b80-9d41-c8a86a702e59
export function decodeUUID(base64: string) {
  const BASE64_KEYS =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const BASE64_VALUES = new Array(123);

  BASE64_KEYS.split('').forEach((char, index) => {
    BASE64_VALUES[char.charCodeAt(0)] = index;
  });

  const HexChars = '0123456789abcdef'.split('');

  const _t = ['', '', '', ''];
  const UuidTemplate = _t.concat(
    _t,
    '-',
    _t,
    '-',
    _t,
    '-',
    _t,
    '-',
    _t,
    _t,
    _t
  );
  const Indices = UuidTemplate.map(function (x, i) {
    return x === '-' ? NaN : i;
  }).filter(isFinite);

  if (base64.length !== 22) {
    return base64;
  }
  UuidTemplate[0] = base64[0];
  UuidTemplate[1] = base64[1];
  for (let i = 2, j = 2; i < 22; i += 2) {
    const lhs = BASE64_VALUES[base64.charCodeAt(i)];
    const rhs = BASE64_VALUES[base64.charCodeAt(i + 1)];
    UuidTemplate[Indices[j++]] = HexChars[lhs >> 2];
    UuidTemplate[Indices[j++]] =
      HexChars[((lhs & 3) << 2) | (rhs >> 4)];
    UuidTemplate[Indices[j++]] = HexChars[rhs & 0xf];
  }
  return UuidTemplate.join('');
}

// console.log(decodeUUID(getUUID()));

// var url = 'assets/main/import/fc/fc991dd7-0033-4b80-9d41-c8a86a702e59.json';
// var uuid = getUuidFromURL(url); // fc991dd7-0033-4b80-9d41-c8a86a702e59
export function getUuidFromURL() {
  const _uuidRegex =
    /.*[/\\][0-9a-fA-F]{2}[/\\]([0-9a-fA-F-]{8,})/;
  return function (url: string) {
    const matches = url.match(_uuidRegex);
    if (matches) {
      return matches[1];
    }
    return '';
  };
}
