import Graph from "./Graph.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  component: Graph,
  title: "Components/Graph",
  argTypes: {
    graphWidth: {
      control: "text",
      description: "Width of the graph container",
      defaultValue: "w-xl",
    },
    warningThreshold: {
      control: { type: "number" },
      description: "Threshold for warning in percentage",
      defaultValue: 10,
    },
    sliderValue: {
      control: { type: "number" },
      description: "Threshold for warning in percentage",
      defaultValue: 50,
    },
  },
} satisfies Meta<typeof Graph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    graphWidth: "w-3xl",
    warningThreshold: 10,
    sliderValue: 50,
  },
};
