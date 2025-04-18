'use client'

import React, { useCallback, useState, useRef, ChangeEvent, useEffect } from 'react';
import { Upload, X, Check, File } from 'lucide-react';

interface FilePickerProps {
  onFileSelect: (file: File | null) => void;
  videoDuration?: (duration: number | null) => void;
  accept?: string;
  maxSize?: number; // in bytes
  multiple?: boolean;
  label?: string;
  className?: string;
  disabled?: boolean;
  showPreview?: boolean;
  resetFiles?: (fn: () => void) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({
  onFileSelect,
  videoDuration,
  accept = '*/*',
  maxSize = 10 * 1024 * 1024, // 10MB default
  multiple = false,
  label = 'Choose a file',
  className = '',
  disabled = false,
  showPreview = true,
  resetFiles
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  useEffect(()=>
  {
    if (videoDuration) {
      videoDuration(duration); // Only call if it exists
    }
  }, [duration])

  useEffect(()=>
  {
    if(resetFiles)
    {
      resetFiles(()=>resetAll());
    }
  }, [])

  const resetAll=async()=>
    {
      setSelectedFiles([]);
      setPreviewUrls([])
      setDuration(0);
    }


  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setError(null);
      const files = event.target.files;

      if (!files || files.length === 0) {
        onFileSelect(null);
        if (videoDuration) {
          videoDuration(0); // Only call if it exists
        }
        setPreviewUrls([])
        setSelectedFiles([]);
        return;
      }

      processFiles(Array.from(files));
    },
    [accept, maxSize, multiple, onFileSelect]
  );

  const processFiles = (files: File[]) => {
    const fileList = multiple ? files : [files[0]];

    // Validate files
    for (const file of fileList) {
      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`);
        onFileSelect(null);
        if (videoDuration) {
          videoDuration(0); // Only call if it exists
        }
        setSelectedFiles([]);
        return;
      }

      if (accept !== '*/*' && !file.type.match(new RegExp(accept.replace('*', '.*')))) {
        setError(`File "${file.name}" is not a supported file type`);
        onFileSelect(null);if (videoDuration) {
          videoDuration(0); // Only call if it exists
        }
        setSelectedFiles([]);
        return;
      }
    }

    setSelectedFiles(fileList);
    onFileSelect(multiple ? fileList[0] : fileList[0]);
    if (showPreview) {
      console.log(fileList[0].type.startsWith('video/'))
        const imageFiles = fileList.filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));
        const urls = imageFiles.map(file => URL.createObjectURL(file));
        console.log(urls)
        setPreviewUrls(urls);
      }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFiles(files);
    }
  };

//   const handleRemoveFile = useCallback(
//     (index: number) => {
//       const newFiles = [...selectedFiles];
//       newFiles.splice(index, 1);
//       setSelectedFiles(newFiles);
//       onFileSelect(newFiles.length > 0 ? (multiple ? newFiles[0] : newFiles[0]) : null);
//     },
//     [selectedFiles, onFileSelect, multiple]
//   );

  const handleRemoveFile = useCallback((index: number) => {
    if (previewUrls[index]) URL.revokeObjectURL(previewUrls[index]);
    const newFiles = [...selectedFiles];
    const newPreviews = [...previewUrls];
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
    onFileSelect(newFiles.length > 0 ? (multiple ? newFiles[0] : newFiles[0]) : null);if (videoDuration) {
      videoDuration(0); // Only call if it exists
    }
  }, [selectedFiles, previewUrls, onFileSelect, multiple]);

  const triggerFileInput = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} bytes`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        className="hidden"
        disabled={disabled}
      />

      {/* Main drop area */}
      <div
        className={`border-2 border-dashed rounded-lg aspect-video flex items-center text-center transition-all 
          ${
            error
              ? 'border-red-500 bg-red-50'
              : selectedFiles.length > 0
              ? 'border-green-500 bg-green-50'
              : isDragging
              ? 'border-blue-500 bg-blue-100'
              : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
          }
          ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={()=> {
          if(previewUrls.length>0)
          {
            return;
          }
          triggerFileInput()}}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        
        {previewUrls.length > 0 ? (
            <div className="h-full w-full aspect-video">
              {previewUrls.map((url, index) => (
                <div key={url} className="relative group">
                  {
                    accept==='video/*'?
                    <>
                    <video
                    controls
                    ref={videoRef}
                    src={url}
                    className="w-full h-full aspect-video object-contain rounded-md border borde)r-gray-200"
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        setDuration(videoRef.current.duration);
                      }
                    }}
                  />
                    </>
                    :
                    <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full aspect-video object-cover rounded-md border border-gray-200"
                  />
                  }
                  
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(index);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center gap-2 w-full">
          <Upload
            className={`w-8 h-8 ${
              error 
                ? 'text-red-500' 
                : selectedFiles.length > 0 
                  ? 'text-green-500' 
                  : 'text-gray-500'
            }`}
          />
          <p
            className={`font-medium ${
              error 
                ? 'text-red-700' 
                : selectedFiles.length > 0 
                  ? 'text-green-700' 
                  : 'text-gray-700'
            }`}
          >
            {error
              ? error
              : selectedFiles.length > 0
              ? `${selectedFiles.length} file${selectedFiles.length > 1 ? 's' : ''} selected`
              : label}
          </p>
          <p className="text-sm text-gray-500">
            {accept !== '*/*' ? `Supported: ${accept}` : 'Any file type'} • Max size:{' '}
            {formatFileSize(maxSize)}
          </p>
        </div>
            </>
          )}
      </div>

      {/* Selected files list */}
      {selectedFiles.length > 0 && (
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <File className="text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">
                  <Check className="w-4 h-4" />
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Remove file"
                  disabled={disabled}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilePicker;