function InputRequiredRegister(props: any) {
    return (
      <div className="flex my-3">
        <div className="text-xs text-red-500 my-auto">＊</div>
        <input
                className="border border-gray-300 rounded w-full h-16 pl-2 bg-gray-100"
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          pattern={props.pattern}
          data-equal-to={props.equal}
          value={props.value}
          onChange={props.onChange}
          required
        />
        {/* <span>
          正しい形式で入力してください({props.message})
          {props.errorMessage}
        </span> */}
      </div>
    );
  }

  export default InputRequiredRegister;
