// import { Draggable } from 'react-beautiful-dnd'

// function Game() {
//   var data = require('../utils/Levels.json')

//   return (
//     <div className="mr-6 ml-6 p-2 bg-gray-300 border-4 rounded-md flex align-center justify-center flex-col">
//       <div className="font-bold flex-1 text-center">
//         <p>{data[1].question}</p>
//       </div>
//       <div className="flex-1 self-center m-5">
//         <div className="bg-yellow-50 h-24 w-24 d-block rounded-md"></div>
//       </div>
//       <div className="flex-1">
//         <div className="flex flex-row justify-center align-center relative text-white">
//           <div className="bg-gray-900 h-24 w-24 d-block mr-6 text-center rounded-md">
//             {data[1].wrongAnswer1}
//           </div>

//           <div className="bg-gray-900 h-24 w-24 d-block mr-6 text-center rounded-md">
//             {data[1].wrongAnswer2}
//           </div>
//           <div className="bg-gray-900 h-24 w-24 d-block text-center rounded-md">
//             {data[1].answer}
//           </div>
//         </div>
//         <Draggable key={1} draggableId={1} index={1}>
//           {(provided, snapshot) => (
//             <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//               Drag me!
//             </div>
//           )}
//         </Draggable>
//       </div>
//     </div>
//   )
// }

// export default Game

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import axios from '../api/level'

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
  var data = []

  //Retrieve levels
  const retrieveLevels = async () => {
    const response = await axios.get('/levels')
    data = response.data
    console.log(data)
    findLevel()
  }

  const updateLevel = async (level) => {
    const response = await axios.put(`/levels/${level.id}`, level)
    console.log(response.data)
  }

  useEffect(() => {
    retrieveLevels()
  })

  function generateNewLevel() {
    let unplayedLevels = data.filter((lvl) => lvl.isWin === false)
    const randomLvl = Math.floor(Math.random() * (unplayedLevels.length - 1))
    return unplayedLevels[randomLvl]
  }

  function findLevel() {
    let currentLevel = data.find((lvl) => lvl.isActive === true)
    if (currentLevel === undefined) {
      currentLevel = generateNewLevel()
      currentLevel.isActive = true
      updateLevel(currentLevel)
    }
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
