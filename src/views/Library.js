import React, {Component} from 'react';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: []
        };
    }

    componentDidMount() {
        fetch('http://henri-potier.xebia.fr/books')
            .then((response) => response.json())
            .then((json) => {
                this.setState({books: json});
            }, (error) => {
                console.error('fetch books failed with error ' + error.message);
            });
    }

    render () {
        return (
            <div />
        );
    }
}

export default Library;
