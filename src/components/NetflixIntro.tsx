import React, { useEffect, useState } from 'react';

const NetflixIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 4200); // Animation duration + slight delay

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      <div className="relative w-[calc(min(80vw,300px))] h-[calc(min(50vh,150px))]">
        <div className="netflix-logo">
          <div className="netflix-logo__wrap">
            <div className="netflix-logo__center">
              <div className="netflix-logo__sides">
                <div className="netflix-logo__left"></div>
                <div className="netflix-logo__right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixIntro;