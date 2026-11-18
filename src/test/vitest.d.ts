/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />

import { Expect } from 'vitest';
import '@testing-library/jest-dom';

declare module 'vitest' {
  interface Assertion<T = any> {
    toBeInTheDocument(): T;
    toBeVisible(): T;
    toBeChecked(): T;
    toHaveAttribute(name: string, value?: string): T;
    toHaveClass(...classNames: string[]): T;
    toHaveTextContent(text: string | RegExp): T;
    toHaveValue(value: string | string[] | number): T;
    toBeDisabled(): T;
    toBeEnabled(): T;
    toBeRequired(): T;
    toBeInvalid(): T;
    toBeValid(): T;
  }
}