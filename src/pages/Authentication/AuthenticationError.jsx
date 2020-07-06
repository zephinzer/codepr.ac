export function AuthenticationError({
  code,
  message,
  data,
}) {
  console.log(this);
  return (
    <div className="authentication-error">
      Authentication Error
    </div>
  )
}