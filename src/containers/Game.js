import { connect } from 'react-redux'
import { reset,handleClick,jumpTo,sortHistory } from '../actions'
import Game from '../components/Game'

const mapStateToProps = (state) => ({
  _state: state
})

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reset()),
  handleClick: pos => dispatch(handleClick(pos)),
  jumpTo: step => dispatch(jumpTo(step)),
  sortHistory: () => dispatch(sortHistory())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
