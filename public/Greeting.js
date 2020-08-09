class Greeting extends React.Component {
    render() {
        return (React.createElement('h1',null,`Hi ${this.props.person}`));
    }
}
ReactDOM.render(React.createElement(Greeting,{person: 'Mathur'},null),document.getElementById('root'));
