import { useState } from 'react';

const useConfetti = () => {
  const [isExploding, setIsExploding] = useState(false);

  const triggerConfetti = () => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 3000); // 3 seconds explosion
  };

  return {
    isExploding,
    triggerConfetti,
  };
};

export default useConfetti;
