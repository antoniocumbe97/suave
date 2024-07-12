export const capitalize = (value) => {
  return (
    String(value).charAt(0).toUpperCase("") +
    String(value).substring(1).toLocaleLowerCase()
  );
};

// expected output: "123.456,79 => MOZAMBIQUE FORMAT"
export const formatCurrency = (value) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  })
    .format(isNaN(value) ? 0 : value)
    .replaceAll("€", "");
};

export const valueOrNull = (value, nullDelimiter = "-") => {
  return value ? value : nullDelimiter;
};

export const currencyTypeOnlyNumber = (value) => {
  return String(value)
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1");
};

export const limitString = ({ string, limit = 10 }) => {
  return String(string).length < limit
    ? string
    : String(string).slice(0, limit).concat("...");
};

export const onlyNumbers = (value, currency = false) => {
  const currencyRegex = currency ? /[^0-9.]/g : /[^0-9]/g;
  return String(value)
    .replace(currencyRegex, "")
    .replace(/(\..*?)\..*/g, "$1");
};

export const formatDate = (value) => {
  if (value == null || value == '') {
    return '';
  }
  const date = new Date(value);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);
  const newFormat = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  return newFormat
}

export const getFormatedDate = (value) => {
  const date = new Date(value);
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const newFormat = `${day}/${month}/${year}`;
  return newFormat
}

export const extractInitials = (fullName) => {
  const nameParts = fullName.split(" ");
  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  let lastInitial = '';
  if (nameParts.length > 1) {
    lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  }
  return firstInitial + lastInitial;
}
