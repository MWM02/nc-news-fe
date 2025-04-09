export const capitalise = (str) =>
  String(str)[0].toUpperCase() + String(str).slice(1).toLowerCase();

export const timeFormatted = (date) => {
  const newDate = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return newDate.toLocaleDateString(undefined, options);
};

export const validateImgUrl = (urlStr) => {
  const urlRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg))/i;
  return urlRegex.test(urlStr);
};
