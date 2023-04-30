import React from 'react'

import css from '../style/components/Title.module.css'

function Title({title}) {
  return (
    <>
      <div className="bg-warning">

        {/* Title Image */}
        <div className="">
        <p className={css.pattern_image}>{title}</p>
        </div>
      </div>
  </>
  )
}

export default Title