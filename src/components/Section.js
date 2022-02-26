export default class Section{
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element){
    this._container.append(element);
  }

  prependItem(element){
    this._container.prepend(element);
  }

  //getCards -> data -> renderItems
  getSectionCards(cards){
    this._renderedItems = cards;
  }

  renderItems(){
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    })
  }
}

