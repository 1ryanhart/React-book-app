import React, { Component, useCallBack }  from 'react'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'
import * as BooksAPI from '../BooksAPI'


class SearchBooks extends Component {

	state ={
		query: '',
		books: []
	}

	queryBooks = () => {
		const { query } = this.state
		if (!query) {
			return (this.setState(() => ({
						books: []
					})))
		}
		BooksAPI.search(query)
			.then((res) => {
				if (res === undefined || Object.keys(res).includes('error')) {
					this.setState(() => ({
						books: []
					}))
				} else if (res !== undefined) {
					this.setState(() => ({
						books: res
					}))
				}
			})
	} 

	debouncedOnChange = debounce(this.queryBooks, 300)

	findBookStatus = (book) => {
		const fromShelf = this.props.shelf.filter((b) => b.id === book.id)
		if (fromShelf.length === 1) {
			return fromShelf.shelf
		} else {
			return 'none'
		}
	}

	updateQuery = (query) => {
		this.setState({query}, this.debouncedOnChange())
	} 


    render() {
			const { query, books } = this.state

			const options = [['currentlyReading', 'Currently Reading'],['wantToRead', 'Want to Read'],
											['read', 'Read'],['none', 'None'],]

        return (
					<div className="search-books">
						<div className="search-books-bar">
							<Link className="close-search" to='/'>Close</Link>
							<div className="search-books-input-wrapper">
								<input 
									type="text" 
									placeholder="Search by title or author"
									value={query}
                  onChange={(event) => this.updateQuery(event.target.value)}
									/>
							</div>
						</div>
						
						<div className="search-books-results">
							<ol className="books-grid">
										{books.map((book) => {
											let imagelink = ''
											if(Object.keys(book).includes('imageLinks'))
											{
												imagelink = book.imageLinks.smallThumbnail
											}

											return(
											<li key={book.id}>
												<div className="book">
													<div className="book-top">
														<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imagelink})` }}></div>
														<div className="book-shelf-changer">
															<select 
																defaultValue={this.findBookStatus(book)} 
																onChange={(event) => {
																	this.props.modifyBook(book, event.target.value)
																}}>
																<option value="move" disabled>Move to...</option>
																{options.map((option) => (
																	<option key = {option[0]} value={option[0]}>
																			{option[1]}
																	</option>
																))}
															</select>
														</div>
													</div>
													<div className="book-title">{book.title}</div>
													<div className="book-authors">{book.authors}</div>
												</div>
											</li>)
										})}

							</ol>
						</div>
					</div>
				)
    }
}

export default SearchBooks