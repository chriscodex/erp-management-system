export function onChangeCelular(e, field) {
  const value = e.target.value.replace(/[^0-9+\-*/#]/g, '');
  field.onChange(value);
}

export function onChangeNumero(e, field) {
  const value = e.target.value.replace(/[^0-9]/g, '');
  field.onChange(value);
}
