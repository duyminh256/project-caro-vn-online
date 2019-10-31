// import axios from 'axios'

export const handleClick = pos => ({
  type: 'HANDLE_CLICK',
  pos,
})

export const sortHistory = () => ({
    type: 'SORT_HISTORY'
})

export const jumpTo = step=> ({
    type: 'JUMP_TO',
    step,
})
export const reset = () => ({
    type: 'RESET'
})