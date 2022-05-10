export interface SelectProps {
  label: string;
  options: Option[];
  defaultValue?: Option;
  selectedOption?: Option | null;
  onChange: (option: Option | undefined) => void;
}

export interface SelectMultipleProps {
  label: string;
  options: Option[];
  defaultValues?: Option[];
  selectedOptions: Option[];
  onChange: (option: Option[]) => void;
}

export interface Option {
  value: string;
  label: string;
}
