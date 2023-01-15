interface Props {
  emailChange: any;
  valueEmail: string;
  requiredIcon?: any;
}

function InputEmail(props: Props) {
  return (
    <div className="w-full mt-1">
      {props.requiredIcon}
      <input
        className="border border-gray-300 rounded w-full h-8 pl-2"
        id="email"
        type="email"
        name="email"
        value={props.valueEmail}
        placeholder="メールアドレス"
        onChange={props.emailChange}
        required
      />
    </div>
  );
}

export default InputEmail;
