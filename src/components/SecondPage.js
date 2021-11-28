import React, { useState, useEffect } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from '@mui/styles';
import InputBase from '@mui/material/InputBase'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";



const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`
    }));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};


const getItemStyle = (isDragging, draggableStyle) => ({
    width: '50px',
    height: '50px',
    border: '1px solid rgba(0, 0, 0, 0.87)',
    background: 'rgba(0, 0, 0, 0.87)',
    margin: '2px',

    ...draggableStyle
});



const useStyles = makeStyles({
    tablerow: {
        border: '1px solid black'
    },
    simulationtd: {
        border: '1px solid black',
        background: 'green'
    }
});

const SecondPage = ({ nrows, ncolumn, nobstraction, InitialPage }) => {
    const classes = useStyles();
    const [state, setState] = useState([getItems(nobstraction)])
    const [simulation, setSimulation] = useState(false)
    const [simulationTbody, setSimulationTbody] = useState([])

    const getUniqueKeyFromArrayIndex = (nrows, ncolumn) => {
        return `${nrows}-${ncolumn}`;
    };


    const onDragEnd = (result) => {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState.filter(group => group.length));
        }
    }


    const generateTable = () => {
        let table = [];
        for (let i = 0; i < nrows; i++) {
            let children = [];
            for (let j = 0; j < ncolumn; j++) {
                children.push(
                    <td className={classes.tablerow}>
                        <InputBase name={getUniqueKeyFromArrayIndex(i, j)} />
                    </td>
                );
            }
            table.push(
                <TableRow key={i}>
                    <TableCell>{children}</TableCell>
                </TableRow>
            );
        }
        return table;
    };

    const simulationRow = () => {
        let simlationTable = [];
        for (let i = 0; i < 1; i++) {
            let children = [];
            for (let j = 0; j < ncolumn; j++) {
                children.push(
                    <td className={classes.simulationtd}>
                        <InputBase name={getUniqueKeyFromArrayIndex(i, j)} />
                    </td>
                );
            }
            simlationTable.push(
                <TableRow key={i} style={{ marginBottom: '5px' }}>
                    <TableCell>{children}</TableCell>
                </TableRow>
            );
        }
        setSimulationTbody(simlationTable);
        setSimulation(true)
    }


    return (
        <Grid container spacing={2} style={{ padding: '20px', border: '2px solid #2c2b2b', marginTop: '20px' }} >
            <Grid item xs={12} >
                <Typography variant="h6" mb={2} style={{ textAlign: 'center' }}> Drag the obstarction and palce it inside the Grid  </Typography>
            </Grid>
            <Grid item xs={8} container direction="column" alignItems="center" justifyContent="center">
                <Box >
                    <TableContainer mb={5} >
                        <Table className={classes.table} aria-label="simple table" style={{ marginBottom: '10px' }}>
                            {simulation ? <TableBody>{simulationTbody}</TableBody> : null}
                        </Table>
                        <Table className={classes.table} aria-label="simple table">
                            <TableBody>{generateTable()}</TableBody>
                        </Table>
                    </TableContainer>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" style={{ marginTop: "20px" }} mt={4} onClick={() => InitialPage()}> Back</Button>
                        <Button variant="contained" style={{ marginTop: "20px" }} mt={4} onClick={() => simulationRow()}> Start Simulation</Button>
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={4} container direction="column" alignItems="center" justifyContent="center">
                <div style={{ display: "flex" }}>
                    <DragDropContext onDragEnd={onDragEnd}>
                        {state.map((el, ind) => (
                            <Droppable key={ind} droppableId={`${ind}`}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {el.map((item, index) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index} >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}
                                                    >
                                                        <div style={{ display: "flex", justifyContent: "space-around" }} >
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </DragDropContext>
                </div>
            </Grid>
        </Grid>
    )
}

export default SecondPage
