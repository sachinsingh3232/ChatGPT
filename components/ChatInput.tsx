'use client'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/firebase'
import {toast} from 'react-hot-toast'

type Props = {
    chatId: string
}
const ChatInput = ({ chatId }: Props) => {
    const [input, setInput] = useState("")
    const { data: session } = useSession();
    //TODO- useSWR to get model 
    const model = 'gpt-3.5-turbo'
    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input) return;
        const finalInput = input.trim();
        setInput("");
        const message: Message = {
            text: finalInput,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name!}`,
            }
        }

        const res = await addDoc(collection(db, "users", session?.user?.email!, "chats", chatId, "messages"), message);

        const notification = toast.loading('ChatGPT is thinking...')

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                prompt: finalInput, chatId, model, session
            })
        }).then((res) => {
            toast.success("ChatGPT has responded !", {
                id: notification
            })
        })
    }
    return (
        <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm ">
            <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
                <input className="bg-transparent flex-1 focus:outline-none 
                disabled:cursor-not-allowed disabled:text-gray-300"
                    disabled={!session}
                    type="text" placeholder=' Type anything you want !' value={input} onChange={(e) => setInput(e.target.value)} />
                <button disabled={!session || !input} type="submit"
                    className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-3 py-2 rounded disabled:bg-gray-300
                    disabled:cursor-not-allowed"
                ><PaperAirplaneIcon className="h-4 w-4 -rotate-45" /></button>
            </form>
            <div>
                {/* ModelSelection */}
            </div>
        </div>
    )
}

export default ChatInput