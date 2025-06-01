export type Time = {
  hours: number;
  minutes: number;
  seconds: number;
};

export type TimerSession = {
  id: NodeJS.Timeout;
  end: () => void;
};
