import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }))

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
  const [state, setState] = useState([getItems(5), []])
  var completedLevels = []
  var data = require('../utils/Levels.json')
  var currentLevel

  useEffect(() => {
    setStates()
    console.log('completed levels', completedLevels)
    console.log('current level: ', currentLevel)
  })

  function getCompletedLevels() {
    completedLevels = localStorage.getItem('CompletedLevels')
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
    let randomLvl = Math.floor(Math.random() * (data.length - 1))
    if(completedLevels) {
      var result = completedLevels.find((item) => item === randomLvl)
      while (result !== undefined) {
        if (completedLevels.length < data.length) {
          randomLvl = Math.floor(Math.random() * (data.length - 1))
          result = completedLevels.find((item) => item === randomLvl)
        } else {
          break
        }
      }
    }
    return randomLvl
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
      const items = reorder(state[sInd], source.index, destination.index)
      const newState = [...state]
      newState[sInd] = items
      setState(newState)
    } else {
      const result = move(state[sInd], state[dInd], source, destination)
      const newState = [...state]
      newState[sInd] = result[sInd]
      newState[dInd] = result[dInd]

      setState(newState.filter((group) => group.length))
    }
  }

  return (
    <div className="mr-6 ml-6 p-2 bg-gray-900 border-4 rounded-md flex align-center justify-center flex-col">
      <div className="font-bold flex-1 text-center mb-2 text-white">
        <p>Is it ok?</p>
      </div>
      <div className="flex align-center justify-center">
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
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
