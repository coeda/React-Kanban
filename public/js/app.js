'use strict';
const data = [
  {id:1, title: 'Cats are awesome', author: 'Cat Lady'},
  {id:2, title: 'Doges are awesome', author: 'Super Doge'},
  {id:3, title: 'Lizards are awesome', author: 'Lizzy Lizard'},
  {id:4, title: 'ducks are awesome', author: 'Sir Quacks a lot'}
];

class CardPage extends React.Component {
  constructor() {
    super();

    this.state = {
      data
    };
  }

  render() {
    return (
      <div>
        <h1>Kanban Page</h1>
        <CardList data={this.state.data} />
      </div>
    )
  }
}

CardPage.defaultProps = {
  data: React.PropTypes.array
}

CardPage.defaultProps = {
  data: []
}

class CardList extends React.Component {
  render() {
    console.log(this.props);
    const cardListNode = this.props.data.map((dataItem) => {
      return (
        <CardItem title={dataItem.title} author={dataItem.author} key={dataItem.id}/>
      )
    })
    return (
      <div className="cardListt">
        <h2>Kanban List</h2>
        {cardListNode}
      </div>
    )
  }
}

class CardItem extends React.Component {
  render() {
    return(
      <div className="cardItem">
        <h4>Title: {this.props.title}</h4>
        <p>Author: {this.props.author}</p>
      </div>
    )
  }
}

ReactDOM.render(
  <CardPage cardUrl={'connection to database'}/>,
    document.getElementById('container')
  )
