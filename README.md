# Frontend Challenge

## Overview
This challenge is designed to assess your frontend development skills, specifically focusing on component development, documentation, and testing practices.

It is expected to be completed within a day. This challenge is designed to assess all levels of frontend developers, so please do not worry if you are unable to complete all the requirements.

You are encouraged to ask questions if you are unsure about any part of the challenge. We are here to help you succeed.

## Project Commands

The following commands assume you are using npm, however you can use yarn/bun/pnpm if you prefer.

To start storybook, run the following command:

```bash
npm run storybook
```

To start Vite/Vue, run the following command:

```bash
npm run dev
```

To start Vitest Test , run following command:

```bash
npm run test
```

## Requirements

### 1. Component Development
Component development is the core of this challenge. You are expected to create a Vue 3 component that generates a curve based that shifts based on a user input.

- Create a Vue 3 component based on the design specifications provided in the `docs` folder. 
- You may use any non-linear function such as `sin`, `cos`, `tan`, `log`, `exp`, etc. to generate the curve. 
- You may add supporting packages, but you must not use any UI libraries. 
- You may use refernce code from online sources and docuemntation, but you will be expected to explain the code you have used and to cite your sources. This includes any AI generated code.

### 2. Documentation
Documenation is important for the maintainability and usability of the component. It helps both new developers understand the component and existing developers to maintain it.

- Include any inline documentation where appropriate
- Create Storybook documentation for the component
  - Include different states and variations
  - Document props, events, and slots
  - Provide usage examples
- Include a component README with setup and usage instructions

### 3. Testing
Automated testing is important to ensure the component works as expected and to prevent regressions. It also speeds up the development process by providing quick feedback.

- Write comprehensive tests for the component
- You may choose to use something otther than vitest for testing.

## Good luck!
We're excited to see your approach to solving this challenge. Remember, we're not just looking at whether the component works, but also how you write your code.

