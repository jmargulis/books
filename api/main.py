from fastapi import FastAPI, HTTPException
from models import Book
from books import createBook
import json
from urllib.parse import quote
from urllib.request import urlopen

app = FastAPI()


@app.get("/books")
async def get_books(q: str) -> list[Book]:
    if len(q) == 0:
       raise HTTPException(status_code=400, detail="Must provide query string")

    api = "https://www.googleapis.com/books/v1/volumes?q="
    try:
        response = urlopen(api + quote(q))
    except:
        raise HTTPException(status_code=500, detail="Google Book API failure")
    
    book_data = json.load(response)
    if "items" not in book_data:
       return []

    result = []
    for item in book_data["items"]:
        result.append(createBook(item))

    return result