import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { typeToFlattenedError } from "zod";

const formInputs = [
  {
    label: "이름",
    name: "username",
    type: "text",
    placeholder: "홍길동",
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  {
    label: "회사이름",
    name: "company",
    type: "text",
    placeholder: "",
    minLength: 1,
    maxLength: 30,
  },
  {
    label: "연락처",
    name: "contact",
    type: "text",
    placeholder: "번호 또는 이메일",
    required: true,
  },
  {
    label: "연락처 재확인",
    name: "contact_confirm",
    type: "text",
    placeholder: "번호 또는 이메일",
    required: true,
    minLength: 6,
    maxLength: 30,
  },
  {
    label: "내용",
    name: "content",
    type: "text",
    placeholder: "안녕하세요",
    required: true,
    textarea: true,
    minLength: 1,
    maxLength: 1000,
  },
];

type ContactFormprops = {
  state:
    | typeToFlattenedError<
        {
          username: string;
          contact: string;
          contact_confirm: string;
          content: string;
          company?: string | undefined;
        },
        string
      >
    | null
    | undefined;
  dispatch: (payload: FormData) => void;
};

const ContactForm = ({ state, dispatch }: ContactFormprops) => (
  <form action={dispatch}>
    <div className="flex flex-col gap-y-5">
      {formInputs.map(({ label, name, ...props }) => (
        <FormInput
          key={name}
          label={label}
          name={name}
          error={state?.fieldErrors?.[name as keyof typeof state.fieldErrors]}
          {...props}
        />
      ))}
    </div>

    <div className="pt-5">
      <FormButton name="제출하기" />
    </div>
  </form>
);

export default ContactForm;
