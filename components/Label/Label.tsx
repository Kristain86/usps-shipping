import { cn } from '@/utils/cn';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
}

const Label = ({ label, className, ...props }: LabelProps) => {
  return (
    <label className={cn('block text-sm font-semibold text-primary-purple', className)} {...props}>
      {label}
    </label>
  );
};

export default Label;
