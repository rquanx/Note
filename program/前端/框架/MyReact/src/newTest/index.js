import React from "./react";
import ReactDOM from "./react-dom";
// ReactDOM.render(
//     <h1>Hello, world!</h1>,
//     document.getElementById('root')
// );
// function tick() {
//     const element = (
//         <div>
//             <h1>Hello, world!</h1>
//             <h2>It is {new Date().toLocaleTimeString()}.</h2>
//         </div>
//       );
//     ReactDOM.render(
//         element,
//         document.getElementById( 'root' )
//     );
//     console.log("render")
// }

// setInterval( tick, 1000 );

// class Welcome extends React.Component {
//     render() {
//         return <h1>Hello, {this.props.name}</h1>;
//     }
// }

// const element = <Welcome name="Sara" />;
// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            num: 0,
            items: []
        }
    }

    componentWillUpdate() {
        console.log('update');
    }

    componentWillMount() {
        console.log('mount');
    }

    add() {
        this.state.items.push(this.state.num + 1);
        this.setState({ num: this.state.num + 1 });
    }
    reduce() {
        if (this.state.items.length > 0)
            this.state.items.pop()
        this.setState({ num: this.state.num - 1 });
    }

    delete(index) {
        this.state.items.splice(index,1);
        this.setState({ num: this.state.num - 1 });
    }

    render() {
        console.log("render")
        let items = [];
        this.state.items.forEach((item,index) => {
            items.push(<div><span>{item}</span><button onClick={() => this.delete(index)}>delete</button> </div>);
        });
        return (
            <div>
                <h1>number: {this.state.num}</h1>
                <button onClick={() => this.add()}>add</button>
                <button onClick={() => this.reduce()}>reduce</button>
                {items}
            </div>
        );
    }
}

ReactDOM.render(
    <Counter />,
    document.getElementById('root')
);