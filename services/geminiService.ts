import { GoogleGenAI, Type } from "@google/genai";
import type { MCQ, Flashcard, Subject, ClassLevel, UnitTest, KeyConcept, DifferentiationItem, FormulaItem } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API key not found. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const SYSTEM_INSTRUCTION = "You are an Economics Study Aid designed to be extremely fast and efficient for 1st and 2nd PUC students. Your responses must be direct, concise, and highly relevant to the chapter topics. Never provide long, conversational intros or conclusions. Prioritize speed and brevity to keep every action under 5 seconds.";

// Local interface to avoid circular dependency with App.tsx
interface UploadedFile {
  name: string;
  data: string; 
  mimeType: string;
}

// Helper for exponential backoff retry
const retryOperation = async <T>(
  operation: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> => {
  try {
    return await operation();
  } catch (error: any) {
    if (retries <= 0) throw error;
    
    // Check if error is retryable (503 Service Unavailable, 429 Too Many Requests, or network errors)
    const status = error?.status || error?.response?.status;
    // Retry on 429, 5xx, or undefined status (network error)
    const isRetryable = !status || status === 429 || status >= 500;

    if (!isRetryable) throw error;

    console.warn(`Retrying Gemini API call... Attempts left: ${retries}. Delay: ${delay}ms. Error:`, error);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryOperation(operation, retries - 1, delay * 2);
  }
};

const generateContent = async (prompt: string): Promise<string> => {
  try {
    const responseText = await retryOperation(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 8192,
          thinkingConfig: { thinkingBudget: 0 },
        },
      });
      return response.text || "";
    });
    return responseText;
  } catch (error) {
    console.error("Error generating content:", error);
    return "Sorry, I encountered an error while generating the content. The service might be busy, please try again.";
  }
};

const generateJsonContent = async <T,>(prompt: string, schema: any): Promise<T | null> => {
    try {
        const cleanedText = await retryOperation(async () => {
          const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
              config: {
                  responseMimeType: "application/json",
                  responseSchema: schema,
                  systemInstruction: SYSTEM_INSTRUCTION,
                  maxOutputTokens: 8192, 
                  thinkingConfig: { thinkingBudget: 0 },
              },
          });
          return response.text || "";
        });

        if (!cleanedText) return null;

        let jsonString = cleanedText.trim();
        // Remove markdown code blocks if present, although responseMimeType usually prevents this
        if (jsonString.startsWith('```json')) {
            jsonString = jsonString.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (jsonString.startsWith('```')) {
            jsonString = jsonString.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        return JSON.parse(jsonString) as T;
    } catch (error) {
        console.error("Error generating JSON content:", error);
        return null;
    }
}

export const generateImage = async (prompt: string): Promise<string | null> => {
  try {
    return await retryOperation(async () => {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
      });

      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData && part.inlineData.data) {
            return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
          }
        }
      }
      return null;
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
};

const createBasePrompt = (subject: Subject, classLevel: ClassLevel) => `You are BizNomics, an intelligent study assistant for ${classLevel} students in India. Your specialty is ${subject}. Your tone is friendly, motivating, and student-focused. Use simple, clear language and provide real-world examples from the Indian context where possible. Keep explanations concise, structured (using markdown like lists and tables), and accurate for the PUC syllabus level.`;

interface TopicDetails {
    explanation: string;
    visualization: string;
    mindmap: string;
    keyConcepts: KeyConcept[];
}

export const getTopicDetails = (topic: string, subject: Subject, classLevel: ClassLevel) => {
  const prompt = `${createBasePrompt(subject, classLevel)}\n\nFor the topic "${topic}", provide the following in a structured JSON object:
1.  "explanation": A detailed explanation of the topic. Break down complex ideas into easy-to-understand points. Use examples to illustrate. Format using markdown.
2.  "visualization": Write a detailed prompt for an AI image generator. The prompt MUST strictly follow these rules to create a clean, exam-focused visual diagram for "${topic}":
    - **Type**: Flowchart, Mind map, Infographic, Timeline, or Graph.
    - **Style**: Simple, neat, symmetric, dark text on light background. Educational flat vector style.
    - **Content**: Include a Title at the top, Key headings, and clear labels. Use short points, NO paragraphs.
    - **Subject Specifics**:
      - For Economics: Include relationships (e.g., demand/supply curves, flow charts).
      - For Business Studies: Include business models, organization structures, or process flows.
    - **Description**: Clearly describe the visual elements and layout for the image generator.
3.  "mindmap": A visually structured, text-based mindmap using ASCII characters (like |, +, -, etc.) to create a tree-like diagram. The output should be a single block of pre-formatted text, ready to be displayed in a <pre> tag. Start with the central topic at the top and branch downwards. Ensure the structure is clear and hierarchical.
4.  "keyConcepts": An ordered list of key concepts for the topic. Each item in the array should be an object with two properties: a short "concept" title (e.g., "Definition of Demand") and a "detail" markdown explanation for that concept. This provides a step-by-step breakdown of the topic.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      explanation: { 
        type: Type.STRING,
        description: "A detailed markdown explanation of the topic with examples."
      },
      visualization: {
        type: Type.STRING,
        description: "A detailed prompt for an AI image generation model to create a visual for the topic."
      },
      mindmap: {
        type: Type.STRING,
        description: "A visually structured, text-based mindmap using ASCII characters."
      },
      keyConcepts: {
        type: Type.ARRAY,
        description: "An ordered list of key concepts, each with a 'concept' title and a 'detail' explanation.",
        items: {
          type: Type.OBJECT,
          properties: {
            concept: { type: Type.STRING, description: "The short title of the key concept." },
            detail: { type: Type.STRING, description: "The detailed markdown explanation of the concept." }
          },
          required: ["concept", "detail"]
        }
      }
    },
    required: ["explanation", "visualization", "mindmap", "keyConcepts"]
  };
  
  return generateJsonContent<TopicDetails>(prompt, schema);
};


export const getQuiz = (topic: string, subject: Subject, classLevel: ClassLevel) => {
    const prompt = `Based on the topic "${topic}" from the subject ${subject} for ${classLevel} in India, generate a quiz with 5 multiple-choice questions. For each question, provide 4 options, identify the correct answer, and give a brief explanation for why it's correct.`;

    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctAnswer: { type: Type.STRING },
                explanation: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
        }
    };
    return generateJsonContent<MCQ[]>(prompt, schema);
};

export const getStudyToolContent = async (tool: string, context: any): Promise<string | Flashcard[] | UnitTest | DifferentiationItem[] | FormulaItem[] | null> => {
    const { subject, classLevel, chapter, topic } = context;
    const basePrompt = createBasePrompt(subject, classLevel);
    let prompt = basePrompt;

    switch (tool) {
        case 'pyq': {
            const pyqPrompt = `You are an expert educational content generator specializing in the Karnataka Department of Pre-University Education (DPUE) syllabus for Business Studies and Economics.

Your task is to generate a model **chapter-wise question paper** based on Previous Year Questions (PYQs) that strictly adheres to the official DPUE format.

**Instructions:**
1.  **Subject & Context:** The paper is for **${subject}**, **${classLevel}**, focusing specifically on the chapter: **"${chapter?.title}"**.
2.  **Strict Format Adherence:** Replicate the **exact official format, structure, and style** used by the Karnataka DPUE Board. This is the most important instruction. Use official phrasing, typography (bold headers), numbering, and marks in brackets.
3.  **Content:** All questions must be relevant to the specified chapter and reflect the style of actual board exam questions.
4.  **No Answers:** Generate **only the question paper**. Do NOT include any answers, explanations, or model solutions.
5.  **Marks & Timing:** The total marks for this chapter-wise paper should be approximately 25-30 marks, with a suggested time of 1 Hour.
6.  **Official Header:** Use the exact header format, including the specific spacing:
    **DEPARTMENT OF PRE–UNIVERSITY EDUCATION, KARNATAKA**
    **Subject:** ${subject}
    **Class:** ${classLevel}
    **Chapter:** ${chapter?.title}
    **Time:** 1 Hour  **Maximum Marks:** 30
7.  **Official Structure:** Follow the DPUE pattern precisely. Adapt the sections and number of questions to fit the ~30 mark limit. Here is the structure for a full paper for reference:

    **PART – A**
    **I. Answer the following questions in one word or one sentence each: (10 × 1 = 10 Marks)**
    1. ...
    ...

    **PART – B**
    **II. Answer any FIVE of the following questions in two or three sentences each: (5 × 2 = 10 Marks)**
    11. ...
    ...

    **PART – C**
    **III. Answer any THREE of the following questions in 15 to 20 sentences each: (3 × 4 = 12 Marks)**
    21. ...
    ...

    **PART – D**
    **IV. Answer any TWO of the following questions in about two pages each: (2 × 8 = 16 Marks)**
    31. ...
    ...

    **PART – E (Practical Oriented Questions)**
    **V. Answer any ONE of the following questions: (1 × 5 = 5 Marks)**
    41. ...

8.  **Adaptation for Chapter Test:** Since this is a chapter-wise test for ~30 marks, you must select and adapt the sections appropriately. For example, you might include questions from Part A, B, and C, and maybe one from D or E, ensuring the total marks are around 30. The number of questions and choices ('Answer any X') should be adjusted accordingly.

The final output must be pure markdown, ready for rendering, and look identical in style to an official DPUE paper.`;
            return generateContent(pyqPrompt);
        }

        case 'flashcards':
            const flashcardSchema = {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        answer: { type: Type.STRING }
                    },
                    required: ["question", "answer"]
                }
            };
            prompt += `\n\nGenerate 8 simple Q&A flashcards for quick revision on the topic "${topic?.title}". The questions should be direct and the answers concise.`;
            return generateJsonContent<Flashcard[]>(prompt, flashcardSchema);

        case 'formula_sheet': {
            const formulaSheetPrompt = `You are an expert educational content generator specializing in the Karnataka Department of Pre-University Education (DPUE) syllabus for ${subject}.

Your task is to generate a comprehensive "Formula Sheet" for the chapter: **"${chapter?.title}"** for a ${classLevel} student.

**Instructions (Strictly Follow):**

1.  **Content:** Identify all important mathematical formulas from the chapter. For each formula, provide a clear name, the formula itself, a breakdown of its variables, and a solved numerical example.
2.  **Format:** Your output must be a JSON array. Each object in the array represents a single formula and must conform to the following structure:
    - \`name\`: A string for the name of the formula or concept (e.g., "Arithmetic Mean (Direct Method)").
    - \`formula\`: A string containing the mathematical formula, using common notation (e.g., "X̄ = (ΣX) / N").
    - \`variables\`: An array of objects, where each object defines a variable in the formula and has two properties:
        - \`symbol\`: The variable's symbol (e.g., "X̄").
        - \`description\`: A clear description of what the symbol represents (e.g., "Arithmetic Mean").
    - \`example\`: An object representing a solved numerical problem with three properties:
        - \`question\`: A string containing a relevant problem statement.
        - \`solution\`: A string containing the step-by-step solution. This can use markdown for formatting if needed.
        - \`answer\`: A string containing the final answer, clearly stated.
3.  **Accuracy:** Ensure all formulas, variable descriptions, and solved examples are accurate and relevant to the DPUE syllabus.
4.  **Exclusions:** The output must be only the JSON array. Do not include any extra explanations, notes, or commentary.`;
            
            const formulaSheetSchema = {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING, description: "Name of the formula or concept." },
                        formula: { type: Type.STRING, description: "The mathematical formula." },
                        variables: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    symbol: { type: Type.STRING, description: "The variable's symbol, e.g., 'X̄'." },
                                    description: { type: Type.STRING, description: "Description of the variable." }
                                },
                                required: ["symbol", "description"]
                            }
                        },
                        example: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING, description: "A numerical problem statement." },
                                solution: { type: Type.STRING, description: "Step-by-step solution, can be markdown." },
                                answer: { type: Type.STRING, description: "The final answer to the problem." }
                            },
                            required: ["question", "solution", "answer"]
                        }
                    },
                    required: ["name", "formula", "variables", "example"]
                }
            };

            return generateJsonContent<FormulaItem[]>(formulaSheetPrompt, formulaSheetSchema);
        }
        case 'differentiate': {
            const differentiatePrompt = `You are an expert educational content generator for the Karnataka Department of Pre-University Education (DPUE). Your task is to generate “Differentiate Between” questions and their answers for ${subject} for ${classLevel}, specifically for the chapter "${chapter?.title}".

**Instructions (Strictly Follow):**

1.  **Content:** Generate **all possible “Differentiate between” questions** from the given chapter based on the official DPUE syllabus and textbook.
2.  **Format:** Your output must be a JSON array. Each object in the array should represent one "differentiate between" question and must conform to the following structure:
    - \`question\`: A string containing the full question (e.g., "Differentiate between Principles of Management and Techniques of Management").
    - \`conceptA_name\`: A string with the name of the first concept (e.g., "Principles of Management").
    - \`conceptB_name\`: A string with the name of the second concept (e.g., "Techniques of Management").
    - \`points\`: An array of objects, where each object represents a point of difference and has three properties:
        - \`basis\`: The basis for differentiation (e.g., "Meaning").
        - \`conceptA\`: The explanation for the first concept corresponding to the basis.
        - \`conceptB\`: The explanation for the second concept corresponding to the basis.
3.  **Points:** Include 3 to 6 relevant points of difference for each question.
4.  **Language:** Use official textbook wording and board-style phrasing.
5.  **Exclusions:** Do **not** include any extra explanations, notes, or commentary. The output must be only the JSON array.`;

            const differentiateSchema = {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING, description: "The full question, e.g., 'Differentiate between X and Y.'" },
                        conceptA_name: { type: Type.STRING, description: "The name of the first concept, X." },
                        conceptB_name: { type: Type.STRING, description: "The name of the second concept, Y." },
                        points: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    basis: { type: Type.STRING, description: "The basis for differentiation." },
                                    conceptA: { type: Type.STRING, description: "The explanation for Concept A." },
                                    conceptB: { type: Type.STRING, description: "The explanation for Concept B." }
                                },
                                required: ["basis", "conceptA", "conceptB"]
                            }
                        }
                    },
                    required: ["question", "conceptA_name", "conceptB_name", "points"]
                }
            };

            return generateJsonContent<DifferentiationItem[]>(differentiatePrompt, differentiateSchema);
        }
        case 'unit_test':
            const unitTestSchema = {
                type: Type.OBJECT,
                properties: {
                    mcqs: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING },
                                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                                answer: { type: Type.STRING }
                            },
                            required: ["question", "options", "answer"]
                        }
                    },
                    shortAnswers: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING },
                                answer: { type: Type.STRING }
                            },
                            required: ["question", "answer"]
                        }
                    },
                    longAnswers: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                question: { type: Type.STRING },
                                answer: { type: Type.STRING }
                            },
                            required: ["question", "answer"]
                        }
                    },
                    scoringGuide: { type: Type.STRING }
                },
                required: ["mcqs", "shortAnswers", "longAnswers", "scoringGuide"]
            };
            
            prompt += `\n\nGenerate a comprehensive Unit Test for the chapter "${chapter?.title}". 
            Include:
            - 5 Multiple Choice Questions (1 mark each)
            - 3 Short Answer Questions (2 marks each)
            - 1 Long Answer Question (5 marks)
            - A Scoring Guide explaining how to grade the answers.
            `;
            return generateJsonContent<UnitTest>(prompt, unitTestSchema);
    }
    return null;
};

export const getChatResponse = async (history: { role: string, parts: { text: string }[] }[], lastMessage: string, topic: string, subject: string): Promise<string> => {
  try {
     const chatSystemInstruction = `You are an expert tutor for the subject ${subject}. The student is asking about the topic "${topic}". Answer their questions clearly, concisely, and accurately.`;
     
     const responseText = await retryOperation(async () => {
       const result = await ai.models.generateContent({
           model: 'gemini-2.5-flash',
           contents: history, 
           config: {
               systemInstruction: chatSystemInstruction,
           }
       });
       return result.text || "";
     });
     return responseText;
  } catch (error) {
      console.error("Chat error", error);
      return "I'm sorry, I'm having trouble connecting right now. The network might be busy, please try again.";
  }
};

export const getDocChatResponse = async (history: { role: string, parts: { text: string }[] }[], file: UploadedFile): Promise<string> => {
    try {
        // Prepend a user turn with the file data to the history.
        // We do this to give the model the context of the document.
        const filePart = {
            inlineData: {
                mimeType: file.mimeType,
                data: file.data
            }
        };
        
        // We construct a fake first turn to establish context. 
        // Note: The UI 'history' starts with a Model greeting.
        const setupUserTurn = {
            role: 'user',
            parts: [filePart, { text: `Here is the document "${file.name}". Please analyze it and answer my questions.` }]
        };
        
        const contents = [setupUserTurn, ...history];
        
        const responseText = await retryOperation(async () => {
          const result = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: contents,
              config: {
                  systemInstruction: "You are a helpful study assistant. Answer questions based on the provided document.",
              }
          });
          return result.text || "";
        });
        
        return responseText;

    } catch (error) {
        console.error("Doc Chat error", error);
        return "I'm sorry, I'm unable to process the document or answer right now. Please try again.";
    }
};