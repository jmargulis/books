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
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Book[]>([])
  const books = results.map(book => {
    return <div key={book.id} className='clear-both p-4'>
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
    fetch(API_ENDPOINT + encodeURIComponent(query))
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data)) {
          setResults(data)
        }
      })
  }

  return (
    <div className='min-h-screen'>
      <main className="flex flex-col items-center justify-between p-24">
        <h1>Book Search</h1>
        <form
          onSubmit={handleSubmit}
        >
          <input
            type='search'
            placeholder='Title, Author, ISBN, etc.'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type='submit'>Search</button>
        </form>
        <div>
          { books }
        </div>
      </main>
    </div>
  )
}
