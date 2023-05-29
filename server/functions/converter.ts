const conv = (obj: any) => {
  var { sd, offset } = obj;
  if (sd == "undefined" || !sd) sd = undefined;
  if (sd) sd = new Date(sd);
  offset = parseInt(offset || 0) || 0;
  return { sd, offset };
};

export default conv;
