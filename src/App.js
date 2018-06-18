import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import ListBooks from './BookList';
import SearchBooks from './Search';

//BookApp react component class
class BooksApp extends Component {
    state = {
            books: [],
            showSearchPage: false
        }
        /////////////////////////Initialization for the requires DOM /////////
    componentDidMount() {
            BooksAPI.getAll().then(books => {
                this.setState({ books });
            });
        }
        ////////update the shelf of Book/////
    updateBook = (book, shelf) => {
        this.setState(previousState => {
            if (shelf === 'none') {
                return {
                    books: previousState.books.filter(
                        currentBook => currentBook.id !== book.id
                    )
                };
            }
            return {
                books: previousState.books.map(currentBook => {
                    if (currentBook.id === book.id) {
                        currentBook.shelf = shelf;
                    }
                    return currentBook;
                })
            };
        });
    };
    /////// check if the shelf of book is changed 
    changeShelfOfBook = (book, shelf) => {
        this.updateBook(book, shelf);
        BooksAPI.update(book, shelf);
    };
    //////Update Search status function
    updateSearchStatus = showSearchPage => {
            this.setState({ showSearchPage: true });
        }
        /////starting render
    render() {
            return ( <
                div className = "app" >
                <
                Route exact path = "/"
                render = {
                    () =>
                    <
                    ListBooks
                    books = { this.state.books }
                    updateBook = { this.changeShelfOfBook }
                    />} / >
                    <
                    Route
                    path = "/search"
                    render = {
                        () =>
                        <
                        SearchBooks
                        books = { this.state.books }
                        updateBook = { this.changeShelfOfBook }
                        showSearchPage = { this.updateSearchStatus }
                        />} / >
                        <
                        /div>
                    );
                }
            }
            export default BooksApp