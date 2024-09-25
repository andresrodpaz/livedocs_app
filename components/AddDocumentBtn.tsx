'use client';


import { useRouter } from 'next/navigation';
import { Button } from './ui/button'
import Image from 'next/image'
import { createDocument } from '@/lib/actions/room.action';

const AddDocumentBtn = ({userId, email}:AddDocumentBtnProps) => {
  const router = useRouter();

  // const addDocumentHandler = async () => {
  //   try {
  //     const room = await createDocument({userId, email});

  //     if (room) router.push(`/documents/${room.id}`);


  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const addDocumentHandler = async () => {
    try {
      const room = await createDocument({ userId, email });
  
      console.log('Created room:', room); // Añadido para depuración
  
      if (room && room.id) {
        router.push(`/documents/${room.id}`);
      } else {
        console.error('Room object is missing an id:', room);
      }
    } catch (error) {
      console.error('Error creating document:', error); // Cambiado a console.error para mejor visibilidad
    }
  };
  
  return (
    <Button type='submit' onClick={addDocumentHandler}
    className='gradient-blue flex gap-1 shadow-md'>
      <Image
        src="/assets/icons/add.svg"
        alt='add' width={24} height={24}
        />
      <p className='hidden sm:block'>Start a blank document</p>
    </Button>
  )
}

export default AddDocumentBtn