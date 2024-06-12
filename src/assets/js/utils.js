const formData = (form) => {
  const formData = new FormData(form);

  const object = {};

  for (const entry of formData) {
    let value = entry[1].trim();
    value = value.replaceAll('  ', ' ');
    value = value[0]?.toUpperCase() + value.slice(1);
    object[entry[0]] = value;
  }

  return object;
};

const formIsValid = (object) => {
  for (const property in object) {
    if (object[property] === 'undefined') {
      return false;
    }
  }
  return true;
};

export { formData, formIsValid };
