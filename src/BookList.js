import React, { Component } from "react";

// Components
import BookTable from "./BookTable";
import SearchBar from "./SearchBar";

class BooksList extends Component {
    state = {
        filtered: this.props.books
    };

    filter = query => {
        console.log(query);
        query = query.toLowerCase();
        let newFiltered = this.props.books.filter(book =>
            book.title.toLowerCase().includes(query)
        );
        console.log(newFiltered);
        this.setState({ filtered: newFiltered });
    };

    filterByColor(color) {
        const filterColor = color;

        let newFiltered = this.props.books;
        if (filterColor) {
            newFiltered = this.props.books.filter(book => {
                return book.color === filterColor;
            });
        }
        this.setState({filtered: newFiltered});
    }

    componentDidMount() {
        this.filterByColor(this.props.match.params.color)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("updated");
        console.log(prevState);

        if (prevProps.match.params.color !== this.props.match.params.color) {
            this.filterByColor(this.props.match.params.color);
        }
    }

    render() {
        return (
            <div>
                <h3>Authors</h3>
                <SearchBar onChange={this.filter} />
                <BookTable books={this.state.filtered} />
            </div>
        );
    }
}

export default BooksList;
