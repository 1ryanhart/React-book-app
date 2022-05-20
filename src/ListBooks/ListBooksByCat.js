import React, { Component } from 'react'

class ListBooksByCat extends Component {
    render() {
			const { books, title } = this.props
			const options = [['currentlyReading', 'Currently Reading'],['wantToRead', 'Want to Read'],
											['read', 'Read'],['none', 'None'],]
        return(
					<div className="bookshelf">
					  <h2 className="bookshelf-title">{title}</h2>
              <div className="bookshelf-books">
								<ol className="books-grid">
									{books.map((book) => {
										return(
										<li key={book.id}>
											<div className="book">
												<div className="book-top">
													<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
													<div className="book-shelf-changer">
														<select 
															defaultValue={book.shelf} 
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

export default ListBooksByCat