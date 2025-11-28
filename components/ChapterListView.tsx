
import React from 'react';
import type { Chapter } from '../types';
import { ChevronLeft, Book } from 'lucide-react';
import Card from './common/Card';

interface ChapterListViewProps {
  chapters: Chapter[];
  onSelect: (chapter: Chapter) => void;
  onBack: () => void;
}

const ChapterListView: React.FC<ChapterListViewProps> = ({ chapters, onSelect, onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="flex items-center text-primary font-semibold mb-6 hover:underline">
        <ChevronLeft size={20} />
        Back to Subjects
      </button>
      <h1 className="text-3xl font-bold mb-8">Select a Chapter</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapters.map((chapter) => (
            <Card key={chapter.id} onClick={() => onSelect(chapter)} className="flex items-start space-x-4">
              <div className="bg-primary-light p-3 rounded-lg mt-1">
                  <Book className="text-primary" size={24} />
              </div>
              <div>
                  <h2 className="text-lg font-bold text-text-primary">{chapter.title}</h2>
                  <p className="text-sm text-text-secondary mt-1">{chapter.topics.length} topics</p>
              </div>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default ChapterListView;