'use strict';

class CardPage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };

    this.onCardData = this.onCardData.bind(this);
    this.onCardError = this.onCardError.bind(this);
    this.loadDataFromCards = this.loadDataFromCards.bind(this);
  }

  onCardData(data) {
    const parsedCardData = JSON.parse(data.currentTarget.response).data;
    console.log(parsedCardData);
    this.setState({data:parsedCardData});
  }

  onCardError(error){
    console.error(error);
  }

  loadDataFromCards() {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onCardData);
    oReq.addEventListener('error', this.onCardError);
    oReq.open('GET', this.props.cardUrl);
    oReq.send();
  }

  componentWillMount() {
    this.loadDataFromCards();
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
        <CardItem title={dataItem.title} priority={dataItem.priority} status={dataItem.status} key={dataItem.id}/>
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
        <p>Author: {this.props.priority}</p>
        <p>Status: {this.props.status}</p>
      </div>
    )
  }
}

ReactDOM.render(
  <CardPage cardUrl={'http://localhost:3000/api'}/>,
    document.getElementById('container')
  )
