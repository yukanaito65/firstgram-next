interface Props {
    emailChange: any;
    valueEmail: string;
    requiredIcon?: any;
  }
  
  function InputEmail(props: Props) {
    return (
      <div>
        {props.requiredIcon}
        <input
          id="email"
          type="email"
          name="email"
          value={props.valueEmail}
          placeholder="メールアドレス"
          onChange={props.emailChange}
          className="form-input"
          required
        />
      </div>
    );
  }
  
  export default InputEmail;
