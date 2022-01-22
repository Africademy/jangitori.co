export type FormFieldProps<K extends string | number | symbol = any> = {
  id: K
  type: string
  label: string
  placeholder: string
}
