export const cutText = (str: string, len = 5) => {
  if (str.length < len * 2) {
    return str;
  }

  return `${str.slice(0, len)}...${str.slice(str.length - len)}`;
}