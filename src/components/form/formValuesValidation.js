export default function validateAuth(values, requiredArguments, authFuncArr) {
  let errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (
      requiredArguments &&
      (requiredArguments.includes(key) || requiredArguments.includes("all"))
    ) {
      if ((!value && value !== 0) || value === "") {
        errors[key] = key + " is required";
      }
    }

    if (key === "email") {
      var error = validateEmail(value);
      if (error) errors[key] = error;
    }
  });

  if (authFuncArr) {
    authFuncArr.forEach((func) => {
      var error = func(values);

      if (error) errors[error.key] = error.msg;
    });
  }

  return errors;
}

const validateEmail = (email) => {
  if (email == null) return;
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return "Invalid email address";
  }
};
