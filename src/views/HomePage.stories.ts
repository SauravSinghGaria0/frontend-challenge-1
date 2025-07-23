import HomePage from "./HomePage.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  component: HomePage,
  title: "Pages/HomePage",
  argTypes: {
    heading: { control: "text" },
    description: { control: "text" },
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
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: "Slider-Peak Graph",
    description: "Slide to shift the peak position left or right.",
    graphWidth: "w-lg",
    warningThreshold: 10,
  },
};
