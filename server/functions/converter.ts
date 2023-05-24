const conv = (obj: { offset?: string; sd?: string }) => {
  var { offset, sd } = obj;
  if (sd == "undefined") sd = undefined;
  let _obj: { offset: number; sd?: Date } = { offset: 0 };
  if (sd) _obj.sd = new Date(sd);
  if (offset) _obj.offset = parseInt(offset) || 0;
  return _obj;
};

export default conv;
