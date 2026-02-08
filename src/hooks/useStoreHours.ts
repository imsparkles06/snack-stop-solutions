import { useState, useEffect } from 'react';

export function useStoreHours() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const checkStoreHours = () => {
      const now = new Date();
      const hour = now.getHours();
      
      // Store is open from 5 PM (17:00) to 1 AM
      // Open: hour >= 17 OR hour < 1
      const storeOpen = hour >= 17 || hour < 1;
      
      setIsOpen(storeOpen);
      setCurrentTime(now);
    };

    checkStoreHours();
    const interval = setInterval(checkStoreHours, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const getTimeUntilOpen = () => {
    const hour = currentTime.getHours();
    if (isOpen) return null;

    // Calculate hours until 5 PM
    const hoursUntil5PM = hour < 17 ? 17 - hour : 24 - hour + 17;
    return hoursUntil5PM;
  };

  return {
    isOpen,
    currentTime,
    getTimeUntilOpen,
  };
}
