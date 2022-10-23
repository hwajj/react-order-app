import { useEffect, useRef, useState } from 'react';

import { getAuth, onAuthStateChanged, User } from '@firebase/auth';
import { logIn } from '../../modules/user';
import { app } from '../../firebase';

const useAuth = () => {
  const [user, setUser] = useState(null);

  const auth = getAuth(app);

  let mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('onAuthUserChanged', user);
      if (user) {
        if (mounted.current) {
          setUser(user);
        }
      } else {
        if (mounted.current) {
          setUser(null);
        }
      }
    });

    return () => {
      mounted.current = false;
      unsubscribe();
    };
  }, [auth]);

  return {
    user,
    auth,
  };
};

export { useAuth };
