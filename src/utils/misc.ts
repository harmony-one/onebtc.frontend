export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const retry = async <T>(
  fn: () => Promise<T>,
  test,
  count = 3,
  timeout = 5000,
): Promise<T> => {
  const r = await fn();

  if (test(r)) {
    return r;
  }

  if (count > 0) {
    await sleep(timeout);
    return retry<T>(fn, test, count - 1);
  }

  return r;
};

export function downloadFile(
  anchorRef: HTMLAnchorElement,
  url: string,
  name: string,
) {
  anchorRef.href = url;
  anchorRef.setAttribute('download', name);
  anchorRef.click();
}

export const download = (url: string, filename: string) => {
  const ahref = document.createElement('a');
  document.body.appendChild(ahref);
  downloadFile(ahref, url, filename);
  document.body.removeChild(ahref);
};

export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
