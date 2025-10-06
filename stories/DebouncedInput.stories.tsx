import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { DebouncedInput } from "../src/components/Input";
import { useState } from "react";

const meta = {
  title: "Components/DebouncedInput",
  component: DebouncedInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "success"],
    },
    size: {
      control: { type: "select" },
      options: ["xs", "s", "m", "l", "xl"],
    },
    debounceDelay: {
      control: { type: "number", min: 100, max: 2000, step: 100 },
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof DebouncedInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type to see debounced output...",
    debounceDelay: 300,
  },
};

export const SearchWithDebounce: Story = {
  args: {
    label: "Search with Debounce",
    placeholder: "Search for products...",
    startIcon: "search_icon",
    debounceDelay: 500,
    helperText: "Search will trigger 500ms after you stop typing",
  },
};

export const FastDebounce: Story = {
  args: {
    label: "Fast Debounce (100ms)",
    placeholder: "Quick response...",
    debounceDelay: 100,
    helperText: "Very responsive - 100ms delay",
  },
};

export const SlowDebounce: Story = {
  args: {
    label: "Slow Debounce (1000ms)",
    placeholder: "Slow response...",
    debounceDelay: 1000,
    helperText: "Patient search - 1 second delay",
  },
};

export const WithCallback: Story = {
  render: () => {
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;

      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);

      // Simulate API call
      setTimeout(() => {
        const mockResults = [
          `Result 1 for "${query}"`,
          `Result 2 for "${query}"`,
          `Result 3 for "${query}"`,
        ];
        setSearchResults(mockResults);
        setIsSearching(false);
      }, 500);
    };

    return (
      <div style={{ width: "300px" }}>
        <DebouncedInput
          label="Live Search Demo"
          placeholder="Type to search..."
          startIcon="search_icon"
          debounceDelay={300}
          onChange={handleSearch}
          loading={isSearching}
          helperText="Try typing something to see live results"
        />

        {searchResults.length > 0 && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <strong>Search Results:</strong>
            <ul style={{ margin: "0.5rem 0", paddingLeft: "1.5rem" }}>
              {searchResults.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};

export const FormValidation: Story = {
  render: () => {
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [isValidating, setIsValidating] = useState(false);

    const validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setEmail(value);

      if (!value.trim()) {
        setIsValid(null);
        return;
      }

      setIsValidating(true);

      // Simulate validation API call
      setTimeout(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValid(emailRegex.test(value));
        setIsValidating(false);
      }, 300);
    };

    return (
      <div style={{ width: "300px" }}>
        <DebouncedInput
          label="Email Validation"
          placeholder="Enter your email..."
          type="email"
          debounceDelay={300}
          onChange={validateEmail}
          variant={
            isValid === false
              ? "error"
              : isValid === true
                ? "success"
                : "primary"
          }
          error={isValid === false}
          errorMessage={
            isValid === false ? "Please enter a valid email address" : undefined
          }
          helperText={
            isValid === true
              ? "Email format is valid!"
              : "Email will be validated as you type"
          }
          loading={isValidating}
          endIcon={
            isValid === true
              ? "checkmark_icon"
              : isValid === false
                ? "close_icon"
                : undefined
          }
          value={email}
        />
      </div>
    );
  },
  parameters: {
    layout: "padded",
  },
};
