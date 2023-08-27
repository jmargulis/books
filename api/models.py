from pydantic import BaseModel, Field


class Book(BaseModel):
    title: str
    authors: list[str] = []
    publishedDate: str = ''
    description: str
    pageCount: int
    thumbnail: str
    infoLink: str
