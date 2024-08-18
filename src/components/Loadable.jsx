import { Suspense } from 'react';

import Loader from './Loader';

const Loadable = (Component) => (props) => (
  <Suspense fallback={<Loader />}>
    <Component {...props} />
  </Suspense>
);

Loadable.displayName = 'Loadable';

export default Loadable;
