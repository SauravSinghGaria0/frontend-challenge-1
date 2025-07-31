import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HomePage from "./HomePage.vue";

describe("HomePage.vue", () => {
  const heading = "Hello World";
  const description = "This is a test description.";
  const graphWidth = "w-full";
  const warningThreshold = 10;

  it("renders heading and description props on Header component", () => {
    const wrapper = mount(HomePage, {
      props: {
        heading,
        description,
        graphWidth,
        warningThreshold,
      },
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
            graphWidth: "w-full",
          },
        },
      },
    });

    expect(wrapper.html()).toContain("header-stub");
    expect(wrapper.html()).toContain(
      "Hello World - This is a test description."
    );

    expect(wrapper.html()).toContain("graph-stub");
    expect(wrapper.html()).toContain("w-full");

    expect(wrapper.html()).toContain("slider-stub");
    expect(wrapper.html()).toContain("w-full");
  });
});
