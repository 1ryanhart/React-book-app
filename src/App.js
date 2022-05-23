import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks/ListBooks'
import SearchBooks from './ListBooks/SearchBooks'
import { Route, Routes } from 'react-router-dom'

class BooksApp extends React.Component {
	state = {
    books: []
  }

	componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  modifyBook = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf) 
        .then(() => {
          const otherBooks = this.state.books.filter((b) => b.id != book.id)
          book.shelf = shelf
          this.setState(() => ({
            books: [...otherBooks, book]
          }))
        })
    }
  }

  render() {

    return (
      <div className="app">
        <Routes>
        <Route exact path='/' element={<ListBooks books={this.state.books} modifyBook={this.modifyBook} />}/>
        <Route path='/search' element={<SearchBooks shelf={this.state.books} modifyBook={this.modifyBook} />}/>
        </Routes>
      </div>
    )
  }
}

export default BooksApp
