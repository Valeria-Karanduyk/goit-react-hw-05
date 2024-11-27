import s from "./Error.module.css";

const Error = ({ message }) => {
  return (
    <div className={s.error}>
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
};

export default Error;
