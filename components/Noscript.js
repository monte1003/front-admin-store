import PropTypes from 'prop-types'
import ReactDOMServer from 'react-dom/server'

export default function Noscript (props) {
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(props.children)
  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />
}
Noscript.propTypes = {
  children: PropTypes.any
}
