export const useTimeStamp = () => {
  const timeStamp = (time) => {
    const date = new Date(time);
    const day = date.toDateString();
    const hour = date.toLocaleTimeString([], {
      timeStyle: "short",
    });
    return `${day}, ${hour}`;
  };

  const dateStamp = (time) => {
    return timeStamp(time).split(",")[1];
  };

  const hourStamp = (time) => {
    return timeStamp(time).split(",")[0];
  };

  return [timeStamp, dateStamp, hourStamp];
};
