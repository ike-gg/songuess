"use client";

import { BackButton, Button, CardFooter, Code, Heading } from "@/components/ui";
import { routes } from "@/constants";
import { RxReload, RxReset } from "react-icons/rx";

const SetErrorPage = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  return (
    <>
      <BackButton href={routes.sets.browser()}>Back to sets</BackButton>
      <Heading>An error occurred while invoking set</Heading>
      <Code footer={error.stack}>{error.message}</Code>
      <CardFooter className="flex flex-row justify-end">
        <Button variant="secondary" icon={<RxReload />} onClick={reset}>
          Try again
        </Button>
        <Button href={routes.sets.browser()} icon={<RxReset />}>
          Go back
        </Button>
      </CardFooter>
    </>
  );
};

export default SetErrorPage;
