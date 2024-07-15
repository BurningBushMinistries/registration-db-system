import { Link as RouterLink } from 'react-router-dom';
// material

// ----------------------------------------------------------------------

Logo.propTypes = {};

export default function Logo() {
  return (
    <RouterLink to={'/app/home'}>
      <img src="/static/logo.jpg" width={50} height={50} alt="bbm-logo" />
    </RouterLink>
  );
}
