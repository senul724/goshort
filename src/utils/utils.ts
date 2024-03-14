/**
 * get the url depending on where you live
 */
export const getbaseurl = () => {
  if (process.env.vercel_url) return `https://${process.env.vercel_url}`; // ssr should use vercel url
  return `http://localhost:${process.env.port ?? 3000}`; // dev ssr should use localhost
};

export const makeid = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
