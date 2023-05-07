/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */

import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const THUMB_LENGTH = 16
const THUMB_BORDER_RADIUS = THUMB_LENGTH / 2
const TRACK_HEIGHT = 3
const TRACK_BORDER_RADIUS = TRACK_HEIGHT / 2
const MARGIN = (THUMB_LENGTH - TRACK_HEIGHT) / 2

// Used http://danielstern.ca/range.css to start styling then altered from there
const Input = styled.input`
  /* THUMB */
  width: 100%;
  background: transparent;
  margin: ${MARGIN}px 0;
  color: #0687df;
  cursor: pointer;
  :focus {
    outline: none;
  }
  ::-webkit-slider-runnable-track {
    width: 100%;
    height: ${TRACK_HEIGHT}px;
    box-shadow: none;
    background: rgba(0, 0, 0, 0.2);
    border-radius: ${TRACK_BORDER_RADIUS}px;
    border: none;
  }
  ::-webkit-slider-thumb {
    box-shadow: none;
    border: none;
    height: ${THUMB_LENGTH}px;
    width: ${THUMB_LENGTH}px;
    border-radius: ${THUMB_BORDER_RADIUS}px;
    background: #0687df;
    -webkit-appearance: none;
    margin-top: -${MARGIN}px;
    z-index: 1;
    position: relative;
  }
  /* :focus::-webkit-slider-runnable-track {
    Not using right now
    background: red;
  } */
  ::-moz-range-track {
    width: 100%;
    height: ${TRACK_HEIGHT}px;
    box-shadow: none;
    background: rgba(0, 0, 0, 0.2);
    border-radius: ${TRACK_BORDER_RADIUS}px;
    border: none;
  }
  ::-moz-range-thumb {
    box-shadow: none;
    border: none;
    height: ${THUMB_LENGTH}px;
    width: ${THUMB_LENGTH}px;
    border-radius: ${THUMB_BORDER_RADIUS}px;
    background: #0687df;
    z-index: 1;
    position: relative;
  }
  ::-ms-track {
    width: 100%;
    height: ${TRACK_HEIGHT}px;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  ::-ms-fill-lower {
    background: rgba(0, 0, 0, 0.2);
    border: none;
    border-radius: ${TRACK_BORDER_RADIUS}px;
    box-shadow: none;
  }
  ::-ms-fill-upper {
    background: #d4d4d4; /* hard coded since edge will not use css vars in these psuedo elems */
    border: none;
    border-radius: ${TRACK_BORDER_RADIUS}px;
    box-shadow: none;
  }
  ::-ms-thumb {
    /* Need to be a little bit smaller for edge */
    margin-top: 1px;
    box-shadow: none;
    border: none;
    height: ${THUMB_LENGTH - 2}px;
    width: ${THUMB_LENGTH - 2}px;
    border-radius: ${(THUMB_LENGTH - 2) / 2}px;
    background: #0687df;
    z-index: 1;
    position: relative;
  }
  :focus::-ms-fill-lower {
    background: rgba(0, 0, 0, 0.2);
  }
  :focus::-ms-fill-upper {
    background: #d4d4d4; /* hard coded since edge will not use css vars in these psuedo elems */
  }
`

const LowerTrack = styled.div`
  position: absolute;
  pointer-events: none;
  background-color: #0687df;
  top: 50%;
  border-radius: ${TRACK_BORDER_RADIUS}px;
  left: 0px;
  transform: translate3d(0, -50%, 0);
  height: ${TRACK_HEIGHT}px;
`
const Container = styled.div`
  line-height: 0; /* helps get browsers all in line */
  display: inline-block;
  position: relative;
`

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
`

const SliderLabel = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  width: 75px;
  font-size: 12px;

  sub,
  sup {
    vertical-align: baseline;
  }
`

const TickContainer = styled.ul`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translate3d(0, -50%, 0);
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  z-index: 0;
`

const Tick = styled.li`
  height: ${THUMB_LENGTH / 2}px;
  width: ${THUMB_LENGTH / 2}px;
  border-radius: ${THUMB_LENGTH / 4}px;
  background: ${props => {return (props.highlight ? '#0687df' : '#d4d4d4')}};
  list-style: none;
`

const InputRange = ({
  value,
  min,
  max,
  step,
  onChange,
  id,
  label,
  fraction,
  description,
  margins = [1, 2],
  ...props
}) => {
  const ticks = margins.map((margin, i) => {
    let highlight
    if (i <= value) {
      highlight = true
    }
    return <Tick highlight={highlight} key={margin.value} />
  })

  return (
    <OuterContainer>
      {label && (
        <output>
          <SliderLabel>
            <span>
              {description ? description : null} {fraction}
            </span>
          </SliderLabel>
        </output>
      )}
      <Container>
        <LowerTrack
          style={{
            width: `${((value - min) / (max - min)) * 100}%`
          }}
        />
        <Input
          id={id}
          max={max}
          min={min}
          onChange={e => {
            onChange(Number(e.target.value))
          }}
          step={step}
          type={'range'}
          // aria-valuemin={min}
          // aria-valuemax={max}
          // aria-valuenow={value}
          value={value}
          {...props}
        />
        <TickContainer>{label && ticks}</TickContainer>
      </Container>
    </OuterContainer>
  )
}

InputRange.defaultProps = {
  style: {}
}

InputRange.propTypes = {
  description: PropTypes.any,
  fraction: PropTypes.any,
  id: PropTypes.any,
  label: PropTypes.any,
  margins: PropTypes.array,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  step: PropTypes.number.isRequired,
  style: PropTypes.object,
  value: PropTypes.number.isRequired
}

export default InputRange
