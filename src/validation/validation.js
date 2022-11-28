export const validateUsername = (username) => {
  let error = null;
  if (!username) {
    error = 'Username is required';
  } else if (username.length < 3) {
    error = 'Username must be at least 3 characters';
  } else if (username.length > 15) {
    error = 'Username must be less than 15 characters';
  } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
    error = 'Username must be alphanumeric';
  }
  return error;
};

export const validateEmail = (email) => {
  let error = null;
  if (!email) {
    error = 'Email is required';
  } else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
    error = 'Invalid email address';
  }
  return error;
};

export const validatePassword = (password) => {
  let error = null;
  if (!password) {
    error = 'Password is required';
  } else if (password.length < 8) {
    error = 'Password must be at least 8 characters';
  } else if (password.length > 64) {
    error = 'Password must be less than 64 characters';
  } else if (!/[a-z]/.test(password)) {
    error = 'Password must contain at least one lowercase letter';
  } else if (!/[A-Z]/.test(password)) {
    error = 'Password must contain at least one uppercase letter';
  } else if (!/[0-9]/.test(password)) {
    error = 'Password must contain at least one number';
  } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
    error = 'Password must contain at least one special character';
  }
  return error;
};

export const validatePin = (pin) => {
  let error = '';
  if (!pin) {
    error = 'PIN is required';
  } else if (pin.length !== 6) {
    error = 'PIN must be 6 characters';
  } else if (!/^[0-9]+$/.test(pin)) {
    error = 'PIN must be numeric';
  }
  return error;
};
