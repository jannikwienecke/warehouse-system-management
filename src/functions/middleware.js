import { EXCEPTIONS, IDENTIFIER, INPUT } from "../baseComponents/base";

export const endGreaterStart = (data) => {
  if (!"dateStart" in data || !"dateEnd" in data) return;
  const start = new Date(data.dateStart);
  const end = new Date(data.dateEnd);
  if (end <= start) {
    EXCEPTIONS.ValidationException["msg"] =
      "Fehler: Ende muss größer sein als Anfang";
    EXCEPTIONS.ValidationException["nameList"] = ["dateStart", "dateEnd"];
    throw EXCEPTIONS.ValidationException;
  }
};

export const extractIdentifier = (data) => {
  Object.keys(data).forEach((key) => {
    var val = data[key];
    if (typeof val === "object" && val !== null) {
      if (INPUT[key]) {
        var id = INPUT[key].name.slice(0, -1) + "Id";
      } else {
        var id = key;
      }
      try {
        data[id] = parseInt(val.value);
      } catch (e) {
        data[id] = val.value;
      }
    }
  });
};
