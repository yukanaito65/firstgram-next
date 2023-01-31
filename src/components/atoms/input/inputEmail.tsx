interface Props {
  emailChange: any;
  valueEmail: string;
  requiredIcon?: any;
}

function InputEmail(props: Props) {
  return (
    <div className="w-full my-3 flex">
      <div className="text-xs text-red-500 my-auto">
      {props.requiredIcon}
      </div>
      <input
        className="border border-gray-300 rounded w-full h-16 pl-2 bg-gray-100"
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
