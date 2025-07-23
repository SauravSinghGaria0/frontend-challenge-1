import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Slider from "./Slider.vue";

function mockCanvas() {
  Object.defineProperty(globalThis, "HTMLCanvasElement", {
    value: class {
      getContext = vi.fn().mockReturnValue({
        clearRect: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        stroke: vi.fn(),
      });
    },
  });
}

describe("Slider.vue", () => {
  beforeEach(() => {
    mockCanvas();
  });

  it("renders the component", () => {
    const wrapper = mount(Slider);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the slider input with default value", () => {
    const wrapper = mount(Slider);
    const input = wrapper.find('input[type="range"]');
    expect(input.exists()).toBe(true);
    expect((input.element as HTMLInputElement).value).toBe("50");
  });

  it("updates peakPercent when slider is moved", async () => {
    const wrapper = mount(Slider);
    const input = wrapper.find('input[type="range"]');
    await input.setValue(20);
    expect(wrapper.text()).toContain("20%");
  });

  it("displays warning message if value is below 10%", async () => {
    const wrapper = mount(Slider);
    const input = wrapper.find('input[type="range"]');
    await input.setValue(5);
    expect(wrapper.text()).toContain("The value is below 5%");
  });

  it("displays warning message if value is above 90%", async () => {
    const wrapper = mount(Slider);
    const input = wrapper.find('input[type="range"]');
    await input.setValue(95);
    expect(wrapper.text()).toContain("The value is above 95%");
  });

  it("does not show warning if value is between 10% and 90%", async () => {
    const wrapper = mount(Slider);
    const input = wrapper.find('input[type="range"]');
    await input.setValue(50);
    expect(wrapper.text()).not.toContain("The value is");
  });

  it("applies custom graphWidth if provided", () => {
    const wrapper = mount(Slider, {
      props: {
        graphWidth: "w-1/2",
      },
    });
    const graph = wrapper.find('[data-testid="graph-wrapper"]');
    expect(graph.classes()).toContain("w-1/2");
  });

  it("applies custom graphWidth if provided", () => {
    const wrapper = mount(Slider, {
      props: {
        graphWidth: "w-1/2",
      },
    });
    const graph = wrapper.find('[data-testid="slider-test"]');
    expect(graph.classes()).toContain("w-1/2");
  });
});
