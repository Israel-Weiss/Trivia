import { ReactElement } from "react"


export function Home(): ReactElement {
    return <div className="main-continer home">
        <h1 className="title">Home Page</h1>
        <p>Welcome to your delightful trivia game</p>
        <p>Please create questions first, save the received id, 
            and only then on the vote page choose a question with the id</p>
    </div>
}