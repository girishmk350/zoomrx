import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const FirstPage = ({ gridCreations }) => {
    const [rows, setRows] = React.useState(1);
    const [column, setColumn] = React.useState(1);
    const [obstraction, setObstraction] = React.useState(1);

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" >
            <Box style={{ padding: '50px 200px', border: '2px solid #2c2b2b', marginTop: '20px' }}>
                <Typography variant="h4" mb={2}> Grid Creations  </Typography>
                <Box width={300}>
                    <>
                        <Box mt={2} centered justifyContent="center">
                            <Typography variant="h6" >Number of rows  </Typography>
                            <Slider size="small" value={rows} min={1} max={10} aria-label="Small" valueLabelDisplay="auto" onChange={e => setRows(e.target.value)} />
                            <Typography variant="h6" >{rows}  </Typography>
                        </Box>
                        <Box mt={2} centered justifyContent="center">
                            <Typography variant="h6" > Number of column  </Typography>
                            <Slider size="small" value={column} min={1} max={10} aria-label="Small" valueLabelDisplay="auto" onChange={e => setColumn(e.target.value)} />
                            <Typography variant="h6" >{column}  </Typography>
                        </Box>
                        <Box mt={2} centered justifyContent="center">
                            <Typography variant="h6" > Number of obstraction </Typography>
                            <Slider size="small" value={obstraction} min={1} max={10} aria-label="Small" valueLabelDisplay="auto" onChange={e => setObstraction(e.target.value)} />
                            <Typography variant="h6" >{obstraction}  </Typography>
                        </Box>
                        <Button variant="contained" onClick={() => gridCreations(rows, column, obstraction)}> Next</Button>
                    </>
                </Box >
            </Box >
        </Grid >
    )
}

export default FirstPage
