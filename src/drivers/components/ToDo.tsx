interface Props {
  title: string;
  checked: boolean;
  disabled: boolean;
  grayedOut: boolean;
  markAsDone(): void;
}

export default function ToDos(props: Props) {
  const { title, checked, disabled, grayedOut, markAsDone } = props;

  return (
    <li>
      <label style={grayedOut ? { color: "lightgray" } : { color: "green" }}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={markAsDone}
        />
        {title}
      </label>
    </li>
  );
}
