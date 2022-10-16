import NotFount from '../container/404'

export default function NotFountView() {
  return <NotFount />
}

NotFountView.getLayout = function getLayout(page) {
  return (
    <div>
      <>{page}</>
    </div>
  )
}