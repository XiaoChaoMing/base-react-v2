import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A versatile button component with multiple variants and sizes. Built with class-variance-authority (CVA) for consistent styling and Radix UI Slot for composition flexibility.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
            description: 'The visual style variant of the button',
            defaultValue: 'default',
        },
        size: {
            control: { type: 'select' },
            options: ['default', 'sm', 'lg', 'icon'],
            description: 'The size of the button',
            defaultValue: 'default',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the button is disabled',
        },
        asChild: {
            control: { type: 'boolean' },
            description: 'Change the default rendered element for the one passed as a child, merging their props and behavior',
        },
        children: {
            control: { type: 'text' },
            description: 'The content of the button',
        },
    },
    args: {
        children: 'Button',
    },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        variant: 'default',
        children: 'Default Button',
    },
};

// Variant stories
export const Destructive: Story = {
    args: {
        variant: 'destructive',
        children: 'Destructive Button',
    },
    parameters: {
        docs: {
            description: {
                story: 'Used for dangerous or destructive actions like deleting data.',
            },
        },
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        children: 'Outline Button',
    },
    parameters: {
        docs: {
            description: {
                story: 'A button with a border and transparent background.',
            },
        },
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        children: 'Secondary Button',
    },
    parameters: {
        docs: {
            description: {
                story: 'A secondary button with muted styling for less prominent actions.',
            },
        },
    },
};

export const Ghost: Story = {
    args: {
        variant: 'ghost',
        children: 'Ghost Button',
    },
    parameters: {
        docs: {
            description: {
                story: 'A minimal button with no background, only showing on hover.',
            },
        },
    },
};

export const Link: Story = {
    args: {
        variant: 'link',
        children: 'Link Button',
    },
    parameters: {
        docs: {
            description: {
                story: 'Styled as a link with underline on hover.',
            },
        },
    },
};

// Size stories
export const Small: Story = {
    args: {
        size: 'sm',
        children: 'Small Button',
    },
    parameters: {
        docs: {
            description: {
                story: 'A smaller button for compact layouts.',
            },
        },
    },
};

export const Large: Story = {
    args: {
        size: 'lg',
        children: 'Large Button',
    },
    parameters: {
        docs: {
            description: {
                story: 'A larger button for prominent actions.',
            },
        },
    },
};

export const Icon: Story = {
    args: {
        size: 'icon',
        children: '🔍',
    },
    parameters: {
        docs: {
            description: {
                story: 'A square button designed for icons.',
            },
        },
    },
};

// State stories
export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled Button',
    },
    parameters: {
        docs: {
            description: {
                story: 'A disabled button that cannot be interacted with.',
            },
        },
    },
};

// Combination examples
export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All button variants displayed together for comparison.',
            },
        },
    },
};

export const AllSizes: Story = {
    render: () => (
        <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🔍</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All button sizes displayed together for comparison.',
            },
        },
    },
};

export const WithIcon: Story = {
    render: () => (
        <div className="flex gap-4">
            <Button>
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Item
            </Button>
            <Button variant="outline">
                Download
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Buttons with icons to demonstrate icon integration.',
            },
        },
    },
};