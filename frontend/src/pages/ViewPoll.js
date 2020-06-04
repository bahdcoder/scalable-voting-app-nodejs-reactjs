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
    }, [voted])

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

    const getTotalVotes = () => {
        let totalVotes = 0

        poll.choices.forEach(choice => {
            totalVotes += choice.count
        })

        return totalVotes
    }

    const getChoicePercentage = (selectedChoice) => {
        const totalVotes = getTotalVotes()

        if (totalVotes === 0) {
            return 0
        }
        
        return Math.round((selectedChoice.count / totalVotes) * 100)
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

                        {voted && <span>{getTotalVotes()} votes</span>}

                        <Button onClick={() => setVoted(true)}>View results</Button>
                    </header>

                    {poll.choices.map(choice => {
                        return (
                            <div className='px-5 py-4 border-t border-gray-400 flex justify-between items-center' key={choice._id}>
                                {choice.name}

                                {voted ? (
                                    <span className='text-blue-500'> {getChoicePercentage(choice)}% </span>
                                ) :  <Button onClick={() => vote(choice._id)}>Vote</Button>}
                            </div>
                        )
                    })}
                </div>
            ) : null}
        </div>
    )
}
