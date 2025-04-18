// components/SectionList.tsx
'use client';

import { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { postDataToBackend, putDataToBackend } from '../../../../../../../../../actions/query/axiosQuery';
import { Button } from '@/components/ui/button';
import { Ban, Check, Menu, Pencil, Trash2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch } from '@/app/store/hooks/reduxHook';
import { hideLoader, showLoader } from '@/app/store/slices/loaderSlice'
import { toast } from 'sonner';
import { DialogDemo } from './LessonsDialog';

interface Section {
  id: string;
  title: string;
  description?: string | null;
  order: number;
  courseId: number
  createdAt: string
  updatedAt: string
}

interface reOrderObject {
  id: string,
  courseId: number,
  newIndex: number,
  oldIndex: number
}

interface SectionListProps {
  courseId: string;
  initialSections: Section[];
}

export const SectionList: React.FC<SectionListProps> = ({
  courseId,
  initialSections = [],
}) => {
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionDescription, setNewSectionDescription] = useState('');
  const [sections, setSections] = useState<Section[]>(() =>
    [...initialSections].sort((a, b) => a.order - b.order)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string | null>(null);
  const [editedDes, setEditedDes] = useState<string | null>(null);
  const dispatch = useAppDispatch();


  const updateSectionOrder = async (updatedSections: reOrderObject[]) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log(updatedSections)
      const response = await putDataToBackend(`/api/ultra/section/reorder`, updatedSections);

      if (!response.success) {
        throw new Error('Failed to update section order');
      }

      toast(`${response.message}`);
    } catch (error) {
      console.error('Error updating section order:', error);
      setError('Failed to save section order. Please try again.');
      // Revert to previous state if update fails
      setSections([...sections]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSection = async (id: string) =>
  {
    try{
      dispatch(showLoader());
      const data = {
        id,
        courseId,
        title: editedTitle,
        description: editedDes || null
      }

      const response = await putDataToBackend(`/api/ultra/section`, data)

      if (!response.success) throw new Error('Failed to update the section');

      const updatedSection = response.data;
      const index = sections.findIndex(s => s.id === updatedSection.id);
      if (index !== -1) {
        sections[index] = updatedSection;
      }

      toast("Section Updated")
      setEditId(null);
      setEditedTitle(null);
      setEditedDes(null);
      dispatch(hideLoader());

    }
    catch (error) {
      dispatch(hideLoader());
      console.error('Error updating section order:', error);
      setError('Failed to save section order. Please try again.');
      // Revert to previous state if update fails
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    dispatch(showLoader());
    if (!result.destination){ 
      dispatch(hideLoader()); return};

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);


    setSections(items);

    const changedSections = items
    .map((section, newIndex) => ({
      id: section.id,
      courseId: section.courseId,
      newIndex,
      oldIndex: sections.findIndex(s => s.id === section.id)
    }))
    .filter(({ newIndex, oldIndex }) => newIndex !== oldIndex);

    if(changedSections.length>0)
    {
      await updateSectionOrder(changedSections);
    }
    
    dispatch(hideLoader());
    
  };

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
        const data = {
            courseId,
            title: newSectionTitle,
            description: newSectionDescription || null,
          }
      const response = await postDataToBackend('/api/ultra/section',data);

      if (!response.success) throw new Error('Failed to create section');

      const newSection = response.data;
      setSections([...sections, newSection]);
      setNewSectionTitle('');
      setNewSectionDescription('');
    } catch (error) {
      console.error('Error creating section:', error);
      setError('Failed to create section. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSection = async (id: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/sections?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete section');

      setSections(sections.filter((section) => section.id !== id));
    } catch (error) {
      console.error('Error deleting section:', error);
      setError('Failed to delete section. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

<div className="w-full grid grid-cols-2 items-start gap-6">

      <form onSubmit={handleAddSection} className="mb-8 p-4 bg-gray-50 rounded-lg sticky top-[100px]">
        <h3 className="text-lg font-semibold mb-3">Add New Section</h3>
        <div className="mb-3">
          <label htmlFor="section-title" className="block text-sm font-medium mb-1">
            Section Title*
          </label>
          <input
            id="section-title"
            type="text"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Introduction to the course"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="section-description" className="block text-sm font-medium mb-1">
            Description (Optional)
          </label>
          <textarea
            id="section-description"
            value={newSectionDescription}
            onChange={(e) => setNewSectionDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="What will students learn in this section?"
            rows={3}
            disabled={isLoading}
          />
        </div>
        <Button
        type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Section'}
        </Button>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {sections.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No sections added yet. Create your first section above.
                </div>
              ) : (
                sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="p-4 border rounded-lg bg-white transition-shadow bg-white-100"
                      >
                        <div className="flex justify-between items-center gap-2">
                          <div className='w-full'>
                            {
                              editId===section.id?
                              <>
                              <Input defaultValue={section.title} onChange={(e)=> setEditedTitle(e.target.value)} className='shadow-none font-medium !text-base p-0 pb-1 !ring-0 border-0 rounded-none !border-b !h-auto' />
                                <Textarea onChange={(e)=> setEditedDes(e.target.value)} className='mt-3 shadow-none' defaultValue={section.description || ''}></Textarea>
                              </>
                              :
                              <>
                              <h3 className="font-medium text-base">{section.title}</h3>
                              {section.description && (
                                <p className="text-gray-600 mt-2">{section.description}</p>
                              )}
                              </>
                            }
                            
                          </div>
                          <div className="flex space-x-2">
                            {
                              editId===section.id?
                              <>
                              <button
                              {...provided.dragHandleProps}
                              className="p-1 text-gray-500 hover:text-gray-700"
                              aria-label="Drag to reorder"
                              disabled={isLoading}
                            >
                              <Menu size={20}/>
                            </button>
                            <button onClick={()=> {setEditId(null);}} className='text-yellow-500 hover:text-yellow-600'>
                              <Ban size={20}/>
                            </button>
                            <button onClick={()=> updateSection(section.id)} className='text-yellow-500 hover:text-yellow-600'>
                            <Check  />
                            </button>
                              </>
                              :
                              <>
                              <button
                              {...provided.dragHandleProps}
                              className="p-1 text-gray-500 hover:text-gray-700"
                              aria-label="Drag to reorder"
                              disabled={isLoading}
                            >
                              <Menu size={20}/>
                            </button>
                            <button onClick={()=> {setEditId(section.id); setEditedTitle(section.title); setEditedDes(section.description || null)}} className='text-yellow-500 hover:text-yellow-600'>
                              <Pencil size={20}/>
                            </button>
                            <DialogDemo section={section}/>

                            <button
                              onClick={() => handleDeleteSection(section.id)}
                              className="p-1 text-red-500 hover:text-red-700"
                              aria-label="Delete section"
                              disabled={isLoading}
                            >
                              <Trash2Icon size={20}/>
                            </button>
                              </>
                            }
                            
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
</div>
      {isLoading && sections.length > 0 && (
        <div className="mt-4 text-center text-gray-500">Saving changes...</div>
      )}
    </div>
  );
};