/* eslint-disable @next/next/no-img-element */
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/content/Badge";
import Header from "@/components/ui/content/Header";
import Paragraph from "@/components/ui/content/Paragraph";
import Card from "@/components/ui/wrappers/Card/Card";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { gameActions } from "@/store/gameSlice";

const Preparing = () => {
  const { maxRounds, roundTime, set } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  if (!set) return null;

  const { cover, description, name, featured, songs } = set;

  return (
    <Card className="w-full max-w-2xl md:flex-row">
      <img src={cover} className="rounded-lg md:h-40" alt="game cover" />
      <div className="flex flex-col gap-3">
        <Header>{name}</Header>
        <Paragraph>{songs.length} tracks</Paragraph>
        <Badge className="w-fit">Select rounds</Badge>
        <div className="flex gap-2">
          {[5, 10, 15].map((setRounds, index) => {
            return (
              <Button
                variant={setRounds === maxRounds ? "primary" : "secondary"}
                key={index + "roundSelector"}
                onClick={() => {
                  dispatch(gameActions.setRounds(setRounds));
                  dispatch(gameActions.randomizePlaylist());
                }}
              >
                {setRounds}
              </Button>
            );
          })}
        </div>
        <Badge className="w-fit">Select time each round</Badge>
        <div className="flex gap-2">
          {[15, 20, 30, 1200].map((setTime, index) => {
            return (
              <Button
                variant={setTime === roundTime ? "primary" : "secondary"}
                key={index + "timePicker"}
                onClick={() => dispatch(gameActions.setTimeRound(setTime))}
              >
                {setTime}
              </Button>
            );
          })}
        </div>
        <Button
          onClick={() => {
            dispatch(gameActions.startGame());
          }}
        >
          Play
        </Button>
      </div>
    </Card>
  );
};

export default Preparing;
