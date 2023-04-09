const toCamelCase = (str) =>
  str.replace(/-(\w)/g, (a, b) =>
    typeof b === 'string' ? b.toUpperCase() : ''
  );

/**
 * load images in assets folder
 *
 * @param {string} src -
 * @param {boolean} deep -
 * @returns {object} key: filename kebab-case to camelCase and camelCase_fileType
 */
export default function load(src = '', deep = false) {
  const context = require.context(
    '@/assets',
    true,
    /\.png$|.svg$|.jpg$|.jpeg$|.webp$/
  );

  const res = {};

  context.keys().forEach((k) => {
    const url = src ? `./${src}/` : './';
    if (src && k.indexOf(url) !== 0) {
      return;
    }

    const key = k.replace(url, '').replace(' ', '');

    const nameString = key.split('/');

    if (!deep && nameString.length > 1) {
      return;
    }

    const nameStr = nameString[nameString.length - 1];
    const name = toCamelCase(
      nameStr.replace(/\.png$|.svg$|.jpg$|.jpeg$|.webp$/, '')
    );
    const typedName = toCamelCase(nameStr.replace('.', '_'));

    res[name] = res[typedName] = context(k).default;
  });

  return res;
}
