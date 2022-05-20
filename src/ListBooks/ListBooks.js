import React, { Component } from 'react'
import ListBooksByCat from './ListBooksByCat'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

class ListBooks extends Component {

    render() {
    	const currentlyReading = this.props.books.filter((book) => book.shelf === 'currentlyReading')
			const wantToRead = this.props.books.filter((book) => book.shelf === 'wantToRead')
			const read = this.props.books.filter((book) => book.shelf === 'read')

        return (
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
								<ListBooksByCat books={currentlyReading} title='Currently Reading' modifyBook={this.props.modifyBook} />
								<ListBooksByCat books={wantToRead} title='Want to Read' modifyBook={this.props.modifyBook} />
								<ListBooksByCat books={read} title='Read' modifyBook={this.props.modifyBook} />
              </div>
            </div>
            <div className="open-search">
              <Link className='open-search-button' to='/search'>Add a book</Link>
            </div>
          </div>
        )
    }
}

export default ListBooks