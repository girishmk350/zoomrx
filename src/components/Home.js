import React, { useState } from 'react'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'

const Home = () => {
    const [page, setpages] = useState(true)
    const [rows, setRows] = useState();
    const [column, setColumn] = useState();
    const [obstraction, setObstraction] = useState();

    const gridCreations = (numberOfRows, numberOfColumns, numberOfObstraction) => {
        setRows(numberOfRows)
        setColumn(numberOfColumns)
        setObstraction(numberOfObstraction)
        setpages(false)
    };
    const InitialPage = () => {
        setpages(true)
    }

    return (
        <div>
            {page ? <FirstPage gridCreations={gridCreations} /> : <SecondPage nrows={rows} ncolumn={column} nobstraction={obstraction} InitialPage={InitialPage} />}
        </div>
    )
}

export default Home
