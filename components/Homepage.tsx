
import React from 'react';
import type { Subject, ClassLevel } from '../types';
import Button from './common/Button';
import Card from './common/Card';

interface HomepageProps {
  onSelect: (subject: Subject, classLevel: ClassLevel) => void;
}

const Homepage: React.FC<HomepageProps> = ({ onSelect }) => {
  return (
    <div className="text-center flex flex-col min-h-[calc(100vh-10rem)] justify-between">
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-2">Welcome to BizNomics</h1>
        <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">Your intelligent AI assistant for mastering Economics and Business Studies.</p>
        <div className="max-w-4xl mx-auto">
          <Card>
              <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Choose Your Subject</h2>
              <div className="flex flex-col gap-6">
                  {/* Economics Row */}
                  <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-lg bg-primary-light/20 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary-light">
                        <span className="text-3xl" aria-hidden="true">📈</span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">Economics</h3>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Button onClick={() => onSelect('Economics', '1st PUC')}>
                        1st PUC
                      </Button>
                      <Button onClick={() => onSelect('Economics', '2nd PUC')}>
                        2nd PUC
                      </Button>
                    </div>
                  </div>
                  
                  {/* Business Studies Row */}
                  <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-lg bg-primary-light/20 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-primary-light">
                        <span className="text-3xl" aria-hidden="true">💼</span>
                      </div>
                      <h3 className="text-xl font-bold text-text-primary">Business Studies</h3>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Button onClick={() => onSelect('Business Studies', '1st PUC')}>
                        1st PUC
                      </Button>
                      <Button onClick={() => onSelect('Business Studies', '2nd PUC')}>
                        2nd PUC
                      </Button>
                    </div>
                  </div>
              </div>
          </Card>
        </div>
      </div>
      
      <footer className="mt-12 py-6 border-t border-gray-200">
        <p className="text-sm text-text-secondary font-medium">
          App developed by Haani, Aqsa, Mishkath, Soha, Madiha and Alaina under the guidance of Miss Salma of Falcon Institute Mysore Road Branch, Bangalore
        </p>
      </footer>
    </div>
  );
};

export default Homepage;