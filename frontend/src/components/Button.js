import React from 'react'

export default function Button({ children, onClick }) {
    return (
        <button onClick={onClick} className='bg-blue-600 text-white px-3 py-2 border border-blue-600 active:border-blue-700 text-sm rounded-sm hover:bg-blue-700 transition duration-150 ease-in-out'>{children}</button>
    )
}
