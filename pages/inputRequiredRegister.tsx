function InputRequiredRegister(props: any) {
    return (
      <div>
        <span>＊</span>
        <input
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          pattern={props.pattern}
          data-equal-to={props.equal}
          required
        />
        {/* <span className="input-error-message messageBox"> */}
        <span>
          正しい形式で入力してください({props.message})
          {props.errorMessage}
        </span>
      </div>
    );
  }
  
  export default InputRequiredRegister;
