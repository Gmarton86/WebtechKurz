

function Game() {
    var data = require('../utils/Levels.json')

    return (
      <div className="mr-6 ml-6 p-2 bg-gray-300 border-4 rounded-md flex align-center justify-center flex-col">
        <div className="font-bold flex-1 text-center">
          <p>{data[0].question}</p>
        </div>
        <div className="flex-1 self-center m-5">
          <div className="bg-yellow-50 h-24 w-24 d-block rounded-md"></div>
        </div>
        <div className="flex-1">
          <div className="flex flex-row justify-center align-center relative text-white">
            <div className="bg-gray-900 h-24 w-24 d-block mr-6 p-5 text-center rounded-md">
              {data[0].wrongAnswer1}
            </div>
            <div className="bg-gray-900 h-24 w-24 d-block mr-6 p-5 text-center rounded-md">
              {data[0].wrongAnswer2}
            </div>
            <div className="bg-gray-900 h-24 w-24 d-block p-5 text-center rounded-md">
              {data[0].answer}
            </div>
          </div>
        </div>
      </div>
    )
}


export default Game

