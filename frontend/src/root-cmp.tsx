import { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './cmps/header'
import { Home } from './pages/home'
import { Vote } from './pages/vote'
import { Create } from './pages/create'
import './assets/scss/global.scss'

export default function App(): ReactElement {

    return <div className='main-app'>
        <Header />
        <Routes>
            <Route path='' element={<Home />} />
            <Route path='vote' element={<Vote />} />
            <Route path='create' element={<Create />} />
        </Routes>
    </div>
}


