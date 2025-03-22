'use client'

import type React from 'react'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

export function InputDemo({ description }: { description?: string }) {
  const [text, setText] = useState(description || '')
  const charCount = text.length

  const maxChars = 100

  const isMaxChars = charCount >= maxChars
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value

    const newCharCount = newText.length

    if (newCharCount <= maxChars) {
      setText(newText)
    }
  }

  return (
    <div className='space-y-2'>
      <Input
        type='text'
        name='input'
        placeholder='Enter up to 20 words (100 characters max)'
        value={text}
        onChange={handleChange}
        className={
          isMaxChars
            ? 'border-orange-500 grid-cols-4 focus-visible:border-yellow-400 focus-visible:ring-yellow-300'
            : ''
        }
      />
      <div className='flex justify-between text-xs'>
        <p
          className={`${
            isMaxChars ? 'text-orange-500 font-medium' : 'text-gray-500'
          }`}
        >
          {charCount}/{maxChars} characters
        </p>
      </div>
    </div>
  )
}
