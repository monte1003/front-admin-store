import React, { useState } from 'react'
import styled from 'styled-components'

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  padding: 4px 8px;
`

const SearchInput = styled.input`
  width: 100%;
  font-size: 16px;
  border: none;
  padding: 8px;
  &:focus {
    outline: none;
  }
`

const SearchIcon = styled.span`
  padding: 8px;
  color: #5f6368;
`

export const SearchBar = ({
  placeholder = 'Search...',
  handleChange,
  handleSubmit
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
    if(handleChange)handleChange(event)
  }

  const customHandleSubmit = (event) => {
    event.preventDefault()
    console.log(searchQuery) // do something with the search query
    if(handleSubmit)handleSubmit(event)
  }

  return (
    <form onSubmit={customHandleSubmit}>
      <SearchBarContainer>
        <SearchIcon>
          <i className='fas fa-search' />
        </SearchIcon>
        <SearchInput
          onChange={handleSearch}
          placeholder={placeholder}
          type='text'
          value={searchQuery}
        />
      </SearchBarContainer>
    </form>
  )
}

export default SearchBar
