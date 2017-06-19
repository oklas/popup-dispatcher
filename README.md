# popup-dispatcher

Incapsulation of mouse and time wathchers to hide popup controls or windows on web page

[![Travis build status](http://img.shields.io/travis/oklas/popup-dispatcher.svg?style=flat)](https://travis-ci.org/oklas/popup-dispatcher)
[![Code Climate](https://codeclimate.com/github/oklas/popup-dispatcher/badges/gpa.svg)](https://codeclimate.com/github/oklas/popup-dispatcher)
[![Test Coverage](https://img.shields.io/codecov/c/github/oklas/popup-dispatcher.svg)](https://codecov.io/gh/oklas/popup-dispatcher)
[![Dependency Status](https://david-dm.org/oklas/popup-dispatcher.svg)](https://david-dm.org/oklas/popup-dispatcher)
[![devDependency Status](https://david-dm.org/oklas/popup-dispatcher/dev-status.svg)](https://david-dm.org/oklas/popup-dispatcher#info=devDependencies)

# SYNOPSIS

``` javascript
class Dropdown extends React.Component {
  static defaultProps = {
    items: ['item1', 'item2', 'item3'],
  }
  constructor(props){
    super(props)
    this.state = {
      opened: false,
      current: '...'
    }
    this.disp = new PopupDispatcher
    this.disp.on('done', () => this.setState({opened:false}) )
  }

  handleClick = () => {
    this.setState({ opened: ! this.state.opened })
  }

  handleSelect = (item) => {
    this.setState({current: item}),
    this.disp.finish()
  }

  render() {
    if( this.state.opened ) this.disp.start()
    return (
      <div>

        <a {...this.disp.props({})} onClick={this.handleClick}>
          <span>{this.state.current}</span>
        </a>

        <ul {...this.disp.props({onMouseOver:()=>console.log('we need this handler too')})}>
          { this.props.items.map( (item,i) => (
            <li onClick={()=> this.handleSelect(item)}>
              <a href="#">{item}</a>
            </li>
          ) ) }
        </ul>

      </div>
    )
  }
}
```

## Methods

* `start()` - enable 
* `stop()` - disable
* `watch()` - begin watch timer, called from `onMouseOut()` returned by `props()`
* `unwatch()` - cancel watch timer, called from `onMouseOver()` returned by `props()`
* `props()` - props filter for component to watch