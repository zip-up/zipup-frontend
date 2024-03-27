import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const CreateFunding = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/funding/create/1');
  }, []);

  return <div>hi</div>;
};

export default CreateFunding;
