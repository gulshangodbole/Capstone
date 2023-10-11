import React, { useState, useEffect, useCallback } from 'react';

const SessionTimer = ({ timeoutInSeconds, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(timeoutInSeconds);

  const resetTimer = useCallback(() => {
    clearInterval(timer);
    setTimeLeft(timeoutInSeconds);
    startTimer();
  }, [timeoutInSeconds]);

  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          onTimeout(); // Trigger a callback when the session times out
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update the timer every second
  };

  useEffect(() => {
    startTimer();

    // Attach event listeners to reset the timer on user interaction
    const handleUserInteraction = () => {
      resetTimer();
    };

    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
    };
  }, [resetTimer]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      Session Timeout in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default SessionTimer;