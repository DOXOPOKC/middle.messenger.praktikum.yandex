const textRegexp = /^[a-z_0-9]+$/i;
const emailRegexp = /^[0-9a-z\-\.]+\@[0-9a-z\-]{2,}\.[a-z]{2,}$/i;
const phoneRegexp = /^(\+7|8)[0-9]{10}$/i;
const nameRegexp = /^[a-zа-яё]{2,}$/i;
const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z0-9!@#$%^&*]{6,}$/i;

enum fieldsTypes {
  login = 'login',
  email = 'email',
  phone = 'phone',
  firstName = 'firstName',
  lastName = 'lastName',
  password = 'password'
}

enum errorMessages {
  login = 'Неверный логин',
  email = 'Неверная почта',
  phone = 'Неверный номер',
  firstName = 'Используйте только буквы',
  lastName = 'Используйте только буквы',
  password = 'Неверный пароль'
}

export default (value: string, type: string) => {
  let errorMessage = '';
  let isValid = false;

  switch (type) {
    case fieldsTypes.login:
      isValid = textRegexp.test(value);
      errorMessage = errorMessages[type];
      break;
    case fieldsTypes.email:
      isValid = emailRegexp.test(value);
      errorMessage = errorMessages[type];
      break;
    case fieldsTypes.phone:
      isValid = phoneRegexp.test(value);
      errorMessage = errorMessages[type];
      break;
    case fieldsTypes.firstName:
    case fieldsTypes.lastName:
      isValid = nameRegexp.test(value);
      errorMessage = errorMessages[type];
      break;
    case fieldsTypes.password:
      isValid = passwordRegexp.test(value);
      errorMessage = errorMessages[type];
      break;
    default:
      throw new Error('Неправильный тип поля');
  }

  return { isValid, errorMessage };
};
