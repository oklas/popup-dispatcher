import { EventEmitter } from 'events';

let TIMEOUT = 200

class PopupDispatcher extends EventEmitter {
  constructor(props) {
    super(props)
    this.timer   = null;
    this.timeout = TIMEOUT
    this.started = false
    this.finish  = this.finish.bind(this)
    this.start   = this.start.bind(this)
    this.watch   = this.watch.bind(this)
    this.unwatch = this.unwatch.bind(this)
  }
  watch() {
    if(!this.started) return
    if(this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(this.finish, this.timeout);
  }
  unwatch() {
    if(this.timer) clearTimeout(this.timer);
  }
  start() {
    this.started = true
  }
  finish() {
    this.unwatch()
    this.started = false
    this.emit('done')
  }
  props(props={}) {
    let { onMouseOver, onMouseOut } = props
    let ex = {
      onMouseOver: 'onMouseOver' in props ?
        () => { onMouseOver(); this.unwatch() } : this.unwatch,
      onMouseOut: 'onMouseOut' in props ?
        () => { onMouseOut(); this.watch() } : this.watch
    }
    return { ...props, ...ex }
  }
}


export default PopupDispatcher;
