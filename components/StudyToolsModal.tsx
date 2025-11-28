


import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Modal from './common/Modal';
import { getStudyToolContent } from '../services/geminiService';
import type { AppContext, StudyTool, Flashcard, UnitTest, DifferentiationItem, FormulaItem } from '../types';
import Loader from './common/Loader';
import Button from './common/Button';
import { BookCopy, Layers, Variable, TestTube, Newspaper } from 'lucide-react';

interface StudyToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  context: AppContext;
}

const StudyToolsModal: React.FC<StudyToolsModalProps> = ({ isOpen, onClose, context }) => {
  const [activeTool, setActiveTool] = useState<StudyTool | null>(null);
  const [content, setContent] = useState<string | Flashcard[] | UnitTest | DifferentiationItem[] | FormulaItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);
  const [showUnitTestSolutions, setShowUnitTestSolutions] = useState(false);

  const handleToolSelect = async (tool: StudyTool) => {
    setActiveTool(tool);
    setContent(null);
    setFlippedCard(null);
    setShowUnitTestSolutions(false);
    setLoading(true);
    try {
      const data = await getStudyToolContent(tool, context);
      setContent(data);
    } catch (error) {
      setContent('Failed to generate content. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const tools: { id: StudyTool; name: string; icon: React.ReactNode, disabled?: boolean }[] = [
      { id: 'pyq', name: 'PYQs', icon: <Newspaper /> },
      { id: 'flashcards', name: 'Flashcards', icon: <BookCopy />, disabled: !context.topic },
      { id: 'formula_sheet', name: 'Formula Sheet', icon: <Variable />, disabled: !context.chapter?.hasFormulas },
      { id: 'differentiate', name: 'Differentiate', icon: <Layers /> },
      { id: 'unit_test', name: 'Unit Test', icon: <TestTube /> },
  ];

  const renderContent = () => {
    if (loading) return <Loader />;
    
    if (activeTool && !content) {
        return <p className="text-center text-text-secondary">Generating content...</p>;
    }

    if (!content) {
        let message = "Select a tool to get started.";
        return <p className="text-center text-text-secondary">{message}</p>;
    }
    
    if (activeTool === 'flashcards' && Array.isArray(content) && (content.length === 0 || 'question' in content[0])) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(content as Flashcard[]).map((card, index) => (
            <div key={index} className="perspective h-48 cursor-pointer" onClick={() => setFlippedCard(flippedCard === index ? null : index)}>
              <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 ${flippedCard === index ? 'rotate-y-180' : ''}`}>
                <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-4 bg-primary-light rounded-lg text-center font-semibold text-primary">
                  {card.question}
                </div>
                <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-4 bg-secondary text-white rounded-lg text-center font-bold">
                  {card.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTool === 'formula_sheet' && Array.isArray(content) && (content.length === 0 || 'formula' in content[0])) {
      if (content.length === 0) {
        return <p className="text-center text-text-secondary">No formulas found for this chapter.</p>;
      }
      const formulaData = content as FormulaItem[];
      return (
        <div className="space-y-6">
          {formulaData.map((item, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <h3 className="text-lg font-bold text-primary mb-2">{item.name}</h3>
              
              <div className="bg-primary-light p-3 rounded-md text-center my-3">
                <p className="font-mono text-xl text-primary font-bold">{item.formula}</p>
              </div>
    
              <h4 className="font-semibold text-text-primary mt-4 mb-2">Variables:</h4>
              <div className="overflow-x-auto border border-gray-200 rounded-md">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-bold text-text-primary">Symbol</th>
                      <th className="px-4 py-2 text-left font-bold text-text-primary">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {item.variables.map((v, i) => (
                      <tr key={i}>
                        <td className="px-4 py-2 font-mono font-semibold">{v.symbol}</td>
                        <td className="px-4 py-2">{v.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
    
              <h4 className="font-semibold text-text-primary mt-4 mb-2">Solved Example:</h4>
              <div className="p-3 border border-gray-200 rounded-md bg-background">
                <p className="font-semibold italic mb-2">Q: {item.example.question}</p>
                <div className="prose prose-sm max-w-none text-text-secondary">
                  <ReactMarkdown>{item.example.solution}</ReactMarkdown>
                </div>
                <p className="font-bold mt-3 text-text-primary">Answer: {item.example.answer}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTool === 'differentiate' && Array.isArray(content) && (content.length === 0 || 'conceptA_name' in content[0])) {
      if (content.length === 0) {
        return <p className="text-center text-text-secondary">No "Differentiate Between" questions found for this chapter.</p>;
      }
      const differentiationData = content as DifferentiationItem[];
      return (
        <div className="space-y-8">
            {differentiationData.map((item, index) => (
                <div key={index}>
                    <h3 className="text-lg font-bold mb-3 text-text-primary">{index + 1}. {item.question}</h3>
                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left font-bold text-text-primary tracking-wider w-1/3">Basis of Difference</th>
                                    <th scope="col" className="px-4 py-3 text-left font-bold text-text-primary tracking-wider w-1/3">{item.conceptA_name}</th>
                                    <th scope="col" className="px-4 py-3 text-left font-bold text-text-primary tracking-wider w-1/3">{item.conceptB_name}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {item.points.map((point, pointIndex) => (
                                    <tr key={pointIndex} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-semibold text-text-secondary align-top">{point.basis}</td>
                                        <td className="px-4 py-3 text-text-primary align-top">{point.conceptA}</td>
                                        <td className="px-4 py-3 text-text-primary align-top">{point.conceptB}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
      );
    }
    
    if (activeTool === 'unit_test' && content && typeof content === 'object' && 'mcqs' in content) {
        const testData = content as UnitTest;
        return (
            <div>
                <h3 className="text-xl font-bold mb-4">Unit Test: {context.chapter?.title}</h3>
                
                <h4 className="font-semibold mt-4 mb-2 text-text-primary">Multiple Choice Questions (1 Mark each)</h4>
                {testData.mcqs.map((mcq, index) => (
                    <div key={`mcq-${index}`} className="mb-3 p-2">
                        <p className="font-medium text-text-primary"><strong>{index + 1}.</strong> {mcq.question}</p>
                        <ul className="list-['-_'] list-inside ml-4 mt-2 text-text-secondary space-y-1">
                            {mcq.options.map((opt, i) => <li key={i}>{opt}</li>)}
                        </ul>
                        {showUnitTestSolutions && (
                            <div className="mt-2 p-3 bg-green-50 border-l-4 border-green-500 text-green-900 rounded-r-md">
                                <p className="font-bold text-sm">Answer:</p>
                                <p className="text-sm">{mcq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
                
                <h4 className="font-semibold mt-6 mb-2 text-text-primary">Short Answer Questions (2 Marks each)</h4>
                {testData.shortAnswers.map((sa, index) => (
                     <div key={`sa-${index}`} className="mb-3 p-2">
                        <p className="font-medium text-text-primary"><strong>{index + 1 + testData.mcqs.length}.</strong> {sa.question}</p>
                         {showUnitTestSolutions && (
                            <div className="mt-2 p-3 bg-green-50 border-l-4 border-green-500 text-green-900 rounded-r-md">
                                <p className="font-bold text-sm">Solution:</p>
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown>{sa.answer}</ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                
                <h4 className="font-semibold mt-6 mb-2 text-text-primary">Long Answer Question (5 Marks)</h4>
                {testData.longAnswers.map((la, index) => (
                     <div key={`la-${index}`} className="mb-3 p-2">
                        <p className="font-medium text-text-primary"><strong>{index + 1 + testData.mcqs.length + testData.shortAnswers.length}.</strong> {la.question}</p>
                         {showUnitTestSolutions && (
                             <div className="mt-2 p-3 bg-green-50 border-l-4 border-green-500 text-green-900 rounded-r-md">
                                <p className="font-bold text-sm">Solution:</p>
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown>{la.answer}</ReactMarkdown>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {showUnitTestSolutions && (
                    <>
                        <h4 className="font-semibold mt-6 mb-2 text-text-primary">Scoring Guide</h4>
                        <p className="text-sm italic text-text-secondary">{testData.scoringGuide}</p>
                    </>
                )}
                
                {!showUnitTestSolutions && (
                    <div className="mt-6 text-center">
                        <Button onClick={() => setShowUnitTestSolutions(true)}>
                            Show Solutions
                        </Button>
                    </div>
                )}
                 {showUnitTestSolutions && (
                    <div className="mt-6 text-center">
                        <Button variant="outline" onClick={() => setShowUnitTestSolutions(false)}>
                            Hide Solutions
                        </Button>
                    </div>
                )}
            </div>
        );
    }


    if (typeof content === 'string') {
        return (
          <div className="prose max-w-none text-text-primary">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        );
    }

    return null;
  };

  const handleClose = () => {
      setActiveTool(null);
      setContent(null);
      setFlippedCard(null);
      setShowUnitTestSolutions(false);
      onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Study Tools">
      <div className="flex flex-col md:flex-row gap-6 min-h-[400px]">
        <aside className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 md:pr-4">
          <h3 className="font-bold mb-3 text-text-primary">Tools</h3>
          <div className="flex flex-row md:flex-col gap-2 flex-wrap">
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => handleToolSelect(tool.id)}
                disabled={tool.disabled}
                className={`w-full flex items-center space-x-3 p-2 rounded-md text-left transition-colors text-text-primary ${activeTool === tool.id ? 'bg-primary-light text-primary' : ''} ${tool.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
              >
                {tool.icon}
                <span>{tool.name}</span>
              </button>
            ))}
          </div>
        </aside>
        <main className="w-full md:w-2/3 flex flex-col">
          <div className="flex-grow">
            {renderContent()}
          </div>
        </main>
      </div>
       <style>{`
          .perspective { perspective: 1000px; }
          .transform-style-3d { transform-style: preserve-3d; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        `}</style>
    </Modal>
  );
};

export default StudyToolsModal;