const conv = (obj: any) => {
  var { sd, offset } = obj;
  if (sd == "undefined" || !sd) sd = undefined;
  if (sd) sd = new Date(sd);
  offset = parseInt(offset || 0) || 0;
  const _offset: number = offset;
  const _date: Date | undefined = sd;
  return { sd: _date, offset: _offset };
};

export default conv;
