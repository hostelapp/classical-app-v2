const ensureLeadingSlash = (value: string) => (value.startsWith('/') ? value : `/${value}`);

const trimTrailingSlash = (value: string) => {
  if (value === '/') {
    return value;
  }

  return value.replace(/\/+$/, '') || '/';
};

const rawBase = typeof import.meta !== 'undefined' ? import.meta.env.BASE_URL : '/';
const normalizedBase = trimTrailingSlash(ensureLeadingSlash(rawBase ?? '/'));

export const getBasePath = () => normalizedBase;

export const stripBasePath = (pathname: string) => {
  const normalizedPath = trimTrailingSlash(ensureLeadingSlash(pathname));

  if (normalizedBase !== '/' && normalizedPath.startsWith(normalizedBase)) {
    const remainder = normalizedPath.slice(normalizedBase.length);
    if (remainder === '') {
      return '/';
    }

    return trimTrailingSlash(ensureLeadingSlash(remainder));
  }

  return normalizedPath;
};

export const buildHref = (path: string) => {
  const target = trimTrailingSlash(ensureLeadingSlash(path));

  if (normalizedBase === '/') {
    return target;
  }

  if (target === '/') {
    return `${normalizedBase}/`;
  }

  return `${normalizedBase}${target}`;
};
