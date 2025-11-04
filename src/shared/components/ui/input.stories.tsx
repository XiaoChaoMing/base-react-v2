import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';

const meta = {
    title: 'UI/Input',
    component: Input,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A flexible input component that extends the standard HTML input element with consistent styling. Supports all standard input types and states with focus, error, and disabled styling.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local', 'file'],
            description: 'The type of input field',
            defaultValue: 'text',
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text displayed when input is empty',
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the input is disabled',
        },
        required: {
            control: { type: 'boolean' },
            description: 'Whether the input is required',
        },
        readOnly: {
            control: { type: 'boolean' },
            description: 'Whether the input is read-only',
        },
        value: {
            control: { type: 'text' },
            description: 'The current value of the input',
        },
        defaultValue: {
            control: { type: 'text' },
            description: 'The default value of the input',
        },
        'aria-invalid': {
            control: { type: 'boolean' },
            description: 'Whether the input has validation errors',
        },
        className: {
            control: { type: 'text' },
            description: 'Additional CSS classes to apply',
        },
    },
    args: {
        placeholder: 'Enter text...',
    },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
    args: {
        type: 'text',
        placeholder: 'Enter text...',
    },
};

// Input type stories
export const Email: Story = {
    args: {
        type: 'email',
        placeholder: 'Enter your email...',
    },
    parameters: {
        docs: {
            description: {
                story: 'Email input with built-in validation for email format.',
            },
        },
    },
};

export const Password: Story = {
    args: {
        type: 'password',
        placeholder: 'Enter your password...',
    },
    parameters: {
        docs: {
            description: {
                story: 'Password input that masks the entered text.',
            },
        },
    },
};

export const Number: Story = {
    args: {
        type: 'number',
        placeholder: 'Enter a number...',
        min: 0,
        max: 100,
    },
    parameters: {
        docs: {
            description: {
                story: 'Number input with optional min/max constraints.',
            },
        },
    },
};

export const Search: Story = {
    args: {
        type: 'search',
        placeholder: 'Search...',
    },
    parameters: {
        docs: {
            description: {
                story: 'Search input with search-specific styling and behavior.',
            },
        },
    },
};

export const Tel: Story = {
    args: {
        type: 'tel',
        placeholder: 'Enter phone number...',
    },
    parameters: {
        docs: {
            description: {
                story: 'Telephone input for phone numbers.',
            },
        },
    },
};

export const Url: Story = {
    args: {
        type: 'url',
        placeholder: 'https://example.com',
    },
    parameters: {
        docs: {
            description: {
                story: 'URL input with built-in validation for URL format.',
            },
        },
    },
};

export const Date: Story = {
    args: {
        type: 'date',
    },
    parameters: {
        docs: {
            description: {
                story: 'Date picker input for selecting dates.',
            },
        },
    },
};

export const Time: Story = {
    args: {
        type: 'time',
    },
    parameters: {
        docs: {
            description: {
                story: 'Time picker input for selecting time.',
            },
        },
    },
};

export const File: Story = {
    args: {
        type: 'file',
        accept: '.jpg,.jpeg,.png,.pdf',
    },
    parameters: {
        docs: {
            description: {
                story: 'File input for uploading files with accept attribute for file type filtering.',
            },
        },
    },
};

// State stories
export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'This input is disabled',
        defaultValue: 'Disabled input',
    },
    parameters: {
        docs: {
            description: {
                story: 'A disabled input that cannot be interacted with.',
            },
        },
    },
};

export const ReadOnly: Story = {
    args: {
        readOnly: true,
        defaultValue: 'This is read-only',
    },
    parameters: {
        docs: {
            description: {
                story: 'A read-only input that displays content but cannot be edited.',
            },
        },
    },
};

export const Required: Story = {
    args: {
        required: true,
        placeholder: 'This field is required',
    },
    parameters: {
        docs: {
            description: {
                story: 'A required input field for form validation.',
            },
        },
    },
};

export const WithError: Story = {
    args: {
        'aria-invalid': true,
        placeholder: 'This input has an error',
        defaultValue: 'invalid@email',
    },
    parameters: {
        docs: {
            description: {
                story: 'An input with error state styling using aria-invalid attribute.',
            },
        },
    },
};
export const WithValue: Story = {
    args: {
        defaultValue: 'Pre-filled value',
        placeholder: "This won't show because there's a value",
    },
    parameters: {
        docs: {
            description: {
                story: 'An input with a pre-filled value.',
            },
        },
    },
};

// Combination examples
export const AllInputTypes: Story = {
    render: () => (
        <div className="space-y-4 w-80">
            <Input type="text" placeholder="Text input" />
            <Input type="email" placeholder="Email input" />
            <Input type="password" placeholder="Password input" />
            <Input type="number" placeholder="Number input" />
            <Input type="search" placeholder="Search input" />
            <Input type="tel" placeholder="Phone input" />
            <Input type="url" placeholder="URL input" />
            <Input type="date" />
            <Input type="time" />
            <Input type="file" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All input types displayed together for comparison.',
            },
        },
    },
};

export const AllStates: Story = {
    render: () => (
        <div className="space-y-4 w-80">
            <Input placeholder="Normal state" />
            <Input disabled placeholder="Disabled state" />
            <Input readOnly defaultValue="Read-only state" />
            <Input required placeholder="Required state" />
            <Input aria-invalid placeholder="Error state" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All input states displayed together for comparison.',
            },
        },
    },
};

export const FormExample: Story = {
    render: () => (
        <form className="space-y-4 w-80">
            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name *
                </label>
                <Input 
                    id="name"
                    type="text" 
                    placeholder="Enter your full name" 
                    required 
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address *
                </label>
                <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Phone Number
                </label>
                <Input 
                    id="phone"
                    type="tel" 
                    placeholder="Enter your phone number" 
                />
            </div>
            <div>
                <label htmlFor="website" className="block text-sm font-medium mb-1">
                    Website
                </label>
                <Input 
                    id="website"
                    type="url" 
                    placeholder="https://your-website.com" 
                />
            </div>
        </form>
    ),
    parameters: {
        docs: {
            description: {
                story: 'A complete form example showing inputs with labels and different types.',
            },
        },
    },
};