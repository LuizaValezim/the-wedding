'use client';

import { useEffect, useState } from 'react';

const WEDDING_DATE = new Date('2027-06-12T16:00:00-03:00');

type CountdownState = {
  label: string;
};

const getCountdownLabel = (): string => {
  const now = new Date();
  const diffMs = WEDDING_DATE.getTime() - now.getTime();

  if (diffMs <= 0) return "It's today!";

  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return `${days}d ${hours}h ${minutes}m`;
};

export default function Countdown() {
  const [state, setState] = useState<CountdownState>({ label: getCountdownLabel() });

  useEffect(() => {
    const update = () => setState({ label: getCountdownLabel() });
    update();
    const interval = setInterval(update, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{state.label}</span>;
}
