import React from 'react';
import type { Chapter, Topic } from '../types';
import { ChevronLeft, FileText } from 'lucide-react';
import Card from './common/Card';

interface TopicListViewProps {
  chapter: Chapter;
  onSelect: (topic: Topic) => void;
  onBack: () => void;
}

const TopicListView: React.FC<TopicListViewProps> = ({ chapter, onSelect, onBack }) => {
  return (
    <div>
      <button onClick={onBack} className="flex items-center text-primary font-semibold mb-6 hover:underline">
        <ChevronLeft size={20} />
        Back to Chapters
      </button>
      <h1 className="text-3xl font-bold mb-2">{chapter.title}</h1>
      <p className="text-text-secondary mb-8">Select a topic to start learning</p>
      <div className="space-y-4">
        {chapter.topics.map((topic) => (
          <Card key={topic.id} onClick={() => onSelect(topic)} className="flex items-center space-x-4">
            <FileText className="text-primary" size={20} />
            <h2 className="text-lg font-semibold text-text-primary">{topic.title}</h2>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopicListView;