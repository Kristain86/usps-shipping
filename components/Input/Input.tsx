import { cn } from '@/utils/cn';
import { forwardRef } from 'react';
import Label from '../Label/Label';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, disabled, required, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        <div className="flex items-center gap-1">
          <Label label={label} htmlFor={inputId} />
          {required && <span className="text-red-500" aria-hidden="true">*</span>}
        </div>
        <input
          id={inputId}
          disabled={disabled}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          aria-required={required}
          className={cn(
            'px-2.5 py-2 block w-full rounded-md border-gray-300 border focus:border-primary-purple focus:ring-primary-purple transition-all duration-200 ease-in-out',
            error && 'border-red-500',
            disabled && 'bg-gray-100 cursor-not-allowed'
          )}
          {...props}
        />
        {helperText && !error && (
          <p id={helperId} className="text-gray-500 text-xs mt-1">
            {helperText}
          </p>
        )}
        {error && (
          <p 
            id={errorId} 
            className="text-red-500 text-xs mt-1 transition-opacity duration-200" 
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
