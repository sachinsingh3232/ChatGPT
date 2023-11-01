'use client'
import React from 'react'
import NewChat from './NewChat'
import { useSession, signOut } from 'next-auth/react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import ChatRow from './ChatRow';
import { useRouter } from 'next/navigation'

const Sidebar = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [chats, loading, error] = useCollection(
        session && query(
            collection(db, "users", session?.user?.email!, "chats"),
            orderBy("createdAt", "asc")
        )
    )
    return (
        <div className="p-2 flex flex-col justify-between min-h-screen">
            <div className="flex-1">
                <div>
                    <NewChat />
                    {/* ModelSelection */}
                    <div className="flex flex-col space-y-2 my-2">
                        {loading && (
                            <div className="animate-pulse text-center text-white">
                                <p>Loading Chats...</p>
                            </div>
                        )}
                        {chats?.docs.map(chat => (
                            <ChatRow key={chat.id} id={chat.id} />
                        ))}
                    </div>
                </div>
            </div>
            {session && (
                <img onClick={() => signOut()} className="rounded-full w-10 h-10 cursor-pointer mx-auto mb-2 hover:opacity-50" src={session.user?.image! || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"} alt="" />
            )}
        </div>
    )
}

export default Sidebar