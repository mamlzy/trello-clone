'use client';

import { useEffect, useState } from 'react';

import { CardModal } from '@/components/modals/card-modal';

export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div>
      <CardModal />
    </div>
  );
}
