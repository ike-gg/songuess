import {
  Provider,
  Root,
  Trigger,
  Portal,
  Content,
  Arrow,
} from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";
import { RxInfoCircled } from "react-icons/rx";

interface Props {
  children: string;
}

const Tooltip = ({ children }: Props) => {
  return (
    <Provider>
      <Root delayDuration={50}>
        <Trigger>
          <RxInfoCircled className="text-zinc-500 transition-colors hover:text-zinc-300" />
        </Trigger>
        <Portal>
          <Content
            sideOffset={4}
            className={twMerge(
              "inline-flex max-w-xs items-center rounded-md bg-zinc-700 px-3.5 py-3 text-center text-sm leading-tight shadow-xl shadow-zinc-900"
            )}
          >
            <Arrow className="fill-current text-zinc-700" />
            <span className="block text-zinc-100">{children}</span>
          </Content>
        </Portal>
      </Root>
    </Provider>
  );
};

export default Tooltip;
