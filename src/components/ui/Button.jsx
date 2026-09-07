export default function Button({ children, className = "", type = "button", ...props }) {
  const classes = ["button", className].filter(Boolean).join(" ");

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
