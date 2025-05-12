// eslint-disable-next-line no-unused-vars
type TActiveSelectFunction = (setOpen: boolean) => void;

type TSetOpen = () => void;

const activeSelects: TActiveSelectFunction[] = [];

export function add(setOpen: TSetOpen) {
  activeSelects.push(setOpen);
}

export function close(setOpen: TSetOpen) {
  const index = activeSelects.indexOf(setOpen);
  if (index >= 0) {
    activeSelects[index](false);
    activeSelects.splice(index, 1);
  }
}

export function closeAll() {
  activeSelects.forEach((setOpen) => setOpen(false));
  activeSelects.splice(0);
}
