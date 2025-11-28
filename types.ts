export type Subject = 'Economics' | 'Business Studies';
export type ClassLevel = '1st PUC' | '2nd PUC';

export interface Topic {
  id: string;
  title: string;
}

export interface Chapter {
  id: string;
  title: string;
  topics: Topic[];
  hasFormulas?: boolean;
}

export interface Curriculum {
  'Economics': {
    '1st PUC': Chapter[];
    '2nd PUC': Chapter[];
  };
  'Business Studies': {
    '1st PUC': Chapter[];
    '2nd PUC': Chapter[];
  };
}

export interface MCQ {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
}

export interface Flashcard {
  question: string;
  answer: string;
}

export type StudyTool = 'pyq' | 'flashcards' | 'formula_sheet' | 'differentiate' | 'unit_test';

export interface AppContext {
  subject: Subject | null;
  classLevel: ClassLevel | null;
  chapter: Chapter | null;
  topic: Topic | null;
}

export interface UnitTestQuestion {
    question: string;
    answer: string;
}

export interface UnitTestMCQ extends UnitTestQuestion {
    options: string[];
}

export interface UnitTest {
    mcqs: UnitTestMCQ[];
    shortAnswers: UnitTestQuestion[];
    longAnswers: UnitTestQuestion[];
    scoringGuide: string;
}

export interface KeyConcept {
  concept: string;
  detail: string;
}

export interface DifferentiationPoint {
    basis: string;
    conceptA: string;
    conceptB: string;
}

export interface DifferentiationItem {
    question: string;
    conceptA_name: string;
    conceptB_name: string;
    points: DifferentiationPoint[];
}

export interface FormulaVariable {
    symbol: string;
    description: string;
}

export interface FormulaExample {
    question: string;
    solution: string;
    answer: string;
}

export interface FormulaItem {
    name: string;
    formula: string;
    variables: FormulaVariable[];
    example: FormulaExample;
}