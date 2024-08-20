import React, { Suspense } from 'react';

import Loader from './Loader';
//Component is a lazy loaded component
const Loadable =
  <P extends object>(Component: React.LazyExoticComponent<React.ComponentType<P>>) =>
  (props: React.PropsWithoutRef<P>) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

Loadable.displayName = 'Loadable';

export default Loadable;
