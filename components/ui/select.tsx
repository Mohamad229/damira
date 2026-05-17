"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  /** Error state - adds red border styling */
  error?: boolean;
  /** Placeholder text when no value is selected */
  placeholder?: string;
}

type ParsedOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

function stringifyValue(value: unknown): string {
  if (value === undefined || value === null) return "";
  return String(value);
}

function parseOptions(children: React.ReactNode): ParsedOption[] {
  return React.Children.toArray(children)
    .filter(React.isValidElement)
    .flatMap((child) => {
      const props = child.props as {
        value?: string | number | readonly string[];
        children?: React.ReactNode;
        disabled?: boolean;
      };

      return [
        {
          value: stringifyValue(props.value),
          label: props.children,
          disabled: props.disabled,
        },
      ];
    });
}

function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onOutsideClick: () => void,
  enabled: boolean,
) {
  React.useEffect(() => {
    if (!enabled) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [enabled, onOutsideClick, ref]);
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      error,
      children,
      placeholder,
      value,
      defaultValue,
      disabled,
      name,
      id,
      required,
      onChange,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const listboxId = `${selectId}-listbox`;
    const nativeSelectId = `${selectId}-native`;

    const rootRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const options = React.useMemo(() => parseOptions(children), [children]);
    const isControlled = value !== undefined;
    const initialValue = stringifyValue(defaultValue);
    const [uncontrolledValue, setUncontrolledValue] = React.useState(initialValue);
    const [open, setOpen] = React.useState(false);
    const [highlightedValue, setHighlightedValue] = React.useState<string>(() => {
      const firstEnabled = options.find((option) => !option.disabled);
      return initialValue || firstEnabled?.value || "";
    });

    const selectedValue = isControlled ? stringifyValue(value) : uncontrolledValue;
    const selectedOption = options.find((option) => option.value === selectedValue);
    const highlightedIndex = options.findIndex(
      (option) => option.value === highlightedValue,
    );

    const close = React.useCallback(() => setOpen(false), []);
    useClickOutside(rootRef, close, open);

    React.useEffect(() => {
      if (!open) return;

      setHighlightedValue(() => {
        if (selectedOption && !selectedOption.disabled) return selectedOption.value;
        return options.find((option) => !option.disabled)?.value || "";
      });
    }, [open, options, selectedOption]);

    React.useEffect(() => {
      const form = buttonRef.current?.form;
      if (!form || isControlled) return;

      function handleReset() {
        setUncontrolledValue(initialValue);
        setHighlightedValue(initialValue);
        setOpen(false);
      }

      form.addEventListener("reset", handleReset);
      return () => form.removeEventListener("reset", handleReset);
    }, [initialValue, isControlled]);

    function notifyChange(nextValue: string) {
      if (!onChange) return;

      onChange({
        target: {
          value: nextValue,
          name,
        },
        currentTarget: {
          value: nextValue,
          name,
        },
      } as React.ChangeEvent<HTMLSelectElement>);
    }

    function selectValue(nextValue: string) {
      const nextOption = options.find((option) => option.value === nextValue);
      if (!nextOption || nextOption.disabled || disabled) return;

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      notifyChange(nextValue);
      setHighlightedValue(nextValue);
      setOpen(false);
      buttonRef.current?.focus();
    }

    function moveHighlight(direction: 1 | -1) {
      const enabledOptions = options.filter((option) => !option.disabled);
      if (!enabledOptions.length) return;

      const currentEnabledIndex = enabledOptions.findIndex(
        (option) => option.value === highlightedValue,
      );
      const nextIndex =
        currentEnabledIndex === -1
          ? direction === 1
            ? 0
            : enabledOptions.length - 1
          : (currentEnabledIndex + direction + enabledOptions.length) %
            enabledOptions.length;

      setHighlightedValue(enabledOptions[nextIndex]?.value || "");
    }

    function handleButtonBlur(event: React.FocusEvent<HTMLButtonElement>) {
      if (!onBlur) return;

      const nextFocusedElement = event.relatedTarget as Node | null;
      if (nextFocusedElement && rootRef.current?.contains(nextFocusedElement)) {
        return;
      }

      onBlur({
        ...event,
        target: {
          value: selectedValue,
          name,
        },
        currentTarget: {
          value: selectedValue,
          name,
        },
      } as unknown as React.FocusEvent<HTMLSelectElement>);
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
      if (disabled) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            moveHighlight(1);
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (!open) {
            setOpen(true);
          } else {
            moveHighlight(-1);
          }
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          if (!open) {
            setOpen(true);
          } else if (highlightedValue) {
            selectValue(highlightedValue);
          }
          break;
        case "Escape":
          if (open) {
            event.preventDefault();
            setOpen(false);
          }
          break;
        default:
          break;
      }
    }

    const displayLabel = selectedOption?.label || placeholder;
    const showPlaceholder = !selectedOption;

    return (
      <div ref={rootRef} className="relative w-full">
        <select
          ref={ref}
          id={nativeSelectId}
          name={name}
          value={selectedValue}
          required={required}
          disabled={disabled}
          aria-hidden="true"
          tabIndex={-1}
          className="sr-only"
          onChange={() => undefined}
          onBlur={onBlur}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {children}
        </select>

        <button
          ref={buttonRef}
          id={selectId}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-invalid={error ? "true" : undefined}
          className={cn(
            "group flex h-12 w-full items-center justify-between gap-3 rounded-[18px] border bg-white",
            "px-4 py-3 text-start text-[14px] font-semibold leading-none tracking-[-0.01em]",
            "shadow-[0_16px_36px_-32px_rgba(15,23,42,0.48)] outline-none",
            "transition-all duration-300 ease-out",
            "border-[#cfe1f0] text-slate-900",
            "hover:border-[#9ed8f8] hover:shadow-[0_20px_40px_-32px_rgba(0,151,220,0.4)]",
            "focus-visible:border-[#0097dc] focus-visible:ring-4 focus-visible:ring-[#c5e1f5]/70",
            "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 disabled:opacity-80",
            error &&
              "border-error focus-visible:border-error focus-visible:ring-error/20",
            className,
          )}
          onBlur={handleButtonBlur}
          onClick={() => setOpen((current) => !current)}
          onKeyDown={handleKeyDown}
        >
          <span
            className={cn(
              "min-w-0 flex-1 truncate",
              showPlaceholder ? "text-slate-500" : "text-slate-950",
            )}
          >
            {displayLabel}
          </span>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f0f8fd] text-[#50627a] transition-colors duration-300 group-hover:bg-[#e4f5ff] group-hover:text-[#0097dc]">
            <ChevronDown
              className={cn(
                "h-4 w-4 stroke-[2.25] transition-transform duration-300",
                open && "rotate-180",
              )}
              aria-hidden="true"
            />
          </span>
        </button>

        {open ? (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={selectId}
            className={cn(
              "absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-[20px]",
              "border border-[#d7e6f3] bg-white p-2 text-start rtl:left-auto rtl:right-0 rtl:text-right",
              "shadow-[0_26px_60px_-34px_rgba(15,23,42,0.46)]",
            )}
          >
            <div className="max-h-[280px] overflow-y-auto pr-1 rtl:pl-1 rtl:pr-0">
              {options.map((option, index) => {
                const isSelected = option.value === selectedValue;
                const isHighlighted =
                  option.value === highlightedValue ||
                  (highlightedIndex === -1 && index === 0);

                return (
                  <button
                    key={`${option.value}-${index}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={option.disabled}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-[14px] px-4 py-3 text-start",
                      "text-[14px] font-semibold leading-[1.25] tracking-[-0.01em] transition-colors duration-200 rtl:text-right",
                      option.disabled
                        ? "cursor-not-allowed text-slate-300"
                        : "text-slate-800 hover:bg-[#f3faff] hover:text-[#0097dc]",
                      (isSelected || isHighlighted) &&
                        !option.disabled &&
                        "bg-[#eaf7ff] text-[#0097dc]",
                    )}
                    onMouseEnter={() => setHighlightedValue(option.value)}
                    onClick={() => selectValue(option.value)}
                  >
                    <span className="min-w-0 truncate">{option.label}</span>

                    {isSelected ? (
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0097dc] text-white">
                        <Check className="h-3.5 w-3.5 stroke-[2.8]" />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    );
  },
);
Select.displayName = "Select";

type SelectOptionProps = React.OptionHTMLAttributes<HTMLOptionElement>;

const SelectOption = React.forwardRef<HTMLOptionElement, SelectOptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <option
        ref={ref}
        data-slot="select-option"
        className={cn("bg-background text-foreground", className)}
        {...props}
      />
    );
  },
);
SelectOption.displayName = "SelectOption";

type SelectGroupProps = React.OptgroupHTMLAttributes<HTMLOptGroupElement>;

const SelectGroup = React.forwardRef<HTMLOptGroupElement, SelectGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <optgroup
        ref={ref}
        data-slot="select-group"
        className={cn("bg-background text-foreground font-medium", className)}
        {...props}
      />
    );
  },
);
SelectGroup.displayName = "SelectGroup";

export { Select, SelectOption, SelectGroup };
export type { SelectProps, SelectOptionProps, SelectGroupProps };
