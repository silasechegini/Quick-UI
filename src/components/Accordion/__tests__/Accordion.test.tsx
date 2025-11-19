import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { Accordion } from "../Accordion";
import {
  AccordionItemData,
  EXPAND_MODES,
  ACCORDION_VARIANTS,
} from "../Accordion.types";

const mockItems: AccordionItemData[] = [
  {
    id: "item-1",
    title: "First Item",
    content: "Content for first item",
  },
  {
    id: "item-2",
    title: "Second Item",
    content: "Content for second item",
    subtitle: "This is a subtitle",
  },
  {
    id: "item-3",
    title: "Third Item",
    content: "Content for third item",
    disabled: true,
  },
];

describe("Accordion", () => {
  describe("Rendering", () => {
    it("should render all accordion items", () => {
      render(<Accordion items={mockItems} />);

      expect(screen.getByText("First Item")).toBeInTheDocument();
      expect(screen.getByText("Second Item")).toBeInTheDocument();
      expect(screen.getByText("Third Item")).toBeInTheDocument();
    });

    it("should render subtitles when provided", () => {
      render(<Accordion items={mockItems} />);

      expect(screen.getByText("This is a subtitle")).toBeInTheDocument();
    });

    it("should render empty state when no items", () => {
      render(<Accordion items={[]} />);

      expect(screen.getByText("No items to display")).toBeInTheDocument();
    });

    it("should render custom empty state", () => {
      const customEmpty = <div>Custom Empty Message</div>;
      render(<Accordion items={[]} emptyState={customEmpty} />);

      expect(screen.getByText("Custom Empty Message")).toBeInTheDocument();
    });
  });

  describe("Single Expansion Mode", () => {
    it("should expand item on click", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });
      await user.click(firstButton);

      await waitFor(() => {
        expect(screen.getByText("Content for first item")).toBeVisible();
      });
    });

    it("should collapse previously expanded item when opening another", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} expandMode={EXPAND_MODES.SINGLE} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });
      const secondButton = screen.getByRole("button", { name: /second item/i });

      // Expand first item
      await user.click(firstButton);
      await waitFor(() => {
        expect(firstButton).toHaveAttribute("aria-expanded", "true");
      });

      // Expand second item
      await user.click(secondButton);
      await waitFor(() => {
        expect(secondButton).toHaveAttribute("aria-expanded", "true");
        expect(firstButton).toHaveAttribute("aria-expanded", "false");
      });
    });

    it("should allow toggling of expanded item when allowToggle is true", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} allowToggle={true} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });

      // Expand
      await user.click(firstButton);
      await waitFor(() => {
        expect(firstButton).toHaveAttribute("aria-expanded", "true");
      });

      // Collapse
      await user.click(firstButton);
      await waitFor(() => {
        expect(firstButton).toHaveAttribute("aria-expanded", "false");
      });
    });

    it("should not collapse when allowToggle is false", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} allowToggle={false} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });

      await user.click(firstButton);
      await waitFor(() => {
        expect(firstButton).toHaveAttribute("aria-expanded", "true");
      });

      await user.click(firstButton);
      expect(firstButton).toHaveAttribute("aria-expanded", "true");
    });
  });

  describe("Multiple Expansion Mode", () => {
    it("should allow multiple items to be expanded", async () => {
      const user = userEvent.setup();
      render(
        <Accordion items={mockItems} expandMode={EXPAND_MODES.MULTIPLE} />,
      );

      const firstButton = screen.getByRole("button", { name: /first item/i });
      const secondButton = screen.getByRole("button", { name: /second item/i });

      await user.click(firstButton);
      await user.click(secondButton);

      await waitFor(() => {
        expect(firstButton).toHaveAttribute("aria-expanded", "true");
        expect(secondButton).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should collapse individual items independently", async () => {
      const user = userEvent.setup();
      render(
        <Accordion items={mockItems} expandMode={EXPAND_MODES.MULTIPLE} />,
      );

      const firstButton = screen.getByRole("button", { name: /first item/i });
      const secondButton = screen.getByRole("button", { name: /second item/i });

      // Expand both
      await user.click(firstButton);
      await user.click(secondButton);

      // Collapse first
      await user.click(firstButton);

      await waitFor(() => {
        expect(firstButton).toHaveAttribute("aria-expanded", "false");
        expect(secondButton).toHaveAttribute("aria-expanded", "true");
      });
    });
  });

  describe("Controlled Mode", () => {
    it("should respect controlled expanded state", () => {
      render(<Accordion items={mockItems} expanded={["item-1", "item-2"]} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });
      const secondButton = screen.getByRole("button", { name: /second item/i });

      expect(firstButton).toHaveAttribute("aria-expanded", "true");
      expect(secondButton).toHaveAttribute("aria-expanded", "true");
    });

    it("should call onChange when item is toggled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(
        <Accordion items={mockItems} expanded={[]} onChange={handleChange} />,
      );

      const firstButton = screen.getByRole("button", { name: /first item/i });
      await user.click(firstButton);

      expect(handleChange).toHaveBeenCalledWith(["item-1"]);
    });
  });

  describe("Keyboard Navigation", () => {
    it("should expand/collapse on Enter key", async () => {
      render(<Accordion items={mockItems} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });
      firstButton.focus();

      fireEvent.keyDown(firstButton, { key: "Enter" });

      await waitFor(() => {
        expect(firstButton).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should expand/collapse on Space key", async () => {
      render(<Accordion items={mockItems} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });
      firstButton.focus();

      fireEvent.keyDown(firstButton, { key: " " });

      await waitFor(() => {
        expect(firstButton).toHaveAttribute("aria-expanded", "true");
      });
    });

    it("should navigate to next item with ArrowDown", () => {
      render(<Accordion items={mockItems} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });
      const secondButton = screen.getByRole("button", { name: /second item/i });

      firstButton.focus();
      fireEvent.keyDown(firstButton, { key: "ArrowDown" });

      expect(document.activeElement).toBe(secondButton);
    });

    it("should navigate to previous item with ArrowUp", () => {
      render(<Accordion items={mockItems} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });
      const secondButton = screen.getByRole("button", { name: /second item/i });

      secondButton.focus();
      fireEvent.keyDown(secondButton, { key: "ArrowUp" });

      expect(document.activeElement).toBe(firstButton);
    });

    it("should navigate to first item with Home key", () => {
      render(<Accordion items={mockItems} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });
      const secondButton = screen.getByRole("button", { name: /second item/i });

      secondButton.focus();
      fireEvent.keyDown(secondButton, { key: "Home" });

      expect(document.activeElement).toBe(firstButton);
    });

    it("should navigate to last item with End key", () => {
      render(<Accordion items={mockItems} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });
      const thirdButton = screen.getByRole("button", { name: /third item/i });

      firstButton.focus();
      fireEvent.keyDown(firstButton, { key: "End" });

      expect(document.activeElement).toBe(thirdButton);
    });
  });

  describe("Disabled State", () => {
    it("should not expand disabled items", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} />);

      const thirdButton = screen.getByRole("button", { name: /third item/i });
      await user.click(thirdButton);

      expect(thirdButton).toHaveAttribute("aria-expanded", "false");
    });

    it("should disable all items when accordion is disabled", async () => {
      const user = userEvent.setup();
      render(<Accordion items={mockItems} disabled={true} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });

      // Verify the button starts unexpanded
      expect(firstButton).toHaveAttribute("aria-expanded", "false");

      // Try clicking but expect it to remain disabled/unexpanded due to pointer-events: none
      await user.click(firstButton);

      // Should remain unexpanded since the accordion is disabled
      expect(firstButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("Loading State", () => {
    it("should show loading state", () => {
      const loadingItems: AccordionItemData[] = [
        {
          id: "loading-1",
          title: "Loading Item",
          content: "Content",
          isLoading: true,
        },
      ];

      render(<Accordion items={loadingItems} />);

      const button = screen.getByRole("button", { name: /loading item/i });
      expect(button).toBeDisabled();
    });
  });

  describe("Variants", () => {
    it("should apply default variant classes", () => {
      const { container } = render(
        <Accordion items={mockItems} variant={ACCORDION_VARIANTS.DEFAULT} />,
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("variant-default");
    });

    it("should apply outlined variant classes", () => {
      const { container } = render(
        <Accordion items={mockItems} variant={ACCORDION_VARIANTS.OUTLINED} />,
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("variant-outlined");
    });

    it("should apply glass variant classes", () => {
      const { container } = render(
        <Accordion items={mockItems} variant={ACCORDION_VARIANTS.GLASS} />,
      );

      const accordion = container.firstChild as HTMLElement;
      expect(accordion.className).toContain("variant-glass");
    });
  });

  describe("Callbacks", () => {
    it("should call onBeforeExpand before expanding", async () => {
      const user = userEvent.setup();
      const onBeforeExpand = vi.fn();

      render(<Accordion items={mockItems} onBeforeExpand={onBeforeExpand} />);

      const firstButton = screen.getByRole("button", { name: /first item/i });
      await user.click(firstButton);

      expect(onBeforeExpand).toHaveBeenCalledWith("item-1");
    });

    it("should call onAfterExpand after expanding", async () => {
      const user = userEvent.setup();
      const onAfterExpand = vi.fn();

      render(
        <Accordion
          items={mockItems}
          onAfterExpand={onAfterExpand}
          transitionDuration={100}
        />,
      );

      const firstButton = screen.getByRole("button", { name: /first item/i });
      await user.click(firstButton);

      await waitFor(
        () => {
          expect(onAfterExpand).toHaveBeenCalledWith("item-1");
        },
        { timeout: 200 },
      );
    });

    it("should call onBeforeCollapse before collapsing", async () => {
      const user = userEvent.setup();
      const onBeforeCollapse = vi.fn();

      render(
        <Accordion
          items={mockItems}
          defaultExpanded={["item-1"]}
          onBeforeCollapse={onBeforeCollapse}
        />,
      );

      const firstButton = screen.getByRole("button", { name: /first item/i });
      await user.click(firstButton);

      expect(onBeforeCollapse).toHaveBeenCalledWith("item-1");
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<Accordion items={mockItems} />);

      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toHaveAttribute("aria-expanded");
        expect(button).toHaveAttribute("aria-controls");
      });
    });

    it("should have proper region roles", () => {
      render(<Accordion items={mockItems} defaultExpanded={["item-1"]} />);

      const regions = screen.getAllByRole("region");
      expect(regions.length).toBeGreaterThan(0);
    });
  });
});
