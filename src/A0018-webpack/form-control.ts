import isEmail from 'validator/lib/isEmail';

const SHOW_ERROR_MESSAGES = 'show-error-message';

const form = document.querySelector('.form') as HTMLFormElement;
const username = document.querySelector('.username') as HTMLInputElement;
const email = document.querySelector('.email') as HTMLInputElement;
const password = document.querySelector('.password') as HTMLInputElement;
const password2 = document.querySelector('.password2') as HTMLInputElement;

const submitEventFn = (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLFormElement
  hideErrorMessages(target);
  checkForEmptyFields(username, email, password, password2);
  checkEmail(email);
  checkEqualPassawords(password, password2);
  if (shouldSendForm(target)) console.log('Formulário enviado');
};

form.addEventListener('submit', submitEventFn)

function checkForEmptyFields(...inputs: HTMLInputElement[]): void {
  inputs.forEach((input) => {
    if (!input.value) {
      showErrorMessage(input, 'Campo obrigatório');
    }
  });
}

function checkEmail(input: HTMLInputElement): void {
  if (!isEmail(input.value)) showErrorMessage(input, 'E-mail inválido');
}

const checkEqualPassawords = (
  password: HTMLInputElement,
  password2: HTMLInputElement,
) => {
  if (password.value !== password2.value) {
    showErrorMessage(password2, 'As senhas precisam ser iguais');
  }
}

const hideErrorMessages = (form: HTMLFormElement): void => {
  form.querySelectorAll('.' + SHOW_ERROR_MESSAGES).forEach((item) => {
    item.classList.remove(SHOW_ERROR_MESSAGES);
  });
}

const showErrorMessage = (input: HTMLInputElement, msg: string): void => {
  const formFields = input.parentElement as HTMLDivElement;
  const errorMessage = formFields.querySelector(
    '.error-message',
  ) as HTMLSpanElement;
  errorMessage.innerText = msg;
  formFields.classList.add(SHOW_ERROR_MESSAGES);
}

const shouldSendForm = (form: HTMLFormElement): boolean => {
  let send = true;
  form
    .querySelectorAll('.' + SHOW_ERROR_MESSAGES)
    .forEach(() => (send = false));

  return send;
}
