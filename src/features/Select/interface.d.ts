export interface SelectProps {
  label: string;
  options: Option[];
  defaultValue?: Option;
  selectedOption?: Option;
}

export interface SelectMultipleProps {
  label: string;
  options: Option[];
  defaultValues?: Option[];
  selectedOptions?: Option[];
}

export interface Option {
  value: string;
  label: string;
}
