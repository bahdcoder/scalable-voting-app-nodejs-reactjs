import React, { useState } from 'react'

export default function CreatePoll() {
    const [title, setTitle] = useState('')
    const [choices, setChoices] = useState([''])

    const addAnswer = () => {
        setChoices([
            ...choices,
            ''
        ])
    }

    const removeChoice = (index) => {
        const newChoices = choices.filter((choice, choiceIndex) => {
            return choiceIndex !== index
        })

        setChoices(newChoices)
    }

    const onChoiceChange = (index, value) => {
        const newChoices = choices.map((choice, choiceIndex) => {
            if (choiceIndex === index) {
                return value
            }

            return choice
        })

        setChoices(newChoices)
    }

    return (
        <div className="container mx-auto my-16 md:my-32 px-6 ">
          <div className="w-full max-w-3xl mx-auto rounded shadow-md bg-white">
              <header className="border-b border-gray-400 px-8 py-5 text-gray-800">
                Create poll
              </header>

              <div className="py-5 px-8">
                  <div className="mb-6">
                      <label htmlFor="title" className="text-sm mb-2 inline-block">Enter the title of the poll</label>
                      <input onChange={(event) => setTitle(event.target.value)} value={title}  name='title' id='title' type="text" className='w-full py-2 border border-gray-400 rounded px-4' />
                  </div>

                  <div className="mb-3">
                    <label className="text-sm mb-2 inline-block">Enter all the possible answers for this poll</label>
                    {choices.map((choice, index) => (
                        <div className="w-full flex items-center mb-2">
                            <input onChange={(event) => onChoiceChange(index, event.target.value)} key={index} type="text" value={choice} className='w-full py-2 border border-gray-400 rounded px-4' />
                            <button onClick={() => removeChoice(index)} className='py-2 ml-2 px-3 bg-red-500 text-white rounded hover:bg-red-600'>Remove</button>
                        </div>
                    ))}
                  </div>

                  <button onClick={addAnswer} className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'>Add choice</button>

                  <div className="mt-12 mb-6 text-center">
                    <button className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'>Create Poll</button>
                  </div>
              </div>
          </div>
       </div>
    )
}
