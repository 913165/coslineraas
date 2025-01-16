// components/rag/constants/steps.ts
import { FileText, Database, Search, Binary, Bot, Settings, FileText as Step2Icon } from 'lucide-react';

import { LLMSelector } from '../sections//LLMSelector.tsx';
import { llmOptions } from './llmOptions';
import { Step } from '../types';


export const getSteps = (selectedLLMs: any, handleLLMToggle: any) => {

    return [
  
      {
          title: 'Step 1',
          description: 'Description for step 1',
  

  
        content: {
  
          overview: 'Overview for step 1',
  
          implementation: []
  
        }
  
      },
  
      {
  
        title: 'Step 2',
  
        description: 'Description for step 2',
  

  
        content: {
  
          overview: 'Overview for step 2',
  
          implementation: []
  
        }
  
      }
  
    ];
  
  };
  