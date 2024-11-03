import { useState } from "react";
interface FormState<T> {
  data: T;
  error: any | null;
  success:boolean;
}
const useCustomFormState = <T>(
  initialState: T,
  action: (prevState: T, formData: FormData) => Promise<FormState<T>>,
  onSuccess: (result: FormState<T>) => void,
): [FormState<T>, (formData: FormData) => Promise<void>] => {
  const [state, setState] = useState<FormState<T>>({
    data: initialState,
    error: null,
    success:false
  });
  const dispatch = async (formData: FormData) => {
    const result = await action(state.data, formData);
    if (result.success) {
      onSuccess(result);
    } else {
      setState(result);
    }
  };
  return [state, dispatch];
};
export default useCustomFormState;
