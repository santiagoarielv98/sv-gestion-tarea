import propTypes from 'prop-types';
import { Suspense } from 'react';

// project import
import Loader from './Loader';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

Loadable.displayName = 'Loadable';

Loadable.propTypes = {
  Component: propTypes.elementType.isRequired
};

export default Loadable;
