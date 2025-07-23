import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomePage from './HomePage.vue'

describe('HomePage.vue', () => {
  it('renders heading and description props on Header component', () => {
    const wrapper = mount(HomePage, {
      global: {
        stubs: {
          Header: {
            template: '<div class="header-stub">{{ heading }} - {{ description }}</div>',
            props: ['heading', 'description'],
          },
          Slider: true,
        },
      },
    })

    expect(wrapper.html()).toContain('Slider-Peak Graph')
    expect(wrapper.html()).toContain('Slide to shift the peak position left or right.')
  })

  it('passes graphWidth to Slider component', () => {
    const wrapper = mount(HomePage, {
      global: {
        stubs: {
          Header: true,
          Slider: {
            template: '<div class="slider-stub">{{ graphWidth }}</div>',
            props: ['graphWidth'],
          },
        },
      },
    })

    expect(wrapper.html()).toContain('w-xl')
  })
})
