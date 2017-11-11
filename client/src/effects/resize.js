import { resizeWindow } from '../store'

export default ({ dispatch }) => {
  window.addEventListener('resize', () => {
    dispatch(resizeWindow([window.innerWidth, window.innerHeight]))
  })
}
