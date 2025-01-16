import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { LLMOption } from '../types';

interface LLMSelectorProps {
  llmOptions: LLMOption[];
  selectedLLMs: Record<string, boolean>;
  onToggle: (llmId: string) => void;
}

export const LLMSelector = ({ llmOptions, selectedLLMs, onToggle }: LLMSelectorProps) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {llmOptions.map((llm) => (
          <Card
            key={llm.id}
            className={`border ${
              selectedLLMs[llm.id] ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div
                  className={`w-6 h-6 rounded border flex items-center justify-center cursor-pointer ${
                    selectedLLMs[llm.id]
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}
                  onClick={() => onToggle(llm.id)}
                >
                  {selectedLLMs[llm.id] && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{llm.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{llm.description}</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-gray-700">
                      Available Models:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {llm.models.map((model) => (
                        <span
                          key={model}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {model}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};