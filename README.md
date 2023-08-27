# Books Search App

The project uses Next.js for user interaction and FastAPI to communicate with Google's Book API. The user can provide a search string and see results. The API receives a query parameter and responds with a consistent structure for book data.

## Running locally

### API Server
To start the API server locally, run the following:
#### First time
```
cd api
python -m venv venv
source venv/bin/activate
pip install fastapi
pip install "uvicorn[standard]"
 ```
#### Every time
```
cd api
source venv/bin/activate
uvicorn main:app --reload
```
Once started, you can view the API at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### Client Server
To start the client server locally, run the following:
#### First time
```
cd client
cp .env.example .env
```
#### Every time
```
cd client
pnpm run dev
```
Once started, you can interact with the client at [http://127.0.0.1:3000/](http://127.0.0.1:3000/).

## Notes
I created the client app with the following command/settings:
```
npx create-next-app@latest
```
<pre>
✔ What is your project named? … client
✔ Would you like to use TypeScript? … No / <ins>Yes</ins>
✔ Would you like to use ESLint? … No / <ins>Yes</ins>
✔ Would you like to use Tailwind CSS? … No / <ins>Yes</ins>
✔ Would you like to use `src/` directory? … <ins>No</ins> / Yes
✔ Would you like to use App Router? (recommended) … No / <ins>Yes</ins>
✔ Would you like to customize the default import alias? … <ins>No</ins> / Yes
</pre>
