import { PColor } from '@/public/colors'
import styled, { css } from 'styled-components'

export const Steps = styled.div`
    border-bottom: 0.5px solid #e9ecef;
    display: flex;
    padding: 5px;
`

export const ActionStep = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

export const Tabs = styled.div`
  position: relative;

    ${({ active }) => {
    return active
      ? css`
                color: ${PColor};
                font-weight: 600;
                &::before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 2px;
                    background: ${PColor};
                    bottom: -7px;
                    left: 0;

                }
                `
      : css`
                color: #9e9e9e;
                font-weight: 200;
                `
  }}
`