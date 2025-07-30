import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Graph from "./Graph.vue";

describe("Graph", () => {
  it("renders with default max width if no graphWidth prop is passed", () => {
    const wrapper = mount(Graph);
    expect(wrapper.classes()).toContain("max-w-xl");
  });

  it("applies the custom graphWidth class when provided", () => {
    const wrapper = mount(Graph, {
      props: {
        graphWidth: "max-w-3xl",
      },
    });
    expect(wrapper.classes()).toContain("max-w-3xl");
  });

  it("renders canvas and wrapper elements", () => {
    const wrapper = mount(Graph);
    expect(wrapper.find("canvas").exists()).toBe(true);
    expect(wrapper.find('[data-testid="graph-wrapper"]').exists()).toBe(true);
  });

  it("shows warning message when peakPercent < warningThreshold", async () => {
    const wrapper = mount(Graph, {
      props: {
        sliderValue: 5,
        warningThreshold: 10,
      },
    });

    // Wait for DOM update
    await wrapper.vm.$nextTick();

    const warning = wrapper.find("span");
    expect(warning.exists()).toBe(true);
    expect(warning.text()).toContain("below 10%");
  });

  it("does not show warning message when peakPercent >= warningThreshold", async () => {
    const wrapper = mount(Graph, {
      props: {
        sliderValue: 20,
        warningThreshold: 10,
      },
    });

    await wrapper.vm.$nextTick();

    const warning = wrapper.find("span");
    expect(warning.exists()).toBe(false);
  });

  it("updates graph when sliderValue changes", async () => {
    const wrapper = mount(Graph, {
      props: {
        sliderValue: 15,
        warningThreshold: 10,
      },
    });

    const canvas = wrapper.find("canvas");
    expect(canvas.exists()).toBe(true);

    // Update sliderValue
    await wrapper.setProps({ sliderValue: 5 });
    await wrapper.vm.$nextTick();

    // Expect warning now visible
    const warning = wrapper.find("span");
    expect(warning.exists()).toBe(true);
    expect(warning.text()).toContain("below 10%");
  });
});
