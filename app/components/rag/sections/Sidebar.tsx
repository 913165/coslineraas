import { Step } from '../types';

interface SidebarProps {
  steps: Step[];
  activeStep: number;
  onStepChange: (index: number) => void;
}

export const Sidebar = ({ steps, activeStep, onStepChange }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">RAG Implementation</h2>
        <nav className="space-y-1">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <button
                key={index}
                onClick={() => onStepChange(index)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  index === activeStep
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{step.title}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
