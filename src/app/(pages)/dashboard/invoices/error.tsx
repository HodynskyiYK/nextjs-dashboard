'use client'

import {useEffect} from 'react'
import {NextPage} from 'next'

interface IErrorProps {
    error: Error & {digest?: string}
    reset: () => void
}

const Error: NextPage<IErrorProps> = ({error, reset}) => {
    useEffect(() => {
        console.error(error)
    }, [error]);

    return (
        <main className="flex h-full flex-col items-center justify-center">
            <h2 className="text-center">Something went wrong!</h2>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Попытка восстановиться путем повторного рендеринга маршрута invoices
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    )
}

export default Error