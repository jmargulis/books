from models import Book

def createBook(item) -> Book:
    id = item["id"] if "id" in item else 'no_id_found'
    info = item["volumeInfo"] if "volumeInfo" in item else {}
    title = info["title"] if "title" in info else "???"
    authors = info["authors"] if "authors" in info else ["???"]
    publishedDate = info["publishedDate"] if "publishedDate" in info else ""
    description = info["description"] if "description" in info else ""
    pageCount = info["pageCount"] if "pageCount" in info else 0
    thumbnail = info["imageLinks"]["thumbnail"] if "imageLinks" in info and "thumbnail" in info["imageLinks"] else "http://books.google.com/googlebooks/images/no_cover_thumb.gif"
    infoLink = info["infoLink"] if "infoLink" in info else ""

    return Book(
      id=id,
      title=title,
      authors=authors,
      publishedDate=publishedDate,
      description=description,
      pageCount=pageCount,
      thumbnail=thumbnail,
      infoLink=infoLink
    )
