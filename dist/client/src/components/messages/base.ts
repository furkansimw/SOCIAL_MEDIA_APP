import { IMessage } from "../../interfaces/IMessages";

export const dateViewer = (date: string) => {
  const now = new Date(Date.now()).getTime();
  const d = new Date(date).getTime();
  const diff = Math.floor((now - d) / 1000);
  const diffD = diff / 60 / 60 / 24;
  if (diffD < 1) {
    let hour: any = new Date(d).getHours();
    let min: any = new Date(d).getMinutes();
    hour = hour < 10 ? `0${hour}` : hour;
    min = min < 10 ? `0${min}` : min;
    return `${hour}:${min}`;
  }
  if (diffD > 1 && diffD < 7) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let hour: any = new Date(d).getHours();
    let min: any = new Date(d).getMinutes();
    hour = hour < 10 ? `0${hour}` : hour;
    min = min < 10 ? `0${min}` : min;
    const day = days[new Date(d).getDay()];
    return `${day} ${hour}:${min}`;
  }
  const d1 = new Date(d).getFullYear();
  const d2 = new Date(now).getFullYear();
  let year = "";
  if (d1 != d2) year = "- " + d1.toString();

  return `${
    new Date(d).getDate() < 10
      ? `0${new Date(d).getDate()}`
      : new Date(d).getDate()
  } - ${
    new Date(d).getMonth() < 10
      ? `0${new Date(d).getMonth()}`
      : new Date(d).getMonth() + 1
  } ${year}`;
};

function transformList(messages: IMessage[]) {
  let a = [];
  let count = 1;

  for (let i = 0; i < messages.length; i++) {
    if (
      i === messages.length - 1 ||
      dateViewer(messages[i].created) !== dateViewer(messages[i + 1].created)
    ) {
      if (count === 1) a.push("single");
      else if (count === 2) a.push("first", "last");
      else if (count === 3) a.push("first", "middle", "last");
      else a.push("first", ...Array(count - 2).fill("middle"), "last");
      count = 1;
    } else count++;
  }

  return a;
}

export default transformList;
