import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.action'
import { getClerkUsers } from '@/lib/actions/user.actions'
import { currentUser,  } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

/**
 * Document component that fetches and displays a collaborative document room.
 * 
 * @param {Object} props - The properties object.
 * @param {Object} props.params - The route parameters.
 * @param {string} props.params.id - The document ID.
 * @returns {JSX.Element} The rendered document component.
 */
const Document = async ({params: {id}}: SearchParamProps) => {
  
  // Get the current user
  const clerkUser = await currentUser();
  if(!clerkUser) redirect ('/sign-in');

  // Fetch the document room data
  const room = await getDocument({
    roomId:id,
    userId: clerkUser.emailAddresses[0].emailAddress
  }); 
  if(!room) redirect ('/');

  // Fetch the users who have access to the room
  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({userIds});

  // Map user data to include user type (editor or viewer)
  const usersData = users.map((user: User) => ({
    ...user,
    userType: user?.email && room.usersAccesses[user.email]?.includes('room:write')
      ? 'editor'
      : 'viewer'
  }));
  
  // Determine the current user's type
  const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';

  return (
    <main className='flex w-full flex-col items-center'>
      <CollaborativeRoom
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  )
}

export default Document