const conv = (obj: { offset?: string; sd?: string }) => {
  const { offset, sd } = obj;
  let _obj: { offset: number; sd?: Date } = { offset: 0 };
  if (sd) _obj.sd = new Date(sd);
  if (offset) _obj.offset = parseInt(offset) || 0;
  return _obj;
};

export default conv;
