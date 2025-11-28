
import React, { useState, useCallback, useMemo } from 'react';
import type { Subject, ClassLevel, Chapter, Topic } from './types';
import { CURRICULUM } from './constants';
import Header from './components/Header';
import Homepage from './components/Homepage';
import ChapterListView from './components/ChapterListView';
import TopicListView from './components/TopicListView';
import TopicView from './components/TopicView';
import AiChatHelper from './components/AiChatHelper';
import DocumentChatView from './components/DocumentChatView';

export interface UploadedFile {
  name: string;
  data: string; // base64 encoded
  mimeType: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'chapters' | 'topics' | 'topic'>('home');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassLevel | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);


  const handleSubjectSelect = useCallback((subject: Subject, classLevel: ClassLevel) => {
    setSelectedSubject(subject);
    setSelectedClass(classLevel);
    setView('chapters');
  }, []);

  const handleChapterSelect = useCallback((chapter: Chapter) => {
    setSelectedChapter(chapter);
    setView('topics');
  }, []);

  const handleTopicSelect = useCallback((topic: Topic) => {
    setSelectedTopic(topic);
    setView('topic');
  }, []);

  const handleBack = useCallback(() => {
    if (view === 'topic') {
      setView('topics');
      setSelectedTopic(null);
    } else if (view === 'topics') {
      setView('chapters');
      setSelectedChapter(null);
    } else if (view === 'chapters') {
      setView('home');
      setSelectedSubject(null);
      setSelectedClass(null);
    }
  }, [view]);
  
  const goHome = useCallback(() => {
    setView('home');
    setSelectedSubject(null);
    setSelectedClass(null);
    setSelectedChapter(null);
    setSelectedTopic(null);
    setUploadedFile(null); // Also exit document chat
  }, []);

  const handleDocumentUploaded = useCallback((file: UploadedFile) => {
      setUploadedFile(file);
      // Clear curriculum selections to avoid confusion
      setView('home');
      setSelectedSubject(null);
      setSelectedClass(null);
      setSelectedChapter(null);
      setSelectedTopic(null);
  }, []);

  const handleEndDocumentChat = useCallback(() => {
      setUploadedFile(null);
      goHome();
  }, [goHome]);


  const chapters = useMemo(() => {
    if (selectedSubject && selectedClass) {
      return CURRICULUM[selectedSubject][selectedClass];
    }
    return [];
  }, [selectedSubject, selectedClass]);

  const breadcrumbs = useMemo(() => {
    if (uploadedFile) {
      return [
        { label: 'Home', action: goHome },
        { label: 'Document Chat', action: () => {} },
      ];
    }
    const crumbs = [{ label: 'Home', action: goHome }];
    if (selectedSubject && selectedClass) {
      crumbs.push({ label: `${selectedSubject} - ${selectedClass}`, action: () => setView('chapters') });
    }
    if (selectedChapter) {
      crumbs.push({ label: selectedChapter.title, action: () => setView('topics') });
    }
    if (selectedTopic) {
      crumbs.push({ label: selectedTopic.title, action: () => {} });
    }
    return crumbs;
  }, [selectedSubject, selectedClass, selectedChapter, selectedTopic, uploadedFile, goHome]);


  const renderContent = () => {
    switch (view) {
      case 'home':
        return <Homepage onSelect={handleSubjectSelect} />;
      case 'chapters':
        if (selectedSubject && selectedClass) {
          return <ChapterListView chapters={chapters} onSelect={handleChapterSelect} onBack={handleBack} />;
        }
        return null;
      case 'topics':
        if (selectedChapter) {
          return <TopicListView chapter={selectedChapter} onSelect={handleTopicSelect} onBack={handleBack} />;
        }
        return null;
      case 'topic':
        if (selectedTopic && selectedSubject && selectedClass && selectedChapter) {
          return <TopicView topic={selectedTopic} subject={selectedSubject} classLevel={selectedClass} chapter={selectedChapter} onBack={handleBack} />;
        }
        return null;
      default:
        return <Homepage onSelect={handleSubjectSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Header 
        goHome={goHome} 
        context={{ subject: selectedSubject, classLevel: selectedClass, chapter: selectedChapter, topic: selectedTopic }} 
        breadcrumbs={breadcrumbs}
        onDocumentUploaded={handleDocumentUploaded}
      />
      <main className="container mx-auto p-4 md:p-8">
        {uploadedFile ? (
          <DocumentChatView file={uploadedFile} onEndSession={handleEndDocumentChat} />
        ) : (
          renderContent()
        )}
      </main>
      {selectedTopic && selectedSubject && !uploadedFile && <AiChatHelper topic={selectedTopic.title} subject={selectedSubject} />}
    </div>
  );
};

export default App;
