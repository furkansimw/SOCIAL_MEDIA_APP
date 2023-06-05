export default (cookies: string) => {
  let obj: { [string: string]: string } = {};
  cookies
    ?.split(";")
    .filter((_) => _.trim())
    .map((cookiepart) => {
      const cookiesplittedlist = cookiepart.split("=");
      const cookiekey = cookiesplittedlist[0].trim();
      const cookievalue = cookiesplittedlist[1];
      obj[cookiekey] = cookievalue;
    });
  return obj;
};
