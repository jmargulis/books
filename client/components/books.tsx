import { Book } from '@/types/book'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  books: Book[]
  isLoading: boolean
}

export default function Books({ books, isLoading}: Props) {

  return (
    <div className='w-full max-w-lg'>
      {
        isLoading
        ?
        <p className='text-center'>Loading...</p>
        :
        books.map(book => {
          const details = []
          if (book.publishedDate.length) {
            details.push('Published ' + new Date(book.publishedDate).toDateString())
          }
          if (book.pageCount) {
            details.push(book.pageCount + ' pages')
          }
          return <div key={book.id} className='clear-both py-2'>
            <Link href={book.infoLink}>
              <Image
                src={book.thumbnail}
                placeholder='blur'
                blurDataURL='http://books.google.com/googlebooks/images/no_cover_thumb.gif'
                width={128}
                height={200}
                alt={book.title}
                className='float-left p-2'
                title={details.join('; ')}
              />
            </Link>
            <p><strong>{book.title}</strong></p>
            <p className='text-xs'><em>{book.authors.join(', ')}</em></p>
            <p className='text-sm text-ellipsis overflow-hidden max-h-[3em]' title={book.description}>{book.description}</p>
            <p className='m-4 text-xs'><Link
              href={book.infoLink}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded'
            >Learn more...</Link></p>
          </div>
        })
      }
    </div>
  )
}