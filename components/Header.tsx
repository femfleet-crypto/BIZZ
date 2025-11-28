import React, { useState } from 'react';
import { BookOpen, ChevronsRight, UploadCloud } from 'lucide-react';
import StudyToolsModal from './StudyToolsModal';
import DocumentUploadModal from './DocumentUploadModal';
import type { AppContext } from '../types';
import type { UploadedFile } from '../App';

interface HeaderProps {
  goHome: () => void;
  context: AppContext;
  breadcrumbs: { label: string; action: () => void }[];
  onDocumentUploaded: (file: UploadedFile) => void;
}

const Header: React.FC<HeaderProps> = ({ goHome, context, breadcrumbs, onDocumentUploaded }) => {
  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const canOpenStudyTools = context.subject && context.classLevel && context.chapter;
  
  const handleUploadSuccess = (file: UploadedFile) => {
    setIsUploadModalOpen(false);
    onDocumentUploaded(file);
  };

  return (
    <>
      <header className="bg-card shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center gap-4">
          <div onClick={goHome} className="flex items-center space-x-2 cursor-pointer">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary shrink-0">BizNomics</h1>
          </div>
          <div className="flex items-center gap-2">
             <button
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-transparent border border-primary text-primary rounded-lg hover:bg-primary-light transition-colors"
             >
                <UploadCloud size={20} />
                <span className="hidden sm:inline">Upload Document</span>
             </button>
            <button
              onClick={() => canOpenStudyTools && setIsStudyModalOpen(true)}
              disabled={!canOpenStudyTools}
              className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              <BookOpen size={20} />
              <span className="hidden sm:inline">Study Tools</span>
            </button>
          </div>
        </div>
        <div className="bg-primary-light text-text-secondary text-sm py-1 px-4">
             <div className="container mx-auto flex items-center flex-wrap">
               {breadcrumbs.map((crumb, index) => (
                 <React.Fragment key={index}>
                   <button
                     onClick={crumb.action}
                     className={`hover:underline ${index === breadcrumbs.length - 1 ? 'font-semibold text-primary' : ''}`}
                     disabled={index === breadcrumbs.length - 1}
                   >
                     {crumb.label}
                   </button>
                   {index < breadcrumbs.length - 1 && <ChevronsRight size={16} className="mx-1" />}
                 </React.Fragment>
               ))}
             </div>
        </div>
      </header>
      <StudyToolsModal
        isOpen={isStudyModalOpen}
        onClose={() => setIsStudyModalOpen(false)}
        context={context}
      />
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </>
  );
};

export default Header;