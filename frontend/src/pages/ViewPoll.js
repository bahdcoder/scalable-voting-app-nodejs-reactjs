import React, { useEffect, useState } from 'react'

import Button from '../components/Button'

export default function ViewPoll({ match }) {
    const [ip, setIp] = useState(null)
    const [poll, setPoll] = useState(null)
    const [voted, setVoted] = useState(false)

    const fetchPoll = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/polls/${match.params.poll}`)

        const data = await response.json()

        setPoll(data)
    }

    const fetchClientIpAddress = async () => {
        const response = await fetch('https://ipapi.co/json')

        const data = await response.json()

        setIp(data.ip)
    }

    useEffect(() => {
        fetchPoll()
    }, [])

    useEffect(() => {
        fetchClientIpAddress()
    }, [])

    const vote = async (choice) => {
        await fetch(`${process.env.REACT_APP_API_URL}/polls/${match.params.poll}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ip,
                choice
            })
        })

        setVoted(true)
    }

    return (
        <div className="container mx-auto mt-16 px-5">
            <h1 className="my-5 text-3xl text-center">
                Welcome to Polar Voting Platform
            </h1>

            {poll ? (
                <div className="w-full max-w-3xl mx-auto bg-white shadow">
                    <header className='px-5 py-4 flex justify-between items-center'>
                        {poll.title}
                    </header>

                    {poll.choices.map(choice => {
                        return (
                            <div className='px-5 py-4 border-t border-gray-400 flex justify-between items-center' key={choice._id}>
                                {choice.name}

                                {!voted ? (
                                    <Button onClick={() => vote(choice._id)}>Vote</Button>
                                ): <span className='text-blue-500'>29</span>}
                            </div>
                        )
                    })}
                </div>
            ) : null}
        </div>
    )
}
