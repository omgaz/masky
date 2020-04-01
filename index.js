const mapValues = (obj, fn, ...extras) => {
  const newObj = {};
  for (let [key, val] of Object.entries(obj)) {
    newObj[key] = fn(val, key, ...extras);
  }
  return newObj;
}

const getMaskedStringValue = (matched, start, middle, end) => `${start}${Array(middle.length).join('*')}${end}`;

const maskString = value => {
  if (value.length <= 3) return `${value[0]}${Array(value.length - 1).join('*')}`;
  if (value.length >= 256) return `${value.slice(0, 25)}…******…******`;
  const atPos = value.indexOf('@');
  if (atPos !== -1) {
    const maskedTo = maskString(value.substring(0, atPos));
    return `${maskedTo}${value.substring(atPos)}`;
  }
  const toKeep = Math.max(Math.floor(value.length / 3 / 2), 1);
  const re = new RegExp(`(^.{${toKeep}})(.+)(.{${toKeep}}$)`);
  return value.replace(re, getMaskedStringValue);
};

const maskObject = (secretObject, keysToOmit) => mapValues(secretObject, maskValue, keysToOmit);

const maskValue = (value, key, keysToOmit) => {
  if (keysToOmit && keysToOmit.indexOf(key) !== -1) return value;
  if (typeof value === 'string') return maskString(value);
  if (typeof value === 'object') return maskObject(value, keysToOmit);
  return `masked*${typeof value}`;
};

const masky = (valuesToMask, keysToOmit) => mapValues(valuesToMask, maskValue, keysToOmit);

module.exports = {
  mask: masky,
  maskString,
};