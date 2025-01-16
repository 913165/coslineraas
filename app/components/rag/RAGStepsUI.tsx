'use client'

import React, { useState } from 'react';
import { Database, FileText, Search, Binary, Bot, Settings, ArrowRight, Upload, Code, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { llmOptions } from './constants/llmOptions';

export const RAGStepsUI = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedLLMs, setSelectedLLMs] = useState<Record<string, boolean>>({
        openai: false,
        anthropic: false,
        cohere: false,
        mistral: false,
        llama: false,
        vertex: false
    });


    const handleLLMToggle = (llmId: string) => {
        setSelectedLLMs(prev => ({
            ...prev,
            [llmId]: !prev[llmId as keyof typeof selectedLLMs]
        }));
    };

    const steps = [
        {
            title: "Document Ingestion",
            description: "Upload and process documents into chunks",
            icon: FileText,
            content: {
                overview: "Configure document processing pipeline and select LLM providers for embeddings and generation.",
                implementation: [
                    {
                        title: "LLM Provider Selection",
                        description: "Choose LLM providers for your RAG implementation",
                        component: (
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {llmOptions.map((llm) => (
                                        <Card key={llm.id} className={`border ${selectedLLMs[llm.id] ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                                            }`}>
                                            <CardContent className="p-4">
                                                <div className="flex items-start space-x-3">
                                                    <div
                                                        className={`w-6 h-6 rounded border flex items-center justify-center cursor-pointer ${selectedLLMs[llm.id]
                                                            ? 'bg-blue-500 border-blue-500'
                                                            : 'border-gray-300'
                                                            }`}
                                                        onClick={() => handleLLMToggle(llm.id)}
                                                    >
                                                        {selectedLLMs[llm.id] && (
                                                            <Check className="w-4 h-4 text-white" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <h3 className="font-semibold text-lg">{llm.name}</h3>
                                                        </div>
                                                        <p className="text-sm text-gray-600 mt-1">{llm.description}</p>
                                                        <div className="mt-2">
                                                            <span className="text-sm font-medium text-gray-700">Available Models:</span>
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
                        )
                    },
                    {
                        title: "File Upload System",
                        description: "Build a drag-and-drop interface for document uploads",
                        code: `import { useCallback } from 'react'
                        const onDrop = useCallback((acceptedFiles) => {
                        const formData = new FormData()
                        acceptedFiles.forEach(file => {
                        formData.append('files', file)
                        })
                        // Upload logic here
                        }, [])`
                     },
                    {
                        title: "Text Extraction & Embedding Configuration",
                        description: "Configure text extraction and embedding generation based on selected LLMs",
                        code: `// Initialize embedding model based on selection
                        const embeddingModel = selectedLLMs.openai 
                        ? new OpenAIEmbeddings()
                        : selectedLLMs.cohere
                        ? new CohereEmbeddings()
                        : new VertexAIEmbeddings()

                        // Configure text splitter
                        const splitter = new RecursiveCharacterTextSplitter({
                        chunk_size: 1000,
                        chunk_overlap: 200,
                        length_function: getTokenLength(selectedEmbeddingModel)
                        })`
                                            }
                ]
            }
        },
        {
            title: "Vector Storage",
            description: "Store document embeddings efficiently",
            icon: Database,
            content: {
                overview: "Convert text chunks into vector embeddings and store them in a vector database for efficient retrieval.",
                implementation: [
                    {
                        title: "Vector Database Selection",
                        description: "Choose and configure your vector database",
                        component: (
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            name: 'Pinecone',
                                            description: 'Managed vector database with high scalability',
                                            features: ['Serverless', 'Real-time updates', 'Multiple indexes']
                                        },
                                        {
                                            name: 'Weaviate',
                                            description: 'Open-source vector database with GraphQL API',
                                            features: ['Schema-based', 'Multi-modal', 'Filters']
                                        },
                                        {
                                            name: 'Milvus',
                                            description: 'Distributed vector database for enterprise',
                                            features: ['High availability', 'Horizontal scaling', 'Complex queries']
                                        },
                                        {
                                            name: 'Chroma',
                                            description: 'Lightweight embedded vector database',
                                            features: ['Easy setup', 'Local deployment', 'Python native']
                                        }
                                    ].map((db) => (
                                        <Card key={db.name} className="border border-gray-200">
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold text-lg">{db.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{db.description}</p>
                                                <div className="mt-2">
                                                    <span className="text-sm font-medium text-gray-700">Key Features:</span>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {db.features.map((feature) => (
                                                            <span
                                                                key={feature}
                                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                                            >
                                                                {feature}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    },
                    {
                        title: "Embedding Generation",
                        description: "Generate embeddings using selected embedding model",
                        code: `from langchain.embeddings import OpenAIEmbeddings

embeddings = OpenAIEmbeddings()
vector_store = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="db"
)`
                    }
                ]
            }
        },
        {
            title: "Query Processing",
            description: "Process and optimize user queries",
            icon: Search,
            content: {
                overview: "Transform user queries into optimized formats for vector search and context retrieval.",
                implementation: [
                    {
                        title: "Query Pipeline Configuration",
                        description: "Set up query preprocessing and optimization",
                        component: (
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        {
                                            name: 'Query Expansion',
                                            description: 'Enhance queries with semantic understanding',
                                            options: ['Synonym expansion', 'Context enrichment', 'Entity recognition']
                                        },
                                        {
                                            name: 'Query Routing',
                                            description: 'Direct queries to appropriate processing pipelines',
                                            options: ['Intent classification', 'Complexity assessment', 'Domain routing']
                                        },
                                        {
                                            name: 'Query Optimization',
                                            description: 'Optimize queries for better retrieval',
                                            options: ['Token limitation', 'Filter optimization', 'Cache utilization']
                                        }
                                    ].map((feature) => (
                                        <Card key={feature.name} className="border border-gray-200">
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold text-lg">{feature.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                                                <div className="mt-2">
                                                    <span className="text-sm font-medium text-gray-700">Available Options:</span>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {feature.options.map((option) => (
                                                            <span
                                                                key={option}
                                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                                            >
                                                                {option}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    },
                    {
                        title: "Query Processing Implementation",
                        description: "Process and enhance user queries",
                        code: `def process_query(query: str):
    # Expand query with relevant context
    enhanced_query = enhance_query(query)
    # Generate query embedding
    query_embedding = embeddings.embed_query(enhanced_query)
    return query_embedding`
                    }
                ]
            }
        },
        {
            title: "Retrieval",
            description: "Semantic search and context fetching",
            icon: Binary,
            content: {
                overview: "Implement efficient retrieval mechanisms for finding relevant context.",
                implementation: [
                    {
                        title: "Retrieval Strategy Selection",
                        description: "Configure retrieval methods and parameters",
                        component: (
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            name: 'Similarity Search',
                                            description: 'Basic vector similarity search',
                                            params: ['k neighbors', 'similarity threshold', 'metadata filters']
                                        },
                                        {
                                            name: 'Hybrid Search',
                                            description: 'Combined keyword and semantic search',
                                            params: ['BM25 weight', 'vector weight', 'reranking threshold']
                                        },
                                        {
                                            name: 'MMR Search',
                                            description: 'Maximum Marginal Relevance for diversity',
                                            params: ['lambda param', 'diversity tradeoff', 'candidate count']
                                        },
                                        {
                                            name: 'Contextual Compression',
                                            description: 'Dynamic context window optimization',
                                            params: ['compression ratio', 'relevance threshold', 'token budget']
                                        }
                                    ].map((method) => (
                                        <Card key={method.name} className="border border-gray-200">
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold text-lg">{method.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                                                <div className="mt-2">
                                                    <span className="text-sm font-medium text-gray-700">Parameters:</span>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {method.params.map((param) => (
                                                            <span
                                                                key={param}
                                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                                            >
                                                                {param}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    },
                    {
                        title: "Retrieval Implementation",
                        description: "Implement retrieval logic",
                        code: `# Basic similarity search
docs = vectordb.similarity_search_with_score(
    query=query,
    k=3,  # Number of results
    score_threshold=0.8
)

# Hybrid search with reranking
docs = vectordb.hybrid_search(
    query=query,
    k=5,
    alpha=0.5,  # Balance between keyword and semantic search
    rerank_top_k=10
)`
                    }
                ]
            }
        },
        {
            title: "Generation",
            description: "Generate responses using LLM",
            icon: Bot,
            content: {
                overview: "Use retrieved context to generate accurate and relevant responses.",
                implementation: [
                    {
                        title: "Generation Pipeline Configuration",
                        description: "Configure response generation settings",
                        component: (
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-1 gap-4">
                                    {[
                                        {
                                            name: 'Prompt Engineering',
                                            description: 'Design and optimize prompts for better responses',
                                            settings: ['Context integration', 'System messages', 'Output format']
                                        },
                                        {
                                            name: 'Model Parameters',
                                            description: 'Fine-tune generation parameters',
                                            settings: ['Temperature', 'Top-p sampling', 'Max tokens']
                                        },
                                        {
                                            name: 'Response Validation',
                                            description: 'Validate and improve response quality',
                                            settings: ['Fact checking', 'Source attribution', 'Confidence scoring']
                                        }
                                    ].map((feature) => (
                                        <Card key={feature.name} className="border border-gray-200">
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold text-lg">{feature.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                                                <div className="mt-2">
                                                    <span className="text-sm font-medium text-gray-700">Key Settings:</span>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {feature.settings.map((setting) => (
                                                            <span
                                                                key={setting}
                                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                                            >
                                                                {setting}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    },
                    {
                        title: "LLM Integration",
                        description: "Setup LLM with context integration",
                        code: `from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

llm = ChatOpenAI(
    temperature=0.7,
    top_p=0.9,
    max_tokens=2000
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectordb.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 3}
    )
)`
                    }
                ]
            }
        },
        {
            title: "API Integration",
            description: "Create REST API endpoints",
            icon: Settings,
            content: {
                overview: "Expose RAG capabilities through a secure API interface.",
                implementation: [
                    {
                        title: "API Configuration",
                        description: "Setup API endpoints and security",
                        component: (
                            <div className="space-y-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        {
                                            name: 'Authentication',
                                            description: 'Secure API access',
                                            features: ['API keys', 'JWT tokens', 'OAuth2']
                                        },
                                        {
                                            name: 'Rate Limiting',
                                            description: 'Control API usage',
                                            features: ['Request quotas', 'Concurrent limits', 'Burst control']
                                        },
                                        {
                                            name: 'Monitoring',
                                            description: 'Track API performance',
                                            features: ['Usage metrics', 'Error tracking', 'Latency monitoring']
                                        },
                                        {
                                            name: 'Documentation',
                                            description: 'API documentation and examples',
                                            features: ['OpenAPI spec', 'Code samples', 'Integration guides']
                                        }
                                    ].map((feature) => (
                                        <Card key={feature.name} className="border border-gray-200">
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold text-lg">{feature.name}</h3>
                                                <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                                                <div className="mt-2">
                                                    <span className="text-sm font-medium text-gray-700">Features:</span>
                                                    <div className="flex flex-wrap gap-2 mt-1">
                                                        {feature.features.map((item) => (
                                                            <span
                                                                key={item}
                                                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                                            >
                                                                {item}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )
                    },
                    {
                        title: "FastAPI Implementation",
                        description: "Create API endpoints",
                        code: `from fastapi import FastAPI, File, UploadFile, Security
from fastapi.security.api_key import APIKeyHeader
from typing import List

app = FastAPI()
api_key_header = APIKeyHeader(name="X-API-Key")

@app.post("/rag/query")
async def query_endpoint(
    query: str,
    api_key: str = Security(api_key_header)
):
    response = qa_chain.run(query)
    return {"response": response}

@app.post("/rag/upload")
async def upload_documents(
    files: List[UploadFile],
    api_key: str = Security(api_key_header)
):
    # Document processing logic
    return {"status": "success"}`
                    }
                ]
            }
        }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">RAG Implementation</h2>
                    <nav className="space-y-1">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveStep(index)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${index === activeStep
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

            {/* Main content */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">{steps[activeStep].title}</h1>
                        <p className="text-gray-600 mt-2">{steps[activeStep].content.overview}</p>
                    </div>

                    {/* Implementation sections */}
                    <div className="space-y-6">
                        {steps[activeStep].content.implementation.map((impl, index) => (
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
        </div>
    );
};

