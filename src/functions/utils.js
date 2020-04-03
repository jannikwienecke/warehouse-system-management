export const getDateString = date => {
  var month = date.getMonth();
  var year = date.getFullYear();
  var day = date.getDay();

  day = day >= 10 ? day : `0${day}`;
  month = month >= 10 ? month : `0${month}`;

  return `${year}-${month}-${day}`;
};

export const sum = arr => {
  return arr.reduce((pv, cv) => pv + cv, 0);
};

export const mockAPI = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        status: "ok",
        data
      });
    }, 100);
  });
};

export const copy = obj => {
  return JSON.parse(JSON.stringify(obj));
};

const dictonary = {
  quantity: "Anzahl"
};

export const translate = text => {
  if (text in dictonary) {
    return dictonary[text];
  }

  return text;
};
