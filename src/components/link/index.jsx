import { Link as BasicLink } from 'react-router-dom';

export default function Link({ to, children, ...props }) {
  return (
    <BasicLink to={to} {...props}>
      {children}
    </BasicLink>
  );
}
