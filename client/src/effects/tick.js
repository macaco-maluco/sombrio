import { tick } from '../store'

export default ({ dispatch }) => {
  setInterval(() => dispatch(tick()), 250)
}
