const form = document.getElementById('registrationForm');

const nameInput = document.getElementById('fullName');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheck = document.getElementById('termsCheck');

const nameError = document.getElementById('nameError');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const termsError = document.getElementById('termsError');

const nameCharCount = document.getElementById('nameCharCount');
const togglePasswordBtn = document.getElementById('togglePassword');
const strengthIndicator = document.getElementById('strengthIndicator');

const captchaQuestion = document.getElementById('captchaQuestion');
const captchaAnswer = document.getElementById('captchaAnswer');
const captchaError = document.getElementById('captchaError');

let correctCaptcha = 0;

function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  correctCaptcha = num1 + num2;
  captchaQuestion.textContent = `${num1} + ${num2} = ?`;
}

generateCaptcha();

nameInput.addEventListener('input', () => {
  nameInput.value = nameInput.value.replace(/\b\w/g, c => c.toUpperCase());
  nameCharCount.textContent = `${nameInput.value.length} characters`;
});

phoneInput.addEventListener('input', () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, '');
});

passwordInput.addEventListener('input', () => {
  const val = passwordInput.value;
  let strength = '';
  if (val.length < 6) strength = '<span class="weak">Weak</span>';
  else if (/[A-Z]/.test(val) && /[0-9]/.test(val)) strength = '<span class="medium">Medium</span>';
  else if (/[A-Z]/.test(val) && /[0-9]/.test(val) && /[!@#$%^&*]/.test(val)) strength = '<span class="strong">Strong</span>';
  strengthIndicator.innerHTML = strength;
});

togglePasswordBtn.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePasswordBtn.textContent = type === 'password' ? 'Show' : 'Hide';
});

confirmPasswordInput.addEventListener('paste', e => e.preventDefault());

form.addEventListener('submit', e => {
  e.preventDefault();

  // Reset all errors
  [nameError, usernameError, emailError, phoneError, passwordError, confirmPasswordError, termsError, captchaError]
    .forEach(el => el.textContent = '');

  let isValid = true;

  const name = nameInput.value.trim();
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const termsAccepted = termsCheck.checked;
  const captchaResponse = captchaAnswer.value.trim();

  if (!/^[A-Za-z\s]{5,}$/.test(name)) {
    nameError.textContent = 'Name must be at least 5 letters and no numbers.';
    isValid = false;
  }

  if (!/^[a-zA-Z0-9]{5,}$/.test(username)) {
    usernameError.textContent = 'Username must be 5+ characters and alphanumeric.';
    isValid = false;
  }

  if (!email.includes('@') || email.length < 6) {
    emailError.textContent = 'Invalid email.';
    isValid = false;
  }

  if (phone.length !== 10) {
    phoneError.textContent = 'Phone must be 10 digits.';
    isValid = false;
  }

  if (
    password.length < 8 ||
    password.toLowerCase() === 'password' ||
    password.toLowerCase() === name.toLowerCase()
  ) {
    passwordError.textContent = 'Weak password.';
    isValid = false;
  }

  if (password !== confirmPassword) {
    confirmPasswordError.textContent = 'Passwords do not match.';
    isValid = false;
  }

  if (!termsAccepted) {
    termsError.textContent = 'Please accept the terms.';
    isValid = false;
  }

  if (parseInt(captchaResponse) !== correctCaptcha) {
    captchaError.textContent = 'Incorrect answer. Please prove you are human.';
    isValid = false;
  }

  if (isValid) {
    new bootstrap.Modal(document.getElementById('successModal')).show();
    form.reset();
    generateCaptcha();
    strengthIndicator.innerHTML = '';
    nameCharCount.textContent = '0 characters';
    togglePasswordBtn.textContent = 'Show';
  }
});
