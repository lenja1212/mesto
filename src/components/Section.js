export default class Section{
  constructor({data, renderer}, containerSelector){
    this._renderedItems = data;
    this._renderer = renderer;
 //   console.log(this._renderedItems);
    this._container = document.querySelector(containerSelector);
  }

  addItem(element){
    this._container.append(element);
  }

  prependItem(element){
    this._container.prepend(element);
  }

  renderItems(){
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    })
  }
}
