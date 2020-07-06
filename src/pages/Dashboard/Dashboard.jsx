import CurrentSession from './CurrentSession';

export default function Dashboard() {
  return (
    <div className='page-dashboard'>
      <h1>
        Dashboard
      </h1>

      <h2>
        Add Repository
      </h2>
      <hr />
      <CurrentSession />
    </div>
  )
}