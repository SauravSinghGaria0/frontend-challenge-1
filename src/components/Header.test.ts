import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Header from "./Header.vue";

describe("Header", () => {
  it("renders heading and description correctly", () => {
    const heading = "Hello World";
    const description = "This is a test description.";

    const wrapper = mount(Header, {
      props: {
        heading,
        description,
      },
    });

    expect(wrapper.text()).toContain(heading);
    expect(wrapper.text()).toContain(description);

    const headingEl = wrapper.find("h1");
    expect(headingEl.exists()).toBe(true);
    expect(headingEl.text()).toBe(heading);

    const paragraphEl = wrapper.find("p");
    expect(paragraphEl.exists()).toBe(true);
    expect(paragraphEl.text()).toBe(description);
  });
});
