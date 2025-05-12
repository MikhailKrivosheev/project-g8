const MILLISECONDS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;

interface IWrite {
  name: string;
  value: any;
  expires?: number;
}

type removeType = Omit<IWrite, 'expires'>;

export function write(props: IWrite) {
  const { name, value, expires = MILLISECONDS_PER_YEAR } = props;
  const now = new Date();
  const nowTime = now.getTime();
  const expireTime = nowTime + expires;
  now.setTime(expireTime);
  document.cookie = `${name}=${value};expires=${now.toUTCString()};path=/`;
}

export function remove(props: removeType) {
  const { name, value } = props;
  const now = new Date();
  const nowTime = now.getTime();
  const expireTime = nowTime - 1;
  now.setTime(expireTime);
  document.cookie = `${name}=${value};expires=${now.toUTCString()}path=/'`;
}

export function removeByName(name: string) {
  const now = new Date();
  now.setTime(now.getTime() - 1);
  const expires = `expires=${now.toUTCString()}`;
  document.cookie = `${name}=;${expires};path=/`;
}

export function get(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/gu, '\\$1')}=([^;]*)`,
      'u'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
