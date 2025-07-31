import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HomePage from "./HomePage.vue";

describe("HomePage.vue", () => {
  const defaultProps = {
    heading: "Slider-Peak Graph",
    description: "Slide to shift the peak position left or right.",
    graphWidth: "w-xl",
    warningThreshold: 30,
  };

  //checks for rendering Component and child components
  it("renders heading and description props on Header component", () => {
    const wrapper = mount(HomePage, {
      props: defaultProps,
      global: {
        stubs: {
          Header: {
            template:
              '<div class="header-stub">{{ heading }} - {{ description }}</div>',
            props: ["heading", "description"],
          },
          Graph: {
            template: '<div class="graph-stub">{{ graphWidth }}</div>',
            props: ["graphWidth"],
          },
          Slider: {
            template: '<div class="slider-stub">{{ graphWidth }}</div>',
            props: ["graphWidth"],
          },
        },
      },
    });

    expect(wrapper.html()).toContain("header-stub");
    expect(wrapper.html()).toContain(
      "Slider-Peak Graph - Slide to shift the peak position left or right."
    );

    expect(wrapper.html()).toContain("graph-stub");
    expect(wrapper.html()).toContain("w-xl");

    expect(wrapper.html()).toContain("slider-stub");
    expect(wrapper.html()).toContain("w-xl");
  });

  it("passes correct props to Graph", () => {
    const wrapper = mount(HomePage, {
      props: defaultProps,
      global: {
        stubs: {
          Header: true,
          Slider: true,
        },
      },
    });

    const graphStub = wrapper.findComponent({ name: "Graph" });
    expect(graphStub.exists()).toBe(true);
    expect(graphStub.props()).toMatchObject({
      graphWidth: "w-xl",
      warningThreshold: 30,
      sliderValue: 50, // default peakPercent
    });
  });

  it("passes correct props to Slider", () => {
    const wrapper = mount(HomePage, {
      props: defaultProps,
      global: {
        stubs: {
          Header: true,
          Graph: true,
        },
      },
    });

    const sliderStub = wrapper.findComponent({ name: "Slider" });
    expect(sliderStub.exists()).toBe(true);
    expect(sliderStub.props()).toMatchObject({
      graphWidth: "w-xl",
      warningThreshold: 30,
    });
  });

  // checks for initial sliderValue in Graph and emitting update
  it("updates Graph's sliderValue when Slider emits update", async () => {
    const wrapper = mount(HomePage, {
      props: defaultProps,
      global: {
        stubs: {
          Header: true,
        },
      },
    });

    const graph = wrapper.findComponent({ name: "Graph" });
    const slider = wrapper.findComponent({ name: "Slider" });

    expect(graph.props("sliderValue")).toBe(50); // initial

    // Simulate sliderValue emit
    await slider.vm.$emit("update:sliderValue", 80);
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: "Graph" }).props("sliderValue")).toBe(
      80
    );
  });
});
