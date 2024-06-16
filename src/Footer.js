import React from 'react'
const Footer = ({length}) => {
  return (
    <footer>
      {/* {length !== 0 ? (<p>{length} items in list </p>) : (<p> No items in list</p>)} */}
      <p>{length} List {length === 1 ?  'item' : 'items'}</p>
    </footer>
  )
}

export default Footer
