import { Card, CardContent } from '@/components/ui/card';
import { Code } from 'lucide-react';
import { Step } from '../types';

interface MainContentProps {
  step: Step;
}

export const MainContent = ({ step }: MainContentProps) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{step.title}</h1>
          <p className="text-gray-600 mt-2">{step.content.overview}</p>
        </div>

        <div className="space-y-6">
          {step.content.implementation.map((impl, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-blue-500" />
                  <h3 className="text-xl font-semibold">{impl.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{impl.description}</p>
                {impl.component ? impl.component : (
                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-gray-100">
                      <code>{impl.code}</code>
                    </pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
