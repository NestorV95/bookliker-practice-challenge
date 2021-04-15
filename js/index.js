document.addEventListener("DOMContentLoaded",()=>{
    fetchBooks()
});

const url = 'http://localhost:3000/books'
//You are user 1 {"id":1, "username":"pouros"}
const currentUser = {id:1, username:"pouros"}

//Get a list of books
function fetchBooks(){
    fetch(url)
    .then(resp=>resp.json())
    .then(books=>{
        books.forEach(book=>renderBook(book))
    })
}
// render them
function renderBook(book){
    const bookList = document.querySelector('#list')
        const bookEntry = document.createElement('li')
        bookEntry.innerText = book.title
        bookEntry.addEventListener('click',(e)=>{
            e.preventDefault()
            renderShow(book)
        })
    bookList.appendChild(bookEntry) 
}
//book's thumbnail and description and a list of users who have liked the book.
function renderShow(book){
    const showPanel = document.querySelector('#show-panel')
        showPanel.innerText = ''
        const bookCover = document.createElement('img')
            bookCover.src = book.img_url
        const bookTitle = document.createElement('h3')
            bookTitle.innerText = book.title
        const bookSubtitle = document.createElement('h5')
            bookSubtitle.innerText = book.subtitle
        const bookAuthor = document.createElement('h2')
            bookAuthor.innerText = book.author
        const bookDescription = document.createElement('p')
            bookDescription.innerText = book.description
        const bookUsers = document.createElement('ul')
            bookUsers.className = 'users-list'
            book.users.forEach(user=>{
                const bookUser = document.createElement('li')
                    bookUser.id = `b-${book.id}-u-${user.id}`
                    bookUser.innerText = user.username
                    bookUsers.append(bookUser) 
            })
        const likeButton = document.createElement('button')
            likeButton.innerText = 'Like'
            likeButton.addEventListener('click',(e)=>{
                e.preventDefault()
                likeBook(book)
            }) 
    showPanel.append(bookCover,bookTitle,bookSubtitle,bookAuthor,bookDescription,bookUsers,likeButton)
}

function likeBook(book){
    const allUsers={
        users: [...book.users, currentUser]
    }
    const configUsers={
        method:'PATCH',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body: JSON.stringify(allUsers)
    }
    const bookUsers = document.body.querySelector('')
    console.log(bookUsers)
}    




//like a book by clicking on a button

//route will respond with the updated book json including the list of users who have liked the book

//second patch request to the same book removes your user from the list of users

//Can you toggle likes on and off?