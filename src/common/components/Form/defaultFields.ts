export enum FieldID {
  EMAIL = 'email',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PASSWORD = 'password',
}

export const defaultFields = {
  [FieldID.EMAIL]: {
    id: FieldID.EMAIL,
    type: 'email',
    label: 'Email address',
    placeholder: 'Email address',
  },
  [FieldID.FIRST_NAME]: {
    id: FieldID.FIRST_NAME,
    type: 'name',
    label: 'First name',
    placeholder: 'First name',
  },
  [FieldID.LAST_NAME]: {
    id: FieldID.LAST_NAME,
    type: 'name',
    label: 'Last name',
    placeholder: 'Last name',
  },

  [FieldID.PASSWORD]: {
    id: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
  },
}
