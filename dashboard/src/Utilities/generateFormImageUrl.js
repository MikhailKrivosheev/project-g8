const { NODE_ENV } = process.env;

export default function generateUrl(value) {
  if (!value) return false;
  if (NODE_ENV === 'development') {
    return value.replace('8201', '3000');
  }
  return value;
}
