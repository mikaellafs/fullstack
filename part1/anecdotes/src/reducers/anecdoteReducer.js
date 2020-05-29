import anecdoteService from '../services/anecdotes'

export const createVote = (anec) => {
  return async dispatch => {
    const newAnec = {...anec, votes: anec.votes+1}
    const updatedAnec = await anecdoteService.update(anec.id, newAnec)

    dispatch({
      type: 'VOTE',
      anecdote: updatedAnec
    })
  }
}

export const newAnecdote = (content) =>{  
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      content: anecdote
    })
  }
}

export const initAnecdotes = () =>{
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  switch(action.type){
    case 'NEW': return state.concat(action.content)
    case 'VOTE': return state.map(anec => anec.id === action.anecdote.id? action.anecdote : anec)
    case 'INIT_ANECDOTES': return action.data
    default: return state
  }
}

export default reducer