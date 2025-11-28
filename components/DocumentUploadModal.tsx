import React, { useState, useCallback } from 'react';
import { X, UploadCloud, FileText, Loader2 } from 'lucide-react';
import Modal from './common/Modal';
import Button from './common/Button';
import type { UploadedFile } from '../App';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (file: UploadedFile) => void;
}

const MAX_FILE_SIZE_MB = 4;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['text/plain', 'text/markdown'];
const ALLOWED_EXTENSIONS = ['.txt', '.md'];

const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({ isOpen, onClose, onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const resetState = () => {
    setFile(null);
    setError(null);
    setIsProcessing(false);
    setIsDragging(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const validateFile = (selectedFile: File): boolean => {
    if (!selectedFile) return false;

    if (!ALLOWED_FILE_TYPES.includes(selectedFile.type) && !ALLOWED_EXTENSIONS.some(ext => selectedFile.name.endsWith(ext))) {
      setError(`Invalid file type. Please upload a ${ALLOWED_EXTENSIONS.join(' or ')} file.`);
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setError(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    } else {
        setFile(null);
    }
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleStartChat = () => {
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      onUploadSuccess({
        name: file.name,
        data: base64String,
        mimeType: file.type || 'text/plain',
      });
      setIsProcessing(false);
      handleClose();
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      setError('Could not read the file. Please try again.');
      setIsProcessing(false);
    };
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Study with Your Document">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          className={`w-full p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center transition-colors ${isDragging ? 'border-primary bg-primary-light' : 'border-gray-300 hover:border-primary'}`}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept={ALLOWED_EXTENSIONS.join(',')}
            onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <UploadCloud size={48} className="mx-auto text-primary mb-2" />
            <p className="font-semibold text-text-primary">Drag & drop your file here</p>
            <p className="text-sm text-text-secondary">or click to browse</p>
          </label>
        </div>

        <p className="text-xs text-text-secondary">Supported files: {ALLOWED_EXTENSIONS.join(', ')} | Max size: {MAX_FILE_SIZE_MB}MB</p>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {file && !error && (
          <div className="w-full p-3 bg-primary-light rounded-lg flex items-center space-x-3 text-left">
            <FileText className="text-primary" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-text-primary truncate">{file.name}</p>
              <p className="text-xs text-text-secondary">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
            <button onClick={() => setFile(null)} className="text-text-secondary hover:text-text-primary">
                <X size={16} />
            </button>
          </div>
        )}

        <Button
          onClick={handleStartChat}
          disabled={!file || isProcessing || !!error}
          className="w-full"
        >
          {isProcessing ? <Loader2 className="animate-spin" /> : 'Start Chat Session'}
        </Button>
      </div>
    </Modal>
  );
};

export default DocumentUploadModal;