// import './categories.styles.scss'
import Home from './routes/home/home.component'
import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component'
import Authentication from './routes/authentication/authentication.component'
// import Directory from './components/directory/directory.component'

const Shop = () => (
  <div>
    <h1>I am the shop page</h1>
  </div>
)

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation></Navigation>}>
        {/* match the parent first then match the inside */}
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="auth" element={<Authentication />}></Route>
      </Route>
    </Routes>
  )
}
export default App
