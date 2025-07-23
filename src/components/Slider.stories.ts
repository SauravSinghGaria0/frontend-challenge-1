import type { Meta, StoryObj } from "@storybook/vue3";
import Slider from "./Slider.vue";

const meta = {
  component: Slider,
  title: "Components/slider",
  argTypes: {
    graphWidth: {
      control: { type: "select" },
      description: "Width of the graph",
      defaultValue: "w-lg",
      options: ["w-sm", "w-md", "w-lg", "w-xl", "w-full"],
    },
    warningThreshold: {
      control: { type: "number" },
      description: "Threshold for warning in percentage",
      defaultValue: 10,
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    graphWidth: "w-lg",
    warningThreshold: 10,
  },
};
