import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/index.css';

// Global decorator to wrap all stories with proper styling context
const withGlobalStyles = (Story: any) => {
  return React.createElement(
    'div',
    { className: 'min-h-screen bg-background text-foreground' },
    React.createElement(
      'div',
      { className: 'p-4' },
      React.createElement(Story)
    )
  );
};

// Theme decorator for dark/light mode support
const withTheme = (Story: any, context: any) => {
  const theme = context.globals?.theme || 'light';
  
  return React.createElement(
    'div',
    { className: theme === 'dark' ? 'dark' : '' },
    React.createElement(Story)
  );
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // Disable default backgrounds since we use CSS variables
    },
    docs: {
      toc: true,
    },
    layout: 'padded',
  },
  decorators: [withGlobalStyles, withTheme],
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
};

export default preview;