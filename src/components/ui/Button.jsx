import { Link } from 'react-router-dom'

/**
 * Single button primitive covering every CTA in the app.
 * Renders a <Link> when `to` is provided (internal nav),
 * otherwise a native <button> (form submits, onClick handlers).
 */
export default function Button({
  children,
  to,
  onClick,
  type = 'button',
  variant = 'primary',
  icon: Icon,
  className = '',
  ...rest
}) {
  const styles = variant === 'primary' ? 'btn-primary' : 'btn-ghost'
  const content = (
    <>
      {children}
      {Icon && <Icon size={18} strokeWidth={2.2} />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={`${styles} ${className}`} {...rest}>
        {content}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={`${styles} ${className}`} {...rest}>
      {content}
    </button>
  )
}
