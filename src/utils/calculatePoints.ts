const calculatePoints = (guessTime: number): number => {
  const maxRoundTime = 30;
  const maxPoints = 1000;

  if (guessTime > maxRoundTime) return 0;

  const timeLeft = (maxRoundTime - guessTime) / maxRoundTime;
  const points = Math.round(maxPoints * Math.pow(timeLeft, 2));

  if (points < 10) {
    return 10;
  }

  return points;
};

export default calculatePoints;
