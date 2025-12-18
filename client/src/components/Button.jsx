import "../styles/button.css";

function Button({ text, onClick, type = "button" }) {
  return (
    <button className="primary-button" onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default Button;
