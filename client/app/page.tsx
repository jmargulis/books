'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const API_ENDPOINT = 'http://127.0.0.1:8000/books?q='

interface Book {
  id: string
  title: string
  authors: string[]
  publishedDate: string
  description: string
  pageCount: number
  thumbnail: string
  infoLink: string
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Book[]>([])
  const books = results.map(book => {
    return <div key={book.id} className='clear-both py-2'>
      <Link href={book.infoLink}>
        <Image
          src={book.thumbnail}
          width={128}
          height={200}
          alt={book.title}
          className='float-left p-2'
        />
        <p><strong>{book.title}</strong> by <em>{book.authors.length ? book.authors[0] : 'Unknown'}</em></p>
      </Link>
      <p>{book.description}</p>
    </div>
  })

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    if (query.length) {
      setIsLoading(true)
      fetch(API_ENDPOINT + encodeURIComponent(query))
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setResults(data)
          setIsLoading(false)
        }
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
        <div className='w-full max-w-lg'>
          { isLoading ? <p className='text-center'>Loading...</p> : books }
        </div>
      </main>
    </div>
  )
}
