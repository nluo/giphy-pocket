# Giphy Pocket

A mobile first react + typescript application to show trending/search Gifs from Giphy API.

## Note

There is a possible bug in Giphy API that would stop the last page in current pagination logic working properly.

Please see this [issue](https://github.com/nluo/giphy-pocket/issues/4)

## Getting Started

1. **Install dependencies**

```bash
npm i
npm run dev
```

2. **Setup the environment variable:**

Copy the .env.example file and rename it to .env.local:

```bash
cp .env.example .env.local
```

Open the .env.local file and fill in the VITE_GIPHY_API_KEY variable with your Giphy API key. If you don't have the key you could get the key from [Giphy Developer Portal](https://developers.giphy.com/)

3. **Start the development server**

```bash
npm run dev
```

## Patterns

Below are the design patterns I would use when working on React applications and have been heavily used in this project:

### Container Component Patterns

The Container Component Pattern is a strategy I adopt to encapsulate business logic separately from presentation concerns. In this architecture, container components are "smart" and manage state and data processing, whereas presentational components remain "dumb," meaning they are purely functional and often reusable across projects. I would also think this follows the principle of separation of concerns. In this project, the component that naming with `XXXContainer` would be aware of business logic, e.g. `GiphyImageContainer`, whereas `GiphyImageLoader` is a pure/presentational component that we could easily use in other projects.

### Composition Patterns

I like using this pattern when building out components as it allows components with great flexibility. Take `GiphyImageSearchContainer` as an example—it is composed atop Material-UI's Box, offering consumers a variety of ways to use the component:

```typescript
// Just render the component with default style
<GiphyImageSearchContainer/>

// Some paddings and 50% width
<GiphyImageSearchContainer padding={4} width="50%">

// different background colors
<GiphyImageSearchContainer padding={4} bgcolor="red.100">

// and so on
```

Think of Box as a foundational building block, providing a canvas upon which our components can extend and enhance functionality. This strategy pairs harmoniously with TypeScript, leveraging type hints and checks to ensure prop accuracy and adherence to design constraints.

Frameworks that incorporate a styled-system—such as MUI's system—embrace this compositional approach, providing a robust foundation for building custom, style-flexible components.

### Small contexts

Large, monolithic contexts can lead to complexity, making debugging and testing challenging. They may also induce unnecessary re-renders as the application scales. Instead, I prefer breaking down global states into smaller, focused contexts. e.g. `DrawerContext`, `PaginationContext` and `SearchContext` in this project. This practice gives us:

1. Easier Debugging & Separation of Concern: When we have a context that is responsible for a specific piece of state or functionality, it is easier to pinpoint where issues are occurring because there are fewer moving parts.

2. More Manageable Testing: In unit tests, we only need to mock or provide the specific context that the component under test is using. This makes tests more straightforward to write and understand.

3. Reduced Re-render Cycles: In React, when a context value changes, all components consuming that context re-render. If we have a single, large context, any change to its value triggers re-renders across all consuming components, which can be numerous when application gets big. By breaking contexts down into smaller units, we limit re-rendering to only those components that consume the specific piece of state that changed.
