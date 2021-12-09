import { useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useDispatch, useSelector } from 'react-redux'
import {
  setId,
  setAnswer,
  setHelper,
  setQuestion,
  setWrongAnswer1,
  setWrongAnswer2,
  setAnswers,
} from '../redux/actions'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}
const grid = 8

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
})

function Game() {
  var completedLevels = []
  var data = require('../utils/Levels.json')
  var currentLevel
  const { question, answers } = useSelector((state) => state.levelReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    setStates()
    console.log(completedLevels)
    console.log('current level: ', currentLevel)
    setReduxLevel()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setReduxLevel() {
    
    dispatch(setId(data[currentLevel].id))
    dispatch(setQuestion(data[currentLevel].question))
    dispatch(setHelper(data[currentLevel].helper))
    dispatch(setAnswer(data[currentLevel].answer))
    dispatch(setWrongAnswer1(data[currentLevel].wrongAnswer1))
    dispatch(setWrongAnswer2(data[currentLevel].wrongAnswer2))
    dispatch(setAnswers([createArrayOfAnswers(), []]))
    
  }

  function createArrayOfAnswers() {
    let answers = [
      { id: '0', content: data[currentLevel].answer },
      { id: '1', content: data[currentLevel].wrongAnswer1 },
      { id: '2', content: data[currentLevel].wrongAnswer2 },
    ]
    answers.sort(() => Math.random() - 0.5)
    return answers
  }

  function getCompletedLevels() {
    completedLevels = JSON.parse(localStorage.getItem('CompletedLevels'))
    if (completedLevels === null) {
      completedLevels = []
    }
  }

  function setStates() {
    getCompletedLevels()
    currentLevel = localStorage.getItem('ActiveLevel')
    if (!currentLevel) {
      currentLevel = generateNewLevel()
      localStorage.setItem('ActiveLevel', currentLevel)
    }
  }

  function generateNewLevel() {
    let randomLvl = Math.floor(Math.random() * data.length)
    if (completedLevels) {
      var result = completedLevels.find((item) => item === randomLvl)
      while (result !== undefined) {
        if (completedLevels.length <= data.length) {
          randomLvl = Math.floor(Math.random() * data.length)
          // eslint-disable-next-line no-loop-func
          result = completedLevels.find((item) => item === randomLvl)
        } else {
          break
        }
      }
    }
    return randomLvl
  }

  function setNextLevel() {
    getCompletedLevels()
    completedLevels.push(parseInt(localStorage.getItem('ActiveLevel')))
    if (completedLevels.length === data.length) {
      localStorage.removeItem('CompletedLevels')
      completedLevels = []
    }
    currentLevel = generateNewLevel()
    localStorage.setItem('ActiveLevel', currentLevel)
    localStorage.setItem('CompletedLevels', JSON.stringify(completedLevels))

    setReduxLevel()
  }

  function onDragEnd(result) {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }
    const sInd = +source.droppableId
    const dInd = +destination.droppableId

    if (sInd === dInd) {
      const items = reorder(answers[sInd], source.index, destination.index)
      const newState = [...answers]
      newState[sInd] = items
      // setState(newState)
      dispatch(setAnswers(newState))
    } else {
      const clone = Array.from(answers[sInd])

      if (clone.splice(source.index, 1)[0].id === '0') {
        const result = move(answers[sInd], answers[dInd], source, destination)
        const newState = [...answers]
        newState[sInd] = result[sInd]
        newState[dInd] = result[dInd]
        dispatch(setAnswers(newState.filter((group) => group.length)))
        setNextLevel()
      } else {
        return
      }
    }
  }

  return (
    <div className="mr-6 ml-6 p-2 bg-gray-900 border-4 rounded-md flex align-center justify-center flex-col pb-5">
      <div className="font-bold flex-1 text-center mb-2 text-white">
        <p>{question}</p>
      </div>
      <div className="flex align-center justify-center">
        <DragDropContext onDragEnd={onDragEnd}>
          {answers.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                  className="ml-6 mr-2"
                >
                  {el.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <div className="flex justify-around">{item.content}</div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}

export default Game
