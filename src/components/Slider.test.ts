import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Slider from "./Slider.vue";

describe("Slider", () => {
  //checks for rendering Component
  it("renders the component", () => {
    const wrapper = mount(Slider);
    expect(wrapper.exists()).toBe(true);
  });

  //checks for default class with no props
  it("renders with default max width if no graphWidth prop is passed", () => {
    const wrapper = mount(Slider);
    const wrapperDiv = wrapper.find('[data-testid="slider-test"]');
    expect(wrapperDiv.classes()).toContain("max-w-xl");
  });

  //checks for default class with graphWidth props
  it("applies custom graphWidth if provided (w-1/2)", () => {
    const wrapper = mount(Slider, {
      props: {
        graphWidth: "w-1/2",
      },
    });
    const wrapperDiv = wrapper.find('[data-testid="slider-test"]');
    expect(wrapperDiv.classes()).toContain("w-1/2");
  });

  //checks for default class with graphWidth props
  it("applies custom graphWidth if provided (w-xl)", () => {
    const wrapper = mount(Slider, {
      props: {
        graphWidth: "w-xl",
      },
    });
    const wrapperDiv = wrapper.find('[data-testid="slider-test"]');
    expect(wrapperDiv.classes()).toContain("w-xl");
  });

  //checks for inputValue without any props
  it("displays warning class if value is below 10%", async () => {
    const wrapper = mount(Slider);
    const input = wrapper.find('input[type="range"]');
    await input.setValue(5);
    expect(input.classes()).toContain("thumb-warning");
  });

  //checks for inputValue without any props
  it("displays warning class if value is above 10%", async () => {
    const wrapper = mount(Slider);
    const input = wrapper.find('input[type="range"]');
    await input.setValue(15);
    expect(input.classes()).toContain("thumb-default");
  });

  //checks for inputValue without any props
  it("does not show warning if value is between 10% and 90%", async () => {
    const wrapper = mount(Slider);
    const input = wrapper.find('input[type="range"]');
    await input.setValue(50);
    expect(wrapper.text()).toContain("50%");
  });

  //checks for inputValue with warningThreshold props
  it("applies warningThreshold and shows warning class if value is below threshold", async () => {
    const wrapper = mount(Slider, {
      props: {
        warningThreshold: 20,
      },
    });
    const input = wrapper.find('input[type="range"]');
    await input.setValue(15);
    expect(input.classes()).toContain("thumb-warning");
  });

  //checks for inputValue with warningThreshold props
  it("applies warningThreshold and shows warning class if value is above threshold", async () => {
    const wrapper = mount(Slider, {
      props: {
        warningThreshold: 20,
      },
    });
    const input = wrapper.find('input[type="range"]');
    await input.setValue(25);
    expect(input.classes()).toContain("thumb-default");
  });
});
