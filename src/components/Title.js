import React from 'react'

import css from '../style/components/Title.module.css'

function Title({title}) {
  return (
    <>
      <div className="bg-dark">

        {/* Title Image */}
        <div className="">
        <p className={css.pattern_image}>{title}</p>
        </div>
      </div>
  </>
  )
}

export default Title