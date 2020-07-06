import { Link } from 'react-router-dom';

export default function Button({
  children, 
  description,
  icon,
  href,
  onClick,
  fgColor,
  bgColor,
}) {
  const buttonText = children || 'unlabelled button';
  const altText = `${buttonText}${description ? `- ${description}` : ''}`
  const backgroundColor = bgColor || '#000';
  const foregroundColor = fgColor || '#FFF';
  const buttonAttributes = {
    'aria-label': altText,
    className: 'component-button',
    style: {
      backgroundColor,
      color: foregroundColor,
    },
  };
  if (!!href) {
    buttonAttributes.to = href;
  } else {
    buttonAttributes.onClick = onClick;
  }
  return (
    <Link {...buttonAttributes}>
      <div className='content'>
        {
          icon ? (
            <FontAwesomeIcon
              className='icon'
              icon={icon}
              size='lg'
            />
          ) : null
        }
        <label>{children}</label>
      </div>
    </Link>
  )
}
