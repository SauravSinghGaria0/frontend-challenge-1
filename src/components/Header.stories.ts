import Header from "./Header.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta = {
  component: Header,
  title: "Components/Header",
  argTypes: {
    heading: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: "Slider-Peak Graph",
    description: "Slide to shift the peak position left or right.",
  },
};
