import { navigate, type Options } from 'astro:transitions/client';

export function addUrlFragment(name: string, options?: Options) {
  const { pathname, search } = location;
  return navigate(`${pathname}${search}#${name}`, options);
}

export function removeUrlFragment() {
  history.back();
}

export function toggleUrlFragment(name: string, options?: Options) {
  location.hash === `#${name}`
    ? removeUrlFragment()
    : addUrlFragment(name, options);
}
