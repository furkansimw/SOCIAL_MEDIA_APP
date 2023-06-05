import ILast from "./last";

const conv = (obj: any) => {
  var { date, id } = obj;
  if (
    date == "undefined" ||
    date == undefined ||
    id == "undefined" ||
    id == undefined
  )
    return;

  const d = new Date(date);
  const a: ILast = { date: d, id };
  return a;
};

export default conv;
