'use client'

import Books from '@/components/books'
import { Book } from '@/types/book'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const API_ENDPOINT = 'http://127.0.0.1:8000/books?q='

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [books, setBooks] = useState<Book[]>([])

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    if (query.length) {
      setIsLoading(true)
      router.replace(pathname + '?q=' + encodeURIComponent(query))

      fetch(API_ENDPOINT + encodeURIComponent(query))
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setBooks(data)
        } else {
          setBooks([])
        }
        setIsLoading(false)
      })
    }
  }

  return (
    <div className='min-h-screen'>
      <main className="flex flex-col items-center justify-between p-24">
        <h1 className='text-4xl'>Book Search</h1>
        <form
          onSubmit={handleSubmit}
          className='w-full max-w-lg py-2'
        >
          <div className="flex items-center py-2">
            <input
              type='text'
              placeholder='Title, Author, ISBN, etc.'
              value={query}
              onChange={e => setQuery(e.target.value)}
              className='w-2/3 py-2 px-4 rounded'
            />
            <button type='submit' className='w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Search</button>
          </div>
        </form>
        <Books books={books} isLoading={isLoading} />
      </main>
    </div>
  )
}
